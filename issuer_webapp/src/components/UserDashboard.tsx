import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCertificates } from '../context/CertificateContext';
import QRCode from 'react-qr-code';
import { DocumentIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export function UserDashboard() {
  const navigate = useNavigate();
  const { userEmail, currentUser, logout } = useAuth();
  const { getCertificatesByEmail } = useCertificates();
  const userCertificates = userEmail ? getCertificatesByEmail(userEmail) : [];

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
                My Certificates
              </h1>
              {currentUser && (
                <div className="mt-2 flex items-center text-gray-500">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">{currentUser.fullName}</span>
                </div>
              )}
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
          {currentUser && (
            <div className="card p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{currentUser.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(currentUser.registrationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {userCertificates.length === 0 ? (
            <div className="card p-12 text-center">
              <DocumentIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No certificates found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userCertificates.map((cert) => (
                <div key={cert.id} className="card p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {cert.credentialTitle}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Certificate #{cert.certificateNumber}
                        </p>
                      </div>
                      <span className={`badge ${
                        cert.isRevoked ? 'badge-error' : 'badge-success'
                      }`}>
                        {cert.isRevoked ? 'Revoked' : 'Active'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Issue Date</p>
                        <p className="text-sm font-medium">
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expiration Date</p>
                        <p className="text-sm font-medium">
                          {new Date(cert.expirationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {cert.documentHash && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <DocumentIcon className="h-5 w-5 text-gray-400" />
                          <p className="text-sm font-medium text-gray-700">
                            Document Information
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Hash Algorithm:</span>{' '}
                            {cert.hashAlgorithm}
                          </p>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 font-medium">
                              Document Hash:
                            </p>
                            <p className="text-xs text-gray-500 break-all font-mono bg-white p-2 rounded border">
                              {cert.documentHash}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Certificate QR Code</p>
                      <div className="bg-white p-4 rounded-lg inline-block">
                        <QRCode
                          value={JSON.stringify({
                            id: cert.id,
                            certificateNumber: cert.certificateNumber,
                            documentHash: cert.documentHash,
                            hashAlgorithm: cert.hashAlgorithm,
                            isRevoked: cert.isRevoked
                          })}
                          size={128}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}