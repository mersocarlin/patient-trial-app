import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import routes from '../routes';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router
      history={hashHistory}
      children={routes}
    />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
