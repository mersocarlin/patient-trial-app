import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PatientRow from '../../src/components/patient-row';

const DEFAULT_PROPS = {
  patient: {
    createdAt: new Date(),
    firstname: 'First',
    lastname: 'Last',
    email: 'mail@me.com',
    phone: '0123456789',
    zip: '12345',
    gender: 'male',
    age: 20,
  },
}

function setup (gender = 'male') {
  DEFAULT_PROPS.patient.gender = gender;

  const enzymeWrapper = shallow(
    <PatientRow {...DEFAULT_PROPS} />
  );

  return {
    enzymeWrapper
  };
}

describe('components -> patient-row', () => {
  it('should render male row', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('.row').hasClass('patient-row')).to.be.true;
    expect(enzymeWrapper.find('.col-xs-12')).to.have.lengthOf(4);

    const cols = enzymeWrapper.find('.col-xs-12').map(col => col);
    expect(cols[3].find('i').hasClass('fa-male')).to.be.true;
  });

  it('should render female row', () => {
    const { enzymeWrapper } = setup('female');

    expect(enzymeWrapper.find('.row').hasClass('patient-row')).to.be.true;
    expect(enzymeWrapper.find('.col-xs-12')).to.have.lengthOf(4);

    const cols = enzymeWrapper.find('.col-xs-12').map(col => col);
    expect(cols[3].find('i').hasClass('fa-female')).to.be.true;
  });
});
