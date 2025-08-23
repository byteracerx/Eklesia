import Agent from "./Agent";

export default class Environment {
    agent_names: string[];

    next_agent_idx = 0;

    constructor(
        agent_names: string[],
    ) {
        this.agent_names = agent_names;
    }

    add_message(nextagentName: string, action: string): void {
        // throw new Error("Method not implemented.");
    }

    get_next_agent_name(): string | undefined {
        return this.agent_names[this.next_agent_idx];
    }

    getObservation(
        agent_name: string | null = null
    ) : Array<{
        role: string;
        content: string;
      }> {
        return [];
      }
}
