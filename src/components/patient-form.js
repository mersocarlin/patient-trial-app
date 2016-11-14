import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { Button, FormGroup, Label, Select } from './bootstrap';

import './patient-form.css';

export default class PatientForm extends Component {
  static propTypes = {
    ageList: PropTypes.array.isRequired,
    cancelText: PropTypes.string.isRequired,
    error: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    genderList: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,
    patientProps: PropTypes.object.isRequired,
    saveText: PropTypes.string.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = {
      patient: props.patient,
      error: props.error,
    };
  }

  componentWillReceiveProps (nextProps) {
    const { error } = nextProps;
    this.setState({ error });
  }

  handlePatientFormSubmit () {
    if (this.props.isSaving) {
      return;
    }

    this.props.onSubmit(this.state.patient);
  }

  handlePatientPropChange (prop, { target }) {
    const { patient } = this.state;

    if (prop === 'termsAccepted') {
      patient[prop] = target.checked;
    } else {
      patient[prop] = target.value;
    }

    this.setState({ patient });
  }

  renderPatientFields ({ ageList, genderList, patientProps }, { patient, error }) {
    const fieldsDiv = Object
      .keys(patient)
      .map((field, idx) => {
        let fieldComponent;

        if (field === 'termsAccepted') {
          fieldComponent = (
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={patient[field]}
                className="form-check-input"
                onChange={this.handlePatientPropChange.bind(this, field)}
              />
              {patientProps[field]}
            </label>
          );
        }
        else if (['age', 'gender'].includes(field)) {
          const items = field === 'age' ? ageList : genderList;
          fieldComponent = (
            <div>
              <Label text={patientProps[field]} />
              <Select
                items={items}
                onChange={this.handlePatientPropChange.bind(this, field)}
                value={patient[field]}
              />
            </div>
          );
        } else {
          const inputClass = classNames(
            'form-control',
            { 'input-uppercase': ['firstname', 'lastname'].includes(field) }
          );
          fieldComponent = (
            <div>
              <Label text={patientProps[field]} />
              <input
                ref={field}
                type="text"
                className={inputClass}
                onChange={this.handlePatientPropChange.bind(this, field)}
                placeholder={patientProps[field]}
                defaultValue={patient[field]}
              />
            </div>
          );
        }

        return (
          <FormGroup key={idx} isInvalid={error[field]} label={patientProps[field]}>
            {fieldComponent}
          </FormGroup>
        );
      });

    return (
      <form>
        {fieldsDiv}
      </form>
    );
  }

  renderErrorMessage ({ errorMessage }) {
    if (!errorMessage) {
      return;
    }

    return (
      <div className="alert alert-danger" role="alert">
        <div>{errorMessage}</div>
      </div>
    );
  }

  renderActionButtons ({ cancelText, isSaving, saveText }) {
    const saveBtnIconClass = classNames(
      'fa',
      { 'fa-save': !isSaving },
      { 'fa-spinner fa-spin': isSaving }
    );

    return (
      <div className="actions clearfix mt-2 pt-1">
        <div className="float-xs-left">
          <Button type="danger" onClick={this.props.onCancel}>
            <i className="fa fa-times"></i>
            {cancelText}
          </Button>
        </div>
        <div className="float-xs-right">
          <Button type="primary" onClick={this.handlePatientFormSubmit.bind(this)}>
            <i className={saveBtnIconClass}></i>
            {saveText}
          </Button>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="patient-form">
        {this.renderPatientFields(this.props, this.state)}
        {this.renderErrorMessage(this.props)}
        {this.renderActionButtons(this.props)}
      </div>
    );
  }
}
