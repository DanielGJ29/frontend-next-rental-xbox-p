// next
import type { Metadata } from 'next';

// import { Inter } from 'next/font/google';

import './globals.css';

import ProviderWrapper from './ProviderWrapper';

export const metadata: Metadata = {
  title: 'Cyber Play',
  description: 'Cyber play'
  //viewport: 'initial-scale=1, width=device-width'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
