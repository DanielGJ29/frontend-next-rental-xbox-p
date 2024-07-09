'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//import { esES } from '@mui/material/locale';
//import { esES as dataGridsES } from '@mui/x-data-grid';
import { esES as coreEsES } from '@mui/material/locale';
import { esES } from '@mui/x-date-pickers/locales';

//UseContext
import { ConfigProvider } from '@/context/configContext';

// const theme = createTheme({
//   palette: {
//     //mode: 'dark'
//     mode: 'light'
//   }
// });

const theme = createTheme(
  {
    palette: {
      // primary: { main: '#1976d2' },
    }
  },
  esES,
  coreEsES
);

// next
import { SessionProvider } from 'next-auth/react';

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <SessionProvider refetchInterval={0}>{children}</SessionProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}
