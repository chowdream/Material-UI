import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { TypographyProps } from '@material-ui/core/Typography';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ExtendMui } from '../typings/extendMui';
import ToolbarText from './ToolbarText';

export interface ToolbarButtonProps
  extends ExtendMui<ButtonProps, 'variant'>,
    WithStyles<typeof styles> {
  variant: TypographyProps['variant'];
  selected: boolean;
  label: string;
  typographyClassName?: string;
}

const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = ({
  classes,
  className = null,
  label,
  selected,
  variant,
  typographyClassName,
  ...other
}) => {
  return (
    <Button className={clsx(classes.toolbarBtn, className)} {...other}>
      <ToolbarText
        className={typographyClassName}
        variant={variant}
        label={label}
        selected={selected}
      />
    </Button>
  );
};

(ToolbarButton as any).propTypes = {
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,
  className: PropTypes.string,
  innerRef: PropTypes.any,
};

ToolbarButton.defaultProps = {
  className: '',
};

export const styles = createStyles({
  toolbarBtn: {
    padding: 0,
    minWidth: '16px',
    textTransform: 'none',
  },
});

export default withStyles(styles, { name: 'MuiPickersToolbarButton' })(ToolbarButton);
