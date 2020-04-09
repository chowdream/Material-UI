import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { CalendarProps } from './Calendar';
import { DatePickerView } from '../../DatePicker';
import { SlideDirection } from './SlideTransition';
import { makeStyles } from '@material-ui/core/styles';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { ArrowDropDownIcon } from '../../_shared/icons/ArrowDropDownIcon';
import { ArrowSwitcher, ExportedArrowSwitcherProps } from '../../_shared/ArrowSwitcher';
import {
  usePreviousMonthDisabled,
  useNextMonthDisabled,
} from '../../_shared/hooks/date-helpers-hooks';

export interface CalendarHeaderProps
  extends ExportedArrowSwitcherProps,
    Pick<CalendarProps, 'minDate' | 'maxDate' | 'disablePast' | 'disableFuture'> {
  view: DatePickerView;
  views: DatePickerView[];
  currentMonth: MaterialUiPickersDate;
  /** Get aria-label text for switching between views button */
  getViewSwitchingButtonText?: (currentView: DatePickerView) => string;
  reduceAnimations: boolean;
  changeView: (view: DatePickerView) => void;
  minDate: MaterialUiPickersDate;
  maxDate: MaterialUiPickersDate;
  onMonthChange: (date: MaterialUiPickersDate, slideDirection: SlideDirection) => void;
}

export const useStyles = makeStyles(
  theme => ({
    switchHeader: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      paddingLeft: 24,
      paddingRight: 12,
      // prevent jumping in safari
      maxHeight: 30,
      minHeight: 30,
    },
    yearSelectionSwitcher: {
      marginRight: 'auto',
    },

    previousMonthButton: {
      marginRight: 24,
    },
    switchViewDropdown: {
      willChange: 'transform',
      transition: theme.transitions.create('transform'),
      transform: 'rotate(0deg)',
    },
    switchViewDropdownDown: {
      transform: 'rotate(180deg)',
    },
    monthTitleContainer: {
      flex: 1,
      display: 'flex',
      maxHeight: 30,
      overflow: 'hidden',
      cursor: 'pointer',
    },
    monthText: {
      marginRight: 4,
    },
  }),
  { name: 'MuiPickersCalendarHeader' }
);

function getSwitchingViewAriaText(view: DatePickerView) {
  return view === 'year'
    ? 'year view is open, switch to calendar view'
    : 'calendar view is open, switch to year view';
}

export const CalendarHeader: React.SFC<CalendarHeaderProps> = ({
  view,
  views,
  currentMonth: month,
  changeView,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  onMonthChange,
  reduceAnimations,
  leftArrowButtonProps,
  rightArrowButtonProps,
  leftArrowIcon,
  rightArrowIcon,
  leftArrowButtonText = 'previous month',
  rightArrowButtonText = 'next month',
  getViewSwitchingButtonText = getSwitchingViewAriaText,
}) => {
  const utils = useUtils();
  const classes = useStyles();

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isNextMonthDisabled = useNextMonthDisabled(month, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(month, { disablePast, minDate });

  const toggleView = () => {
    if (views.length === 1) {
      return;
    }

    if (views.length === 2) {
      changeView(views.find(v => v !== view) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(view) !== 0 ? 0 : 1;
      changeView(views[nextIndexToOpen]);
    }
  };

  return (
    <>
      <div className={classes.switchHeader}>
        <div className={classes.monthTitleContainer} onClick={toggleView}>
          <FadeTransitionGroup
            reduceAnimations={reduceAnimations}
            transKey={utils.format(month, 'month')}
          >
            <Typography
              aria-live="polite"
              data-mui-test="calendar-month-text"
              align="center"
              variant="subtitle1"
              className={classes.monthText}
              children={utils.format(month, 'month')}
            />
          </FadeTransitionGroup>
          <FadeTransitionGroup
            reduceAnimations={reduceAnimations}
            transKey={utils.format(month, 'year')}
          >
            <Typography
              aria-live="polite"
              data-mui-test="calendar-year-text"
              align="center"
              variant="subtitle1"
              children={utils.format(month, 'year')}
            />
          </FadeTransitionGroup>

          {views.length > 1 && (
            <IconButton
              size="small"
              data-mui-test="calendar-view-switcher"
              onClick={toggleView}
              className={classes.yearSelectionSwitcher}
              aria-label={getViewSwitchingButtonText(view)}
            >
              <ArrowDropDownIcon
                className={clsx(classes.switchViewDropdown, {
                  [classes.switchViewDropdownDown]: view === 'year',
                })}
              />
            </IconButton>
          )}
        </div>

        <Fade in={view === 'date'}>
          <ArrowSwitcher
            leftArrowButtonProps={leftArrowButtonProps}
            rightArrowButtonProps={rightArrowButtonProps}
            leftArrowButtonText={leftArrowButtonText}
            rightArrowButtonText={rightArrowButtonText}
            leftArrowIcon={leftArrowIcon}
            rightArrowIcon={rightArrowIcon}
            onLeftClick={selectPreviousMonth}
            onRightClick={selectNextMonth}
            isLeftDisabled={isPreviousMonthDisabled}
            isRightDisabled={isNextMonthDisabled}
          />
        </Fade>
      </div>
    </>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  leftArrowButtonText: PropTypes.string,
  rightArrowButtonText: PropTypes.string,
};

export default CalendarHeader;
