import { motion } from 'framer-motion';
import { Shield, Key, Share2, Lock, Settings, Database, CheckCircle, Layers } from 'lucide-react';
import { HolographicCard } from '../components/ui/holographic-card';

const keyFeatures = [
  {
    icon: Shield,
    title: "Trustless Verification",
    description: "Credentials are verified on-chain, eliminating reliance on intermediaries."
  },
  {
    icon: Key,
    title: "Data Ownership",
    description: "Users store credentials in their DID wallet and control sharing permissions."
  },
  {
    icon: Share2,
    title: "Interoperability",
    description: "Supports various credential types (academic, professional, government-issued)."
  },
  {
    icon: Lock,
    title: "Tamper-Proof Records",
    description: "Blockchain anchoring ensures records cannot be altered or forged."
  }
];

const implementationDetails = [
  {
    icon: Settings,
    title: "Credential Issuance",
    description: "Institutions issue verifiable credentials to users' DIDs, signed with the institution's private key, and securely stored in the user's DID wallet."
  },
  {
    icon: Database,
    title: "Credential Storage",
    description: "Users store credentials in decentralized storage (IPFS, Filecoin) securely linked to their DID."
  },
  {
    icon: CheckCircle,
    title: "Verification Process",
    description: "Employers or service providers request credentials, users share cryptographic proof via DID wallet, and verifiers validate proof on-chain."
  },
  {
    icon: Layers,
    title: "Decentralized Identity Layer",
    description: "Integration with Hyperledger Indy or Ethereum-based DID solutions for seamless and secure identity management."
  }
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-24 px-4 flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold gradient-text text-glow mb-12"
        >
          About CertChain
        </motion.h1>

        <HolographicCard className="mb-8 p-8">
          <h2 className="text-2xl font-semibold gradient-text text-glow mb-4">
            Our Platform
          </h2>
          <p className="text-secondary mb-6">
            A decentralized platform that allows users to store, manage, and share verified credentials using DIDs.
            The credentials are verified and anchored on the blockchain, ensuring authenticity without relying on
            centralized authorities.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg glass justify-center"
              >
                <feature.icon className="w-6 h-6 text-primary" />
                <div className="bg-solid bg-black p-4 rounded-lg">
                  <h3 className="font-semibold gradient-text mb-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">{feature.title}</h3>
                  <p className="text-sm text-secondary text-blue-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </HolographicCard>

        <HolographicCard className="mb-8 p-8">
          <h2 className="text-2xl font-semibold gradient-text text-glow mb-6">
            Implementation Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {implementationDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg glass justify-center"
              >
                <detail.icon className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold gradient-text mb-2">{detail.title}</h3>
                  <p className="text-sm text-secondary">{detail.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </HolographicCard>

        <HolographicCard className="p-8">
          <h2 className="text-2xl font-semibold gradient-text text-glow mb-4">
            Example Use Case
          </h2>
          <p className="text-secondary mb-6">
            A job applicant provides a blockchain-verified degree certificate to an employer.
            The employer verifies the certificate's authenticity on-chain without contacting the university.
            This process is faster, cheaper, and eliminates fraud.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button px-6 py-2 rounded-lg"
          >
            Try Demo
          </motion.button>
        </HolographicCard>
      </div>
    </motion.div>
  );
}
