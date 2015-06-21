let React = require('react');
let SvgIcon = require('../../svg-icon');

let AvRepeat = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvRepeat;