import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '..';

export interface SpeedDialIconProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the icon component. */
    icon?: string;
    /** Styles applied to the icon component if `open={true}`. */
    iconOpen?: string;
    /** Styles applied to the icon when an `openIcon` is provided and if `open={true}`. */
    iconWithOpenIconOpen?: string;
    /** Styles applied to the `openIcon` if provided. */
    openIcon?: string;
    /** Styles applied to the `openIcon` if provided and if `open={true}`. */
    openIconOpen?: string;
  };
  /**
   * The icon to display.
   */
  icon?: React.ReactNode;
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type SpeedDialIconClassKey = keyof NonNullable<SpeedDialIconProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://material-ui.com/components/speed-dial/)
 *
 * API:
 *
 * - [SpeedDialIcon API](https://material-ui.com/api/speed-dial-icon/)
 */
export default function SpeedDialIcon(props: SpeedDialIconProps): JSX.Element;
