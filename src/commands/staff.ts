import { User } from 'discord.js';

import { CustomClient } from '../client/index';
import { Command } from '../models/index';
import { ADMINISTRATION_PERMS_ROLE, MODERATION_PERMS_ROLE, __ } from '../utils/index';


interface Arguments {
    user: User;
    reason?: string;
    deleteDuration: number;
}
export class Ban extends Command {
    public constructor(bot: CustomClient) {
        super(bot, {
            name: 'ban',
            description: 'Ban a user from the server.',
            allowedRoles: [MODERATION_PERMS_ROLE, ADMINISTRATION_PERMS_ROLE],
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user you want to ban.',
                    required: true,
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'The reason why you want to ban him/her/it.',
                    required: false,
                },
                {
                    name: 'delete-duration',
                    type: 'INTEGER',
                    description: 'The age of the messages you want to delete.',
                    choices: [
                        {name: "0 days", value: 0},
                        {name: "1 day", value: 1},
                        {name: "7 days", value: 7}
                    ],
                    default: 0,
                    required: false,
                },
            ]
        });
    }

    // public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


interface Arguments {
    user: User;
    reason?: string;
}
export class Kick extends Command {
    public constructor(bot: CustomClient) {
        super(bot, {
            name: 'kick',
            description: 'kick a user from the server.',
            allowedRoles: [MODERATION_PERMS_ROLE, ADMINISTRATION_PERMS_ROLE],
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user you want to kick.',
                    required: true,
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'The reason why you want to kick him/her/it.',
                    required: false,
                }
            ]
        });
    }
    
    // public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


interface Arguments {
    user: User;
}
export class CheckUp extends Command {
    public constructor(bot: CustomClient) {
        super(bot, {
            name: 'checkup',
            description: 'Check the "criminal record" of a user.',
            allowedRoles: [MODERATION_PERMS_ROLE, ADMINISTRATION_PERMS_ROLE],
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user you want to checkup.',
                    required: true,
                }
            ]
        });
    }

    // public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


interface Arguments {
    user: User;
    reason?: string;
    muteDuration: string;
}
export class Mute extends Command {
    public constructor(bot: CustomClient) {
        super(bot, {
            name: 'mute',
            description: 'Mute a user.',
            allowedRoles: [MODERATION_PERMS_ROLE, ADMINISTRATION_PERMS_ROLE],
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user you want to mute.',
                    required: true,
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'The why you want to mute this person.',
                    required: false,
                },
                {
                    name: 'duration',
                    type: 'STRING',
                    description: 'The duration of the mute (formatted ..h..m..s for hour, minute, second).',
                    default: '10m',
                    required: false,
                }
            ]
        });
    }

    // public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}


interface Arguments {
    user: User;
}
export class UnMute extends Command {
    public constructor(bot: CustomClient) {
        super(bot, {
            name: 'unmute',
            description: 'Unmute a user.',
            allowedRoles: [MODERATION_PERMS_ROLE, ADMINISTRATION_PERMS_ROLE],
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user you want to unmute.',
                    required: true,
                }
            ]
        });
    }

    // public async do(interaction: CommandInteraction, args: Arguments): Promise<void> {}
}
