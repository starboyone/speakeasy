import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { CreateChallengeModal } from "@/components/modals/create-challenge-modal";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/translations/client/LanguageContext";
import { getServerLanguage, getServerTranslations } from "@/translations/server/i18n";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Speakeasy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const lang = getServerLanguage();
  const translations = getServerTranslations(lang);

  return (
    <ClerkProvider>
      <html lang={lang}>
        <head>
          <link rel="icon" href="/mascot.svg"></link>
        </head>
        <body className={font.className}>
        <LanguageProvider initialLanguage={lang} initialTranslations={translations}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          <CreateChallengeModal />
          {children}
        </ThemeProvider>
        </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
