import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceBattery90 = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V8h10V5.33z"/><path d="M7 8v12.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V8H7z"/>
  </SvgIcon>
);
DeviceBattery90 = pure(DeviceBattery90)
DeviceBattery90.displayName = 'DeviceBattery90';

export default DeviceBattery90;
