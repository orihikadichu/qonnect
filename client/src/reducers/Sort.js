import { UPDATE_CURRENT_SORT } from '../actions/Sort';
import { initialState } from '../constants';
import { sorts } from '../intl';

export const sortRule = (state = initialState.ctgr, action) => {

switch (action.type) {
case UPDATE_CURRENT_SORT:
    const { sort, sortId } = sorts[action.payload];
    localStorage.setItem('sort', sort);
    return {
    ...state,
    sort,
    sortId
    };
default:
    return state;
}
};