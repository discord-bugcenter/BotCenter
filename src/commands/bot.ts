// import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';
import { VERIFICATION_PERMS_ROLE } from '../utils/constants';


export class BotCommand extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'bot',
			description: 'All commands to manage bots and bugs.',
			options: [new Invite(bot), new AddBug(bot), new RemoveBug(bot), new Register(bot)],
			allowedRoles: [VERIFICATION_PERMS_ROLE]
		});
	}
}


// interface Arguments {
// 	botId: string;
// }
class Invite extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'invite',
			description: 'Get an invitation link for a bot.',
			options: [
				{
					name: 'bot_id',
					type: 'STRING',
					description: 'The bot ID.',
					required: true,
					internalReference: 'botId'
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	botId: string;
// 	description: string;
// }
class AddBug extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'addbug',
			description: 'Register a bug to a bot.',
			options: [
				{
					name: 'bot_id',
					type: 'STRING',
					description: 'The bot ID.',
					required: true,
					internalReference: 'botId'
				},
				{
					name: 'description',
					type: 'STRING',
					description: 'The bug description.',
					required: true
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	botId: string;
// 	bugId: number;
// }
class RemoveBug extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'removebug',
			description: 'Remove a bug from a bot.',
			options: [
				{
					name: 'bot_id',
					type: 'STRING',
					description: 'The bot ID.',
					required: true,
					internalReference: 'botId'
				},
				{
					name: 'bug_id',
					type: 'INTEGER',
					description: 'The bug id.',
					required: true,
					internalReference: 'bugId'
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	botId: string;
// 	userId: User;
// }
class Register extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'register',
			description: 'Save a new bot to the database.',
			options: [
				{
					name: 'bot_id',
					type: 'STRING',
					description: 'The bot ID.',
					required: true,
					internalReference: 'botId'
				},
				{
					name: 'user_id',
					type: 'STRING',
					description: 'The user id.',
					required: true,
					internalReference: 'userId'
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
