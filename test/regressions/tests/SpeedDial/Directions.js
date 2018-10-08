import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const styles = {
  root: {
    position: 'relative',
    height: 360,
    width: 400,
  },
  speedDial: {
    position: 'absolute',
    '&$directionUp': {
      bottom: 0,
      right: 0,
    },
    '&$directionRight': {
      bottom: 0,
      left: 0,
    },
    '&$directionDown': {
      top: 0,
      left: 0,
    },
    '&$directionLeft': {
      top: 0,
      right: 0,
    },
  },
  directionUp: {},
  directionRight: {},
  directionDown: {},
  directionLeft: {},
};

function SimpleSpeedDial(props) {
  const tooltipPlacement = {
    up: 'left',
    right: 'top',
    down: 'right',
    left: 'bottom',
  };
  const secondaryPlacement = ['-start', '', '-end'];

  return (
    <SpeedDial icon={<SpeedDialIcon />} open {...props}>
      {['A', 'B', 'C'].map((name, i) => {
        return (
          <SpeedDialAction
            key={name}
            icon={<Avatar>{name}</Avatar>}
            tooltipOpen
            tooltipPlacement={`${tooltipPlacement[props.direction]}${secondaryPlacement[i]}`}
            tooltipTitle={'Tooltip'}
          />
        );
      })}
    </SpeedDial>
  );
}

function Directions({ classes }) {
  const speedDialClassName = direction =>
    classNames(classes.speedDial, classes[`direction${capitalize(direction)}`]);

  return (
    <div className={classes.root}>
      {['up', 'right', 'down', 'left'].map(direction => {
        return (
          <SimpleSpeedDial
            key={direction}
            ariaLabel={direction}
            className={speedDialClassName(direction)}
            direction={direction}
          />
        );
      })}
    </div>
  );
}

Directions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Directions);
