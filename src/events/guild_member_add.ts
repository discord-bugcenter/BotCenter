import { GuildMember } from 'discord.js';
import { CustomClient } from '../client';
import { User as DBUser } from '../database/index';


export async function handleGuildMemberAdd(bot: CustomClient, member: GuildMember): Promise<void> {
	bot.logger.debug('Received Guild Member Add event');

    if (!await DBUser.find({id: member.id})) {
        const dbUser = new DBUser();
        dbUser.id = member.id;
        await dbUser.save()
    }
}
