import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { FormGroup } from '../../../src/components/bootstrap';

function setup (isInvalid = false) {
  const props = {
    isInvalid,
  };

  const enzymeWrapper = shallow(
    <FormGroup {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('components -> bootstrap form-group', () => {
  it('should render with default props', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('div').hasClass('form-group')).to.be.true;
    expect(enzymeWrapper.find('div').hasClass('has-danger')).to.be.false;
  });

  it('should render has-danger css class', () => {
    const { enzymeWrapper } = setup(true);

    expect(enzymeWrapper.find('div').hasClass('form-group')).to.be.true;
    expect(enzymeWrapper.find('div').hasClass('has-danger')).to.be.true;
  });
});
