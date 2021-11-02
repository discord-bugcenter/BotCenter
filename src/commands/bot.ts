import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';
import { User as DBUser, Bug, Bot } from '../database';
import { EMOJIS, VERIFICATION_PERMS_ROLE } from '../utils/constants';
import { CommandInteraction, User } from 'discord.js';


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


interface InviteArguments {
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

	public async do(interaction: CommandInteraction, args: InviteArguments): Promise<void> {
		await this.bot.client.users.fetch(args.botId)
			.then(async user => {
				if (!user.bot) return this.bot.send_error(interaction, __('This is not a bot !'));

				await this.bot.send_succes(interaction, {
					title: __('Invitation of a bot :', user.tag),
					fields: [
						{ name: __('{{{0}}} Invitation for Bug Test', [EMOJIS.badge_bughunter]), value: __('[Click here to get the invitation.](https://discordapp.com/oauth2/authorize?client_id={{0}}&scope=bot+applications.commands&permissions=-1&guild_id=475478167453171737&disable_guild_select=true)', [user.id]) },
						{ name: __('{{{0}}} Invitation pour Bug Center', [EMOJIS.badge_bughunter_gold]), value: __('[Click here to get the invitation.](https://discordapp.com/oauth2/authorize?client_id={{0}}&scope=bot+applications.commands&permissions=0&guild_id=595218682670481418&disable_guild_select=true)', [user.id]) }
					],
					ephemeral: true
				});
			})
			.catch(() => this.bot.send_error(interaction, __("This bot doesn't exist.")));
	}
}


interface AddBugArguments {
	botId: string;
	description: string;
}
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

	public async do(interaction: CommandInteraction, args: AddBugArguments): Promise<void> {
		const dbBot = await Bot.findOne({ id: args.botId });
		if (!dbBot) return this.bot.send_error(interaction, __('This is not a bot, or this bot is not saved in the database yet (`/bot register`) !'));

		const user = await dbBot.user;
		if (user.pendingBugs <= 0) return this.bot.send_error(interaction, __('This user must buy more bugs, he already used all of them !'));
		user.pendingBugs -= 1;
		await user.save();

		const bug = new Bug();
		bug.description = args.description;
		bug.verificatorId = interaction.user.id;
		bug.botId = args.botId;
		await bug.save();

		const bot = await this.bot.client.users.fetch(args.botId);
		await this.bot.send_succes(interaction, {
			title: __('Bug added'),
			description: __('Bot : {{0}}\nVerificator : {{1}}\nDescription : \n{{2}}', [bot.tag, interaction.user.tag, args.description])
		});
	}
}


interface RemoveBugArguments {
	botId: string;
	bugId: number;
}
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

	public async do(interaction: CommandInteraction, args: RemoveBugArguments): Promise<void> {
		const bug = await Bug.findOne({ id: args.bugId });
		if (!bug) return this.bot.send_error(interaction, __('This bug does not exist !'));

		const user = await (await bug.bot).user;
		user.pendingBugs += 1;
		await user.save();
		await bug.remove();

		await this.bot.send_succes(interaction, {
			title: __('Bug suppression'),
			description: __('The bug has been successfully removed !')
		});
	}
}


interface RegisterArguments {
	botId: string;
	user: User;
}
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
					name: 'user',
					type: 'STRING',
					description: 'The user.',
					required: true,
				}
			]
		});
	}

	public async do(interaction: CommandInteraction, args: RegisterArguments): Promise<void> {
		let bot: User;
		try {
			bot = await this.bot.client.users.fetch(args.botId);
		} catch {
			return this.bot.send_error(interaction, __("This bot doesn't exist."));
		}
		if (!bot.bot) return this.bot.send_error(interaction, __('This is not a bot !'));

		const dbUser = await DBUser.findOne(args.user.id) as DBUser;
		if (dbUser.pendingBots <= 0) return this.bot.send_error(interaction, __('This user must buy a new bot, he already used all he had !'));

		const dbBot = new Bot();
		dbBot.id = args.botId;

		dbUser.bots.push(dbBot);
		await dbUser.save();

		await this.bot.send_succes(interaction, {
			title: __('Bot registered !'),
			description: __('The bot {{0}} has been successfully added to the user {{1}}', [bot.tag, args.user.tag])
		});
	}
}
