import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { Button } from '../components/bootstrap';
import Loader from '../components/loader';
import PatientRow from '../components/patient-row';

import {
  fetchPatientsIfNeeded,
} from '../actions/patients';

import './patient-list-page.css';

class PatientListPage extends Component {
  componentWillMount () {
    this.props.dispatch(fetchPatientsIfNeeded());
  }

  handleAddPatientClick () {
    this.props.router.push('/patients/create');
  }

  renderPatients ({ items }) {
    if (!items) {
      return;
    }

    return items
      .map((item, idx) => {
        return (
          <PatientRow key={idx} patient={item} />
        );
      });
  }

  renderErrorMessage ({ error }) {
    if (!error) {
      return;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  render () {
    const { patientList } = this.props;
    const isFetching = patientList.isFetching;

    return (
      <div className="patient-list-page">
        <div className="menu-bar">
          <div className="container">
            <div className="float-xs-right">
              <Button size="large" type="secondary" onClick={this.handleAddPatientClick.bind(this)}>
                <i className="fa fa-plus"></i>
                <FormattedMessage id="topmenu.create-patient" />
              </Button>
            </div>
          </div>
        </div>
        <div className="container">
          {isFetching && <Loader />}
          {!isFetching && this.renderPatients(patientList)}
          {!isFetching && this.renderErrorMessage(patientList)}
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    patientList: state.patientList,
  };
})(PatientListPage);
