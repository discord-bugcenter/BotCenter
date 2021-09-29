import { ButtonInteraction, Channel, CommandInteraction, Interaction, Role, User } from 'discord.js';
import { CustomClient } from '../client';
import { verificationSystem } from '../functions/verification_system'; 
import { Command } from '../models';
import { BUG_CENTER_GUILD_ID } from '../utils';


export async function handleInteractionCreate(bot: CustomClient, interaction: Interaction): Promise<void> {
	bot.logger.debug('Received InteractionCreate event');

	const member = await bot.client.guilds.cache.get(BUG_CENTER_GUILD_ID)?.members.fetch(interaction.user.id)
	if (member) bot.setLocale(member)

	if (interaction instanceof ButtonInteraction) {
		await verificationSystem(bot, interaction);
	}

	if (interaction instanceof CommandInteraction) {
		let storedCommand = bot.store.getCommand(interaction.commandName);
		
		if (!storedCommand) return;

		const subcommandGroup = interaction.options.getSubcommandGroup()
		if (subcommandGroup) {
			storedCommand = storedCommand.subCommands?.find(option => option.name === subcommandGroup) as Command;
		}

		const subcommand = interaction.options.getSubcommand()
		if (subcommand) {
			storedCommand = storedCommand.subCommands?.find(option => option.name === subcommand) as Command;
		}
		
		try {
			const args: Record<string, string | number | boolean | Role | Channel | User | undefined> = {}

			storedCommand.extendedOptions?.forEach(option => {
				if (option instanceof Command) return
				
				const chooseStrategy: Record<string, (name: string, required?: boolean) => any> = {
					STRING: interaction.options.getString,
					INTEGER: interaction.options.getInteger,
					BOOLEAN: interaction.options.getBoolean,
					USER: interaction.options.getUser,
					CHANNEL: interaction.options.getChannel,
					ROLE: interaction.options.getRole,
					MENTIONABLE: interaction.options.getMentionable,
					NUMBER: interaction.options.getNumber
				}
				const strategy = chooseStrategy[option.type].bind(interaction.options)

				args[option.internalReference || option.name] = strategy(option.name) || option.default
			})

			await storedCommand.do(interaction, args);
		} catch (error) {
			bot.logger.error(error);
			interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
		}
	}
}
