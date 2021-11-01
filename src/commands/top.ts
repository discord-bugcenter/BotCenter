import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';


// interface Arguments {
// 	leaderboard: string;
// }
export class Top extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'top',
			description: 'Get the leaderboard of something.',
			options: [
				{
					name: 'leaderboard',
					type: 'STRING',
					description: 'The leaderboard you want to see.',
					choices: [
						{ name: 'credits', value: 'credits' },
						{ name: 'donation', value: 'donation' },
						{ name: 'message', value: 'message' },
						{ name: 'reputation', value: 'reputation' }
					],
					required: true,
				}
			],
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
