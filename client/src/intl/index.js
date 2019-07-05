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
  comic_anime: {
      category: 'comic_anime',
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
  music: {
      category: 'music',
      categoryId: 4,
  },
};

export const sorts = {
  answerMany: {
      sort: 'answerMany',
      sortId: 1,
  },
  answerFew: {
      sort: 'answerFew',
      sortId: 2,
  },
  Asc: {
      sort: 'Asc',
      sortId: 3,
  },
  Des: {
      sort: 'Des',
      sortId: 4,
  },
};
