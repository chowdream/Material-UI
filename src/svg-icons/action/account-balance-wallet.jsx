import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionAccountBalanceWallet = (props) => (
  <SvgIcon {...props}>
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </SvgIcon>
);
ActionAccountBalanceWallet = pure(ActionAccountBalanceWallet)
ActionAccountBalanceWallet.displayName = 'ActionAccountBalanceWallet';

export default ActionAccountBalanceWallet;
