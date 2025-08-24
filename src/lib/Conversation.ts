import Environment from "./Environment";
import Message from "./types/Message";

export default class Conversation extends Environment {
  messages: Array<Message> = [];
  nextAgentIdx = 0

  constructor(
    agentNames: string[],
  ) {
    super(agentNames);
  }

  addMessage(agentName: string, content: string) {
    const newMessage: Message = { role: agentName, content: content };
    this.messages.push(newMessage);
  }

  print() {
    console.log(this.messages);
  }

  getObservation(
    agentName: string | null = null
  ) : Array<Message>{
    if (agentName === null) return this.messages;
    return this.messages.filter(m => m.role === agentName);
  }
}
