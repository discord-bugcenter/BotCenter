import { Interaction, ButtonInteraction, MessageActionRow, MessageButton, MessageSelectMenu, Message, InteractionCollector, MessageInteraction, MessageComponentInteraction, User, Client, SelectMenuInteraction, MessageAttachment, MessageEmbed, MessageSelectOption, Snowflake, GuildMember } from 'discord.js';
import { CustomClient } from '../client';
import { BUG_CENTER_GUILD_ID } from '../utils';
import { getRandom, shuffle } from '../utils';


export async function verificationSystem(bot: CustomClient, interaction: Interaction): Promise<void> {
	bot.logger.debug('Received InteractionCreate event');
    
    if (!(interaction instanceof ButtonInteraction)) return
    if (interaction.customId !== 'verification_start') return

    const member: GuildMember | undefined = await bot.client.guilds.cache.get(BUG_CENTER_GUILD_ID)?.members.fetch(interaction.user.id);
    const customIdSuffix: string = String(new Date().getTime())  // because we can't get epheremal messages ID, the only way to differenciate 2 interactions is with the time.
    let subInteraction: null | ButtonInteraction | SelectMenuInteraction = null
    
    let selectedLanguagesValues: string[] = ['fr', 'en']
    const languageValueToRole: Record<string, Snowflake> = {
        'fr': '797581355785125889',
        'en': '797581356749946930'
    }

    const languagesSelector: MessageSelectMenu = new MessageSelectMenu()
        .setCustomId('verification_language_selector_' + customIdSuffix)
        .setMaxValues(2)
        .setMinValues(1)
        .addOptions([
            {
                label: 'Français',
                emoji: '🇫🇷',
                value: 'fr',
                default: true
            },
            {
                label: 'English',
                emoji: '🇺🇸',
                value: 'en',
                default: true
            }
        ])
    const languageValidationButton: MessageButton = new MessageButton()
        .setLabel('Valider')
        .setCustomId('verification_language_validation_' + customIdSuffix)
        .setStyle('PRIMARY')


    let selectedCaptchaValues: string[] = []
    const correctAnswer: string = getRandom(['rabbit', 'koala', 'cat', 'horse'])
    const captchaImages: Record<string, string> = {
        'rabbit': './assets/rabbit.jpg',
        'cat': './assets/cat.jpg',
        'horse': './assets/horse.jpg',
        'koala': './assets/koala.jpg'
    }

    const captchaSelector: MessageSelectMenu = new MessageSelectMenu()
        .setCustomId('verification_captcha_selector_' + customIdSuffix)
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(shuffle([
            {
                label: 'Rebbit',
                emoji: '🐇',
                value: 'rabbit'
            },
            {
                label: 'Koala',
                emoji: '🐨',
                value: 'koala'
            },
            {
                label: 'Cat',
                emoji: '🐈',
                value: 'cat'
            },
            {
                label: 'Horse',
                emoji: '🐎',
                value: 'horse'
            }
    ]))
    const captchaValidationButton: MessageButton = new MessageButton()
        .setLabel('Valider')
        .setCustomId('verification_captcha_validation_' + customIdSuffix)
        .setStyle('PRIMARY')
        .setDisabled(true)


    let selectedNotificationRolesValues: string[] = []
    const notificationRolesValuesToRole: Record<string, Snowflake> = {
        'news': '716257861402886144',
        'polls': '716257750870654978'
    }

    const notificationRolesSelector: MessageSelectMenu = new MessageSelectMenu()
        .setCustomId('verification_notification_roles_selector_' + customIdSuffix)
        .setMaxValues(2)
        .setMinValues(0)
        .addOptions(shuffle([
            {
                label: 'Polls Notifications',
                emoji: '📊',
                value: 'polls'
            },
            {
                label: 'News Notifications',
                emoji: '🔔',
                value: 'news'
            }
    ]))
    const notificationRolesValidationButton: MessageButton = new MessageButton()
        .setLabel('Valider')
        .setCustomId('verification_notification_roles_validation_' + customIdSuffix)
        .setStyle('PRIMARY')
    

    await interaction.reply({
        content: ":flag_fr: Quelle langue parlez-vous ?\n:flag_us: What language do you speak ?",
        ephemeral: true,
        components: [
            new MessageActionRow().addComponents(languagesSelector),
            new MessageActionRow().addComponents(languageValidationButton)
        ]
    })

    let select_collector: InteractionCollector<Interaction> = new InteractionCollector(bot.client, { componentType: 'SELECT_MENU', time: 300 * 1000 });
    select_collector.on('collect', async i => {
        if (i instanceof SelectMenuInteraction) {
            if (i.user.id === interaction.user.id && i.customId == 'verification_language_selector_' + customIdSuffix) {
                selectedLanguagesValues = i.values
                await i.deferUpdate()
            }
        }
    })

    let filter = (inter: ButtonInteraction) => inter.customId === 'verification_language_validation_' + customIdSuffix && inter.user.id === interaction.user.id;
    await interaction.channel?.awaitMessageComponent({filter, time: 300 * 1000}).then(async i => {
        const file = new MessageAttachment(captchaImages[correctAnswer]);

        languageValidationButton.disabled = true;

        await i.reply({
            embeds: [{
                title: 'What animal do you see on the picture ?',
                // image: `attachment://${correctAnswer}.jpg`
            }], 
            files: [file], 
            components: [
                new MessageActionRow().addComponents(captchaSelector),
                new MessageActionRow().addComponents(captchaValidationButton)
            ],
            ephemeral: true
        })
        subInteraction = i
    })
    select_collector.stop()

    select_collector = new InteractionCollector(bot.client, { componentType: 'SELECT_MENU', time: 300 * 1000 });
    select_collector.on('collect', async i => {
        if (i instanceof SelectMenuInteraction) {
            if (i.user.id === interaction.user.id && i.customId == 'verification_captcha_selector_' + customIdSuffix) {
            selectedCaptchaValues = i.values
                captchaSelector.options.forEach(option => {
                    if (option.value === selectedCaptchaValues[0]) option.default = true;
                    else option.default = false;
                })
                
                captchaValidationButton.disabled = false
                await subInteraction?.editReply({
                    components: [
                        new MessageActionRow().addComponents(captchaSelector),
                        new MessageActionRow().addComponents(captchaValidationButton)
                    ]
                })
                await i.deferUpdate()

                subInteraction = i
            }
        }
    })

    filter = (inter: ButtonInteraction) => inter.customId === 'verification_captcha_validation_' + customIdSuffix && inter.user.id === interaction.user.id;
    const validated = await interaction.channel?.awaitMessageComponent({filter, time: 300 * 1000}).then(async i => {
        if (selectedCaptchaValues[0] !== correctAnswer) {
            await member?.kick("Captcha failed !")
            return false
        } else {
            await i.reply({
                embeds: [{
                    title: 'What notifications do you want ?'
                }],
                components: [
                    new MessageActionRow().addComponents(notificationRolesSelector),
                    new MessageActionRow().addComponents(notificationRolesValidationButton)
                ],
                ephemeral: true
            })
            return true
        }
    })
    select_collector.stop()
    

    if (!validated) return


    select_collector = new InteractionCollector(bot.client, { componentType: 'SELECT_MENU', time: 300 * 1000 });
    select_collector.on('collect', async i => {
        if (i instanceof SelectMenuInteraction) {
            if (i.user.id === interaction.user.id && i.customId === 'verification_notification_roles_selector_' + customIdSuffix) {
                selectedNotificationRolesValues = i.values
                await i.deferUpdate()
            }
        }
    })

    filter = (inter: ButtonInteraction) => inter.customId === 'verification_notification_roles_validation_' + customIdSuffix && inter.user.id === interaction.user.id;
    await interaction.channel?.awaitMessageComponent({filter, time: 300 * 1000}).then(async i => {
        await i.deferUpdate()
    })
    select_collector.stop();


    const rolesToAdd: Snowflake[] = [];
    selectedLanguagesValues.forEach(value => rolesToAdd.push(languageValueToRole[value]))
    selectedNotificationRolesValues.forEach(value => rolesToAdd.push(notificationRolesValuesToRole[value]))

    await member?.roles.add(rolesToAdd)

}
