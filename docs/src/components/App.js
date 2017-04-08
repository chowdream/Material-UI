// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider, { MUI_SHEET_ORDER } from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { blue, pink } from 'material-ui/styles/colors';
import { lightTheme, darkTheme, setPrismTheme } from 'docs/src/utils/prism';
import AppRouter from 'docs/src/components/AppRouter';

function App(props) {
  const { dark } = props;

  const palette = createPalette({
    primary: blue,
    accent: pink,
    type: dark ? 'dark' : 'light',
  });

  const { styleManager, theme } = MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({ palette }),
  });

  styleManager.setSheetOrder(MUI_SHEET_ORDER.concat([
    'AppContent',
    'AppDrawer',
    'AppDrawerNavItem',
    'AppFrame',
    'MarkdownDocs',
    'MarkdownElement',
    'Demo',
  ]));

  if (dark) {
    setPrismTheme(darkTheme);
  } else {
    setPrismTheme(lightTheme);
  }

  return (
    <MuiThemeProvider theme={theme} styleManager={styleManager}>
      <AppRouter />
    </MuiThemeProvider>
  );
}

App.propTypes = {
  dark: PropTypes.bool.isRequired,
};

export default connect((state) => ({ dark: state.dark }))(App);
