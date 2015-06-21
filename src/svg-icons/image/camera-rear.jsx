let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageCameraRear = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 20H5v2h5v2l3-3-3-3v2zm4 0v2h5v-2h-5zm3-20H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm-5 6c-1.11 0-2-.9-2-2s.89-2 1.99-2 2 .9 2 2C14 5.1 13.1 6 12 6z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageCameraRear;