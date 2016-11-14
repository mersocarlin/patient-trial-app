import { combineReducers } from 'redux';

import patientList from './patient-list';
import patientSave from './patient-save';

export default combineReducers({
  patientList,
  patientSave,
});
