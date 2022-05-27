import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider, createBox } from '@mui/system';

const Box = createBox();

const { CssVarsProvider } = createCssVarsProvider({
  theme: {
    colorSchemes: {
      light: {
        background: {
          default: '#fff',
        },
      },
    },
  },
  defaultColorScheme: {
    light: 'light',
  },
});

export default function DarkModeSpecificity() {
  return (
    <CssVarsProvider modeStorageKey="dark-mode-specificity">
      <Box
        sx={(theme) => ({
          p: 2,
          color: '#fff',
          [theme.getColorSchemeSelector('light')]: {
            bgcolor: '#000',
          },
        })}
      >
        Background should be #000.
      </Box>
    </CssVarsProvider>
  );
}
