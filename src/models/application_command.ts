import { CommandInteraction } from "discord.js";
import { Logger } from "winston";

export interface ApplicationCommand {
  readonly name: string;
  readonly description: string;
  readonly logger: Logger;

  /**
   * Action to do when a Command Interaction is used
   * @param interaction The CommandInteraction
   */
  do(interaction: CommandInteraction): Promise<void>;
}
