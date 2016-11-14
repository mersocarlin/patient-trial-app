import { expect } from 'chai';
import reducer from '../../src/reducers/i18n';

import { UPDATE_LOCALE } from '../../src/actions/i18n';
import locales from '../../src/i18n';

describe('i18n reducer', () => {
  it('should return initial state', () => {
    const actualState = reducer(undefined, {});
    const expectedState = {
      locale: 'en',
      messages: locales['en'],
    };

    expect(actualState).to.deep.equal(expectedState);
  });

  it('should handle UPDATE_LOCALE', () => {
    let actualState = reducer(undefined, {
      type: UPDATE_LOCALE,
      data: {
        locale: 'de',
        messages: locales['de'],
      }
    });

    let expectedState = {
      locale: 'de',
      messages: locales['de'],
    };

    expect(actualState).to.deep.equal(expectedState);
  });
});
