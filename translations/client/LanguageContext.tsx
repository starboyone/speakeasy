'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations } from '../shared/i18n-types';
import translationsRu from '../messages/ru.json';
import translationsEn from '../messages/en.json';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  initialLanguage,
  initialTranslations,
  children
}: {
  initialLanguage: Language;
  initialTranslations: Translations;
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [translations, setTranslations] = useState<Translations>(initialTranslations);

  const setLanguage = (lang: Language) => {
    document.cookie = `i18n_lang=${lang}; path=/; max-age=31536000`;
    setLanguageState(lang);
    setTranslations(lang === 'ru' ? translationsRu : translationsEn);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}