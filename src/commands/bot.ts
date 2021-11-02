// import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';
import { EMOJIS, VERIFICATION_PERMS_ROLE } from '../utils/constants';
import { CommandInteraction, MessageEmbed } from 'discord.js';


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


interface Arguments {
	botId: string;
}
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

	public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {
		await this.bot.client.users.fetch(args.botId)
			.then(async user => {
				if (!user.bot) return this.bot.send_error(interaction, __('This is not a bot !'));

				await this.bot.send_succes(interaction, {
					title: __('Invitation of a bot :', user.tag),
					fields: [
						{ name: __('{0} Invitation for Bug Test', EMOJIS.badge_bughunter), value: __('[Click here to get the invitation.](https://discordapp.com/oauth2/authorize?client_id={0}&scope=bot+applications.commands&permissions=-1&guild_id=475478167453171737&disable_guild_select=true)', user.id) },
						{ name: __('{0} Invitation pour Bug Center', EMOJIS.badge_bughunter_gold), value: __('[Click here to get the invitation.](https://discordapp.com/oauth2/authorize?client_id={0}&scope=bot+applications.commands&permissions=0&guild_id=595218682670481418&disable_guild_select=true)', user.id) }
					],
					ephemeral: true
				});
			})
			.catch(() => this.bot.send_error(interaction, __("This bot doesn't exist.")));
	}
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
