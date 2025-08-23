import Provider from "./Provider";

export default class TerminalInputProvider extends Provider {
    constructor() {
        super();
    }

    async query(_messages: Array<{ role: string; content: string }>, _temperature: number): Promise<any> {
        const input = prompt("Human: ");

        return {
            choices: [
                {
                    message: {
                        role: "user",
                        content: input
                    }
                }
            ]
        };
    }
}