import Agent from "./Agent";
import Environment from "./Environment";
import Orchestrator from "./Orchestrator";

export default class Arena {
  orchestrator: Orchestrator;
  agents: Agent[];
  environmentDescription: string;

  constructor(
    agents: Agent[],
    environmentDescription: string,
    orchestrator: Orchestrator,
  ) {
    this.agents = agents;
    this.environmentDescription = environmentDescription;
    this.orchestrator = orchestrator;
  }

  reset() {
    
  }

  async run (maxSteps: number = 100) {
    for (let i = 0; i < maxSteps; i++) {
      await this.orchestrator.step(
        this.agents,
        this.environmentDescription,
      );
    }
  }
}
