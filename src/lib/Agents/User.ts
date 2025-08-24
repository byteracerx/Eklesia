import Agent from "./Agent";
import Provider from "../Providers";

export default class User extends Agent {
  constructor(
    provider: Provider,
  ) {
    super("user", "", provider);
  }
}
