import React, { createContext, useState, useContext } from 'react';
import { Certificate, CertificateContextType, RegisteredUser } from '../types';

const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export function CertificateProvider({ children }: { children: React.ReactNode }) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

  const generateHash = (certificate: Omit<Certificate, 'hash' | 'transactionId'>) => {
    const data = JSON.stringify(certificate);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
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

  const registerUser = (user: RegisteredUser) => {
    setRegisteredUsers([...registeredUsers, user]);
  };

  const getRegisteredUser = (email: string) => {
    return registeredUsers.find(user => user.email === email);
  };

  return (
    <CertificateContext.Provider value={{ 
      certificates, 
      registeredUsers,
      addCertificate, 
      revokeCertificate,
      getCertificatesByEmail,
      registerUser,
      getRegisteredUser
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