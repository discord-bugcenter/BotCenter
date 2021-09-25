import { ApplicationCommand, ApplicationCommandNonOptionsData, ApplicationCommandOption, ApplicationCommandSubCommandData, Channel, CommandInteraction, Role, Snowflake, User } from 'discord.js';
import { Logger } from 'winston';
import { CustomClient } from '../client';
import { BUG_CENTER_GUILD_ID } from '../utils';

export type ExtendedApplicationCommandOption = ApplicationCommandOption & {
	default?: string | number | boolean | Role | Channel | User;
	internalReference?: string;
}

interface CommandParameters {
	name: string;
	description: string;
	options?: ExtendedApplicationCommandOption[] | Command[]; 
	allowedRoles?: Snowflake[];
	deniedRoles?: Snowflake[];
	allowedUsers?: Snowflake[];
	deniedUsers?: Snowflake[];
}

export abstract class Command {
	readonly name: string;
	readonly description: string;
	private readonly _options: ExtendedApplicationCommandOption[] | Command[] = [];

	readonly allowedRoles: Snowflake[] = [];
	readonly deniedRoles: Snowflake[] = [];
	readonly allowedUsers: Snowflake[] = [];
	readonly deniedUsers: Snowflake[] = [];

	readonly logger: Logger;
	readonly bot: CustomClient;

	constructor (bot: CustomClient, parameters: CommandParameters) {
		this.name = parameters.name;
		this.description = parameters.description;

		if (parameters.options) this._options = parameters.options;
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
		return this.bot.client.guilds.cache.get(BUG_CENTER_GUILD_ID)?.commands.cache.filter(cmd => cmd.name === this.name).first();
	};

	get options(): ApplicationCommandOption[] {
		function transformOptions(options: ExtendedApplicationCommandOption[] | Command[]): ApplicationCommandOption[] {
			let transformedOptions: ApplicationCommandOption[] = []
			
			for (const option of options) {
				if (option instanceof Command) {
					if (option._options[0] instanceof Command) {
						transformedOptions.push({
							type: 'SUB_COMMAND_GROUP',
							name: option.name,
							description: option.description,
							options: transformOptions(option._options) as ApplicationCommandSubCommandData[] & ApplicationCommandOption[]
						})
					} else {
						transformedOptions.push({
							type: 'SUB_COMMAND',
							name: option.name,
							description: option.description,
							options: transformOptions(option._options) as ApplicationCommandNonOptionsData[] & ApplicationCommandOption[]
						})
					}

				} else {
					transformedOptions.push(option);
				}
			}
			return transformedOptions;
		}
		return transformOptions(this._options);
	}

	get subCommands(): Command[] | undefined {
		if (this._options[0] instanceof Command) {
			return this._options as Command[];
		} else {
			return undefined;
		}
	}

	get extendedOptions(): ExtendedApplicationCommandOption[] | undefined {
		if (!(this._options[0] instanceof Command)) {
			return this._options as ExtendedApplicationCommandOption[]
		} else {
			return undefined;
		}
		
	}
}

