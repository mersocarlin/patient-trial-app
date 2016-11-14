import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Loader from '../../src/components/loader';

function setup () {
  const enzymeWrapper = shallow(
    <Loader />
  );

  return {
    enzymeWrapper
  };
}

describe('components -> loader', () => {
  it('should render loader component', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('div').hasClass('loader')).to.be.true;
    expect(enzymeWrapper.find('i').hasClass('fa fa-spinner fa-pulse fa-2x fa-fw')).to.be.true;
  });
});
