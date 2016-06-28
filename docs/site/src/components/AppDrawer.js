import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ClassNames from 'classnames';
import {createStyleSheet} from 'stylishly';
import {List, ListItem} from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Text from 'material-ui/Text';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/internal/transitions/Collapse';
import shallowEqual from 'recompose/shallowEqual';

export const styleSheet = createStyleSheet('AppDrawer', (theme) => {
  return {
    paper: {
      width: '275px',
      backgroundColor: theme.palette.background.paper,
    },
    button: theme.mixins.gutters({
      borderRadius: 0,
      justifyContent: 'flex-start',
      textTransform: 'none',
      width: '100%',
      '&:hover': {
        textDecoration: 'none',
      },
    }),
    nav: {
      flex: '1 0 auto',
      navItem: {
        ...theme.typography.body2,
        display: 'block',
        paddingTop: 0,
        paddingBottom: 0,
      },
      navLink: {
        fontWeight: 400,
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
        button: {
          color: theme.palette.text.secondary,
          textIndent: 24,
          fontSize: 13,
        },
        activeButton: {
          color: theme.palette.text.primary,
        },
      },
    },
    title: {
      color: theme.palette.text.secondary,
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.primary[500],
      },
    },
  };
});

export default class AppDrawer extends Component {
  static propTypes = {
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    routes: PropTypes.array,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    nav: null,
    open: [],
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     !shallowEqual(this.props, nextProps) ||
  //     !shallowEqual(this.state, nextState)
  //   );
  // }

  renderNav(navRoot, props = {}) {
    return (
      <List {...props}>
        {this.renderNavItems(navRoot)}
      </List>
    );
  }

  renderNavItems(navRoot) {
    if (navRoot.childRoutes && navRoot.childRoutes.length) {
      return navRoot.childRoutes.reduce(this.reduceChildRoutes, []);
    }
  }

  handleNavParentClick = (id) => {
    const index = this.state.open.indexOf(id);
    const open = [...this.state.open];

    if (index !== -1) {
      open.splice(index, 1);
    } else {
      open.push(id);
    }

    return this.setState({open});
  };

  reduceChildRoutes = (items, childRoute, index) => {
    if (childRoute.nav) {
      if (childRoute.childRoutes && childRoute.childRoutes.length) {
        const open = this.state.open.indexOf(childRoute.path) !== -1;
        items.push(
          <ListItem className={this.classes.navItem} key={index} gutters={false}>
            <Button
              className={this.classes.button}
              onClick={() => this.handleNavParentClick(childRoute.path)}
            >
              {childRoute.title}
            </Button>
            <Collapse in={open} autoDuration={true}>{this.renderNav(childRoute)}</Collapse>
          </ListItem>
        );
      } else {
        items.push(
          <ListItem
            className={this.classes.navLink}
            key={index}
            gutters={false}
          >
            <Button
              component={Link}
              onClick={this.props.onRequestClose}
              to={childRoute.path}
              className={this.classes.button}
              activeClassName={this.classes.activeButton}
              ripple={false}
            >
              {childRoute.title}
            </Button>
          </ListItem>
        );
      }
    }
    return items;
  };

  render() {
    this.classes = this.context.styleManager.render(styleSheet);
    this.classes.activeNavLink = ClassNames(this.classes.navLink, this.classes.activeLink);

    return (
      <Drawer
        paperClassName={this.classes.paper}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <div className={this.classes.nav}>
          <Toolbar>
            <Link className={this.classes.title} to="/" onClick={this.props.onRequestClose}>
              <Text type="title">Material UI</Text>
            </Link>
            <Divider absolute={true} />
          </Toolbar>
          {this.renderNav(this.props.routes[0])}
        </div>
      </Drawer>
    );
  }
}
