import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ToolbarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    disableGutters?: boolean;
    variant?: 'regular' | 'dense';
  };
  defaultComponent: D;
  classKey: ToolbarClassKey;
}

declare const Toolbar: OverridableComponent<ToolbarTypeMap>;

export type ToolbarClassKey = 'root' | 'gutters' | 'regular' | 'dense';

export type ToolbarProps<
  D extends React.ElementType = ToolbarTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ToolbarTypeMap<P, D>, D>;

export default Toolbar;
