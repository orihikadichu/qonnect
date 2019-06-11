import ja_JP from './locales/ja_JP';
import en_US from './locales/en_US';

export const locales = {
  ja: {
    locale: 'ja',
    messages: ja_JP,
    translateLanguageId: 1,
  },
  en: {
    locale: 'en',
    messages: en_US,
    translateLanguageId: 2,
  }
};

export const categories = {
  all: {
      category: 'all',
      categoryId: 0,
  },
  subculture: {
      category: 'subculture',
      categoryId: 1,
  },
  culture: {
      category: 'culture',
      categoryId: 2,
  },
  tourism: {
      category: 'tourism',
      categoryId: 3,
  },
};