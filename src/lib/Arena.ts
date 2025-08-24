import Agent from "./Agents/Agent";
import Environment from "./Environments/Environment";
import Orchestrator from "./Orchestrators/Orchestrator";

export default class Arena {
  orchestrator: Orchestrator;
  agents: Array<Agent>;
  environment: Environment;

  constructor(
    agents: Array<Agent>,
    orchestrator: Orchestrator,
    environment: Environment,
  ) {
    this.agents = agents;
    this.environment = environment;
    this.orchestrator = orchestrator;
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
