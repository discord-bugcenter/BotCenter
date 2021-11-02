import { Client, VoiceState, Interaction, GuildMember, Message, MessageComponentInteraction, BaseCommandInteraction, MessageEmbed, EmbedFieldData, ColorResolvable } from 'discord.js';
import { Logger } from 'winston';
import { Connection } from 'typeorm';
import { CommandStore } from './index';
import { BUG_CENTER_GUILD_ID, EN_ROLE_ID, FR_ROLE_ID, EMOJIS, newLogger, i18n, __ } from '../utils/index';
import { handleInteractionCreate, handleReady, handleVoiceStateUpdate, handleGuildMemberAdd, handleMessageCreate } from '../events/index';
import * as commands from '../commands/index';
import { connection, User as DBUser } from '../database/index';

interface MessageOptions {
	title: string;
	description?: string;
	fields?: EmbedFieldData[] | EmbedFieldData[][];
	footer?: string;
	timestamp?: number | Date;
	color?: ColorResolvable;
	ephemeral?: boolean;
}

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
		if (member.roles.cache.get(FR_ROLE_ID)) return 'fr';
		if (member.roles.cache.get(EN_ROLE_ID)) return 'en';
		return 'fr';
	}

	public setLocale(member: GuildMember): void {
		i18n.setLocale(this.getLocale(member));
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

		this.client.on('messageCreate', async (message: Message) => {
			await handleMessageCreate(this, message);
		});
		this.logger.debug('Registered event: "Message Create"!');

		this.client.on('guildMemberAdd', async (member: GuildMember) => {
			await handleGuildMemberAdd(this, member);
		});
		this.logger.debug('Registered event: "Interaction Create"!');

		// TODO: Do event handlers and register them as listeners here
	}

	private async _registerCommands(): Promise<void> {
		this.logger.debug('Registering commands...');

		const allCommands = [
			commands.Ban,
			commands.BotCommand,
			commands.Bugs,
			commands.Buy,
			commands.Kick,
			commands.Manage,
			commands.Mute,
			commands.Pay,
			commands.Profil,
			commands.Suggest,
			commands.Ticket,
			commands.Top,
			commands.UnMute,
		];

		for (const commandObject of allCommands) {
			const command = new commandObject(this);
			await this.store.setCommand(command.name, command);
		}
	}

	public async connect(): Promise<void> {
		this.logger.debug('Connecting to the database...');
		await this.db.connect();
		this.logger.debug('Database connection was etablished!');


		this.logger.debug('Connecting client to the WebSocket...');
		await this.client.login(this.token).then(() => {
			this.logger.info('WebSocket connection was established!');
		});


		this.logger.debug('Syncronize database with the guild...');

		const rawResult = await this.db.manager.createQueryBuilder(DBUser, 'user')
			.select('user.id')
			.getRawMany();
		const dbUsersIds = rawResult.map(obj => obj['user_id']);

		await this.client.guilds.cache.get(BUG_CENTER_GUILD_ID)?.members.fetch().then(async members => {
			const notSavedUsers = members.filter(member => !dbUsersIds.includes(member.id));

			const usersToSave = notSavedUsers.map(member => {
				const notSavedUser = new DBUser();
				notSavedUser.id = member.id;
				return notSavedUser;
			});
			await this.db.getRepository(DBUser).save(usersToSave);

			this.logger.debug(`${usersToSave.length} users saved in the database.`);
		});
	}

	public async send_error(inter: BaseCommandInteraction | MessageComponentInteraction, message: string) {
		const embed = new MessageEmbed()
			.setColor(0x050505)
			.setAuthor(inter.user.tag, inter.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp(new Date())
			.setTitle(__('{{{0}}} Error', EMOJIS.error))
			.setURL('https://discord.gg/Drbgufc')
			.setDescription(message);

		if (this.client.user) {
			embed.setFooter(__('{{0}}, open source project', [this.client.user.tag]), this.client.user.displayAvatarURL());
		}

		await inter.reply({ embeds: [embed] });
	}


	public async send_succes(inter: BaseCommandInteraction | MessageComponentInteraction, messageOptions: MessageOptions) {
		const embed = new MessageEmbed()
			.setColor(messageOptions.color ?? 0x2f3136)
			.setAuthor(inter.user.tag, inter.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp(messageOptions.timestamp ?? new Date())
			.setURL('https://discord.gg/Drbgufc')
			.setTitle(__(messageOptions.title));

		if (this.client.user) {
			embed.setFooter(__('{{0}}, open source project', [this.client.user.tag]), this.client.user.displayAvatarURL());
		}
		if (messageOptions.footer) embed.setFooter(messageOptions.footer);

		if (messageOptions.fields) embed.setFields(...messageOptions.fields);
		if (messageOptions.description) embed.setDescription(messageOptions.description);


		await inter.reply({ embeds: [embed], ephemeral: messageOptions.ephemeral ?? false });
	}
}
