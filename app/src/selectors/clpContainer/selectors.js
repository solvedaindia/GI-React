import { createSelector } from 'reselect';
import { initialState } from '../../reducers/clpContainer/reducer';


/**
 * Direct selector to the clpContainer state domain
 */

const selectClpContainerDomain = state =>
  state.get('clpContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClpContainer
 */

const makeSelectClpContainer = () =>
  createSelector(selectClpContainerDomain, substate => substate.toJS());

export default makeSelectClpContainer;
export { selectClpContainerDomain };
