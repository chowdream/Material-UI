var React = require('react');
var Transitions = require('./styles/mixins/transitions');
var StylePropable = require('./mixins/style-propable');
var Colors = require('./styles/colors')
var InkBar = React.createClass({

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    position: React.PropTypes.string
  },
  
  mixins: [StylePropable],

  render: function() {

    var styles = this.mergeAndPrefix({
      left: this.props.left,
      width: this.props.width,
      bottom: '0',
      display: 'block',
      backgroundColor: this.context.theme.accent1Color,
      height: '2px',
      marginTop: '-2px',
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left')
    });

    return (
      <div style={styles}>
        &nbsp;
      </div>
    );
  }

});

module.exports = InkBar;
