import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { RegisteredUser } from '../types';
import { useCertificates } from './CertificateContext';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  currentUser: RegisteredUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: 'admin'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(null);
  const { getRegisteredUser } = useCertificates();

  const login = async (email: string, password: string) => {
    try {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        setIsAuthenticated(true);
        setIsAdmin(true);
        setUserEmail(email);
        setCurrentUser({
          email,
          fullName: 'System Administrator',
          registrationDate: new Date().toISOString(),
          registeredBy: 'system'
        });
        toast.success('Admin logged in successfully');
      } else if (email.endsWith('@gmail.com') && password === 'user') {
        const registeredUser = getRegisteredUser(email);
        if (!registeredUser) {
          throw new Error('User not registered');
        }
        setIsAuthenticated(true);
        setIsAdmin(false);
        setUserEmail(email);
        setCurrentUser(registeredUser);
        toast.success('User logged in successfully');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserEmail(null);
    setCurrentUser(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        userEmail,
        currentUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}