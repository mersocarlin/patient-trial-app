import React, { Component } from 'react';

export default class App extends Component {
  render () {
    return (
      <div className="patient-trial-app">
        {this.props.children}
      </div>
    );
  }
};
