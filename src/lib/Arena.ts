import Agent from "./Agents/Agent";
import Environment from "./Environments/Environment";
import Orchestrator from "./Orchestrators/Orchestrator";

export default class Arena {
  agents: Array<Agent>;
  orchestrator: Orchestrator;
  environment: Environment;

  constructor(
    agents: Array<Agent>,
    orchestrator: Orchestrator,
    environment: Environment,
  ) {
    this.agents = agents;
    this.orchestrator = orchestrator;
    this.environment = environment;
  }

  reset() {
    
  }

  async run (maxSteps: number = 100) {
    for (let i = 0; i < maxSteps; i++) {
      await this.orchestrator.step(
        this.agents,
      );
    }
  }
}
