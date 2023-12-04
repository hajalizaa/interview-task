import type { Metadata } from 'next';

import { ReduxProvider } from 'components/providers/ReduxProvider';
import QueryClientProvider from 'components/providers/QueryClientProvider';
import { PersistGateProvider } from 'components/providers/PersistGateProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <PersistGateProvider>
            <QueryClientProvider>{children}</QueryClientProvider>
          </PersistGateProvider>
        </ReduxProvider>

        {/* <ReduxProvider>
          
            <QueryClientProvider> */}
        {/* </QueryClientProvider>
          </PersistGateProvider>
        </ReduxProvider> */}
      </body>
    </html>
  );
}