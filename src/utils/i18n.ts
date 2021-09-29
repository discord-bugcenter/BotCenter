import { I18n } from 'i18n';

export const i18n = new I18n();

i18n.configure({
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    directory: './locales',
})

export function __(text: string, ...args: any[]): string {
	return i18n.__(text, ...args);
}
