import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  invalidatePatientsList,
  resetSavePatient,
  savePatient,
} from '../actions/patients';

import PatientForm from '../components/patient-form';

import './patient-add-page.css';

class PatientAddPage extends Component {
  static contextTypes = {
    intl: PropTypes.object,
  };

  componentWillReceiveProps ({ patientSave }) {
    if (patientSave.isSaved) {
      this.props.dispatch(invalidatePatientsList());
      this.props.router.push('/patients');
    }
  }

  componentWillUnmount () {
    this.props.dispatch(resetSavePatient());
  }

  handlePatientFormSubmit (payload) {
    this.props.dispatch(savePatient(payload));
  }

  renderPatientForm ({ intl }, { patientSave }) {
    const ageList = [];
    for (let i = 1; i < 100; i++) {
      ageList.push({
        value: i,
        text: i,
      });
    }

    const genderList = [
      {
        value: 'female',
        text: intl.formatMessage({ id: 'patient.genders.female' }),
      },
      {
        value: 'male',
        text: intl.formatMessage({ id: 'patient.genders.male' }),
      },
    ];

    const patient = {
      firstname: '',
      lastname: '',
      email: '',
      gender: 'female',
      phone: '',
      age: '10',
      zip: '',
      termsAccepted: false,
    };

    const patientProps = {
      gender: intl.formatMessage({ id: 'patient.properties.gender' }),
      firstname: intl.formatMessage({ id: 'patient.properties.firstname' }),
      lastname: intl.formatMessage({ id: 'patient.properties.lastname' }),
      email: intl.formatMessage({ id: 'patient.properties.email' }),
      phone: intl.formatMessage({ id: 'patient.properties.phone' }),
      age: intl.formatMessage({ id: 'patient.properties.age' }),
      zip: intl.formatMessage({ id: 'patient.properties.zip' }),
      termsAccepted: intl.formatMessage({ id: 'patient.properties.acceptTerms' }),
    };

    const error = patientSave.validationError || {};
    const errorMessage = patientSave.error || (patientSave.validationError ? intl.formatMessage({ id: 'patient.form.requiredFields' }) : '');

    return (
      <PatientForm
        ageList={ageList}
        cancelText={intl.formatMessage({ id: 'patient.form.cancel' })}
        error={error}
        errorMessage={errorMessage}
        genderList={genderList}
        isSaving={patientSave.isSaving}
        onCancel={() => this.props.router.push('/patients')}
        onSubmit={this.handlePatientFormSubmit.bind(this)}
        patient={patient}
        patientProps={patientProps}
        saveText={intl.formatMessage({ id: 'patient.form.save' })}
      />
    );
  }

  render () {
    return (
      <div className="patient-add-page container">
        {this.renderPatientForm(this.context, this.props)}
      </div>
    );
  }
}

export default connect(state => {
  return {
    patientSave: state.patientSave,
  };
})(PatientAddPage);
