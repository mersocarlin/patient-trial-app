import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import './patient-row.css';

export default class PatientRow extends Component {
  static propTypes = {
    patient: PropTypes.object.isRequired,
  };

  render () {
    const { patient } = this.props;

    return (
      <div className="patient-row row">
        <div className="col-xs-12 col-sm-6 col-md-3 createdAt">
          <div>{moment(patient.createdAt).format('DD MMM YYYY')}</div>
          <div>{moment(patient.createdAt).format('HH:mm:ss')}</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 name">
          <div>{patient.firstname}</div>
          <div>{patient.lastname}</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 email-phone-zip">
          <div>{patient.email}</div>
          <div>{patient.phone}</div>
          <div>{patient.zip}</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 gender-age">
          <div>
            <i className={`fa fa-${patient.gender}`}></i>
          </div>
          <div>{patient.age}</div>
        </div>
      </div>
    );
  }
};
