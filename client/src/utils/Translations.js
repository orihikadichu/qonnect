'use strict';
import { isEmptyObject } from './index';

export const getFilteredContents = (contentList, translateLanguageId, contentType) => {
  return contentList.filter((v) => {
    if (v.translate_language_id === translateLanguageId) {
      return true ;
    }

    const targetTranslationsNum = v[contentType].filter((v) => {
      return (v.translate_language_id === translateLanguageId);
    }).length;
    return (targetTranslationsNum !== 0);
  });
};

export const getTranslatedContents = (contentList, translateLanguageId, contentType) => {
  return contentList.map(v => getTranslatedContent(v, translateLanguageId, contentType));
};

export const getTranslatedContent = (content, translateLanguageId, contentType) => {
  if (content.translate_language_id === translateLanguageId) {
    return setDispText(content, content.content);
  }

  if (isEmptyObject(content[contentType])) {
    return setDispText(content, content.content);
  }

  const translationList = content[contentType].filter(content => {
    return (content.translate_language_id === translateLanguageId);
  });

  if (translationList.length === 0) {
    return setDispText(content, content.content);
  }
  const translation = translationList[0];
  return setDispText(content, translation.content);
};

const setDispText = (content, text) => {
  content.dispText = text;
  return content;
};
