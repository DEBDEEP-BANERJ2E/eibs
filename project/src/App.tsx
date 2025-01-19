import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IssuerProvider } from './context/IssuerContext';
import { CertificateProvider } from './context/CertificateContext';
import { AuthProvider } from './context/AuthContext';
import { BlockchainProvider } from './context/BlockchainContext';
import { FileUploadProvider } from './context/FileUploadContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';

function App() {
  return (
    <CertificateProvider>
      <AuthProvider>
        <BlockchainProvider>
          <IssuerProvider>
            <FileUploadProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route 
                    path="/admin" 
                    element={<AdminDashboard />}
                  />
                  <Route 
                    path="/dashboard" 
                    element={<UserDashboard />}
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <ToastContainer position="bottom-right" />
              </Router>
            </FileUploadProvider>
          </IssuerProvider>
        </BlockchainProvider>
      </AuthProvider>
    </CertificateProvider>
  );
}

export default App;