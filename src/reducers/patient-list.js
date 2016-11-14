import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  INVALIDATE_PATIENTS_LIST,
} from '../actions/patients';

const INITIAL_STATE = {
  isFetching: false,
  didInvalidate: true,
  items: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        error: null,
      };
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.data,
      };
    case FETCH_PATIENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case INVALIDATE_PATIENTS_LIST: {
      return {
        ...state,
        didInvalidate: true,
      };
    }
    default:
      return state;
  }
};
