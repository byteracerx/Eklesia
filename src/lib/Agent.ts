import Provider from "./Provider";

const DEFAULT_TEMPERATURE = 0.7

const END_OF_MESSAGE = "<EOS>"  // End of message token specified by us not OpenAI
// const STOP = ("<|endoftext|>", END_OF_MESSAGE)  // End of sentence token
const BASE_PROMPT = `The messages always end with the token ${END_OF_MESSAGE}.`
const SYSTEM_NAME = "system"

export default class Agent {
    provider: Provider | null;
    agentName: string;
    role_desc: string;
    temperature: number;
    merge_other_agent_as_user: boolean;
    request_msg: { role: string; content: string } | null;

    constructor(
      agentName: string, 
      role_desc: string, 
      provider: Provider | null = null,
      temperature: number = DEFAULT_TEMPERATURE,
      merge_other_agent_as_user: boolean = true,
      request_msg: { role: string; content: string } | null = null,
    ) {
      this.agentName = agentName;
      this.role_desc = role_desc;
      this.provider = provider || null;
      this.temperature = temperature;
      this.merge_other_agent_as_user = merge_other_agent_as_user;
      this.request_msg = request_msg;
    }

    // @retry(stop=stop_after_attempt(6), wait=wait_random_exponential(min=1, max=60))
    async #rawQuery(
      history_messages: Array<{
        role: string;
        content: string;
      }> = [],
      environment_description: string | null = null,
    ): Promise<string> {

      const system_prompt = environment_description
        ? `You are a helpful assistant.\n${environment_description.trim()}\n${BASE_PROMPT}\n\nYour name is ${this.agentName}.\n\nYour role:${this.role_desc}`
        : `You are a helpful assistant. Your name is ${this.agentName}.\n\nYour role:${this.role_desc}\n\n${BASE_PROMPT}`;

      let all_messages: Array<{
        role: string;
        content: string;
      }> = [{role: SYSTEM_NAME, content: system_prompt}]

      history_messages.forEach((msg: { role: string; content: string }, i: number) => {
        if (msg.role == SYSTEM_NAME) {
          all_messages.push(msg)
        } else {
          all_messages.push({
            role: msg.role,
            content: `${msg.content}${END_OF_MESSAGE}`,
          })
        }
      })

      if (this.request_msg) all_messages.push({role: SYSTEM_NAME, content: this.request_msg.content});
      else all_messages.push(
          {role: SYSTEM_NAME, content: `Now you speak, ${this.agentName}.${END_OF_MESSAGE}`}
      );

      const messages: Array<{
        role: string;
        content: string;
      }> = [];
  
      all_messages.forEach((msg, i) => {
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
            if (this.merge_other_agent_as_user) {
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

      const completion = await this.provider?.query(
        messages,
        this.temperature,
      ) as any; // TODO: clean that
      // console.log(completion)
      // console.log(completion.choices[0].message.content)
      let response = completion.choices[0].message.content
      console.log("[", this.agentName, "]")//, this.role_desc);
      console.log(response);
      console.log("=================================");

      return response.trim();
    }

    async act(
      observation: Array<{
      role: string;
      content: string;
    }>, 
    environment_description: string
    ): Promise<string> { //TODO: clean
        try {
          const response = this.#rawQuery(
              observation,
              environment_description,
              // request_msg=None,
          )

          return response
        }
        catch {

        }
        //  RetryError as e:
        //     err_msg = f"Agent {self.name} failed to generate a response. Error: {e.last_attempt.exception()}. Sending signal to end the conversation."
        //     logging.warning(err_msg)
        //     response = SIGNAL_END_OF_CONVERSATION + err_msg
        return "";//TODO: clean
    }
}
