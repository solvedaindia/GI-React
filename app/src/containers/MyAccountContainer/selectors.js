import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the plpContainer state domain
 */

const selectMyAccountContainerDomain = state =>
  state.get('myAccountContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PlpContainer
 */

const makeSelectPlpContainer = () =>
  createSelector(selectMyAccountContainerDomain, substate => substate.toJS());

export default makeSelectPlpContainer;
export { selectMyAccountContainerDomain };
