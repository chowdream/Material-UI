import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorBorderBottom = (props) => (
  <SvgIcon {...props}>
    <path d="M9 11H7v2h2v-2zm4 4h-2v2h2v-2zM9 3H7v2h2V3zm4 8h-2v2h2v-2zM5 3H3v2h2V3zm8 4h-2v2h2V7zm4 4h-2v2h2v-2zm-4-8h-2v2h2V3zm4 0h-2v2h2V3zm2 10h2v-2h-2v2zm0 4h2v-2h-2v2zM5 7H3v2h2V7zm14-4v2h2V3h-2zm0 6h2V7h-2v2zM5 11H3v2h2v-2zM3 21h18v-2H3v2zm2-6H3v2h2v-2z"/>
  </SvgIcon>
);
EditorBorderBottom = pure(EditorBorderBottom);
EditorBorderBottom.displayName = 'EditorBorderBottom';
EditorBorderBottom.muiName = 'SvgIcon';

export default EditorBorderBottom;
