import { ApplicationCommand, ApplicationCommandOption, Channel, CommandInteraction, Role, Snowflake, User } from 'discord.js';
import { Logger } from 'winston';
import { CustomClient } from '../client';
import { BUG_CENTER_GUILD_ID } from '../utils';

type ExtendedApplicationCommandOption = ApplicationCommandOption & {
	default?: string | number | boolean | Role | Channel | User;
	internalReference?: string;
}

interface CommandParameters {
	name: string;
	description: string;
	options?: ExtendedApplicationCommandOption[]; 
	allowedRoles?: Snowflake[];
	deniedRoles?: Snowflake[];
	allowedUsers?: Snowflake[];
	deniedUsers?: Snowflake[];
}

export abstract class Command {
	readonly name: string;
	readonly description: string;
	readonly options: ExtendedApplicationCommandOption[] = [];

	readonly allowedRoles: Snowflake[] = [];
	readonly deniedRoles: Snowflake[] = [];
	readonly allowedUsers: Snowflake[] = [];
	readonly deniedUsers: Snowflake[] = [];

	readonly logger: Logger;
	readonly bot: CustomClient;

	constructor (bot: CustomClient, parameters: CommandParameters) {
		this.name = parameters.name;
		this.description = parameters.description;

		if (parameters.options) this.options = parameters.options;
		if (parameters.allowedRoles) this.allowedRoles = parameters.allowedRoles;
		if (parameters.deniedRoles) this.deniedRoles = parameters.deniedRoles;
		if (parameters.allowedUsers) this.allowedUsers = parameters.allowedUsers;
		if (parameters.deniedUsers) this.deniedUsers = parameters.deniedUsers;

		this.logger = bot.logger;
		this.bot = bot;
	}

	/**
   * Action to do when a Command Interaction is used
   * @param interaction The CommandInteraction
   */
	async do(interaction: CommandInteraction, args: object): Promise<void> {
		await interaction.reply("This command has not been implemented yet.")
	};

	get applicationCommand(): ApplicationCommand | undefined {
		return this.bot.client.guilds.cache.get(BUG_CENTER_GUILD_ID)?.commands.cache.filter(cmd => cmd.name == this.name).first();
	};
}
