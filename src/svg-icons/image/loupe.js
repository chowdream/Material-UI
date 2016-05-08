import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageLoupe = (props) => (
  <SvgIcon {...props}>
    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10h8c1.1 0 2-.9 2-2v-8c0-5.51-4.49-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </SvgIcon>
);
ImageLoupe = pure(ImageLoupe);
ImageLoupe.displayName = 'ImageLoupe';
ImageLoupe.muiName = 'SvgIcon';

export default ImageLoupe;
