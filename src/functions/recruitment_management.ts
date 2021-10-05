import { ButtonInteraction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { CustomClient } from "../client";

const ADMINISTRATORS = ['341550709193441280', '638474353842978816', '263713074630885376']  // order is important

export async function initRecruitmentMessage(bot: CustomClient, message: Message): Promise<void> {
    if (!message.guild) return
    if (!((message.channel.id === '888130051994947674' || message.channel.id === '886289350130794587') && message.author.bot)) return

    const thread = await message.startThread({name: message.author.username, autoArchiveDuration: "MAX"})

    const embed = new MessageEmbed()
        .setTitle(`» Nouveau formulaire`)
    
    for (const admin_id of ADMINISTRATORS) {
        embed.addField(
            (await message.guild.members.fetch(admin_id)).user.username,
            ':grey_question:',
            true
        )
    }

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("administrators_decision_accept")
            .setLabel("Accepter")
            .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
            .setCustomId("administrators_decision_refuse")
            .setLabel("Refuser")
            .setStyle("DANGER")
        )

    await thread.send({embeds: [embed], components: [row]})
}

export async function handleAdministratorVote(bot: CustomClient, interaction: ButtonInteraction): Promise<void> {
    if (interaction.customId !== 'administrators_decision_accept' && interaction.customId !== 'administrators_decision_refuse') return
    
    const adminIndex = ADMINISTRATORS.indexOf(interaction.user.id)
    if (adminIndex < 0) return

    const embed = interaction.message.embeds[0] instanceof MessageEmbed ? new MessageEmbed(interaction.message.embeds[0]) : undefined
    if (!embed || !embed.fields) return

    if (interaction.customId == 'administrators_decision_accept') embed.fields[adminIndex].value = '✅'
    if (interaction.customId == 'administrators_decision_refuse') embed.fields[adminIndex].value = '❌'

    await interaction.update({embeds: [embed]})
}