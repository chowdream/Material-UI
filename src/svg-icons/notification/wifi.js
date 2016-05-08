import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NotificationWifi = (props) => (
  <SvgIcon {...props}>
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
  </SvgIcon>
);
NotificationWifi = pure(NotificationWifi);
NotificationWifi.displayName = 'NotificationWifi';
NotificationWifi.muiName = 'SvgIcon';

export default NotificationWifi;
