import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';


export class Buy extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'buy',
			description: 'All commands to buy bugs and bots.',
			options: [new Bugs(bot), new NewBot(bot), new Credits(bot), new Infos(bot)],
		});
	}
}


// interface Arguments {
// 	amount: number;
// }
class Bugs extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'bugs',
			description: 'Buy bugs (10 credits / bug).',
			options: [
				{
					name: 'amount',
					type: 'INTEGER',
					description: 'The amount of bugs to buy (10 credits / bug).',
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	amount: number;
// }
class NewBot extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'newbot',
			description: 'Buy a new bot to make verified (100 credits / bot).',
			options: [
				{
					name: 'amount',
					type: 'INTEGER',
					description: 'The amount of bots to buy (100 credits / bot).',
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


class Credits extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'credits',
			description: 'See how to buy/get credits.',
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


class Infos extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'infos',
			description: 'See how to buy/get credits/bugs/bots.',
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
