import { randomUUID } from "crypto";

import Provider from "./Provider";
import ChatCompletionResponse from "./types/ChatCompletionResponse";
import Message  from "./types/Message";

const END_OF_MESSAGE = "<EOS>"  // End of message token specified by us not OpenAI
// const STOP = ("<|endoftext|>", END_OF_MESSAGE)  // End of sentence token
const BASE_PROMPT = `The messages always end with the token ${END_OF_MESSAGE}.`
const SYSTEM_NAME = "system"

const SIGNAL_END_OF_CONVERSATION = `<<<<<<END_OF_CONVERSATION>>>>>>${randomUUID()}`;

export default class Agent {
    provider: Provider;
    agentName: string;
    roleDesc: string;
    mergeOtherAgentAsUser: boolean;
    requestMsg: Message | null;

    constructor(
      agentName: string, 
      roleDesc: string, 
      provider: Provider,
      mergeOtherAgentAsUser: boolean = true,
      requestMsg: Message | null = null,
    ) {
      this.agentName = agentName;
      this.roleDesc = roleDesc;
      this.provider = provider || null;
      this.mergeOtherAgentAsUser = mergeOtherAgentAsUser;
      this.requestMsg = requestMsg;
    }

    // @retry(stop=stop_after_attempt(6), wait=wait_random_exponential(min=1, max=60))
    async #rawQuery(
      historyMessages: Array<Message> = [],
      environmentDescription: string | null = null,
    ): Promise<string> {

      const systemPrompt = environmentDescription
        ? `You are a helpful assistant.\n${environmentDescription.trim()}\n${BASE_PROMPT}\n\nYour name is ${this.agentName}.\n\nYour role:${this.roleDesc}`
        : `You are a helpful assistant. Your name is ${this.agentName}.\n\nYour role:${this.roleDesc}\n\n${BASE_PROMPT}`;

      let allMessages: Array<Message> = [{role: SYSTEM_NAME, content: systemPrompt}]

      historyMessages.forEach((msg: Message, i: number) => {
        if (msg.role == SYSTEM_NAME) {
          allMessages.push(msg)
        } else {
          allMessages.push({
            role: msg.role,
            content: `${msg.content}${END_OF_MESSAGE}`,
          })
        }
      })

      if (this.requestMsg) allMessages.push({role:  , content: this.requestMsg.content});
      else allMessages.push(
          {role: SYSTEM_NAME, content: `Now you speak, ${this.agentName}.${END_OF_MESSAGE}`}
      );

      const messages: Array<Message> = [];
  
      allMessages.forEach((msg, i) => {
        if (msg.role === SYSTEM_NAME) {
          messages.push({ role: "system", content: msg.content });
        }
        else if (msg.role === this.agentName) {
          // Message de l'agent => assistant
          messages.push({ role: "assistant", content: msg.content });
        } else {
          // On regarde le dernier message existant
          let lastMsg = messages[messages.length - 1];
      
          if (lastMsg && lastMsg.role === "user") {
            if (this.mergeOtherAgentAsUser) {
              // Fusionner avec le dernier message user
              lastMsg.content = `${lastMsg.content}\n\n[${msg.role}]: ${msg.content}`;
            } else {
              // Ajouter un nouveau bloc user
              messages.push({ role: "user", content: `[${msg.role}]: ${msg.content}` });
            }
          } else if (lastMsg && lastMsg.role === "assistant") {
            // Fusionner les messages assistants consécutifs
            lastMsg.content = `${lastMsg.content}\n${msg.content}`;
          } else if (lastMsg && lastMsg.role === "system") {
            // Ajouter un nouveau user après system
            messages.push({ role: "user", content: `[${msg.role}]: ${msg.content}` });
          } else {
            throw new Error(`Invalid role: ${lastMsg ? lastMsg.role : "undefined"}`);
          }
        }
      });

      const completion: ChatCompletionResponse = await this.provider.query(
        messages
      );
      // console.log(JSON.stringify(completion, null, 2))
      // console.log(completion.choices[0].message.content)
      let response = completion.choices[0]?.message.content
      console.log("[", this.agentName, "]")//, this.roleDesc);
      console.log(response);
      console.log("=================================");
      if (!response) throw new Error(`No response from provider ${this.provider.constructor.name} (${this.agentName} )`)
      return response.trim();
    }

    async act(
      observation: Array<Message>, 
      environmentDescription: string
    ): Promise<string> {
        try {
          const response = await this.#rawQuery(
              observation,
              environmentDescription,
          )

          return response
        }
        catch (e: any) {
          const errMsg = `Agent ${this.agentName} failed to generate a response. Error: ${e?.message ?? e}. Sending signal to end the conversation.`;

          return SIGNAL_END_OF_CONVERSATION + errMsg;
        }
    }
}
