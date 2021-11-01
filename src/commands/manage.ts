// import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';


export class Manage extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'manage',
			description: 'All commands to manage yourself or your bot.',
			options: [new ManageBot(bot), new ManageUser(bot)],
		});
	}
}


class ManageBot extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'bot',
			description: 'Manage your bot.',
			options: [new ManageBotDescription(bot), new ManageBotSupport(bot), new ManageBotWebsite(bot), new AddBotDevelopper(bot), new RemoveBotDevelopper(bot)]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


class ManageUser extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'user',
			description: 'Manage yourself.',
			options: [new ManageUserBiography(bot)]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	description: string;
// }
class ManageBotDescription extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'description',
			description: 'Edit your bot description.',
			options: [
				{
					name: 'description',
					type: 'STRING',
					description: 'The description to set to your bot.',
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	support: string;
// }
class ManageBotSupport extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'support',
			description: 'Set your bot support server.',
			options: [
				{
					name: 'support',
					type: 'STRING',
					description: 'The support server invite of your bot.',
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	support: string;
// }
class ManageBotWebsite extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'website',
			description: 'Set your bot website.',
			options: [
				{
					name: 'website',
					type: 'STRING',
					description: "The URL of your bot's website.",
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
class AddBotDevelopper extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'add-developper',
			description: 'Add a developper to your bot.',
			options: [
				{
					name: 'user',
					type: 'USER',
					description: 'The user to add as a developper.',
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
class RemoveBotDevelopper extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'remove-developper',
			description: 'Remove a developper to your bot.',
			options: [
				{
					name: 'user',
					type: 'USER',
					description: 'The user to remove as a developper.',
					required: true,
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


// interface Arguments {
// 	description: string;
// }
class ManageUserBiography extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'biography',
			description: 'Edit your own biography.',
			options: [
				{
					name: 'biography',
					type: 'STRING',
					description: 'The biography to set for yourself.',
					required: true,
					internalReference: 'description'
				}
			]
		});
	}

	// public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
