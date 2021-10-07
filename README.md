# bot-center

Source code for the **BotCenter** Discord Bot, the bot which rules **Bug Center**.

## Architecture

The Bot itself in made in [TypeScript](https://www.typescriptlang.org/) using the [Discord.js library](https://www.npmjs.com/package/discord.js).

Since we are trying to make this repository accessible by mot of our members, we decided to choose Discord.js for its simplicity and TypeScript to introduce people to the world of typed languages.

The Bot is firstly made for the **Bug Center** server but it can be ran anywhere else! You just need to config...

We are currently using [PostgreSQL](https://www.postgresql.org/) since it efficiently serves our needs.

You can start the Bot using the [docker-compose.yml](docker-compose.yml) file. Make sure to run tests against the environnement defined in the [Dockerfile](Dockerfile)!

## Contributing

First of all, thanks for contributing to the project, by fixing typos, adding features our reporting bugs!

When modifying the codebase, please make sure you respect all of the linting rules and make sure your code passes our workflows.

About TypeScript:

- we strongly discourage any use of `any`! Instead you can use `unknown`.
- Prefer `Type[]` instead of `Array<Type>`!
- Document your code! Using JSDoc *(however you don't need to include types)*.

For merge requests, issues and discussions, please make sure to add labels and / or mention the people which you think should review your code.

When contributing, make sure you respect our **Code Of Conduct** and the guidelines provided by the different global organizations *(GitHub, GitLab, Google...)* since they all includes a lit of rules everyone should respect to keep the environment as clean as possible.

## License

See [LICENSE](LICENSE.txt).
