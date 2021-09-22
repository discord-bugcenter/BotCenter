import { ButtonInteraction, Channel, CommandInteraction, Interaction, Role, User } from 'discord.js';
import { CustomClient } from '../client';
import { verificationSystem } from '../functions/verification_system'; 


export async function handleInteractionCreate(bot: CustomClient, interaction: Interaction): Promise<void> {
	bot.logger.debug('Received InteractionCreate event');

	if (interaction instanceof ButtonInteraction) {
		await verificationSystem(bot, interaction);
	}

	if (interaction instanceof CommandInteraction) {
		const storedCommand = bot.store.getCommand(interaction.commandName);

		if(!storedCommand) return;
		
		try {
			const args: Record<string, string | number | boolean | Role | Channel | User | undefined> = {}

			storedCommand.options.forEach(option => {
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

			await bot.store.getCommand(interaction.commandName)?.do(interaction, args);
		} finally {}
	}
}
