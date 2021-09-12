import { Client } from 'discord.js';
import { Logger } from 'winston';
import { CommandStore } from '.';
import { newLogger } from '../utils';

export class CustomClient {
	public client: Client;
	public logger: Logger;
	public store: CommandStore;

	public constructor(public readonly token: string, debug: boolean) {
		this.logger = newLogger('bot', debug);
		this.store = new CommandStore(debug);

		this.client = new Client({
			shards: 0,
			shardCount: 1,
			userAgentSuffix: ['bugcenter'],
			intents: [
				'GUILDS',
				'GUILD_MEMBERS',
				'GUILD_BANS',
				'GUILD_INTEGRATIONS', // metrics
				'GUILD_MESSAGES',
				'GUILD_MESSAGE_REACTIONS',
				'GUILD_WEBHOOKS', // metrics
				'GUILD_EMOJIS_AND_STICKERS', // metrics
				'GUILD_INVITES', // metrics
				'GUILD_VOICE_STATES',
				// "GUILD_PRESENCES"
			],
			ws: {
				large_threshold: 50,
			},
			http: {
				version: 9,
			},
		});

		// TODO - initialize events
	}

	public async connect(): Promise<void> {
		this.logger.debug('Connecting client to the WebSocket...');

		await this.client.login(this.token).then(() => {
			this.logger.info('WebSocket connection was established!');
		});
	}
}
