import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Label } from '../../../src/components/bootstrap';

function setup (text = 'testing') {
  const props = {
    text,
  };

  const enzymeWrapper = shallow(
    <Label {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('components -> bootstrap label', () => {
  it('should render with testing text', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('label').hasClass('form-control-label')).to.be.true;
    expect(enzymeWrapper.find('label').text()).to.be.equal('testing');
  });

  it('should render with First name text', () => {
    const { enzymeWrapper } = setup('First name');

    expect(enzymeWrapper.find('label').hasClass('form-control-label')).to.be.true;
    expect(enzymeWrapper.find('label').text()).to.be.equal('First name');
  });
});
