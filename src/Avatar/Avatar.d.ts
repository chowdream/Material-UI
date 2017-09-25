import * as React from 'react';
import { StyledComponent } from '..';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  alt?: string;
  childrenClassName?: string;
  component?: React.ReactType;
  imgProps?: Object;
  sizes?: string;
  src?: string;
  srcSet?: string;
}

declare const Avatar: StyledComponent<AvatarProps>;

export default Avatar;
