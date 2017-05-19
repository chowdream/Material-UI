// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiListItemSecondaryAction', (theme) => ({
  secondaryAction: {
    position: 'absolute',
    right: 4,
    top: '50%',
    marginTop: -theme.spacing.unit * 3,
  },
}));

export default function ListItemSecondaryAction(props, context) {
  const {
    children,
    className: classNameProp,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.secondaryAction, classNameProp);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

ListItemSecondaryAction.propTypes = {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

ListItemSecondaryAction.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
