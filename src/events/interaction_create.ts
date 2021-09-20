import { ButtonInteraction, CommandInteraction, Interaction } from 'discord.js';
import { CustomClient } from '../client';
import { verificationSystem } from '../functions/verification_system'; 


export async function handleInteractionCreate(bot: CustomClient, interaction: Interaction): Promise<void> {
	bot.logger.debug('Received InteractionCreate event');

	if (interaction instanceof ButtonInteraction) {
		await verificationSystem(bot, interaction);
	}

	if (interaction instanceof CommandInteraction) {
		if(!bot.store.getCommand(interaction.commandName)) return
		
		try {
			await bot.store.getCommand(interaction.commandName)?.do(interaction)
		} catch (error) {
			bot.logger.error(error);
			interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
		}
	}

	
}
