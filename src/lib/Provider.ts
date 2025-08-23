import Message from "./types/Message";

export default class Provider {

    constructor() {}

    async query(messages: Array<Message>, temperature: number) {};  
}
