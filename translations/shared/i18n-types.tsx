export type Language = 'ru' | 'en';

export type Translations = {
  Marketing: {
    welcome: string;
    continue: string;
    start: string;
    already: string;
    Footer: {
      ru: string;
      en: string;
    };
  };
  Sidebar: {
    learn: string;
    leaderboard: string;
    quests: string;
    shop: string;
    admin: string;
    profile: string;
    settings: string;
  };
  Leaderboard: {
    title: string;
    description: string;
  };
  Quests: {
    title: string;
    description: string;
    completed: string;
    locked: string;
  };
  Settings: {
    appearance: string;
    language: string;
    account: string;
    logout: string;
    switch: string;
    ToggleTheme: {
      dark: string;
      light: string;
      default: string;
    }
  };
  Learn: {
        LessonButton: {
            start: string;
        }
    }
};