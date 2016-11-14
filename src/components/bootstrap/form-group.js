import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class FormGroup extends Component {
  static propTypes = {
    isInvalid: PropTypes.bool,
  };

  render () {
    const { isInvalid } = this.props;
    const componentClass = classNames(
      'form-group',
      { 'has-danger': isInvalid }
    );

    return (
      <div className={componentClass}>
        {this.props.children}
      </div>
    );
  }
};
