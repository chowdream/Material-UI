import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionReceipt = (props) => (
  <SvgIcon {...props}>
    <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
  </SvgIcon>
);
ActionReceipt = pure(ActionReceipt);
ActionReceipt.displayName = 'ActionReceipt';
ActionReceipt.muiName = 'SvgIcon';

export default ActionReceipt;
