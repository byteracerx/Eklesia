import Agent from "../Agents/Agent";
import { ConversationEnvironment } from "../Environments";
import Orchestrator from "./Orchestrator";

export default class ConversationOrchestrator extends Orchestrator<ConversationEnvironment> {
  constructor(
    environment: ConversationEnvironment,
  ) {
    super(environment)
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

    const action = await currentAgent.act(
      observation, 
      this.environment.description
    );
    
    // if self.environment.check_action(action, agent_name):  # action is valid
    //     timestep = self.environment.step(
    //         agent_name, action
    //     )  # update the environment
    //     break
    // else:  # action is invalid
    //     logging.warning(f"{agent_name} made an invalid action {action}")
    //     continue

    this.environment.addMessage(currentAgent.agentName, action);
    this.currentAgentIndex = (this.currentAgentIndex + 1) % agents.length;
  }
}
