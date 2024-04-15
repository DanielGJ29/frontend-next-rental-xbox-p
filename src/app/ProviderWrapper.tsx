'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    // mode: 'dark',
    mode: 'light'
  }
});

// next
import { SessionProvider } from 'next-auth/react';

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
