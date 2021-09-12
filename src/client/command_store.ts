import { Logger } from 'winston';
import { Command } from '../models';
import { newLogger } from '../utils';

export class CommandStore {
	private readonly _commands: Map<string, Command>;
	public logger: Logger;

	public constructor(debug: boolean) {
		this._commands = new Map<string, Command>();
		this.logger = newLogger('command_store', debug);
	}

	public getCommand(name: string): Command | undefined {
		this.logger.debug(`Trying to get command ${name}...`);

		return this._commands.get(name);
	}

	public hasCommand(name: string): boolean {
		this.logger.debug(`Checking if command ${name}...`);

		return this._commands.has(name);
	}

	public setCommand(name: string, command: Command): Command {
		this.logger.debug(`Setting command ${name}...`);

		this._commands.set(name, command);
		this.logger.debug(`Set command ${name}!`);

		return command;
	}

	public deleteCommand(name: string): void {
		this.logger.debug(`Deleting command ${name}...`);

		if (this._commands.delete(name)) {
			this.logger.debug(`Deleted command ${name}!`);
		}
	}
}
