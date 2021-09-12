import { Guild } from 'discord.js';
import { CustomClient } from '../client';
import { BUG_CENTER_GUILD_ID } from '../utils';

export function handleReady(bot: CustomClient): void {
	bot.logger.info(`Client is now identified as ${bot.client.user.tag}!`);

	setInterval(() => {
		const guild: Guild | undefined = bot.client.guilds.cache.get(
			BUG_CENTER_GUILD_ID,
		);

		if (!guild) return;

		bot.client.user.setPresence({
			afk: false,
			shardId: 0,
			status: 'online',
			activities: [
				{
					name: 'Bug Center and ',
					type: 'WATCHING',
				},
			],
		});
	}, 10000);
}
