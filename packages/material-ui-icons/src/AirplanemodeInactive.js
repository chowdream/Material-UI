import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let AirplanemodeInactive = props =>
  <SvgIconCustom {...props}>
    <path d="M13 9V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v3.68l7.83 7.83L21 16v-2l-8-5zM3 5.27l4.99 4.99L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-3.73L18.73 21 20 19.73 4.27 4 3 5.27z" />
  </SvgIconCustom>;

AirplanemodeInactive = pure(AirplanemodeInactive);
AirplanemodeInactive.muiName = 'SvgIcon';

export default AirplanemodeInactive;
