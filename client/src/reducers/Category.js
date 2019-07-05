import { UPDATE_CURRENT_CATEGORY } from '../actions/Category';
import { initialState } from '../constants';
import { categories } from '../intl';

export const ctgr = (state = initialState.ctgr, action) => {

  switch (action.type) {
  case UPDATE_CURRENT_CATEGORY:
    const { category, categoryId } = categories[action.payload];
    return {
      ...state,
      category,
      categoryId
    };
  default:
    return state;
  }
};
