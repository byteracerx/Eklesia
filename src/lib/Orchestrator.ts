import Agent from "./Agent";
import Environment from "./Environment";

export default class Orchestrator {
  environment: Environment;

  constructor(
    environment: Environment,
  ) {
    this.environment = environment;
  }

  async step(
    agents: Agent[],
    environment_description: string,
  ) {
    const nextagentName = this.environment.get_next_agent_name();
    if (nextagentName === undefined) return;

    const nextagent = agents.find(p => p.agentName === nextagentName);
    if (nextagent === undefined) return;

    const observation: Array<{
      role: string;
      content: string;
    }> = this.environment.getObservation(
      null
      // nextagentName
    )

    const action = await nextagent.act(
      observation, 
      environment_description
    );
    
    // if self.environment.check_action(action, agent_name):  # action is valid
    //     timestep = self.environment.step(
    //         agent_name, action
    //     )  # update the environment
    //     break
    // else:  # action is invalid
    //     logging.warning(f"{agent_name} made an invalid action {action}")
    //     continue
    this.environment.add_message(nextagentName, action);
    this.environment.next_agent_idx = (this.environment.next_agent_idx + 1) % agents.length;
  }
}
