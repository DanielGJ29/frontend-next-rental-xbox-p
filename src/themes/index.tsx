import React, { ReactNode, useContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

//Context
import ConfigContext from '@/context/configContext';
import { PaletteMode } from '@mui/material';

// types
type ThemeCustomizationProps = {
  children: ReactNode;
};

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { mode: currentModeTheme } = React.useContext(ConfigContext);
  const [mode, setMode] = React.useState<PaletteMode>(currentModeTheme);

  useMemo(() => {
    setMode(currentModeTheme);
  }, [currentModeTheme]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            // main: '#107C10',
            main: 'rgb(16, 124, 16)',
            800: '#107C10',
            900: '#005d00',
            700: '#218d1d',
            600: '#2f9f28',
            500: '#39ae31',
            400: '#59ba53',
            300: '#78c672',
            200: '#a0d59b',
            100: '#c5e6c2',
            50: '#e7f5e6'
          },
          secondary: {
            main: '#3A3A3A',
            900: '#1a1a1a',
            700: '#585858',
            600: '#6c6c6c',
            500: '#949494',
            400: '#b4b4b4',
            300: '#d8d8d8'
          }
        }
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
}
