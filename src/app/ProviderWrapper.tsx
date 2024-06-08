'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

//UseContext
import { ConfigProvider } from '@/context/configContext';

const darkTheme = createTheme({
  palette: {
    //mode: 'dark'
    mode: 'light'
  }
});

// next
import { SessionProvider } from 'next-auth/react';

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <SessionProvider refetchInterval={0}>{children}</SessionProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}
