import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const DeviceSignalCellular4Bar = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2 22h20V2z"/>
      </SvgIcon>
    );
  }

});

export default DeviceSignalCellular4Bar;
