# Eklesia

> ⚠️ Work in progress — Nothing is published yet. Use at your own risk.  
> 📝 This README is temporary and subject to change.

Eklesia is a library for orchestrating AI agent interactions in simulated environments across any backend or local setup.

---

## Features

- **Multi-Agent Orchestration**: Easily manage multiple AI agents in the same environment.  
- **Simulated Environments**: Build or plug in different environments (chat, games, arenas…).  
- **Backend Agnostic**: Works with Elysia, Next.js, local setups, or any transport layer.  
- **Extensible**: Add new agents, environments, or interaction patterns effortlessly.  

---

## Installation

> Currently not published to NPM. Clone the repo and use locally:

```bash
git clone https://github.com/Leopc1977/eklesia.git
cd eklesia
bun install
```

---

### Quick Start 

```js
import * as eklesia from 'eklesia';
```

---

### Examples

- Chat Arena: Multi-agent conversation simulation.

- Game Arena: Turn-based or real-time interactions between agents.

- Custom Environments: Plug your own environment logic with ease.

---

### Contributing

Pull requests are welcome! Feel free to open issues for bugs, feature requests, or questions.

---

### Authors

- **Leopc1977** – *Initial work* – [GitHub](https://github.com/Leopc1977) – Discord: [Leopc1977](https://discordapp.com/users/399631094514843669)

---

### Acknowledgments

- Inspired by:
  - [ChatArena](https://github.com/Farama-Foundation/chatarena) by [Farama Foundation](https://github.com/Farama-Foundation)
  - [House](https://github.com/sausheong/house) by [sausheong](https://github.com/sausheong)
  - [game_arena](https://github.com/google-deepmind/game_arena) by [Google DeepMind](https://github.com/google-deepmind)

- Special thanks to the AI & dev communities for ideas and feedback.

---

### License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
