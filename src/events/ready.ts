import { Guild } from 'discord.js';
import { CustomClient } from '../client';
import { BUG_CENTER_GUILD_ID } from '../utils';

export function handleReady(bot: CustomClient): void {
	bot.logger.debug('Received Ready event');
	bot.logger.info(`Client is now identified as ${bot.client.user?.tag ?? 'N/A'}!`);

	setInterval(() => {
		const guild: Guild | undefined = bot.client.guilds.cache.get(
			BUG_CENTER_GUILD_ID,
		);

		if (!guild) return;

		const emojis: string[] = ['😁', '🤔', '😎', '👨‍💻', '👩‍🚀'];

		bot.client.user?.setPresence({
			afk: false,
			shardId: 0,
			status: 'online',
			activities: [
				{
					name: `${guild.name} and its ${guild.memberCount} members ${emojis[Math.round(Math.random() * emojis.length)]}`,
					type: 'WATCHING',
				},
			],
		});
	}, 10000);
}
