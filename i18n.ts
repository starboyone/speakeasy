import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Поддерживаемые языки
//const locales = ["ru", "en"];

export default getRequestConfig(async () => {

  // Проверяем, что запрошенный язык поддерживается
  //if (!locales.includes(locale as any)) notFound();

  const locale = "ru";

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
    locale
  };
});
