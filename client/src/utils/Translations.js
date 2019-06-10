'use strict';


export const getFilteredContents = (contentList, translateLanguageId, contentType, categoryId) => {
  const filteredContents = contentList.filter((v) => {
    if (v.translate_language_id === translateLanguageId) {
      if (categoryId === 0 ) {
        return true;
      }　else if　(categoryId === v.category_id){
        return true;
      }
    }

    const targetTranslationsNum = v[contentType].filter((v) => {
      return (v.translate_language_id === translateLanguageId);
    }).length;
    return (targetTranslationsNum !== 0);
  });
  return filteredContents;
};

export const getTranslatedContents = (contentList, translateLanguageId, contentType, categoryId) => {
  const translatedContents = contentList.map((v) => {
    if (v.translate_language_id === translateLanguageId) {
      if (categoryId === 0 ) {
        v.dispText = v.content;
        return v;
      }　else if　(categoryId === v.category_id){
        v.dispText = v.content;
        return v;
      }
    }

    const translation = v[contentType].filter(v => {
      return (v.translate_language_id === translateLanguageId);
    })[0];

    v.dispText = translation.content;
    return v;
  });
  return translatedContents;
};
