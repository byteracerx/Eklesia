import Environment from "./Environment";

export default class Conversation extends Environment {
  messages: { role: string, content: string }[] = [];
  #current_turn = 0
  next_player_idx = 0

  constructor(
    player_names: string[],
    parallel: boolean,
    moderator_visibility: string,
    moderator_period: string,
  ) {
    super(player_names, parallel, moderator_visibility, moderator_period);
  }

  add_message(player_name: string, content: string) {
    this.messages.push({ role: player_name, content: content });
  }

  print() {
    console.log(this.messages);
  }

  getObservation(
    player_name: string | null = null
  ) : Array<{
    role: string;
    content: string;
  }>{
    if (player_name === null) return this.messages;
    return this.messages.filter(m => m.role === player_name);
  }
}
