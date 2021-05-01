import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
import { useUtils, MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import DatePickerToolbar from './DatePickerToolbar';
import {
  ResponsiveWrapper,
  ResponsiveWrapperProps,
} from '../internal/pickers/wrappers/ResponsiveWrapper';
import {
  useParsedDate,
  OverrideParseableDateProps,
} from '../internal/pickers/hooks/date-helpers-hooks';
import { ExportedCalendarPickerProps } from '../CalendarPicker/CalendarPicker';
import {
  DateValidationError,
  useDateValidation,
  ValidationProps,
} from '../internal/pickers/hooks/useValidation';
import {
  ParseableDate,
  defaultMinDate,
  defaultMaxDate,
} from '../internal/pickers/constants/prop-types';
import { parsePickerInputValue } from '../internal/pickers/date-utils';
import Picker from '../internal/pickers/Picker/Picker';
import { BasePickerProps } from '../internal/pickers/typings/BasePicker';
import { KeyboardDateInput } from '../internal/pickers/KeyboardDateInput';
import { PureDateInput, ExportedDateInputProps } from '../internal/pickers/PureDateInput';
import { usePickerState, PickerStateValueManager } from '../internal/pickers/hooks/usePickerState';
import { getFormatAndMaskByViews } from './shared';

const valueManager: PickerStateValueManager<unknown, unknown> = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  areValuesEqual: (utils: MuiPickersAdapter, a: unknown, b: unknown) => utils.isEqual(a, b),
};

export type DatePickerView = 'year' | 'day' | 'month';

export interface BaseDatePickerProps<TDate>
  extends OverrideParseableDateProps<
      TDate,
      ExportedCalendarPickerProps<TDate>,
      'minDate' | 'maxDate'
    >,
    BasePickerProps<ParseableDate<TDate>, TDate | null>,
    ValidationProps<DateValidationError, ParseableDate<TDate>>,
    ExportedDateInputProps<ParseableDate<TDate>, TDate | null> {
  /**
   * First view to show.
   */
  openTo?: DatePickerView;
  /**
   * Array of views to show.
   */
  views?: readonly DatePickerView[];
}

type InterceptedProps<Props> = Props & { inputFormat: string };

export const datePickerConfig = {
  DefaultToolbarComponent: DatePickerToolbar,
  useInterceptProps: <Props extends BaseDatePickerProps<unknown>>({
    openTo = 'day',
    views = ['year', 'day'],
    minDate: __minDate = defaultMinDate,
    maxDate: __maxDate = defaultMaxDate,
    ...other
  }: Props): InterceptedProps<Props> => {
    const utils = useUtils();
    const minDate = useParsedDate(__minDate);
    const maxDate = useParsedDate(__maxDate);

    return {
      views,
      openTo,
      minDate,
      maxDate,
      ...getFormatAndMaskByViews(views, utils),
      ...(other as Props),
    };
  },
};

const { DefaultToolbarComponent, useInterceptProps } = datePickerConfig;

export interface DatePickerProps<TDate = unknown>
  extends BaseDatePickerProps<TDate>,
    ResponsiveWrapperProps {}

type DatePickerComponent = (<TDate>(
  props: DatePickerProps<TDate> & React.RefAttributes<HTMLInputElement>,
) => JSX.Element) & { propTypes?: any };

/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [DatePicker API](https://material-ui.com/api/date-picker/)
 */
const DatePicker = React.forwardRef(function DatePicker<TDate>(
  inProps: DatePickerProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  // TODO: TDate needs to be instantiated at every usage.
  const allProps = useInterceptProps(inProps as DatePickerProps<unknown>);

  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  const props = useThemeProps({
    props: allProps,
    name: 'MuiDatePicker',
  });

  const validationError = useDateValidation(props) !== null;
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, valueManager);

  // Note that we are passing down all the value without spread.
  // It saves us >1kb gzip and make any prop available automatically on any level down.
  const { value, onChange, ...other } = props;
  const AllDateInputProps = { ...inputProps, ...other, ref, validationError };

  return (
    <ResponsiveWrapper
      {...other}
      {...wrapperProps}
      DateInputProps={AllDateInputProps}
      KeyboardDateInputComponent={KeyboardDateInput}
      PureDateInputComponent={PureDateInput}
    >
      <Picker
        {...pickerProps}
        toolbarTitle={props.label || props.toolbarTitle}
        ToolbarComponent={other.ToolbarComponent || DefaultToolbarComponent}
        DateInputProps={AllDateInputProps}
        {...other}
      />
    </ResponsiveWrapper>
  );
}) as DatePickerComponent;

DatePicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex: PropTypes.instanceOf(RegExp),
  /**
   * Enables keyboard listener for moving between days in calendar.
   * Defaults to `true` unless the `ClockPicker` is used inside a `Static*` picker component.
   */
  allowKeyboardControl: PropTypes.bool,
  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection: PropTypes.bool,
  /**
   * Cancel text message.
   * @default "CANCEL"
   */
  cancelText: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable: PropTypes.bool,
  /**
   * Clear text message.
   * @default "CLEAR"
   */
  clearText: PropTypes.node,
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    LeftArrowButton: PropTypes.elementType,
    LeftArrowIcon: PropTypes.elementType,
    RightArrowButton: PropTypes.elementType,
    RightArrowIcon: PropTypes.elementType,
    SwitchViewButton: PropTypes.elementType,
    SwitchViewIcon: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,
  /**
   * CSS media query when `Mobile` mode will be changed to `Desktop`.
   * @default "@media (pointer: fine)"
   * @example "@media (min-width: 720px)" or theme.breakpoints.up("sm")
   */
  desktopModeMediaQuery: PropTypes.string,
  /**
   * Props applied to the [`Dialog`](/api/dialog/) element.
   */
  DialogProps: PropTypes.object,
  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the picker and text field are disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: PropTypes.bool,
  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: PropTypes.bool,
  /**
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,
  /**
   * Get aria-label text for switching between views button.
   */
  getViewSwitchingButtonText: PropTypes.func,
  /**
   * @ignore
   */
  ignoreInvalidInputs: PropTypes.bool,
  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: PropTypes.object,
  /**
   * Format string.
   */
  inputFormat: PropTypes.string,
  /**
   * @ignore
   */
  InputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  label: PropTypes.node,
  /**
   * Left arrow icon aria-label text.
   */
  leftArrowButtonText: PropTypes.string,
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: PropTypes.string,
  /**
   * @ignore
   */
  maxDate: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  minDate: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Ok button text.
   * @default "OK"
   */
  okText: PropTypes.node,
  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept: PropTypes.func,
  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: PropTypes.func,
  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   */
  onError: PropTypes.func,
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,
  /**
   * Callback fired on view change.
   */
  onViewChange: PropTypes.func,
  /**
   * Callback firing on year change @DateIOType.
   */
  onYearChange: PropTypes.func,
  /**
   * Control the popup or dialog open state.
   */
  open: PropTypes.bool,
  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: PropTypes.object,
  /**
   * Icon displaying for open picker button.
   */
  openPickerIcon: PropTypes.node,
  /**
   * First view to show.
   */
  openTo: PropTypes.oneOf(['day', 'month', 'year']),
  /**
   * Force rendering in particular orientation.
   */
  orientation: PropTypes.oneOf(['landscape', 'portrait']),
  /**
   * Popper props passed down to [Popper](https://material-ui.com/api/popper/) component.
   */
  PopperProps: PropTypes.object,
  /**
   * Make picker read only.
   */
  readOnly: PropTypes.bool,
  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,
  /**
   * Custom renderer for day. Check the [PickersDay](https://material-ui.com/api/pickers-day/) component.
   */
  renderDay: PropTypes.func,
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,
  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: PropTypes.func,
  /**
   * Right arrow icon aria-label text.
   */
  rightArrowButtonText: PropTypes.string,
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate: PropTypes.func,
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear: PropTypes.func,
  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,
  /**
   * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
   * @default false
   */
  showTodayButton: PropTypes.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,
  /**
   * Today text message.
   * @default "TODAY"
   */
  todayText: PropTypes.node,
  /**
   * Component that will replace default toolbar renderer.
   */
  ToolbarComponent: PropTypes.elementType,
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat: PropTypes.string,
  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default "–"
   */
  toolbarPlaceholder: PropTypes.node,
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default "SELECT DATE"
   */
  toolbarTitle: PropTypes.node,
  /**
   * Custom component for popper [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * The value of the picker.
   */
  value: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Array of views to show.
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['day', 'month', 'year']).isRequired),
} as any;

export default DatePicker;
