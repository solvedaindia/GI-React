import { createSelector } from 'reselect';
import { initialState } from '../../reducers/headerContainer/reducer';

/**
 * Direct selector to the headerContainer state domain
 */

const selectHeaderContainerDomain = state =>
  state.get('headerContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HeaderContainer
 */

const makeSelectHeaderContainer = () =>
  createSelector(selectHeaderContainerDomain, substate => substate.toJS());

export default makeSelectHeaderContainer;
export { selectHeaderContainerDomain };
