import Provider from "./Provider";

export default class LocalProvider extends Provider {

  endpointUrl: string;
  model: string;

    constructor(model:string, endpointUrl: string) {
        super();

        this.model = model;
        this.endpointUrl = endpointUrl;
    }

    async query(messages: Array<{ role: string; content: string }>, temperature: number): Promise<any> {
        const res = await fetch(this.endpointUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: this.model,
            temperature: temperature,
            messages: messages,
          })
        });
      
        const data = await res.json();
        return data;
    }
}
