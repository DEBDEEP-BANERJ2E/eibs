import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BlockchainStatus } from './BlockchainStatus';
import { IssuerProfile } from './IssuerProfile';
import { CertificateForm } from './CertificateForm';
import { CertificateList } from './CertificateList';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <nav className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Certificate Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Issue and manage digital certificates securely
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </nav>
        </header>

        <main className="py-8">
          <div className="space-y-8">
            <section className="card p-6">
              <BlockchainStatus />
            </section>

            <section className="card p-6">
              <IssuerProfile />
            </section>

            <section className="card p-6">
              <CertificateForm />
            </section>

            <section className="card p-6">
              <CertificateList />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}