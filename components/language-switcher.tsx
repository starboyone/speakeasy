"use client";

import { useLanguage } from "@/translations/client/LanguageContext";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const { translations, language, setLanguage } = useLanguage();
  const router = useRouter();

  const handleLanguageChange = () => {
    const newLang = language === 'ru' ? 'en' : 'ru';
    document.cookie = `i18n_lang=${newLang}; path=/; max-age=31536000; sameSite=lax`;
    setLanguage(newLang);
    router.refresh(); // Обновляем страницу для применения изменений
  };

  return (
    <Button onClick={handleLanguageChange}>
      {translations.Settings.switch}
    </Button>
  );
}