import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AlertError = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </SvgIcon>
);
AlertError = pure(AlertError);
AlertError.displayName = 'AlertError';
AlertError.muiName = 'SvgIcon';

export default AlertError;
