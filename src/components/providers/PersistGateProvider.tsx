'use client';

import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from '@redux';
import { useEffect, useState } from 'react';

export const PersistGateProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return <PersistGate persistor={persistor}>{children}</PersistGate>;

  return children;
};
