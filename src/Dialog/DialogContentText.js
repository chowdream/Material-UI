// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiDialogContentText', theme => ({
  root: {
    ...theme.typography.subheading,
    color: theme.palette.text.secondary,
    margin: 0,
  },
}));

function DialogContentText(props) {
  const { children, classes, className, ...other } = props;

  return (
    <p className={classNames(classes.root, className)} {...other}>
      {children}
    </p>
  );
}

DialogContentText.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styleSheet)(DialogContentText);
