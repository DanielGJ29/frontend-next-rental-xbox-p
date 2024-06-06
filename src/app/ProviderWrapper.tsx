'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AuthGuard from '@/utils/AuthGuard';

//UseContext
import { ConfigProvider } from '@/context/configContext';

const darkTheme = createTheme({
  palette: {
    //mode: 'dark',
    mode: 'light'
  }
});

// next
import { SessionProvider } from 'next-auth/react';

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SessionProvider refetchInterval={0}>{children}</SessionProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}
