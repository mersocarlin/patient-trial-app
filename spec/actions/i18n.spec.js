import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import * as i18nActions from '../../src/actions/i18n';
import { UPDATE_LOCALE } from '../../src/actions/i18n';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('i18n-actions', () => {

  it('should dispatch UPDATE_LOCALE', () => {
    const expectedAction = { type: UPDATE_LOCALE };
    const store = mockStore({});

    const action = store.dispatch(i18nActions.updateLocale('en'))
    expect(action.type).to.deep.equal(expectedAction.type);
  });
});
