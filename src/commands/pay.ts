import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { __ } from '../utils/index';


interface Arguments {
    user: User;
    amount: number;
}
export class Pay extends Command {
    public constructor(bot: CustomClient) {
        super(bot, {
            name: 'pay',
            description: 'Pay an other user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user you want to pay.',
                    required: true,
                },
                {
                    name: 'amount',
                    type: 'INTEGER',
                    description: 'The amount you want to give.',
                    required: true,
                }
            ]
        });
    }

    // public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
