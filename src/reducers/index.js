import { combineReducers } from 'redux';

import i18n from './i18n';
import patientList from './patient-list';
import patientSave from './patient-save';

export default combineReducers({
  i18n,
  patientList,
  patientSave,
});
