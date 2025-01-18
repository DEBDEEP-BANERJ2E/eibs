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
}

export interface IssuerContextType {
  currentIssuer: Issuer | null;
  setCurrentIssuer: (issuer: Issuer | null) => void;
}

export interface CertificateContextType {
  certificates: Certificate[];
  addCertificate: (certificate: Certificate) => void;
  revokeCertificate: (id: string) => void;
  getCertificatesByEmail: (email: string) => Certificate[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}