import { ApplicationCommandPermissions, GuildApplicationCommandManager } from 'discord.js';
import { Logger } from 'winston';
import { CustomClient } from '.';
import { Command } from '../models';
import { BUG_CENTER_GUILD_ID, newLogger } from '../utils';


export class CommandStore {
	private readonly _commands: Map<string, Command>;
	private readonly bot: CustomClient;
	public syncSlash: boolean;
	public logger: Logger;

	public constructor(bot: CustomClient,  syncSlash: boolean, debug: boolean) {
		this._commands = new Map<string, Command>();
		this.bot = bot;
		this.syncSlash = syncSlash;
		this.logger = newLogger('command_store', debug);
	}

	private get guildCommands(): GuildApplicationCommandManager | undefined {
		return  this.bot.client.guilds.cache.get(BUG_CENTER_GUILD_ID)?.commands;
	}

	public async fetchCommands(): Promise<void> {
		await this.guildCommands?.fetch()
	}

	public getCommand(name: string): Command | undefined {
		this.logger.debug(`Trying to get command ${name}...`);

		return this._commands.get(name);
	}

	public hasCommand(name: string): boolean {
		this.logger.debug(`Checking if command ${name}...`);

		return this._commands.has(name);
	}

	public async setCommand(name: string, command: Command): Promise<Command> {
		this.logger.debug(`Setting command ${name}...`);
		
		if (this.syncSlash) {
			this.logger.debug(`Pushing command ${name} to Discord...`);
			
			await this.guildCommands?.create({
				name: command.name,
				description: command.description,
				options: command.options
			}).then(async applicationCommand => {
				const permissions: ApplicationCommandPermissions[] = []
				
				command.allowedRoles.forEach(role => permissions.push({id: role, type: 'ROLE', permission: true}))
				command.deniedRoles.forEach(role => permissions.push({id: role, type: 'ROLE', permission: false}))
				command.allowedUsers.forEach(role => permissions.push({id: role, type: 'USER', permission: true}))
				command.deniedUsers.forEach(role => permissions.push({id: role, type: 'USER', permission: false}))

				if (command.allowedRoles.length && !command.deniedRoles.length) permissions.push({id: BUG_CENTER_GUILD_ID, type: 'ROLE', permission: false})

				await this.guildCommands?.permissions.set({command: applicationCommand.id, permissions: permissions})
			})
		}

		this._commands.set(name, command);
		this.logger.debug(`Set command ${name}!`);

		return command;
	}

	public async deleteCommand(name: string): Promise<void> {
		this.logger.debug(`Deleting command ${name}...`);

		await this._commands.get(name)?.applicationCommand?.delete()
		if (this._commands.delete(name)) {
			this.logger.debug(`Deleted command ${name}!`);
		}
	}

	public async cleanCommands(): Promise<void> {
		this.guildCommands?.cache.forEach(async command => {
			if (!this.hasCommand(command.name)) {
				this.logger.debug(`Removing the command ${command.name} from Discord...`);
				await command.delete()
			}
		})
	}
}
