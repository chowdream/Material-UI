import { createMuiTheme } from '@material-ui/core';

// overrides story
{
  // reduced example from
  // https://github.com/mui-org/material-ui/blob/next/docs/src/pages/customization/typography/typography.md
  createMuiTheme({
    components: {
      MuiCssBaseline: {
        overrides: {
          '@global': {
            '@font-face': [{ fontFamily: 'custom', fontWeight: 600 }],
          },
        },
      },
    },
  });
  // assuming "@global" is a class
  createMuiTheme({
    components: {
      MuiCssBaseline: {
        overrides: {
          '@global': {
            // @ts-expect-error
            fontWeight: 'bold',
          },
        },
      },
    },
  });
  // reset.css
  createMuiTheme({
    components: {
      MuiCssBaseline: {
        overrides: {
          '@global': {
            ul: {
              'list-style': 'none',
            },
            p: {
              fontWeight: 'bolde', // undesired, should throw
            },
          },
        },
      },
    },
  });
}
