import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the plpContainer state domain
 */

const selectPlpContainerDomain = state =>
  state.get('plpContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PlpContainer
 */

const makeSelectPlpContainer = () =>
  createSelector(selectPlpContainerDomain, substate => substate.toJS());

export default makeSelectPlpContainer;
export { selectPlpContainerDomain };
