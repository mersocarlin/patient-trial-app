import React, { Component } from 'react';
import { connect } from 'react-redux';

class PatientAddPage extends Component {
  render () {
    return (
      <div className="patient-add-page">
        patient-add-page
      </div>
    );
  }
}

export default connect(state => {
  return { };
})(PatientAddPage);
