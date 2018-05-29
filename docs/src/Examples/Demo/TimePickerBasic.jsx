import React, { Fragment, PureComponent } from 'react';
import { TimePicker } from 'material-ui-pickers';

export default class BasicUsage extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <TimePicker
            label="12 hours"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <TimePicker
            clearable
            ampm={false}
            label="24 hours"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <TimePicker
            showTodayButton
            todayLabel="now"
            label="With today button"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <TimePicker
            seconds
            format="HH:mm:ss A"
            todayLabel="now"
            label="With seconds"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <TimePicker
            ampm={false}
            seconds
            format="HH:mm:ss A"
            todayLabel="now"
            label="24 hours with seconds"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
      </Fragment>
    );
  }
}
