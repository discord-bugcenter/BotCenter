import { Client, VoiceState, Interaction } from 'discord.js';
import { Logger } from 'winston';
import { CommandStore } from '.';
import { handleInteractionCreate, handleReady, handleVoiceStateUpdate } from '../events';
import { newLogger } from '../utils';
import { connection } from '../database';
import { GrandParentCommandExemple } from '../commands';
import { Connection } from 'typeorm';

export class CustomClient {
	public client: Client;
	public logger: Logger;
	public store: CommandStore;
	public db: Connection;

	public constructor(public readonly token: string, syncSlash: boolean, debug: boolean) {
		this.logger = newLogger('bot', debug);
		this.store = new CommandStore(this, syncSlash, debug);
		this.db = connection;

		this.client = new Client({
			shards: 0,
			shardCount: 1,
			userAgentSuffix: ['bug center'],
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

		this._registerEvents();
	}

	private _registerEvents(): void {
		this.logger.debug('Registering events...');

		this.client.on('ready', async () => {
			await this.store.fetchCommands();
			await this._registerCommands();
			if (this.store.syncSlash) await this.store.cleanCommands();

			handleReady(this);
		});
		this.logger.debug('Registered event: "Ready"!');

		this.client.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => {
			await handleVoiceStateUpdate(this, oldState, newState);
		});
		this.logger.debug('Registered event: "Voice State Update"!');

		this.client.on('interactionCreate', async (interaction: Interaction) => {
			await handleInteractionCreate(this, interaction);
		});
		this.logger.debug('Registered event: "Interaction Create"!');

		// TODO: Do event handlers and register them as listeners here
	}

	private async _registerCommands(): Promise<void> {
		this.logger.debug('Registering commands...');

		const command = new GrandParentCommandExemple(this)
		await this.store.setCommand(command.name, command)
	}

	public async connect(): Promise<void> {
		this.logger.debug('Connecting to the database...')
		await this.db.connect();
		this.logger.debug('Database connection was etablished!')


		this.logger.debug('Connecting client to the WebSocket...');
		await this.client.login(this.token).then(() => {
			this.logger.info('WebSocket connection was established!');
		});
	}
}
