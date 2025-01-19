import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const features = [
  {
    title: 'Blockchain-Powered Security',
    description: 'All certificates are stored on the blockchain, ensuring immutability and transparency.'
  },
  {
    title: 'Instant Verification',
    description: 'Verify certificates instantly using QR codes and blockchain technology.'
  },
  {
    title: 'MetaMask Integration',
    description: 'Seamless integration with MetaMask for secure blockchain transactions.'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">CertChain</div>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </nav>
        </header>

        <main className="py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Secure Digital Certificates</span>
              <span className="block text-indigo-600">on the Blockchain</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Issue, verify, and manage digital certificates with blockchain security. 
              Perfect for educational institutions and professional organizations.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
              >
                Access Platform
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}