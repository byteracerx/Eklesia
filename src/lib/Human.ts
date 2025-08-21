import Agent from "./Agent";
import Provider from "./Provider";

export default class Human extends Agent {

  constructor(
    agentName: string, role_desc: string, provider: Provider | null = null
  ) {
    super(agentName, role_desc, provider);
  }
}
