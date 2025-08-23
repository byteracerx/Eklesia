import Environment from "./Environment";
import Message from "./types/Message";

export default class Conversation extends Environment {
  messages: Array<Message> = [];
  next_agent_idx = 0

  constructor(
    agent_names: string[],
  ) {
    super(agent_names);
  }

  add_message(agent_name: string, content: string) {
    const new_message: Message = { role: agent_name, content: content };
    this.messages.push(new_message);
  }

  print() {
    console.log(this.messages);
  }

  getObservation(
    agent_name: string | null = null
  ) : Array<Message>{
    if (agent_name === null) return this.messages;
    return this.messages.filter(m => m.role === agent_name);
  }
}
