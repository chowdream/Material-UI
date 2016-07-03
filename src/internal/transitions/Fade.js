import React, {Component, PropTypes} from 'react';
import Transition from '../Transition';

export default class Fade extends Component {
  static propTypes = {
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    onExited: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  handleEnter = (element) => {
    element.style.opacity = 0;
    element.style.transition = this.context.theme.transitions.create('opacity');
  };

  handleEntering = (element) => {
    element.style.opacity = 1;
  };

  handleExit = (element) => {
    element.style.opacity = 0;
  };

  render() {
    const {children, ...other} = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        timeout={2000}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
