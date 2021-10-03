import { I18n } from 'i18n';
import { client } from '../index'

export const i18n = new I18n();

i18n.configure({
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    directory: './locales',
    updateFiles: client.debug
})

export function __(text: string, ...args: any[]): string {
	return i18n.__(text, ...args);
}
