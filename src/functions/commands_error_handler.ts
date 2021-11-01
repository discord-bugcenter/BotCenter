import { CommandInteraction } from 'discord.js';
import { CustomClient } from '../client/index';
import { __ } from '../utils';


export async function applicationCommandsError(bot: CustomClient, interaction: CommandInteraction, error: Error | unknown): Promise<void> {
	bot.logger.error(error);
	await interaction.reply({ content: __('There was an error while executing this command'), ephemeral: true });
}
