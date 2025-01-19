import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIssuer } from '../context/IssuerContext';
import { useCertificates } from '../context/CertificateContext';
import { useBlockchain } from '../context/BlockchainContext';
import { useFileUpload } from '../context/FileUploadContext';
import { TransactionModal } from './TransactionModal';
import { DocumentIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export function CertificateForm() {
  const { currentIssuer } = useIssuer();
  const { addCertificate, registerUser } = useCertificates();
  const { isConnected, walletAddress } = useBlockchain();
  const { fileState, handleFileUpload, generateHash } = useFileUpload();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    credentialTitle: '',
    expirationDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentIssuer || !isConnected || !walletAddress) return;

    try {
      // Register the user first
      registerUser({
        email: formData.recipientEmail,
        fullName: formData.recipientName,
        registrationDate: new Date().toISOString(),
        registeredBy: currentIssuer.name
      });

      const previousBalance = '1.5';
      const gasFee = '0.004';
      const newBalance = (parseFloat(previousBalance) - parseFloat(gasFee)).toFixed(4);
      
      const certificate = {
        id: uuidv4(),
        ...formData,
        certificateNumber: Math.floor(Math.random() * 10000).toString(),
        issueDate: new Date().toISOString(),
        issuerId: currentIssuer.id,
        isRevoked: false,
        documentHash: fileState.hash || undefined,
        hashAlgorithm: fileState.hash ? 'SHA-256' : undefined
      };

      addCertificate(certificate);

      const transactionHash = `0x${Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;

      setTransactionData({
        gasFee,
        previousBalance,
        newBalance,
        transactionHash
      });
      setIsModalOpen(true);

      setFormData({
        recipientName: '',
        recipientEmail: '',
        credentialTitle: '',
        expirationDate: ''
      });
    } catch (error) {
      console.error('Error issuing certificate:', error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  if (!currentIssuer) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-700">Please create an issuer profile first.</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-700">Please connect your wallet to issue certificates.</p>
      </div>
    );
  }

  return (
    <>
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

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Document Upload</label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="text-xs text-gray-500">PDF or DOC up to 10MB</p>
                  </div>
                </div>
              </label>
            </div>
            <button
              type="button"
              onClick={generateHash}
              disabled={!fileState.file || fileState.status === 'hashing'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {fileState.status === 'hashing' ? (
                <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
              ) : (
                'Generate Hash'
              )}
            </button>
          </div>

          {fileState.file && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                File: {fileState.file.name}
              </p>
            </div>
          )}

          {fileState.hash && (
            <div className="mt-2 space-y-2">
              <p className="text-sm font-medium text-gray-700">Document Hash (SHA-256):</p>
              <input
                type="text"
                value={fileState.hash}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}

          {fileState.error && (
            <div className="mt-2">
              <p className="text-sm text-red-600">{fileState.error}</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Issue Certificate
        </button>
      </form>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactionData={transactionData}
      />
    </>
  );
}