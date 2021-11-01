// import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';


// interface Arguments {
// 	user?: User;
// }
export class Profil extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'profil',
			description: 'Get informations about someone.',
			options: [
				{
					name: 'user',
					type: 'USER',
					description: 'The user you want get informations about.',
					required: false,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
