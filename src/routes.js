import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import HomePage from './containers/home-page';
import PatiendAddPage from './containers/patient-add-page';
import PatientListPage from './containers/patient-list-page';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/patients" component={PatientListPage} />
    <Route path="/patients/create" component={PatiendAddPage} />
  </Route>
);
