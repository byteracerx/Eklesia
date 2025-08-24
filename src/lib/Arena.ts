import Agent from "./Agents/Agent";
import Environment from "./Environments/Environment";
import Orchestrator from "./Orchestrators/Orchestrator";

export default class Arena <
  GenericAgent extends Agent = Agent,
  GenericOrchestrator extends Orchestrator = Orchestrator,
  GenericEnvironment extends Environment = Environment
> {
  agents: Array<GenericAgent>;
  orchestrator: GenericOrchestrator;
  environment: GenericEnvironment;

  constructor(
    agents: Array<GenericAgent>,
    orchestrator: GenericOrchestrator,
    environment: GenericEnvironment,
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
