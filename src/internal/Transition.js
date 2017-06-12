// @flow weak

import React, { Component } from 'react';
import type { Element as ReactElement } from 'react'; // DOM type `Element` used below
import ReactDOM from 'react-dom';
import transitionInfo from 'dom-helpers/transition/properties';
import addEventListener from 'dom-helpers/events/on';
import classNames from 'classnames';

const transitionEndEvent = transitionInfo.end;

export const UNMOUNTED = 0;
export const EXITED = 1;
export const ENTERING = 2;
export const ENTERED = 3;
export const EXITING = 4;

type State = {
  status: 0 | 1 | 2 | 3 | 4,
};

type DOMNode = Element | Text | null; // return type of ReactDOM.findDOMNode()

type TransitionCallback = (node: DOMNode) => void;

type DefaultProps = {
  in: boolean,
  unmountOnExit: boolean,
  transitionAppear: boolean,
  timeout: number,
  onEnter: TransitionCallback,
  onEntering: TransitionCallback,
  onEntered: TransitionCallback,
  onExit: TransitionCallback,
  onExiting: TransitionCallback,
  onExited: TransitionCallback,
};

// A helper function that calls back when any pending animations have started
// This is needed as the callback hooks might be setting some style properties
// that needs a frame to take effect.
function requestAnimationStart(callback) {
  // Feature detect rAF, fallback to setTimeout
  if (window.requestAnimationFrame) {
    // Chrome and Safari have a bug where calling rAF once returns the current
    // frame instead of the next frame, so we need to call a double rAF here.
    // See https://crbug.com/675795 for more.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(callback);
    });
  } else {
    setTimeout(callback, 0);
  }
}

type Props = DefaultProps & {
  /**
   * The content of the component.
   */
  children?: ReactElement<*>,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The CSS class applied when the component is entered.
   */
  enteredClassName?: string,
  /**
   * The CSS class applied while the component is entering.
   */
  enteringClassName?: string,
  /**
   * The CSS class applied when the component has exited.
   */
  exitedClassName?: string,
  /**
   * The CSS class applied while the component is exiting.
   */
  exitingClassName?: string,
  /**
   * Show the component; triggers the enter or exit animation.
   */
  in?: boolean,
  /**
   * Callback fired before the "entering" classes are applied.
   */
  onEnter?: TransitionCallback,
  /**
   * Callback fired after the "entering" classes are applied.
   */
  onEntering?: TransitionCallback,
  /**
   * Callback fired after the "enter" classes are applied.
   */
  onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the "exiting" classes are applied.
   */
  onExit?: TransitionCallback,
  /**
   * Callback fired after the "exiting" classes are applied.
   */
  onExiting?: TransitionCallback,
  /**
   * Callback fired after the "exited" classes are applied.
   */
  onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * @ignore
   */
  onRequestTimeout?: TransitionCallback,
  /**
   * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
   * transition indefinitely if the browser transitionEnd events are
   * canceled or interrupted.
   *
   * By default this is set to a high number (5 seconds) as a failsafe. You should consider
   * setting this to the duration of your animation (or a bit above it).
   */
  timeout?: number,
  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown.
   */
  transitionAppear?: boolean,
  /**
   * Unmount the component (remove it from the DOM) when it is not shown.
   */
  unmountOnExit?: boolean,
};

// Name the function so it is clearer in the documentation
function noop() {}

/**
 * Drawn from https://raw.githubusercontent.com/react-bootstrap/react-overlays/master/src/Transition.js
 *
 * The Transition component lets you define and run CSS transitions with a simple declarative api.
 * It works similarly to React's own CSSTransitionGroup
 * but is specifically optimized for transitioning a single child "in" or "out".
 *
 * You don't even need to use class based CSS transitions if you don't want to (but it is easiest).
 * The extensive set of lifecyle callbacks means you have control over
 * the transitioning now at each step of the way.
 */
class Transition extends Component<DefaultProps, Props, State> {
  props: Props;

  static defaultProps: DefaultProps = {
    in: false,
    unmountOnExit: false,
    transitionAppear: false,
    timeout: 5000,
    onEnter: noop,
    onEntering: noop,
    onEntered: noop,
    onExit: noop,
    onExiting: noop,
    onExited: noop,
  };

