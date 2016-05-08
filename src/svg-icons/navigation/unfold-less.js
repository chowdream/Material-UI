import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NavigationUnfoldLess = (props) => (
  <SvgIcon {...props}>
    <path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"/>
  </SvgIcon>
);
NavigationUnfoldLess = pure(NavigationUnfoldLess);
NavigationUnfoldLess.displayName = 'NavigationUnfoldLess';
NavigationUnfoldLess.muiName = 'SvgIcon';

export default NavigationUnfoldLess;
