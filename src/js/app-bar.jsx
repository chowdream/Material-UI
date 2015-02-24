var React = require('react');
var Classable = require('./mixins/classable');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({

  mixins: [Classable],

  propTypes: {
    onMenuIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    title : React.PropTypes.node,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    }
  },

  render: function() {
    var {
      onTouchTap,
      ...other
    } = this.props;

    var classes = this.getClasses('mui-app-bar'),
      title, menuIconButton;

    if (this.props.title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      title = toString.call(this.props.title) === '[object String]' ?
        <h1 className="mui-app-bar-title">{this.props.title}</h1> :
        this.props.title;
    }




    if (this.props.showMenuIconButton) {
      menuIconButton = (
        <IconButton
          className="mui-app-bar-navigation-icon-button"
          onTouchTap={this._onMenuIconButtonTouchTap}>
            <NavigationMenu/>
        </IconButton>
      );
    }

    return (
      <Paper rounded={false} className={classes} zDepth={this.props.zDepth}>
        {menuIconButton}
        {title}
        {this.props.children}
      </Paper>
    );
  },

  _onMenuIconButtonTouchTap: function(e) {
    if (this.props.onMenuIconButtonTouchTap) this.props.onMenuIconButtonTouchTap(e);
  }

});

module.exports = AppBar;
