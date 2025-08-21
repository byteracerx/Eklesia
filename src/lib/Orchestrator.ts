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
    players: Agent[],
    environment_description: string,
  ) {
    const nextPlayerName = this.environment.get_next_player_name();
    if (nextPlayerName === undefined) return;

    const nextPlayer = players.find(p => p.agentName === nextPlayerName);
    if (nextPlayer === undefined) return;

    const observation: Array<{
      role: string;
      content: string;
    }> = this.environment.getObservation(
      null
      // nextPlayerName
    )

    const action = await nextPlayer.act(
      observation, 
      environment_description
    );
    
    // if self.environment.check_action(action, player_name):  # action is valid
    //     timestep = self.environment.step(
    //         player_name, action
    //     )  # update the environment
    //     break
    // else:  # action is invalid
    //     logging.warning(f"{player_name} made an invalid action {action}")
    //     continue
    this.environment.add_message(nextPlayerName, action);
    this.environment.next_player_idx = (this.environment.next_player_idx + 1) % players.length;
  }
}
