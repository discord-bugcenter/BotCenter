// import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';


export class Ticket extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'ticket',
			description: 'All commands to manage tickets.',
			options: [new Move(bot), new Add(bot), new Remove(bot), new Close(bot), new TicketMessage(bot)],
		});
	}
}


// interface Arguments {
// 	user: User;
// }
class Add extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'add',
			description: 'Add a user/bot to a ticket.',
			options: [
				{
					name: 'user',
					type: 'USER',
					description: 'The user to add to the ticket.',
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	user: User;
// }
class Remove extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'remove',
			description: 'Remove a user/bot from a ticket.',
			options: [
				{
					name: 'user',
					type: 'USER',
					description: 'The user to remove from the ticket.',
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	category: string;
// }
class Move extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'move',
			description: 'Move a ticket to an other category.',
			options: [
				{
					name: 'category',
					description: 'The category to move the ticket where.',
					type: 'STRING',
					choices: [
						{
							name: 'Don',
							value: 'donation'
						}
					],
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


class Close extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'close',
			description: 'Close a ticket.',
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	type: string;
// }
class TicketMessage extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'message',
			description: 'Send a preselected message from a list.',
			options: [
				{
					name: 'type',
					description: 'The message type to send.',
					type: 'STRING',
					choices: [
						{
							name: 'Prepa',
							value: 'preparation'
						},
						{
							name: 'End',
							value: 'ending'
						}
					],
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
