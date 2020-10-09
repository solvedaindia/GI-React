import { fromJS } from 'immutable';
import headerContainerReducer from '../reducer';

describe('headerContainerReducer', () => {
  it('returns the initial state', () => {
    expect(headerContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
