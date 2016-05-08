import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageMovieFilter = (props) => (
  <SvgIcon {...props}>
    <path d="M18 4l2 3h-3l-2-3h-2l2 3h-3l-2-3H8l2 3H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-6.75 11.25L10 18l-1.25-2.75L6 14l2.75-1.25L10 10l1.25 2.75L14 14l-2.75 1.25zm5.69-3.31L16 14l-.94-2.06L13 11l2.06-.94L16 8l.94 2.06L19 11l-2.06.94z"/>
  </SvgIcon>
);
ImageMovieFilter = pure(ImageMovieFilter);
ImageMovieFilter.displayName = 'ImageMovieFilter';
ImageMovieFilter.muiName = 'SvgIcon';

export default ImageMovieFilter;
