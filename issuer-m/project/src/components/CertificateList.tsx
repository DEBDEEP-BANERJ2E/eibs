import React from 'react';
import { useCertificates } from '../context/CertificateContext';
import QRCode from 'react-qr-code';

export function CertificateList() {
  const { certificates, revokeCertificate } = useCertificates();

  if (certificates.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">No certificates issued yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Issued Certificates</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{cert.credentialTitle}</h3>
                  <p className="text-sm text-gray-500">Certificate #{cert.certificateNumber}</p>
                </div>
                {cert.isRevoked ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Revoked
                  </span>
                ) : (
                  <button
                    onClick={() => revokeCertificate(cert.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Revoke
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Recipient</p>
                  <p className="text-sm font-medium">{cert.recipientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium">{cert.recipientEmail}</p>
                </div>
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
    </div>
  );
}