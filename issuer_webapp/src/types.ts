import { Dispatch, SetStateAction } from 'react';

export interface Issuer {
  id: string;
  name: string;
  logo: string;
  did: string;
}

export interface Certificate {
  id: string;
  recipientName: string;
  recipientEmail: string;
  credentialTitle: string;
  certificateNumber: string;
  issueDate: string;
  expirationDate: string;
  issuerId: string;
  isRevoked: boolean;
  documentHash?: string;
  hashAlgorithm?: string;
}

export interface RegisteredUser {
  email: string;
  fullName: string;
  registrationDate: string;
  registeredBy: string;
}

export interface IssuerContextType {
  currentIssuer: Issuer | null;
  setCurrentIssuer: (issuer: Issuer | null) => void;
}

export interface CertificateContextType {
  certificates: Certificate[];
  registeredUsers: RegisteredUser[];
  addCertificate: (certificate: Omit<Certificate, 'hash' | 'transactionId'>) => void;
  revokeCertificate: (id: string) => void;
  getCertificatesByEmail: (email: string) => Certificate[];
  registerUser: (user: RegisteredUser) => void;
  getRegisteredUser: (email: string) => RegisteredUser | undefined;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  currentUser: RegisteredUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface FileUploadState {
  file: File | null;
  hash: string;
  status: 'idle' | 'uploading' | 'hashing' | 'complete' | 'error';
  error: string | null;
}

export interface FileUploadContextType {
  fileState: FileUploadState;
  setFileState: Dispatch<SetStateAction<FileUploadState>>;
  handleFileUpload: (file: File) => Promise<void>;
  generateHash: () => Promise<void>;
}