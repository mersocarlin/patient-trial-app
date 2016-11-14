import React, { Component } from 'react';
import { connect } from 'react-redux';

class PatientListPage extends Component {
  render () {
    return (
      <div className="patient-list-page">
        patient-list-page
      </div>
    );
  }
}

export default connect(state => {
  return { };
})(PatientListPage);
