import { fromJS } from 'immutable';
import clpContainerReducer from '../reducer';

describe('clpContainerReducer', () => {
  it('returns the initial state', () => {
    expect(clpContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
