import Agent from "./Agent";
import Environment from "./Environment";
import Orchestrator from "./Orchestrator";

export default class Arena {
  orchestrator: Orchestrator;
  players: Agent[];
  environment_description: string;

  constructor(
    players: Agent[],
    environment_description: string,
    orchestrator: Orchestrator,
  ) {
    this.players = players;
    this.environment_description = environment_description;
    this.orchestrator = orchestrator;
  }

  reset() {
    
  }

  async run (max_steps: number = 100) {
    for (let i = 0; i < max_steps; i++) {
      await this.orchestrator.step(
        this.players,
        this.environment_description,
      );
    }
  }
}
