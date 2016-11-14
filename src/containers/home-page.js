import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {
  render () {
    return (
      <div className="home-page">
        home-page
      </div>
    );
  }
}

export default connect(state => {
  return { };
})(HomePage);
