import { fromJS } from 'immutable';
import plpContainerReducer from '../reducer';

describe('plpContainerReducer', () => {
  it('returns the initial state', () => {
    expect(plpContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
