import { expect } from 'chai';
import reducer from '../../src/reducers/patient-list';

import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  INVALIDATE_PATIENTS_LIST,
} from '../../src/actions/patients';

describe('patient-list reducer', () => {
  it('should return initial state', () => {
    const actualState = reducer(undefined, {});
    const expectedState = {
      isFetching: false,
      didInvalidate: true,
      items: [],
      error: null,
    };

    expect(actualState).to.deep.equal(expectedState);
  });

  it('should handle FETCH_PATIENTS_FAILURE', () => {
    let actualState = reducer(undefined, { type: FETCH_PATIENTS_REQUEST });
    let expectedState = {
      isFetching: true,
      didInvalidate: false,
      items: [],
      error: null,
    };

    expect(actualState).to.deep.equal(expectedState);

    actualState = reducer(expectedState, { type: FETCH_PATIENTS_FAILURE, error: {} });
    expectedState = {
      isFetching: false,
      didInvalidate: false,
      items: [],
      error: {},
    };

    expect(actualState).to.deep.equal(expectedState);
  });

  it('should handle FETCH_PATIENTS_SUCCESS', () => {
    let actualState = reducer(undefined, { type: FETCH_PATIENTS_REQUEST });
    let expectedState = {
      isFetching: true,
      didInvalidate: false,
      items: [],
      error: null,
    };

    expect(actualState).to.deep.equal(expectedState);

    const data = [{
      id: 5,
      firstname: 'First',
      lastname: 'last',
      email: 'first@last.com',
      color: 'red',
      disabled: false,
    }];

    actualState = reducer(expectedState, { type: FETCH_PATIENTS_SUCCESS, data });
    expectedState = {
      isFetching: false,
      didInvalidate: false,
      items: data,
      error: null,
    };

    expect(actualState).to.deep.equal(expectedState);
  });

  it('should invalidate patient list', () => {
    let actualState = reducer(undefined, { type: INVALIDATE_PATIENTS_LIST });
    let expectedState = {
      isFetching: false,
      didInvalidate: true,
      items: [],
      error: null,
    };

    expect(actualState).to.deep.equal(expectedState);
  });
});
