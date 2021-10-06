import { VoiceState } from 'discord.js';
import { CustomClient } from '../client';


export async function handleVoiceStateUpdate(bot: CustomClient, oldState: VoiceState, newState: VoiceState): Promise<void> {
	bot.logger.debug('Received Voice State Update event');

	// TODO(n1c00o): do the create your channel feature
	await oldState;
	await newState;
}
