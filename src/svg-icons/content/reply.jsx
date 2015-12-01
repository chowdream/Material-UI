import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ContentReply = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
      </SvgIcon>
    );
  }

});

export default ContentReply;
