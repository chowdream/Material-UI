/* eslint-disable */

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../SvgIcon';

let Save = (props) => (
  <SvgIcon {...props}>
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
  </SvgIcon>
);
Save = pure(Save);
Save.displayName = 'Save';
Save.muiName = 'SvgIcon';

export default Save;
