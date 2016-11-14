import React, { Component, PropTypes } from 'react';

import './select.css';

export default class Select extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  constructor (props) {
    super(props);

    this.state = { value: props.value };
  }

  handleChange (e) {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  renderItems ({ items, value }) {
    return items.map((item, idx) => {
      return <option key={idx} value={item.value}>{item.text}</option>
    });
  }

  render () {
    const { value } = this.state;

    return (
      <select className="custom-select" value={value} onChange={this.handleChange.bind(this)}>
        {this.renderItems(this.props)}
      </select>
    );
  }
};
