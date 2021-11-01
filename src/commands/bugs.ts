import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';


interface Arguments {
    botId: string;
}
export class Bugs extends Command {
    public constructor(bot: CustomClient) {
        super(bot, {
            name: 'bugs',
            description: 'Get the bugs list of your bot.',
            options: [
                {
                    name: 'bot_id',
                    type: 'STRING',
                    description: 'The user you want get informations about.',
                    required: false,
                    internalReference: 'botId'
                }
            ]
        });
    }

    // public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
