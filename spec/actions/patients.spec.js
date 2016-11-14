import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as patientActions from '../../src/actions/patients';
import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  INVALIDATE_PATIENTS_LIST,
  SAVE_PATIENT_REQUEST,
  SAVE_PATIENT_SUCCESS,
  SAVE_PATIENT_FAILURE,
  SAVE_PATIENT_RESET,
} from '../../src/actions/patients';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('patient-actions', () => {

  it('should dispatch FETCH_PATIENTS_FAILURE when backend is not responding', () => {
    const expectedActions = [ FETCH_PATIENTS_REQUEST, FETCH_PATIENTS_FAILURE ];
    const store = mockStore({});

    return store
      .dispatch(patientActions.fetchPatients())
      .then(() => {
        const actions = store
          .getActions()
          .map(action => action.type);
        expect(actions).to.have.members(expectedActions);
      });
  });

  it('should dispatch FETCH_PATIENTS_FAILURE when there is any error coming from backend', () => {
    fetchMock.get('/api/v1/patients', {
      body: {
        error_name: 'BadRequestError',
        error_message: 'Error from backend.',
        status_code: 400,
      },
    });

    const expectedActions = [ FETCH_PATIENTS_REQUEST, FETCH_PATIENTS_FAILURE ];
    const store = mockStore({});

    return store
      .dispatch(patientActions.fetchPatients())
      .then(() => {
        fetchMock.restore();
        const actions = store
          .getActions()
          .map(action => action.type);
        expect(actions).to.have.members(expectedActions);
      });
  });

  it('should dispatch FETCH_PATIENTS_SUCCESS when fetching patient list', () => {
    fetchMock.get('/api/v1/patients', {
      body: [{
        gender: 'male',
        firstname: 'first',
        lastname: 'last',
        email: 'first@last.com',
        phone: '0123456',
        age: 20,
        zip: '12345',
        termsAccepted: true,
      }],
    });

    const expectedActions = [ FETCH_PATIENTS_REQUEST, FETCH_PATIENTS_SUCCESS ];
    const store = mockStore({});

    return store
      .dispatch(patientActions.fetchPatients())
      .then(() => {
        fetchMock.restore();
        const actions = store
          .getActions()
          .map(action => action.type);
        expect(actions).to.have.members(expectedActions);
      });
  });

  it('should dispatch INVALIDATE_PATIENTS_LIST', () => {
    const expectedActions = { type: INVALIDATE_PATIENTS_LIST };
    const store = mockStore({});

    const actions = store.dispatch(patientActions.invalidatePatientsList());
    expect(actions).to.deep.equal(expectedActions);
  });

  it('should not fetch patients when patientList is not defined', () => {
    const store = mockStore({});
    const actions = store.dispatch(patientActions.fetchPatientsIfNeeded());
    expect(actions).to.be.equal(undefined);
  });

  it('should invalidate patient list to fetch again', () => {
    fetchMock.get('/api/v1/patients', {
      body: [{
        gender: 'male',
        firstname: 'first',
        lastname: 'last',
        email: 'first@last.com',
        phone: '0123456',
        age: 20,
        zip: '12345',
        termsAccepted: true,
      }],
    });

    const expectedActions = [ INVALIDATE_PATIENTS_LIST, FETCH_PATIENTS_REQUEST, FETCH_PATIENTS_SUCCESS ];
    const store = mockStore({
      patientList: { didInvalidate: true }
    });

    store.dispatch(patientActions.invalidatePatientsList());

    return store
      .dispatch(patientActions.fetchPatientsIfNeeded())
      .then(() => {
        fetchMock.restore();
        const actions = store
          .getActions()
          .map(action => action.type);
        expect(actions).to.have.members(expectedActions);
      });
  });

  it('should dispatch SAVE_PATIENT_FAILURE when invalid patient', () => {
    const expectedActions = [ SAVE_PATIENT_REQUEST, SAVE_PATIENT_FAILURE ];
    const store = mockStore({});
    const payload = {
      gender: 'male',
      firstname: '',
      lastname: 'last1',
      email: 'first1@last1.com',
      phone: '0123456',
      age: 21,
      zip: '12346',
      termsAccepted: true,
    };

    return store
      .dispatch(patientActions.savePatient(payload))
      .then(() => {
        const actions = store
          .getActions()
          .map(action => action.type);
        expect(actions).to.have.members(expectedActions);
      });
  });

  it('should dispatch SAVE_PATIENT_FAILURE when there is any error coming from backend', () => {
    fetchMock.post('/api/v1/patients', {
      number: 400,
      body: {
        error_name: 'BadRequestError',
        error_message: 'Error from backend.',
        status_code: 400,
      },
    });

    const expectedActions = [ SAVE_PATIENT_REQUEST, SAVE_PATIENT_FAILURE ];
    const store = mockStore({});
    const payload = {
      gender: 'male',
      firstname: 'first1',
      lastname: 'last1',
      email: 'first1@last1.com',
      phone: '0123456',
      age: 21,
      zip: '12346',
      termsAccepted: true,
    };

    return store
      .dispatch(patientActions.savePatient(payload))
      .then(() => {
        fetchMock.restore();
        const actions = store
          .getActions()
          .map(action => action.type);
        expect(actions).to.have.members(expectedActions);
      });
  });

  it('should dispatch SAVE_PATIENT_FAILURE when backend is not responding', () => {
    const expectedActions = [ SAVE_PATIENT_REQUEST, SAVE_PATIENT_FAILURE ];
    const store = mockStore({});
    const payload = {
      gender: 'male',
      firstname: 'first1',
      lastname: 'last1',
      email: 'first1@last1.com',
      phone: '0123456',
      age: 21,
      zip: '12346',
      termsAccepted: true,
    };

    return store
      .dispatch(patientActions.savePatient(payload))
      .then(() => {
        const actions = store
          .getActions()
          .map(action => action.type);
        expect(actions).to.have.members(expectedActions);
      });
  });

  it('should dispatch SAVE_PATIENT_SUCCESS when creating user', () => {
    fetchMock.post('/api/v1/patients', {
      number: 201,
      body: {
        id: '1',
        createdAt: '2016-01-01',
        updatedAt: '2016-01-01',
        gender: 'male',
        firstname: 'first1',
        lastname: 'last1',
        email: 'first1@last1.com',
        phone: '0123456',
        age: 21,
        zip: '12346',
        termsAccepted: true,
      },
    });

    const expectedActions = [ SAVE_PATIENT_REQUEST, SAVE_PATIENT_SUCCESS ];
    const store = mockStore({});
    const payload = {
      gender: 'male',
      firstname: 'first1',
      lastname: 'last1',
      email: 'first1@last1.com',
      phone: '0123456',
      age: 21,
      zip: '12346',
      termsAccepted: true,
    };

    return store
      .dispatch(patientActions.savePatient(payload))
      .then(() => {
        fetchMock.restore();
        const actions = store
          .getActions()
          .map(action => action.type);
        expect(actions).to.have.members(expectedActions);
      });
  });

  it('should dispatch SAVE_PATIENT_RESET', () => {
    const expectedActions = { type: SAVE_PATIENT_RESET };
    const store = mockStore({});

    const actions = store.dispatch(patientActions.resetSavePatient());
    expect(actions).to.deep.equal(expectedActions);
  });
});
