import Agent from "./Agent";
import Provider from "./Provider";

export default class User extends Agent {

  constructor(
    provider: Provider | null = null
  ) {
    super("user", "", provider);
  }
}
