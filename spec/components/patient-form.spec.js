import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import PatientForm from '../../src/components/patient-form';
import { Button, FormGroup } from '../../src/components/bootstrap';

const DEFAULT_PROPS = {
  ageList: [],
  cancelText: 'Cancel',
  error: {},
  errorMessage: '',
  genderList: [
    { value: 'female', text: 'Female' },
    { value: 'male', text: 'Male' },
  ],
  isSaving: false,
  onCancel: sinon.spy(),
  onSubmit: sinon.spy(),
  patient: {
    firstname: 'First',
    lastname: 'Last',
    email: 'mail@me.com',
    gender: 'male',
    phone: '0123456789',
    zip: '12345',
    age: 20,
    termsAccepted: false,
  },
  patientProps: {
    gender: 'Gender',
    firstname: 'First name',
    lastname: 'Last name',
    email: 'Email',
    phone: 'Phone',
    age: 'Age',
    zip: 'Zip',
    termsAccepted: 'I accept the terms.',
  },
  saveText:  'Save',
};

function setup (props = DEFAULT_PROPS) {
  const enzymeWrapper = shallow(
    <PatientForm {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('components -> patient-form', () => {
  it('should render form', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.props().className).to.be.equal('patient-form');
    expect(enzymeWrapper.find(FormGroup)).to.have.lengthOf(8);
    expect(enzymeWrapper.find('.alert-danger')).to.have.lengthOf(0);
    expect(enzymeWrapper.find(Button)).to.have.lengthOf(2);
  });

  it('should render invalid input field', () => {
    const wrapper = mount(
      <PatientForm {...DEFAULT_PROPS} />
    );

    wrapper.setProps({ error: { firstname: true } });
    expect(wrapper.find(FormGroup)).to.have.lengthOf(8);

    const formGroups = wrapper.find(FormGroup).map(fg => fg);
    expect(formGroups[0].props()).to.have.property('isInvalid', true);
  });

  it('should render error-message', () => {
    const { enzymeWrapper } = setup({ ...DEFAULT_PROPS, errorMessage: 'error' });

    expect(enzymeWrapper.props().className).to.be.equal('patient-form');
    expect(enzymeWrapper.find(FormGroup)).to.have.lengthOf(8);
    expect(enzymeWrapper.find('.alert-danger')).to.have.lengthOf(1);
    expect(enzymeWrapper.find(Button)).to.have.lengthOf(2);
  });

  it('should update state when patient prop has changed', () => {
    const wrapper = mount(
      <PatientForm {...DEFAULT_PROPS} />
    );

    const formGroups = wrapper.find(FormGroup).map(fg => fg);

    expect(wrapper.state('patient').firstname).to.be.equal('First');

    formGroups[0].find('input').simulate('change', { target: { value: 'Second' } });

    expect(wrapper.state('patient').firstname).to.be.equal('Second');
  });

  it('should update state when terms are accepted', () => {
    const wrapper = mount(
      <PatientForm {...DEFAULT_PROPS} />
    );

    const formGroups = wrapper.find(FormGroup).map(fg => fg);

    expect(wrapper.state('patient').termsAccepted).to.be.false;

    formGroups[7].find('input').simulate('change', { target: { checked: true } });

    expect(wrapper.state('patient').termsAccepted).to.be.true;
  });

  it('should trigger submit prop', () => {
    const wrapper = mount(
      <PatientForm {...DEFAULT_PROPS} />
    );

    const actionButtons = wrapper.find(Button).map(fg => fg);

    actionButtons[1].simulate('click');

    expect(DEFAULT_PROPS.onSubmit).to.have.property('callCount', 1);
  });

  it('should not trigger submit prop if it has been already triggered', () => {
    const props = { ...DEFAULT_PROPS, onSubmit: sinon.spy(), isSaving: true };
    const wrapper = mount(
      <PatientForm {...props } />
    );

    const actionButtons = wrapper.find(Button).map(fg => fg);

    actionButtons[1].simulate('click');

    expect(props.onSubmit).to.have.property('callCount', 0);
  });
});
