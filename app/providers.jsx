'use client';

import { SessionProvider }  from 'next-auth/react'

// this provider is used to give all the child components access to the user's session
export function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}