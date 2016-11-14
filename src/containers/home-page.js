import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { Button } from '../components/bootstrap';

import './home-page.css';

class HomePage extends Component {
  handlePatientListClick (type) {
    this.props.router.push('/patients');
  }

  render () {
    return (
      <div className="home-page">
        <div className="menu-bar">
          <div className="container">
            <div className="float-xs-right">
              <Button size="large" type="secondary" onClick={this.handlePatientListClick.bind(this)}>
                <i className="fa fa-th-list"></i>
                <FormattedMessage id="topmenu.patient-list" />
              </Button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <h1>
              <FormattedMessage id="home.header" />
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return { };
})(HomePage);
