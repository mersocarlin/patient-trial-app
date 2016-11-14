import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

export default connect(state => {
  return { ...state.i18n };
})(IntlProvider);
