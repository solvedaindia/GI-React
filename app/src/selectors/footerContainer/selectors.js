import { createSelector } from 'reselect';
import { initialState } from '../../reducers/footerContainer/reducer';

/**
 * Direct selector to the footerContainer state domain
 */

const selectFooterContainerDomain = state =>
  state.get('footerContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FooterContainer
 */

const makeSelectFooterContainer = () =>
  createSelector(selectFooterContainerDomain, substate => substate.toJS());

export default makeSelectFooterContainer;
export { selectFooterContainerDomain };
