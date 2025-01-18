import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIssuer } from '../context/IssuerContext';
import { useCertificates } from '../context/CertificateContext';

export function CertificateForm() {
  const { currentIssuer } = useIssuer();
  const { addCertificate } = useCertificates();
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    credentialTitle: '',
    expirationDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentIssuer) return;

    const certificate = {
      id: uuidv4(),
      ...formData,
      certificateNumber: Math.floor(Math.random() * 10000).toString(),
      issueDate: new Date().toISOString(),
      issuerId: currentIssuer.id,
      isRevoked: false
    };

    addCertificate(certificate);
    setFormData({
      recipientName: '',
      recipientEmail: '',
      credentialTitle: '',
      expirationDate: ''
    });
  };

  if (!currentIssuer) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-700">Please create an issuer profile first.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold">Issue New Certificate</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
        <input
          type="text"
          value={formData.recipientName}
          onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Recipient Email</label>
        <input
          type="email"
          value={formData.recipientEmail}
          onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Credential Title</label>
        <input
          type="text"
          value={formData.credentialTitle}
          onChange={(e) => setFormData({ ...formData, credentialTitle: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
        <input
          type="date"
          value={formData.expirationDate}
          onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Issue Certificate
      </button>
    </form>
  );
}