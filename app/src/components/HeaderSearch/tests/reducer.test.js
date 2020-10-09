import { fromJS } from 'immutable';
import headerSearchReducer from '../reducer';

describe('headerSearchReducer', () => {
  it('returns the initial state', () => {
    expect(headerSearchReducer(undefined, {})).toEqual(fromJS({}));
  });
});
