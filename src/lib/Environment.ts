import Agent from "./Agent";
import Message from "./types/Message";

export default class Environment {
    agentNames: string[];

    nextAgentIdx = 0;

    constructor(
        agentNames: string[],
    ) {
        this.agentNames = agentNames;
    }

    addMessage(nextAgentName: string, action: string): void {
        // throw new Error("Method not implemented.");
    }

    getNextAgentName(): string | undefined {
        return this.agentNames[this.nextAgentIdx];
    }

    getObservation(
        agentName: string | null = null
    ) : Array<Message> {
        return [];
      }
}