  state: State = {
    status: UNMOUNTED,
  };

  componentWillMount() {
    let status;

    if (this.props.in) {
      // Start enter transition in componentDidMount.
      status = this.props.transitionAppear ? EXITED : ENTERED;
    } else {
      status = this.props.unmountOnExit ? UNMOUNTED : EXITED;
    }

    this.setState({ status });
    this.nextCallback = null;
  }

  componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.in && this.props.unmountOnExit) {
      if (this.state.status === UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        this.setState({ status: EXITED });
      }
    } else {
      this.needsUpdate = true;
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.props.in && this.state.status === EXITED && this.state.status === nextState.status) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    const status = this.state.status;

    if (this.props.unmountOnExit && status === EXITED) {
      // EXITED is always a transitional state to either ENTERING or UNMOUNTED
      // when using unmountOnExit.
      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        this.setState({ status: UNMOUNTED }); // eslint-disable-line react/no-did-update-set-state
      }

      return;
    }

    // guard ensures we are only responding to prop changes
    if (this.needsUpdate) {
      this.needsUpdate = false;

      if (this.props.in) {
        if (status === EXITING) {
          this.performEnter(this.props);
        } else if (status === EXITED) {
          this.performEnter(this.props);
        }
        // Otherwise we're already entering or entered.
      } else if (status === ENTERING || status === ENTERED) {
        this.performExit(this.props);
      }
      // Otherwise we're already exited or exiting.
    }
  }

  componentWillUnmount() {
    this.cancelNextCallback();
  }

  nextCallback = null;
  needsUpdate = false;

  performEnter(props: Props) {
    this.cancelNextCallback();
    const node = ReactDOM.findDOMNode(this);

    props.onEnter(node);
    return this.performEntering(node);
  }

  performEntering(node: DOMNode) {
    this.safeSetState({ status: ENTERING }, () => {
      this.props.onEntering(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: ENTERED }, () => {
          this.props.onEntered(node);
        });
      });
    });
  }

  performExit(props: Props) {
    this.cancelNextCallback();
    const node = ReactDOM.findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onExit(node);

    this.safeSetState({ status: EXITING }, () => {
      this.props.onExiting(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: EXITED }, () => {
          this.props.onExited(node);
        });
      });
    });
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }

  safeSetState(nextState: State, callback: Function) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    this.setState(nextState, this.setNextCallback(callback));
  }

  setNextCallback(callback) {
    let active = true;

    // FIXME: These next two blocks are a real enigma for flow typing outside of weak mode.
    // FIXME: I suggest we refactor - rosskevin
    this.nextCallback = (event?: Event) => {
      requestAnimationStart(() => {
        if (active) {
          active = false;
          this.nextCallback = null;

          callback(event);
        }
      });
    };

    this.nextCallback.cancel = () => {
      active = false;
    };

    return this.nextCallback;
  }

  onTransitionEnd(node: DOMNode, handler) {
    this.setNextCallback(handler);

    if (node) {
      addEventListener(node, transitionEndEvent, event => {
        if (event.target === node && this.nextCallback) {
          this.nextCallback();
        }
      });
      setTimeout(this.nextCallback, this.getTimeout(node));
    } else {
      setTimeout(this.nextCallback, 0);
    }
  }

  getTimeout(node: DOMNode) {
    let timeout;

    if (this.props.onRequestTimeout) {
      timeout = this.props.onRequestTimeout(node);
    }

    if (typeof timeout !== 'number') {
      timeout = this.props.timeout;
    }

    return timeout;
  }

  render() {
    const { status } = this.state;
    if (status === UNMOUNTED) {
      return null;
    }

    const {
      children,
      className,
      in: inProp,
      enteredClassName,
      enteringClassName,
      exitedClassName,
      exitingClassName,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onRequestTimeout,
      timeout,
      transitionAppear,
      unmountOnExit,
      ...other
    } = this.props;

    let transitionClassName;
    if (status === EXITED) {
      transitionClassName = this.props.exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = this.props.enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = this.props.enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = this.props.exitingClassName;
    }

    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: classNames(child.props.className, className, transitionClassName),
      ...other,
    });
  }
}

export default Transition;
