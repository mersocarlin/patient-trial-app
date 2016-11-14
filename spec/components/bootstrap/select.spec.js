import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Select } from '../../../src/components/bootstrap';

const DEFAULT_PROPS = {
  items: [{ value: 1, text: 'item1' }, { value: 2, text: 'item2' }, { value: 3, text: 'item3' }],
  onChange: sinon.spy(),
  value: '',
}

function setup (props = DEFAULT_PROPS) {
  const enzymeWrapper = shallow(
    <Select {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('components -> bootstrap select', () => {
  it('should render with DEFAULT_PROPS', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('select').hasClass('custom-select')).to.be.true;
    expect(enzymeWrapper.find('select').find('option')).to.have.lengthOf(3);
  });

  it('should trigger onChangeEvent', () => {
    const { enzymeWrapper, props } = setup();

    enzymeWrapper.simulate('change', { target: { value: 2 } });
    expect(props.onChange).to.have.property('callCount', 1);
    expect(enzymeWrapper.state('value')).to.be.equal(2);
  });
});
