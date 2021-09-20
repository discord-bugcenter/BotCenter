import { Interaction } from 'discord.js';
import { CustomClient } from '../client';
import { verificationSystem } from '../functions/verification_system'; 


export async function handleInteractionCreate(bot: CustomClient, interaction: Interaction): Promise<void> {
	bot.logger.debug('Received InteractionCreate event');

	await verificationSystem(bot, interaction);
}
