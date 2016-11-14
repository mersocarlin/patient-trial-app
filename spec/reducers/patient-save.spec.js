import { expect } from 'chai';
import reducer from '../../src/reducers/patient-save';

import {
  SAVE_PATIENT_REQUEST,
  SAVE_PATIENT_SUCCESS,
  SAVE_PATIENT_FAILURE,
  SAVE_PATIENT_RESET,
} from '../../src/actions/patients';

describe('patient-save reducer', () => {
  it('should return initial state', () => {
    const actualState = reducer(undefined, {});
    const expectedState = {
      isSaving: false,
      isSaved: false,
      error: null,
      validationError: null,
    };

    expect(actualState).to.deep.equal(expectedState);
  });

  it('should handle SAVE_PATIENT_FAILURE', () => {
    let actualState = reducer(undefined, { type: SAVE_PATIENT_REQUEST });
    let expectedState = {
      isSaving: true,
      isSaved: false,
      error: null,
      validationError: null,
    };

    expect(actualState).to.deep.equal(expectedState);

    actualState = reducer(expectedState, { type: SAVE_PATIENT_FAILURE, error: 'error', validationError: null });
    expectedState = {
      isSaving: false,
      isSaved: false,
      error: 'error',
      validationError: null,
    };

    expect(actualState).to.deep.equal(expectedState);
  });

  it('should handle SAVE_PATIENT_SUCCESS', () => {
    let actualState = reducer(undefined, { type: SAVE_PATIENT_REQUEST });
    let expectedState = {
      isSaving: true,
      isSaved: false,
      error: null,
      validationError: null,
    };

    expect(actualState).to.deep.equal(expectedState);

    actualState = reducer(expectedState, { type: SAVE_PATIENT_SUCCESS });
    expectedState = {
      isSaving: false,
      isSaved: true,
      error: null,
      validationError: null,
    };

    expect(actualState).to.deep.equal(expectedState);
  });

  it('should handle SAVE_PATIENT_RESET', () => {
    let actualState = reducer(undefined, { type: SAVE_PATIENT_RESET });
    let expectedState = {
      isSaving: false,
      isSaved: false,
      error: null,
      validationError: null,
    };

    expect(actualState).to.deep.equal(expectedState);
  });
});
