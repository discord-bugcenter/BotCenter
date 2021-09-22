import { CommandInteraction } from "discord.js";
import { CustomClient } from "../../client";
import { Command } from "../../models";


interface Arguments {
    text: string;
    optional: number;
}

export class Exemple extends Command {
    constructor(bot: CustomClient) {
        super(bot, {
            name: 'exemple',
            description: "Cette commande est une commande d'exemple.",
            options: [
                {
                    name: 'texte',
                    type: 'STRING',
                    description: 'Ceci est un exemple.',
                    required: true,
                    internalReference: 'text'
                },
                {
                    name: 'optional',
                    type: 'NUMBER',
                    description: "Cet argument n'est pas obligatoire",
                    required: false,
                    default: 1
                }
            ],
            allowedRoles: ['595219959060103198']
        })

    }

    async do(interaction: CommandInteraction, args: Arguments): Promise<void> {
        await interaction.reply(args.text.repeat(args.optional))
    }
    
}
