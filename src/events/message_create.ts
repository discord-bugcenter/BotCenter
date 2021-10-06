import { Message } from 'discord.js';
import { CustomClient } from '../client';
import { initRecruitmentMessage } from '../functions/recruitment_management';


export async function handleMessageCreate(bot: CustomClient, message: Message): Promise<void> {
	bot.logger.debug('Received MessageCreate event');

	if (message.author.id === bot.client.user?.id) return;

	await initRecruitmentMessage(bot, message);
}
