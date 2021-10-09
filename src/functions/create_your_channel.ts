/* Cos this file is WIP, disable eslint rules */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { CustomClient } from '../client';
import { VoiceState } from 'discord.js';

const EMOJIS: string[] = ['🍼', '🦊', '🍻', '🤙', '🍖', '🔥', '🌌', '🎐', '🚛'];
export const CREATE_YOUR_CHANNEL_SUFFIX = ' (cyc)';

export async function manageCreateYourChannel(bot: CustomClient, oldState: VoiceState, newState: VoiceState): Promise<void> {}
