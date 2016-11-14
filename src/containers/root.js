import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import IntlProvider from './intl-provider';
import routes from '../routes';

const Root = ({ store }) => (
  <Provider store={store}>
    <IntlProvider>
      <Router
        history={hashHistory}
        children={routes}
      />
    </IntlProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
