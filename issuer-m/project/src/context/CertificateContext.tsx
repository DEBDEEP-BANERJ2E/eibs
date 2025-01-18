import React, { createContext, useState, useContext } from 'react';
import { Certificate, CertificateContextType } from '../types';

const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export function CertificateProvider({ children }: { children: React.ReactNode }) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Simple hash function for browser compatibility
  const generateHash = (certificate: Omit<Certificate, 'hash' | 'transactionId'>) => {
    const data = JSON.stringify(certificate);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16).padStart(64, '0');
  };

  const generateTransactionId = () => {
    return `0x${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
  };

  const addCertificate = (certificateData: Omit<Certificate, 'hash' | 'transactionId'>) => {
    const hash = generateHash(certificateData);
    const transactionId = generateTransactionId();
    const certificate = { ...certificateData, hash, transactionId };
    setCertificates([...certificates, certificate]);
  };

  const revokeCertificate = (id: string) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? { ...cert, isRevoked: true } : cert
    ));
  };

  const getCertificatesByEmail = (email: string) => {
    return certificates.filter(cert => cert.recipientEmail === email);
  };

  return (
    <CertificateContext.Provider value={{ 
      certificates, 
      addCertificate, 
      revokeCertificate,
      getCertificatesByEmail 
    }}>
      {children}
    </CertificateContext.Provider>
  );
}

export function useCertificates() {
  const context = useContext(CertificateContext);
  if (context === undefined) {
    throw new Error('useCertificates must be used within a CertificateProvider');
  }
  return context;
}