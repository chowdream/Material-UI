import * as React from 'react';
import { StyledComponent } from '..';

export interface LinearProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'primary' | 'accent';
  mode?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value?: number;
  valueBuffer?: number;
}

export type LinearProgressClassKey =
  | 'root'
  | 'primaryColor'
  | 'primaryColorBar'
  | 'primaryDashed'
  | 'accentColor'
  | 'accentColorBar'
  | 'accentDashed'
  | 'bar'
  | 'dashed'
  | 'bufferBar2'
  | 'rootBuffer'
  | 'rootQuery'
  | 'indeterminateBar1'
  | 'indeterminateBar2'
  | 'determinateBar1'
  | 'bufferBar1'
  | 'bufferBar2Primary'
  | 'bufferBar2Accent'
  ;

declare const LinearProgress: StyledComponent<LinearProgressProps, LinearProgressClassKey>;

export default LinearProgress;
