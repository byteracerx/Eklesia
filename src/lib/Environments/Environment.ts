export default class Environment {
    description: string;

    constructor(
        description: string = "",
    ) {
        this.description = description;
    }

    getObservation(...args: any[]): any {
        throw new Error("Method not implemented.");
    }
}
