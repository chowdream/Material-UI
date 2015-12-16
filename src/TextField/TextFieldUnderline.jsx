import React from 'react';
import Transitions from '../styles/transitions';
import Styles from '../utils/styles';

const propTypes = {
  /**
   * True if the parent `TextField` is disabled.
   */
  disabled: React.PropTypes.bool,

  /**
   * Override the inline-styles of the underline when parent `TextField` is disabled.
   */
  disabledStyle: React.PropTypes.object,

  /**
   * True if the parent `TextField` has an error.
   */
  error: React.PropTypes.bool,

  /**
   * Override the inline-styles of the underline when parent `TextField` has an error.
   */
  errorStyle: React.PropTypes.object,

  /**
   * True if the parent `TextField` is focused.
   */
  focus: React.PropTypes.bool,

  /**
   * Override the inline-styles of the underline when parent `TextField` is focused.
   */
  focusStyle: React.PropTypes.object,

  /**
   * The material-ui theme applied to this component.
   */
  muiTheme: React.PropTypes.object.isRequired,

  /**
   * Override the inline-styles of the underline.
   */
  style: React.PropTypes.object,
};

const defaultProps = {
  disabled: false,
  disabledStyle: {},
  error: false,
  errorStyle: {},
  focus: false,
  focusStyle: {},
  style: {},
};

const TextFieldUnderline = (props) => {

  const {
    disabled,
    disabledStyle,
    error,
    errorStyle,
    focus,
    focusStyle,
    muiTheme,
    style,
  } = props;

  const {
    color: errorStyleColor,
  } = errorStyle;

  const {
    textField: {
      borderColor,
      disabledTextColor,
      errorColor,
      focusColor,
    },
  } = muiTheme;


  let styles = {
    root: {
      border: 'none',
      borderBottom: 'solid 1px',
      borderColor: borderColor,
      bottom: 8,
      boxSizing: 'content-box',
      margin: 0,
      position: 'absolute',
      width: '100%',
    },
    disabled: {
      borderBottom: 'dotted 2px',
      borderColor: disabledTextColor,
    },
    focus: {
      borderBottom: 'solid 2px',
      borderColor: focusColor,
      transform: 'scaleX(0)',
      transition: Transitions.easeOut(),
    },
    error: {
      borderColor: errorStyleColor ? errorStyleColor : errorColor,
      transform: 'scaleX(1)',
    },
  };

  let underline = Styles.merge(styles.root, style);
  let focusedUnderline = Styles.merge(styles.root, styles.focus, focusStyle);

  if (disabled) underline = Styles.merge(underline, styles.disabled, disabledStyle);
  if (focus) focusedUnderline = Styles.merge(focusedUnderline, {transform: 'scaleX(1)'});
  if (error) focusedUnderline = Styles.merge(focusedUnderline, styles.error);

  return (
    <div>
      <hr style={Styles.prepareStyles(muiTheme, underline)}/>
      <hr style={Styles.prepareStyles(muiTheme, focusedUnderline)}/>
    </div>
  );
};

TextFieldUnderline.propTypes = propTypes;
TextFieldUnderline.defaultProps = defaultProps;

export default TextFieldUnderline;
