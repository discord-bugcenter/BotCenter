import { CommandInteraction } from 'discord.js';
import { CustomClient } from '../client/index';
import { Bot } from '../database';
import { Command } from '../models/index';
import { ADMINISTRATION_PERMS_ROLE, VERIFICATION_PERMS_ROLE, __ } from '../utils/index';


interface Arguments {
	botId?: string;
}
export class Bugs extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'bugs',
			description: 'Get the bugs list of your bot.',
			options: [
				{
					name: 'bot_id',
					type: 'STRING',
					description: 'The user you want get informations about.',
					required: false,
					internalReference: 'botId'
				}
			]
		});
	}

	public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {
		if (!interaction.guild) return;

		// TODO : if the botId argument has not been given, make a message with a dropdown and the list of bots of the user.

		const dbBot = await Bot.findOne({ id: args.botId });
		if (!dbBot) return this.bot.send_error(interaction, __('This is not a bot, or this bot is not saved in the database yet (`/bot register`) !'));
		const bot = await this.bot.client.users.fetch(dbBot.id);

		const member = await interaction.guild.members.fetch(interaction.user.id);
		if (!(dbBot.userId === interaction.user.id) && !member.roles.cache.map(r => (VERIFICATION_PERMS_ROLE + ADMINISTRATION_PERMS_ROLE).includes(r.id)).length) return this.bot.send_error(interaction, __('You are not allowed to see this bugs.'));

		await this.bot.send_succes(interaction, {
			title: __('Bugs of the bot : {{0}}', [bot.tag]),
			description: (await dbBot.bugs).map(b => `(\`${b.id}\`) ${b.description} | <@${b.verificatorId}>`).join('\n'),
			ephemeral: true
		});
	}
}
