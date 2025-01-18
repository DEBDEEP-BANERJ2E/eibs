import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IssuerProvider } from './context/IssuerContext';
import { CertificateProvider } from './context/CertificateContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BlockchainProvider } from './context/BlockchainContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import { IssuerProfile } from './components/IssuerProfile';
import { CertificateForm } from './components/CertificateForm';
import { CertificateList } from './components/CertificateList';
import { BlockchainStatus } from './components/BlockchainStatus';
import { UserDashboard } from './components/UserDashboard';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Digital Certificate System</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
        <div className="space-y-8">
          <BlockchainStatus />
          <IssuerProfile />
          <CertificateForm />
          <CertificateList />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BlockchainProvider>
        <IssuerProvider>
          <CertificateProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <ToastContainer position="bottom-right" />
            </Router>
          </CertificateProvider>
        </IssuerProvider>
      </BlockchainProvider>
    </AuthProvider>
  );
}

export default App;