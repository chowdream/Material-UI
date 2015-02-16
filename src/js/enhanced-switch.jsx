var React = require('react');
var KeyCode = require('./utils/key-code');
var DomIdable = require('./mixins/dom-idable');
var StylePropable = require('./mixins/style-propable.js');
var Transitions = require('./styles/mixins/transitions.js');
var WindowListenable = require('./mixins/window-listenable');
var CustomVariables = require('./styles/custom-variables.js');
var FocusRipple = require('./ripples/focus-ripple');
var TouchRipple = require('./ripples/touch-ripple');
var Paper = require('./paper');
var Theme = require('./styles/theme.js').get();

var EnhancedSwitch = React.createClass({

  mixins: [DomIdable, WindowListenable, StylePropable],

	propTypes: {
      id: React.PropTypes.string,
      inputType: React.PropTypes.string.isRequired,
      switchElement: React.PropTypes.element.isRequired,
      iconClassName: React.PropTypes.string.isRequired,
      onParentShouldUpdate: React.PropTypes.func.isRequired,
      switched: React.PropTypes.bool.isRequired,
      rippleStyle: React.PropTypes.object,
      name: React.PropTypes.string,
	    value: React.PropTypes.string,
	    label: React.PropTypes.string,
	    onSwitch: React.PropTypes.func,
	    required: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    defaultSwitched: React.PropTypes.bool,
      labelPosition: React.PropTypes.oneOf(['left', 'right']),
      disableFocusRipple: React.PropTypes.bool,
      disableTouchRipple: React.PropTypes.bool,
	  },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  getDefaultProps: function() {
    return {
      iconClassName: ''
    };
  },

  getInitialState: function() {
    return {
      isKeyboardFocused: false
    }
  },

  getEvenWidth: function(){
    return (
      parseInt(window
        .getComputedStyle(this.getDOMNode())
        .getPropertyValue('width'), 10)
    );
  },

  componentDidMount: function() {
    var inputNode = this.refs.checkbox.getDOMNode();
    if (!this.props.switched || 
        this.props.switched == undefined ||
        inputNode.checked != this.props.switched) this.props.onParentShouldUpdate(inputNode.checked);
  
    this.setState({parentWidth: this.getEvenWidth()});
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasToggledProp = nextProps.hasOwnProperty('toggled');
    var hasNewDefaultProp = 
      (nextProps.hasOwnProperty('defaultSwitched') && 
      (nextProps.defaultSwitched != this.props.defaultSwitched));
    var newState = {};

    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasToggledProp) {
      newState.switched = nextProps.toggled;
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    }

    if (newState.switched != undefined && (newState.switched != this.props.switched)) this.props.onParentShouldUpdate(newState.switched);
  },

  render: function() {
    var {
      type,
      name,
      value,
      label,
      onSwitch,
      defaultSwitched,
      onBlur,
      onFocus,
      onMouseUp,
      onMouseDown,
      onMouseOut,
      onTouchStart,
      onTouchEnd,
      disableTouchRipple,
      disableFocusRipple,
      iconClassName,
      ...other
    } = this.props;

    var switchWidth = 60 - CustomVariables.desktopGutterLess;
    var labelWidth = this.state.parentWidth - switchWidth - 30;
    var styles = this.mergePropStyles({
      enhancedSwitch: {
        position: 'relative',
        cursor: 'pointer',
        overflow: 'visible',
        display: 'table',
        height: 'auto',
        width: '100%'
      },
      enhancedSwitchInput: {
        position: 'absolute',
        cursor: 'pointer',
        pointerEvents: 'all',
        opacity: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        left: 0
      },
      enhancedSwitchWrap: {
        transition: Transitions.easeOut(),
        float: 'left',
        position: 'relative',
        display: 'table-column',
        width: switchWidth,
        marginRight: (this.props.labelPosition == 'right') ? 
          CustomVariables.desktopGutterLess : 0,
        marginLeft: (this.props.labelPosition == 'left') ? 
          CustomVariables.desktopGutterLess : 0,
      },
      enhancedSwitchLabel: {
        float: 'left',
        position: 'relative',
        display: 'table-column',
        width: labelWidth,
        lineHeight: '24px'
      }
    });

    var inputId = this.props.id || this.getDomId();
    
    var labelElement = this.props.label ? (
      <label style={styles.enhancedSwitchLabel} htmlFor={inputId}>
        {this.props.label}
      </label>
    ) : null;

    var inputProps = {
      ref: "checkbox",
      type: this.props.inputType,
      name: this.props.name,
      value: this.props.value,
      defaultChecked: this.props.defaultSwitched,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onMouseUp: this._handleMouseUp,
      onMouseDown: this._handleMouseDown,
      onMouseOut: this._handleMouseOut,
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd
    };

    if (!this.props.hasOwnProperty('checkedLink')) {
      inputProps.onChange = this._handleChange;
    }

    var inputElement = (
      <input 
        {...other} 
        {...inputProps}
        style={styles.enhancedSwitchInput}/>
    );

    var rippleStyle = this.mergePropStyles({
        height: '200%',
        width: '200%',
        top: '-12',
        left: '-12'
    }, this.props.rippleStyle);

    var touchRipple = (
      <TouchRipple
        ref="touchRipple"
        key="touchRipple"
        style={rippleStyle}
        color={this.props.switched ? Theme.primary1Color : Theme.textColor}
        centerRipple={true} />
    );

    var focusRipple = (
      <FocusRipple
        key="focusRipple"
        innerStyle={rippleStyle}
        color={this.props.switched ? Theme.primary1Color : Theme.textColor}
        show={this.state.isKeyboardFocused} />
    );

    var ripples = [
      this.props.disabled || disableTouchRipple ? null : touchRipple,
      this.props.disabled || disableFocusRipple ? null : focusRipple
    ];

    iconClassName += ' mui-enhanced-switch-wrap';

    styles.enhancedSwitchWrap = this.mergePropStyles(styles.enhancedSwitchWrap, this.props.iconStyle.icon);

    // If toggle component (indicated by whether the style includes thumb) manually lay out 
    // elements in order to nest ripple elements
    var switchElement = !this.props.iconStyle.thumb ? (
        <div style={styles.enhancedSwitchWrap}>
          {this.props.switchElement}
          {ripples}
        </div>
      ) : (
        <div style={styles.enhancedSwitchWrap}>
          <div style={this.props.iconStyle.track}/>
          <Paper style={this.props.iconStyle.thumb} zDepth={1}> {ripples} </Paper>
        </div>      
    );

    var labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    var elementsInOrder = (labelPositionExist && 
      (this.props.labelPosition.toUpperCase() === "RIGHT")) ? (
        <div>
          {switchElement}
          {labelElement}
        </div>
      ) : (
        <div>
          {labelElement}
          {switchElement}
        </div>
    );

    return (
      <div style={styles.enhancedSwitch}>
          {inputElement}
          {elementsInOrder}
      </div>
    );
  },


  isSwitched: function() {
    return this.refs.checkbox.getDOMNode().checked;
  },

  // no callback here because there is no event
  setSwitched: function(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked == false) {

      this.props.onParentShouldUpdate(newSwitchedValue);  
      this.refs.checkbox.getDOMNode().checked = newSwitchedValue;
    } else {
      var message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  },

  getValue: function() {
    return this.refs.checkbox.getDOMNode().value;
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  _handleChange: function(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });

    var isInputChecked = this.refs.checkbox.getDOMNode().checked;
    
    if (!this.props.hasOwnProperty('checked')) this.props.onParentShouldUpdate(isInputChecked);
    if (this.props.onSwitch) this.props.onSwitch(e, isInputChecked);
  },

  /** 
   * Because both the ripples and the checkbox input cannot share pointer 
   * events, the checkbox input takes control of pointer events and calls 
   * ripple animations manually.
   */

  // Checkbox inputs only use SPACE to change their state. Using ENTER will 
  // update the ui but not the input.
  _handleWindowKeydown: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleWindowKeyup: function(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) this.refs.touchRipple.start(e);
  },

  _handleMouseUp: function(e) {
    this.refs.touchRipple.end();
  },

  _handleMouseOut: function(e) {
    this.refs.touchRipple.end();
  },

  _handleTouchStart: function(e) {
    this.refs.touchRipple.start(e);
  },

  _handleTouchEnd: function(e) {
    this.refs.touchRipple.end();
  },

  _handleBlur: function(e) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function() {
      if (this._tabPressed) {
        this.setState({
          isKeyboardFocused: true
        });
      }
    }.bind(this), 150);
    
    if (this.props.onFocus) this.props.onFocus(e);
  }

});

module.exports = EnhancedSwitch;
