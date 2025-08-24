import Agent from "../Agents/Agent";
import Environment from "../Environments/Environment";

export default class Orchestrator<
  GenericEnvironment extends Environment = Environment
> {
  protected currentAgentIndex: number = 0;
  environment: GenericEnvironment;

  constructor(
    environment: GenericEnvironment,
  ) {
    this.environment = environment;
  }

  async step(
    agents: Array<Agent>,
  ) {
    if (agents.length === 0) return;

    const currentAgent = agents[this.currentAgentIndex];
    const observation = this.environment.getObservation(
      // currentAgent.agentName
      null,
    );

    if (!observation || !currentAgent) return;

    const _action = await currentAgent.act(
      observation, 
      this.environment.description
    );

    this.currentAgentIndex = (this.currentAgentIndex + 1) % agents.length;
  }
}
