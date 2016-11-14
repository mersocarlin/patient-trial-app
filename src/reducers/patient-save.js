import {
  SAVE_PATIENT_REQUEST,
  SAVE_PATIENT_SUCCESS,
  SAVE_PATIENT_FAILURE,
  SAVE_PATIENT_RESET,
} from '../actions/patients';


const INITIAL_STATE = {
  isSaving: false,
  isSaved: false,
  error: null,
  validationError: null,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_PATIENT_REQUEST:
      return {
        ...state,
        isSaving: true,
        error: null,
        validationError: null,
      };
    case SAVE_PATIENT_SUCCESS:
      return {
        ...state,
        isSaving: false,
        isSaved: true,
      };
    case SAVE_PATIENT_FAILURE:
      return {
        ...state,
        isSaving: false,
        error: action.error,
        validationError: action.validationError,
      };
    case SAVE_PATIENT_RESET:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
