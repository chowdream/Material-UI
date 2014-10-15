/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js');

var Input = React.createClass({

  propTypes: {
    multiline: React.PropTypes.bool,
    inputStyle: React.PropTypes.string,
    error: React.PropTypes.string,
    label: React.PropTypes.string,
    description: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      error: false,
      rows: 1
    }
  },

  getDefaultProps: function() {
    return {
      multiline: false
    };
  },

  setError: function(error) {
    this.props.error = error;
    this.setState({ error: true });
  },

  removeError: function() {
    this.props.error = null;
    this.setState({ error: false });
  },

  render: function() {
    var classes = this.getClasses('mui-input', {
        'mui-floating': this.props.inputStyle === 'floating',
        'mui-text': this.props.type === 'text',
        'mui-error': this.state.error === true
      }),
      inputElement = this.props.multiline ? 
        <textarea className="mui-input-textarea" rows={this.state.rows} onChange={this._onLineBreak} required /> :
        <input type={this.props.type} name={this.props.name} onChange={this.props.onChange} required />;

    return (
      <div ref={this.props.ref} className={classes}>
        {inputElement}
        <span className="mui-input-placeholder">{this.props.placeholder}</span>
        <span className="mui-input-highlight"></span>
        <span className="mui-input-bar"></span>
        <span className="mui-input-description">{this.props.description}</span>
        <span className="mui-input-error">{this.props.error}</span>
      </div>
    );
  },

  _onLineBreak: function(e) {
    var input = (e.target.value.slice(-1)),
        prevInput = (e.target.value.slice(-2));

    if(input.match(/\n/gm)) {
      if(this.state.rows != 20) {
        this.setState({ rows: ((this.state.rows) + 1)})
      }
    }
  }

});

module.exports = Input;
