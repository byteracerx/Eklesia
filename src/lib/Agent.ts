import Provider from "./Provider";

const DEFAULT_TEMPERATURE = 0.7

// const END_OF_MESSAGE = "<EOS>"  // End of message token specified by us not OpenAI
// const STOP = ("<|endoftext|>", END_OF_MESSAGE)  // End of sentence token
// const BASE_PROMPT = f"The messages always end with the token {END_OF_MESSAGE}."
const BASE_PROMPT = "";// 
const SYSTEM_NAME = "system"

export default class Agent {
    provider: Provider | null;
    agentName: string;
    role_desc: string;
    temperature: number;

    constructor(
      agentName: string, 
      role_desc: string, 
      provider: Provider | null = null,
      temperature: number = DEFAULT_TEMPERATURE,
    ) {
      this.agentName = agentName;
      this.role_desc = role_desc;
      this.provider = provider || null;
      this.temperature = temperature;
    }

    // @retry(stop=stop_after_attempt(6), wait=wait_random_exponential(min=1, max=60))
    async #rawQuery(
      messages: Array<{
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

      if (messages.length > 0) {
        all_messages = all_messages.concat(messages)
      }
  
      const completion = await this.provider?.query(
        all_messages,
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
