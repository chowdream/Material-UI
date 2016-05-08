import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalWifiOff = (props) => (
  <SvgIcon {...props}>
    <path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"/>
  </SvgIcon>
);
DeviceSignalWifiOff = pure(DeviceSignalWifiOff);
DeviceSignalWifiOff.displayName = 'DeviceSignalWifiOff';
DeviceSignalWifiOff.muiName = 'SvgIcon';

export default DeviceSignalWifiOff;
