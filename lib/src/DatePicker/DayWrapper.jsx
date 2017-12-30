import React, { PureComponent } from 'react';

class Day extends PureComponent {

  handleClick = () => {
    this.props.onSelect(this.props.day);
  }

  render() {
    const {
      children, day, dayInCurrentMonth, onSelect, ...other
    } = this.props;
    return (
      <div
        onClick={dayInCurrentMonth ? this.handleClick : undefined}
        onKeyPress={dayInCurrentMonth ? this.handleClick : undefined}
        role="presentation"
        {...other}
      >
        {children}
      </div>
    )
  }
}

export default Day;