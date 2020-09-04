import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { TypographyProps } from '../Typography';

export interface ListItemTextProps<
  PrimaryTypographyComponent extends React.ElementType = 'span',
  SecondaryTypographyComponent extends React.ElementType = 'p'
> extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * Alias for the `primary` prop.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the `Typography` components if primary and secondary are set. */
    multiline?: string;
    /** Styles applied to the `Typography` components if dense. */
    dense?: string;
    /** Styles applied to the root element if `inset={true}`. */
    inset?: string;
    /** Styles applied to the primary `Typography` component. */
    primary?: string;
    /** Styles applied to the secondary `Typography` component. */
    secondary?: string;
  };
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography?: boolean;
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset?: boolean;
  /**
   * The main content element.
   */
  primary?: React.ReactNode;
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps?: TypographyProps<
    PrimaryTypographyComponent,
    { component?: PrimaryTypographyComponent }
  >;
  /**
   * The secondary content element.
   */
  secondary?: React.ReactNode;
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps?: TypographyProps<
    SecondaryTypographyComponent,
    { component?: SecondaryTypographyComponent }
  >;
}

export type ListItemTextClassKey = keyof NonNullable<ListItemTextProps['classes']>;
/**
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemText API](https://material-ui.com/api/list-item-text/)
 */
export default function ListItemText<
  PrimaryTypographyComponent extends React.ElementType = 'span',
  SecondaryTypographyComponent extends React.ElementType = 'p'
>(props: ListItemTextProps<PrimaryTypographyComponent, SecondaryTypographyComponent>): JSX.Element;
