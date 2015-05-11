var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Animations = require("./styles/animations");
var Transitions = require("./styles/transitions");

var LinearProgress = React.createClass({

  mixins: [StylePropable],

  propTypes: {
      mode: React.PropTypes.oneOf(["determinate", "indeterminate"]),
      value: React.PropTypes.number,
      min:  React.PropTypes.number,
      max:  React.PropTypes.number
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  _getRelativeValue: function(){
    var value = this.props.value;
    var min = this.props.min;
    var max = this.props.max;

    var clampedValue = Math.min(Math.max(min, value), max);
    var rangeValue = max - min;
    var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },

  componentWillMount: function () {
    
    Animations.create("linear-progress-indeterminate", {
      "0%": {
        left: "-35%",
        right: "100%"
      },
      "60%": {
        left: "100%",
        right: "-90%"
      },
      "100%": {
        left: "100%",
        right: "-90%"
      }
    });

    Animations.create("linear-progress-indeterminate-short", { 
      "0%": {
        left: "-200%",
        right: "100%"
      },
      "60%": {
        left: "107%",
        right: "-8%"
      },
      "100%": {
        left: "107%",
        right: "-8%"
      }
    });


  },

  getDefaultProps: function () {
      return {
          mode: "indeterminate",
          value: 0,
          min: 0,
          max: 100  
      };
  },
  
  getTheme: function() {
    return this.context.muiTheme.palette;
  },

  getStyles: function() {
    
    var styles = {
      root: {
          position: "relative",
          height: "4px",
          display: "block",
          width: "100%",
          backgroundColor: this.getTheme().primary3Color,
          borderRadius: "2px",
          margin: 0,
          overflow: "hidden"
      },
      bar: {
        height: "100%"
      },
      barFragment1 :{},
      barFragment2: {}
    };

    if(this.props.mode == "indeterminate"){
      styles.barFragment1 = {
        position: "absolute",
        backgroundColor: this.getTheme().primary1Color,
        top: 0,
        left:0,
        bottom: 0,
        animation: "linear-progress-indeterminate 2.1s cubic-bezier(0.650, 0.815, 0.735, 0.395) infinite"
      };

      styles.barFragment2 = {
        position: "absolute",
        backgroundColor: this.getTheme().primary1Color,
        top: 0,
        left:0,
        bottom: 0,
        animation: "linear-progress-indeterminate-short 2.1s 1.15s cubic-bezier(0.165, 0.840, 0.440, 1.000) infinite", 
      };
    }else{
      styles.bar.backgroundColor= this.getTheme().primary1Color;
      styles.bar.transition = Transitions.create("width", ".3s", null, "linear");
      styles.bar.width = this._getRelativeValue() + "%";
    }
    
    return styles;
  },

  render: function() {
    var {
      style,
      ...other
    } = this.props;

    var styles = this.getStyles();

    return (
      <div {...other} style={this.mergeAndPrefix(styles.root, style)}>
        <div style={this.mergeAndPrefix(styles.bar)}>
          <div style={this.mergeAndPrefix(styles.barFragment1)}></div>
          <div style={this.mergeAndPrefix(styles.barFragment2)}></div>
        </div>
      </div>
    );
  }
});

module.exports = LinearProgress;
