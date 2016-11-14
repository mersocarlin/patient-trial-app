import { PatientListException } from './../api/exceptions';
import { default as api } from '../api';

export const FETCH_PATIENTS_REQUEST = 'FETCH_PATIENTS_REQUEST';
export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
export const FETCH_PATIENTS_FAILURE = 'FETCH_PATIENTS_FAILURE';
export const INVALIDATE_PATIENTS_LIST = 'INVALIDATE_PATIENTS_LIST';

export function fetchPatientsIfNeeded () {
  return (dispatch, getState) => {
    if (shoudFetchPatients(getState())) {
      return dispatch(fetchPatients());
    }
  };
}

function shoudFetchPatients ({ patientList }) {
  if (!patientList || patientList.isFetching) {
    return false;
  }

  return patientList.didInvalidate;
}

export function invalidatePatientsList () {
  return { type: INVALIDATE_PATIENTS_LIST };
}

export function fetchPatients () {
  return async dispatch => {
    dispatch({ type: FETCH_PATIENTS_REQUEST });
    try {
      const data = await api.patients.fetchPatients();
      dispatch({ type: FETCH_PATIENTS_SUCCESS, data });
    } catch (error) {
      if (error instanceof PatientListException) {
        dispatch({ type: FETCH_PATIENTS_FAILURE, error: error.msg });
        return;
      }

      dispatch({
        type: FETCH_PATIENTS_FAILURE,
        error: 'Could not fetch patients.',
      });
    }
  };
}
