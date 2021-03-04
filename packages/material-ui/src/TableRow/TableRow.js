import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import { alpha } from '../styles/colorManipulator';

import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import tableRowClasses, { getTableRowUtilityClass } from './tableRowClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...(styleProps.head && styles.head),
      ...(styleProps.footer && styles.footer),
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { classes, selected, hover, head, footer } = styleProps;

  const slots = {
    root: ['root', selected && 'selected', hover && 'hover', head && 'head', footer && 'footer'],
  };

  return composeClasses(slots, getTableRowUtilityClass, classes);
};

const TableRowRoot = experimentalStyled(
  'tr',
  {},
  {
    name: 'MuiTableRow',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme }) => ({
  /* Styles applied to the root element. */
  color: 'inherit',
  display: 'table-row',
  verticalAlign: 'middle',
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  [`&.${tableRowClasses.hover}:hover`]: {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  },
}));

const defaultComponent = 'tr';
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
const TableRow = React.forwardRef(function TableRow(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTableRow' });
  const {
    className,
    component = defaultComponent,
    hover = false,
    selected = false,
    ...other
  } = props;
  const tablelvl2 = React.useContext(Tablelvl2Context);

  const styleProps = {
    ...props,
    component,
    hover,
    selected,
    head: tablelvl2 && tablelvl2.variant === 'head',
    footer: tablelvl2 && tablelvl2.variant === 'footer',
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <TableRowRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      role={component === defaultComponent ? null : 'row'}
      styleProps={styleProps}
      {...other}
    />
  );
});

TableRow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Should be valid <tr> children such as `TableCell`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the table row will shade on hover.
   * @default false
   */
  hover: PropTypes.bool,
  /**
   * If `true`, the table row will have the selected shading.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default TableRow;
