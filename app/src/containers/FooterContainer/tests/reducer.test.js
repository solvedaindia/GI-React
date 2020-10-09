import { fromJS } from 'immutable';
import footerContainerReducer from '../reducer';

describe('footerContainerReducer', () => {
  it('returns the initial state', () => {
    expect(footerContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
