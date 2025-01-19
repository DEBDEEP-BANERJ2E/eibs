import React, { createContext, useState, useContext } from 'react';
import { Issuer, IssuerContextType } from '../types';

const IssuerContext = createContext<IssuerContextType | undefined>(undefined);

export function IssuerProvider({ children }: { children: React.ReactNode }) {
  const [currentIssuer, setCurrentIssuer] = useState<Issuer | null>(null);

  return (
    <IssuerContext.Provider value={{ currentIssuer, setCurrentIssuer }}>
      {children}
    </IssuerContext.Provider>
  );
}

export function useIssuer() {
  const context = useContext(IssuerContext);
  if (context === undefined) {
    throw new Error('useIssuer must be used within an IssuerProvider');
  }
  return context;
}