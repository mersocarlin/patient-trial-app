import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Button } from '../../../src/components/bootstrap';

function setup (size = 'default', type = 'primary') {
  const props = {
    size,
    type,
    onClick: sinon.spy(),
  };

  const enzymeWrapper = shallow(
    <Button {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('components -> bootstrap button', () => {
  it('should render with default props', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('button').hasClass('btn')).to.be.true;
    expect(enzymeWrapper.find('button').hasClass('btn-lg')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-sm')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-primary')).to.be.true;
    expect(enzymeWrapper.find('button').hasClass('btn-secondary')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-success')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-info')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-warning')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-danger')).to.be.false;
  });

  it('should render large secondary button', () => {
    const { enzymeWrapper } = setup('large', 'secondary');

    expect(enzymeWrapper.find('button').hasClass('btn-lg')).to.be.true;
    expect(enzymeWrapper.find('button').hasClass('btn-sm')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-primary')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-secondary')).to.be.true;
    expect(enzymeWrapper.find('button').hasClass('btn-success')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-info')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-warning')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-danger')).to.be.false;
  });

  it('should render small danger button', () => {
    const { enzymeWrapper } = setup('small', 'danger');

    expect(enzymeWrapper.find('button').hasClass('btn-lg')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-sm')).to.be.true;
    expect(enzymeWrapper.find('button').hasClass('btn-primary')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-secondary')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-success')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-info')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-warning')).to.be.false;
    expect(enzymeWrapper.find('button').hasClass('btn-danger')).to.be.true;
  });

  it('should trigger onClick prop', () => {
    const { enzymeWrapper, props } = setup();

    enzymeWrapper.simulate('click');

    expect(props.onClick).to.have.property('callCount', 1);
  });
});
