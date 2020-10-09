import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the headerSearch state domain
 */

const selectHeaderSearchDomain = state =>
  state.get('headerSearch', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HeaderSearch
 */

const makeSelectHeaderSearch = () =>
  createSelector(selectHeaderSearchDomain, substate => substate.toJS());

export default makeSelectHeaderSearch;
export { selectHeaderSearchDomain };
