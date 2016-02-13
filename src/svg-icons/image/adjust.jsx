import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ImageAdjust = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
  </SvgIcon>
);
ImageAdjust = pure(ImageAdjust)
ImageAdjust.displayName = 'ImageAdjust';

export default ImageAdjust;
