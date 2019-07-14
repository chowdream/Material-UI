import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Ripple from './Ripple';

const DURATION = 550;
export const DELAY_RIPPLE = 80;

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
  /* Styles applied to the internal `Ripple` components `ripple` class. */
  ripple: {
    opacity: 0,
    position: 'absolute',
  },
  /* Styles applied to the internal `Ripple` components `rippleVisible` class. */
  rippleVisible: {
    opacity: 0.3,
    transform: 'scale(1)',
    animation: `mui-ripple-enter ${DURATION}ms ${theme.transitions.easing.easeInOut}`,
    // Backward compatible logic between JSS v9 and v10.
    // To remove with the release of Material-UI v4
    animationName: '$mui-ripple-enter',
  },
  /* Styles applied to the internal `Ripple` components `ripplePulsate` class. */
  ripplePulsate: {
    animationDuration: `${theme.transitions.duration.shorter}ms`,
  },
  /* Styles applied to the internal `Ripple` components `child` class. */
  child: {
    opacity: 1,
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  /* Styles applied to the internal `Ripple` components `childLeaving` class. */
  childLeaving: {
    opacity: 0,
    animation: `mui-ripple-exit ${DURATION}ms ${theme.transitions.easing.easeInOut}`,
    // Backward compatible logic between JSS v9 and v10.
    // To remove with the release of Material-UI v4
    animationName: '$mui-ripple-exit',
  },
  /* Styles applied to the internal `Ripple` components `childPulsate` class. */
  childPulsate: {
    position: 'absolute',
    left: 0,
    top: 0,
    animation: `mui-ripple-pulsate 2500ms ${theme.transitions.easing.easeInOut} 200ms infinite`,
    // Backward compatible logic between JSS v9 and v10.
    // To remove with the release of Material-UI v4
    animationName: '$mui-ripple-pulsate',
  },
  '@keyframes mui-ripple-enter': {
    '0%': {
      transform: 'scale(0)',
      opacity: 0.1,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 0.3,
    },
  },
  '@keyframes mui-ripple-exit': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
  '@keyframes mui-ripple-pulsate': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(0.92)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});

// TODO v5: Make private
const TouchRipple = React.forwardRef(function TouchRipple(props, ref) {
  const { center: centerProp = false, classes, className, ...other } = props;
  const [ripples, setRipples] = React.useState([]);
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef(null);

  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef(false);
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = React.useRef(null);

  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = React.useRef(null);
  const container = React.useRef(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);

  const startCommit = React.useCallback(
    params => {
      const { pulsate, rippleX, rippleY, rippleSize, cb } = params;

      setRipples(oldRipples => [
        ...oldRipples,
        <Ripple
          key={nextKey.current}
          classes={classes}
          timeout={DURATION}
          pulsate={pulsate}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
        />,
      ]);
      nextKey.current += 1;
      rippleCallback.current = cb;
    },
    [classes],
  );

  const start = React.useCallback(
    (event = {}, options = {}, cb) => {
      const {
        pulsate = false,
        center = centerProp || options.pulsate,
        fakeElement = false, // For test purposes
      } = options;

      if (event.type === 'mousedown' && ignoringMouseDown.current) {
        ignoringMouseDown.current = false;
        return;
      }

      if (event.type === 'touchstart') {
        ignoringMouseDown.current = true;
      }

      const element = fakeElement ? null : container.current;
      const rect = element
        ? element.getBoundingClientRect()
        : {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
          };

      // Get the size of the ripple
      let rippleX;
      let rippleY;
      let rippleSize;

      if (
        center ||
        (event.clientX === 0 && event.clientY === 0) ||
        (!event.clientX && !event.touches)
      ) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
      } else {
        const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
        const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
      }

      if (center) {
        rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

        // For some reason the animation is broken on Mobile Chrome if the size if even.
        if (rippleSize % 2 === 0) {
          rippleSize += 1;
        }
      } else {
        const sizeX =
          Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
        const sizeY =
          Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
      }

      // Touche devices
      if (event.touches) {
        // Prepare the ripple effect.
        startTimerCommit.current = () => {
          startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
        };
        // Delay the execution of the ripple effect.
        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
      } else {
        startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
      }
    },
    [centerProp, startCommit],
  );

  const pulsate = React.useCallback(() => {
    start({}, { pulsate: true });
  }, [start]);

  const stop = React.useCallback((event, cb) => {
    clearTimeout(startTimer.current);

    // The touch interaction occurs too quickly.
    // We still want to show ripple effect.
    if (event.type === 'touchend' && startTimerCommit.current) {
      event.persist();
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }

    startTimerCommit.current = null;

    setRipples(oldRipples => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);

  React.useImperativeHandle(
    ref,
    () => ({
      pulsate,
      start,
      stop,
    }),
    [pulsate, start, stop],
  );

  return (
    <span className={clsx(classes.root, className)} ref={container} {...other}>
      <TransitionGroup component={null} exit>
        {ripples}
      </TransitionGroup>
    </span>
  );
});

// TODO cleanup after https://github.com/reactjs/react-docgen/pull/378 is released
function withMuiName(Component) {
  Component.muiName = 'MuiTouchRipple';
  return Component;
}

TouchRipple.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { flip: false, name: 'MuiTouchRipple' })(
  withMuiName(React.memo(TouchRipple)),
);
