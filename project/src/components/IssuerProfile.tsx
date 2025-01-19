import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIssuer } from '../context/IssuerContext';

export function IssuerProfile() {
  const { currentIssuer, setCurrentIssuer } = useIssuer();
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentIssuer({
      id: uuidv4(),
      name,
      logo,
      did: `did:doc:${uuidv4()}`
    });
  };

  if (currentIssuer) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Current Issuer Profile</h2>
        <div className="space-y-4">
          <p><strong>Name:</strong> {currentIssuer.name}</p>
          <p><strong>DID:</strong> {currentIssuer.did}</p>
          {currentIssuer.logo && (
            <img src={currentIssuer.logo} alt="Organization logo" className="h-20 w-auto" />
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold">Create Issuer Profile</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Organization Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Logo URL</label>
        <input
          type="url"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Issuer Profile
      </button>
    </form>
  );
}