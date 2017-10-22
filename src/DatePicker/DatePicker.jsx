import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { Typography, Toolbar, withStyles } from 'material-ui';
import pickerStyles from '../styles/pickerStyles';

import Calendar from './Calendar';
import YearSelection from './YearSelection';
import ToolbarButton from '../_shared/ToolbarButton';

class DatePicker extends PureComponent {
  static propTypes = {
    date: PropTypes.object,
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    classes: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    openToYearSelection: PropTypes.bool,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disableFuture: false,
    animateYearScrolling: true,
    openToYearSelection: false,
  }

  state = {
    showYearSelection: this.props.openToYearSelection,
  }

  get date() {
    return this.props.date.startOf('day');
  }

  get minDate() {
    return moment(this.props.minDate);
  }

  get maxDate() {
    return moment(this.props.maxDate);
  }

  openYearSelection = () => {
    this.setState({ showYearSelection: true });
  }

  openCalendar = () => {
    this.setState({ showYearSelection: false });
  }

  render() {
    const {
      classes, disableFuture, onChange, animateYearScrolling,
    } = this.props;
    const { showYearSelection } = this.state;

    return (
      <div className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <ToolbarButton
            type="subheading"
            onClick={this.openYearSelection}
            selected={showYearSelection}
            label={this.date.format('YYYY')}
          />

          <ToolbarButton
            type="display1"
            onClick={this.openCalendar}
            selected={!showYearSelection}
            label={this.date.format('ddd, MMM DD')}
          />
        </Toolbar>

        {
          showYearSelection
            ?
              <YearSelection
                date={this.date}
                onChange={onChange}
                minDate={this.minDate}
                maxDate={this.maxDate}
                disableFuture={disableFuture}
                animateYearScrolling={animateYearScrolling}
              />
            :
              <Calendar
                date={this.date}
                onChange={onChange}
                disableFuture={disableFuture}
              />
        }
      </div>
    );
  }
}

const styles = theme => ({
  ...pickerStyles(theme),
});

export default withStyles(styles, { name: 'MuiPickersDatePicker' })(DatePicker);

