import { Client, VoiceState, Interaction, GuildMember } from 'discord.js';
import { Logger } from 'winston';
import { Connection } from 'typeorm';
import { CommandStore } from './index';
import { BUG_CENTER_GUILD_ID, EN_ROLE_ID, FR_ROLE_ID, newLogger, i18n } from '../utils/index';
import { handleInteractionCreate, handleReady, handleVoiceStateUpdate, handleGuildMemberAdd } from '../events/index';
import { GrandParentCommandExemple } from '../commands/index';
import { connection, User as DBUser } from '../database/index';

export class CustomClient {
	public client: Client;
	public logger: Logger;
	public store: CommandStore;
	public debug: boolean;
	public db: Connection;

	public constructor(public readonly token: string, syncSlash: boolean, debug: boolean) {
		this.logger = newLogger('bot', debug);
		this.store = new CommandStore(this, syncSlash, debug);
		this.debug = debug;
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

	public getLocale(member: GuildMember): 'fr' | 'en' {
		if (member.roles.cache.get(FR_ROLE_ID)) return 'fr'
		if (member.roles.cache.get(EN_ROLE_ID)) return 'en'
		return 'fr'
	}

	public setLocale(member: GuildMember): void {
		i18n.setLocale(this.getLocale(member))
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

		this.client.on('guildMemberAdd', async (member: GuildMember) => {
			await handleGuildMemberAdd(this, member);
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


		this.logger.debug('Syncronize database with the guild...')
		
		const rawResult = await this.db.manager.createQueryBuilder(DBUser, 'user')
			.select('user.id')
			.getRawMany()
		const dbUsersIds = rawResult.map(obj => obj['user_id'])

		await this.client.guilds.cache.get(BUG_CENTER_GUILD_ID)?.members.fetch().then(members => {
			const notSavedUsers = members.filter(member => !dbUsersIds.includes(member.id))

			const usersToSave = notSavedUsers.map(member => {
				const notSavedUser = new DBUser();
				notSavedUser.id = member.id;
				return notSavedUser;
			})
			this.db.getRepository(DBUser).save(usersToSave)
			
			this.logger.debug(`${usersToSave.length} users saved in the database.`)
		})

	}
}
