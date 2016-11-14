import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import './app.css';

export default class App extends Component {
  handleIndexRouteClick () {
    this.props.router.push({
      pathname: '/',
    });
  }

  render () {
    return (
      <div className="patient-trial-app">
        <nav className="navbar navbar-fixed-top navbar-light bg-faded">
          <a onClick={this.handleIndexRouteClick.bind(this)} className="navbar-brand" href="#">
            <FormattedMessage id="application.name" />
          </a>
        </nav>
        {this.props.children}
      </div>
    );
  }
};
