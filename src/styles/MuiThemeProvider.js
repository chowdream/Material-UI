// @flow weak
import { Component, PropTypes } from 'react';
import { create } from 'jss';
import { createStyleManager } from 'jss-theme-reactor/styleManager';
import jssPreset from 'jss-preset-default';
import { createMuiTheme } from './theme';

export const MUI_SHEET_ORDER = [
  'Layout',
  'Collapse',
  'Fade',
  'Slide',

  'Backdrop',
  'Modal',

  'Ripple',
  'TouchRipple',

  'ButtonBase',

  'FormLabel',
  'FormGroup',

  'Text',
  'Paper',
  'Divider',

  'Popover',

  'Button',
  'IconButton',

  'SvgIcon',
  'Icon',

  'SwitchBase',
  'Switch',
  'Checkbox',
  'Radio',
  'RadioGroup',
  'SwitchLabel',

  'Dialog',
  'DialogActions',
  'DialogContent',
  'DialogContentText',
  'DialogTitle',

  'TabIndicator',
  'Tab',
  'Tabs',

  'BottomNavigationButton',
  'BottomNavigation',

  'CircularProgress',
  'LinearProgress',

  'AppBar',
  'Drawer',

  'ListItem',
  'ListItemText',
  'ListItemSecondaryAction',
  'ListSubheader',
  'List',

  'Menu',
  'MenuItem',

  'Avatar',

  'CardContent',
  'CardMedia',
  'CardActions',
  'CardHeader',
  'Card',

  'TextFieldLabel',
  'TextFieldInput',
  'TextField',

  'Table',
  'TableHead',
  'TableRow',
  'TableCell',
  'TableBody',
  'TableSortLabel',
  'Toolbar',
];

export default class MuiThemeProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    styleManager: PropTypes.object,
    theme: PropTypes.object,
  };

  static childContextTypes = {
    styleManager: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  static createDefaultContext(props = {}) {
    const theme = props.theme || createMuiTheme();
    const styleManager = props.styleManager || createStyleManager({
      theme,
      jss: create(jssPreset()),
    });

    if (!styleManager.sheetOrder) {
      styleManager.setSheetOrder(MUI_SHEET_ORDER);
    }

    return { theme, styleManager };
  }

  getChildContext() {
    const { theme, styleManager } = this;
    return {
      theme,
      styleManager,
    };
  }

  componentWillMount() {
    const { theme, styleManager } = MuiThemeProvider.createDefaultContext(this.props);
    this.theme = theme;
    this.styleManager = styleManager;
  }

  componentWillUpdate(nextProps) {
    if (this.styleManager !== nextProps.styleManager) {
      const { theme, styleManager } = MuiThemeProvider.createDefaultContext(nextProps);
      this.theme = theme;
      this.styleManager = styleManager;
    } else if (this.theme && nextProps.theme && nextProps.theme !== this.theme) {
      this.theme = nextProps.theme;
      this.styleManager.updateTheme(this.theme);
    }
  }

  theme = undefined;
  styleManager = undefined;

  render() {
    return this.props.children;
  }
}
