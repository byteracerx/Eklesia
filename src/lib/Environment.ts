import Agent from "./Agent";

export default class Environment {
    player_names: string[];
    parallel: boolean;
    moderator_visibility: string;
    moderator_period: string;
    
    next_player_idx = 0;

    constructor(
        player_names: string[],
        parallel: boolean,
        moderator_visibility: string,
        moderator_period: string,
    ) {
        this.player_names = player_names;
        this.parallel = parallel;
        this.moderator_visibility = moderator_visibility;
        this.moderator_period = moderator_period
    }

    add_message(nextPlayerName: string, action: string): void {
        // throw new Error("Method not implemented.");
    }

    get_next_player_name(): string | undefined {
        return this.player_names[this.next_player_idx];
    }

    getObservation(
        player_name: string | null = null
    ) : Array<{
        role: string;
        content: string;
      }> {
        return [];
      }
}