import {
  UPDATE_CURRENT_LANGUAGE,
} from '../actions/Intl';
import { initialState } from '../constants';
import { locales } from '../intl';

export const intl = (state = initialState.intl, action) => {
  switch (action.type) {
  case UPDATE_CURRENT_LANGUAGE:
    const { locale, messages, translateLanguageId } = locales[action.payload];
    localStorage.setItem('locale', locale);
    return {
      ...state,
      locale,
      messages,
      translateLanguageId
    };
  default:
    return state;
  }
};

