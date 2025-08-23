import Environment from "./Environment";

export default class Conversation extends Environment {
  messages: { role: string, content: string }[] = [];
  next_agent_idx = 0

  constructor(
    agent_names: string[],
  ) {
    super(agent_names);
  }

  add_message(agent_name: string, content: string) {
    this.messages.push({ role: agent_name, content: content });
  }

  print() {
    console.log(this.messages);
  }

  getObservation(
    agent_name: string | null = null
  ) : Array<{
    role: string;
    content: string;
  }>{
    if (agent_name === null) return this.messages;
    return this.messages.filter(m => m.role === agent_name);
  }
}
