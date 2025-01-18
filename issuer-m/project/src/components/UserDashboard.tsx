import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCertificates } from '../context/CertificateContext';
import QRCode from 'react-qr-code';

export function UserDashboard() {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const { getCertificatesByEmail } = useCertificates();
  const userCertificates = userEmail ? getCertificatesByEmail(userEmail) : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Credentials</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
        
        {userCertificates.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">No credentials found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {userCertificates.map((cert) => (
              <div key={cert.id} className="bg-white p-6 rounded-lg shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{cert.credentialTitle}</h3>
                      <p className="text-sm text-gray-500">Certificate #{cert.certificateNumber}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cert.isRevoked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
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

                  <div className="mt-4">
                    <QRCode
                      value={JSON.stringify({
                        id: cert.id,
                        certificateNumber: cert.certificateNumber,
                        isRevoked: cert.isRevoked
                      })}
                      size={128}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}