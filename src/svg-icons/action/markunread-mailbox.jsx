let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionMarkunreadMailbox = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionMarkunreadMailbox;