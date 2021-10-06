import { CommandInteraction } from 'discord.js';
import { CustomClient } from '../../client/index';
import { Command } from '../../models/index';
import { __ } from '../../utils/index';


export class GrandParentCommandExemple extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'grandparent',
			description: 'Ceci est la commande grand-parente.',
			options: [new ParentCommandExemple(bot)],
			allowedRoles: ['595219959060103198']
		});
	}
}

class ParentCommandExemple extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'parent',
			description: 'Ceci est la commande parente.',
			options: [new ChildCommandExemple(bot)],
		});
	}
}

interface Arguments {
	text: string;
	optional: number;
}
class ChildCommandExemple extends Command {
	public constructor(bot: CustomClient) {
		super(bot, {
			name: 'child',
			description: 'Ceci est la commande enfant.',
			options: [
				{
					name: 'texte',
					type: 'STRING',
					description: 'Ceci est un exemple.',
					required: true,
					internalReference: 'text'
				},
				{
					'name': 'optional',
					'type': 'NUMBER',
					'description': "Cet argument n'est pas obligatoire",
					'required': false,
					'default': 1
				}
			]
		});
	}

	public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {
		await interaction.reply(__('Here is your text : {{text}}', { text: args.text.repeat(args.optional) }));
	}
}
