import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import View from './components/DateTimePickerView';
import YearSelection from '../DatePicker/components/YearSelection';
import Calendar from '../DatePicker/components/Calendar';
import TimePickerView from '../TimePicker/components/TimePickerView';
import DateTimePickerTabs from './components/DateTimePickerTabs';
import DatetimePickerHeader, { MeridiemMode } from './components/DateTimePickerHeader';
import { convertToMeridiem } from '../_helpers/time-utils';

import DomainPropTypes from '../constants/prop-types';
import DateTimePickerView from '../constants/DateTimePickerView';
import withUtils, { WithUtilsProps } from '../_shared/WithUtils';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { createStyles } from '@material-ui/core';
import { Omit } from '@material-ui/core';


export interface BaseDateTimePickerProps extends Omit<BaseDatePickerProps, 'openToYearSelection'>{
  autoSubmit?: boolean;
  showTabs?: boolean;
  ampm?: boolean;
  openTo?: DateTimePickerView;
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
  ViewContainerComponent?: string | React.ComponentType<any>;
}

export interface DateTimePickerProps extends BaseDateTimePickerProps, WithStyles<typeof styles>, WithUtilsProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished: boolean, view?: DateTimePickerView) => void;
}

interface DateTimePickerState {
  openView: DateTimePickerView;
  meridiemMode: MeridiemMode;
}

export class DateTimePicker extends React.Component<DateTimePickerProps, DateTimePickerState> {
  static propTypes = {
    allowKeyboardControl: PropTypes.bool,
    ampm: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    autoSubmit: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired,
    initialFocusedDate: PropTypes.any,
    innerRef: PropTypes.any,
    dateRangeIcon: PropTypes.node,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    maxDate: DomainPropTypes.date.isRequired,
    minDate: DomainPropTypes.date.isRequired,
    onChange: PropTypes.func.isRequired,
    openTo: PropTypes.oneOf(Object.keys(DateTimePickerView).map(key => DateTimePickerView[key])).isRequired,
    renderDay: PropTypes.func,
    rightArrowIcon: PropTypes.node,
    shouldDisableDate: PropTypes.func,
    showTabs: PropTypes.bool,
    timeIcon: PropTypes.node,
    utils: PropTypes.object.isRequired,
    ViewContainerComponent:
      PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  }

  static defaultProps = {
    allowKeyboardControl: false,
    ampm: true,
    animateYearScrolling: false,
    autoSubmit: true,
    dateRangeIcon: undefined,
    disableFuture: false,
    disablePast: false,
    leftArrowIcon: undefined,
    renderDay: undefined,
    rightArrowIcon: undefined,
    shouldDisableDate: undefined,
    showTabs: true,
    timeIcon: undefined,
    ViewContainerComponent: 'div',
  }

  state: DateTimePickerState = {
    openView: this.props.openTo!,
    meridiemMode: this.props.utils.getHours(this.props.date) >= 12 ? 'pm' : 'am',
  }

  onChange = (time, isFinish = true, nextView) => {
    this.handleChange(time);

    if (isFinish && this.props.autoSubmit) {
      this.handleViewChange(nextView);
    }
  }

  setMeridiemMode = mode => () => {
    this.setState(
      { meridiemMode: mode },
      () => this.handleChange(this.props.date, false),
    );
  }

  handleViewChange = (view) => {
    this.setState({ openView: view });
  }

  handleChange = (time, isFinish = false) => {
    const withMeridiem = convertToMeridiem(
      time,
      this.state.meridiemMode,
      this.props.ampm,
      this.props.utils,
    );
    this.props.onChange(withMeridiem, isFinish);
  }

  handleYearChange = (date) => {
    this.onChange(date, false, DateTimePickerView.DATE);
  }

  handleDayChange = (date, isFinish) => {
    this.onChange(date, isFinish, DateTimePickerView.HOUR);
  }

  handleHourChange = (time, isFinish) => {
    this.onChange(time, isFinish, DateTimePickerView.MINUTES);
  }

  render() {
    const { openView, meridiemMode } = this.state;
    const {
      date,
      minDate,
      maxDate,
      showTabs,
      disablePast,
      disableFuture,
      leftArrowIcon,
      rightArrowIcon,
      dateRangeIcon,
      timeIcon,
      renderDay,
      utils,
      ampm,
      shouldDisableDate,
      animateYearScrolling,
      classes,
      allowKeyboardControl,
      ViewContainerComponent,
    } = this.props;

    const Container = ViewContainerComponent!
    const ViewContainerComponentProps = typeof ViewContainerComponent === 'string'
      ? {}
      : { openView, onChange: this.onChange };

    return (
      <React.Fragment>
        <DatetimePickerHeader
          date={date}
          openView={openView}
          meridiemMode={meridiemMode}
          setMeridiemMode={this.setMeridiemMode}
          onOpenViewChange={this.handleViewChange}
          ampm={ampm}
        />

        {
          showTabs
            && (
            <DateTimePickerTabs
              view={openView}
              onChange={this.handleViewChange}
              dateRangeIcon={dateRangeIcon}
              timeIcon={timeIcon}
            />
            )
        }

        <Container className={classes.viewContainer} {...ViewContainerComponentProps}>
          <View selected={openView === DateTimePickerView.YEAR}>
            <YearSelection
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={this.handleYearChange}
              disablePast={disablePast}
              disableFuture={disableFuture}
              animateYearScrolling={animateYearScrolling}
            />
          </View>

          <View selected={openView === DateTimePickerView.DATE}>
            <Calendar
              allowKeyboardControl={allowKeyboardControl}
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={this.handleDayChange}
              disablePast={disablePast}
              disableFuture={disableFuture}
              leftArrowIcon={leftArrowIcon}
              rightArrowIcon={rightArrowIcon}
              renderDay={renderDay}
              shouldDisableDate={shouldDisableDate}
            />
          </View>

          <View selected={openView === DateTimePickerView.HOUR || openView === DateTimePickerView.MINUTES}>
            <TimePickerView
              date={date}
              type={openView as any} // here type is actually the same but 2 enums not equal
              onHourChange={this.handleHourChange}
              onMinutesChange={this.handleChange}
              onSecondsChange={this.handleChange}
              ampm={ampm}
            />
          </View>
        </Container>
      </React.Fragment>
    );
  }
}

const styles = createStyles({
  viewContainer: {
    minHeight: 300,
    position: 'relative',
  },
})

export default withStyles(styles, {
  name: "MuiPickersDateTimePicker"
})(withUtils()(DateTimePicker as React.ComponentType<DateTimePickerProps>));
