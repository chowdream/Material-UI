import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let OpenWith = props =>
  <SvgIcon {...props}>
    <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z" />
  </SvgIcon>;

OpenWith = pure(OpenWith);
OpenWith.muiName = 'SvgIcon';

export default OpenWith;
