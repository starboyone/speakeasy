import { Language, Translations } from '@/translations/shared/i18n-types';
import translationsRu from '../messages/ru.json';
import translationsEn from '../messages/en.json';

export function getServerLanguage(cookieName = 'i18n_lang'): Language {
  const { cookies } = require('next/headers');
  return cookies().get(cookieName)?.value === 'en' ? 'en' : 'ru';
}

export function getServerTranslations(lang: Language): Translations {
  return lang === 'ru' ? translationsRu : translationsEn;
}