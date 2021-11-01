import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';


interface Arguments {
    suggestion: string;
}
export class Suggest extends Command {
    public constructor(bot: CustomClient) {
        super(bot, {
            name: 'suggest',
            description: 'Give a suggestion for the server.',
            options: [
                {
                    name: 'suggestion',
                    type: 'STRING',
                    description: 'The suggestion.',
                    required: true,
                }
            ]
        });
    }

    // public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
