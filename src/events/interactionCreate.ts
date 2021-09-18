import { CustomClient, CommandStore } from '../client';

export function handleInteractionCreate(bot: CustomClient, commands: CommandStore): void {
	const client = bot.client

	client.on('interactionCreate', (interaction) => {
		
		if(!interaction.isCommand()) return
		if(!commands.getCommand(interaction.commandName)) return
		
		try {
			commands.getCommand(interaction.commandName)?.do(interaction)
		} catch (error) {
			console.error(error);
			 interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
		}

	})
}