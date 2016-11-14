import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    type: PropTypes.oneOf([
      'primary', 'secondary', 'success', 'info', 'warning', 'danger'
    ]),
  };

  render () {
    const { onClick, size, type } = this.props;

    const btnClass = classNames(
      'btn',
      `btn-${type}`,
      { 'btn-lg':  size === 'large'},
      { 'btn-sm':  size === 'small'}
    );

    return (
      <button
        onClick={onClick}
        type="button"
        className={btnClass}>
          {this.props.children}
      </button>
    );
  }
};

Button.defaultProps = {
  size: 'default',
  type: 'primary',
};
