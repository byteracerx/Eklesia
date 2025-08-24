import ChatCompletionResponse from "../types/ChatCompletionResponse";
import Message from "../types/Message";

const DEFAULT_TEMPERATURE = 0.7

export default class Provider {
    temperature: number;

    constructor(temperature: number = DEFAULT_TEMPERATURE) {
        this.temperature = temperature;
    }

    async query(messages: Array<Message>, _temperature: number = this.temperature
    ) : Promise<ChatCompletionResponse> {
        throw new Error("Method not implemented.");
    };  
}
