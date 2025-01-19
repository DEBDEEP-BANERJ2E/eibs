"use client";

import { HolographicCard } from "../components/ui/holographic-card";
import Navbar from "../components/Navbar"; // Corrected import for default export
import {
  Shield,
  Key,
  Share2,
  Lock,
  FileText,
  Database,
  CheckCircle,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

export default function AboutPage() {
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="container min-h-screen px-4 py-24 bg-black relative">
      {/* <Navbar /> */}
      <div className="max-w-4xl mx-auto relative z-10">
      <h1 className="text-6xl font-extrabold text-center text-fuchsia-400 mb-16">
  About CredKey
</h1>


        <HolographicCard className="mb-8 p-8">
          <h2 className="text-2xl font-semibold text-center text-fuchsia-400 mb-4">
            Our Platform
          </h2>
          <p className="text-center text-violet-300 mb-6">
            A decentralized platform that allows users to store, manage, and
            share verified credentials using DIDs. The credentials are verified
            and anchored on the blockchain, ensuring authenticity without
            relying on centralized authorities.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-violet-500/5 border border-violet-500/10"
              >
                <feature.icon className="w-6 h-6 text-fuchsia-400" />
                <div>
                  <h3 className="font-semibold text-fuchsia-400 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-violet-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </HolographicCard>

        <HolographicCard className="mb-8 p-8">
          <h2 className="text-2xl font-semibold text-fuchsia-400 mb-6">
            Implementation Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {implementationDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-violet-500/5 border border-violet-500/10"
              >
                <detail.icon className="w-6 h-6 text-fuchsia-400" />
                <div>
                  <h3 className="font-semibold text-fuchsia-400 mb-2">
                    {detail.title}
                  </h3>
                  <ul className="list-disc list-inside text-sm text-violet-300 space-y-2">
                    {detail.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </HolographicCard>

        <HolographicCard className="p-8">
          <h2 className="text-center text-2xl font-semibold text-fuchsia-400 mb-4">
            Example Use Case
          </h2>
          <p className="text-center text-violet-300 mb-6">
            A job applicant provides a blockchain-verified degree certificate
            to an employer. The employer verifies the certificate's authenticity
            on-chain without contacting the university. This process is faster,
            cheaper, and eliminates fraud.
          </p>
        </HolographicCard>
      </div>
    </div>
  );
}

const keyFeatures = [
  {
    icon: Shield,
    title: "Trustless Verification",
    description:
      "Credentials are verified on-chain, eliminating reliance on intermediaries.",
  },
  {
    icon: Key,
    title: "Data Ownership",
    description:
      "Users store credentials in their DID wallet and control sharing permissions.",
  },
  {
    icon: Share2,
    title: "Interoperability",
    description:
      "Supports various credential types (academic, professional, government-issued).",
  },
  {
    icon: Lock,
    title: "Tamper-Proof Records",
    description:
      "Blockchain anchoring ensures records cannot be altered or forged.",
  },
];

const implementationDetails = [
  {
    icon: FileText,
    title: "Credential Issuance",
    points: [
      "Institutions issue verifiable credentials to users' DIDs",
      "Credentials are signed using the institution's private key",
      "Stored securely in the user's DID wallet",
    ],
  },
  {
    icon: Database,
    title: "Credential Storage",
    points: [
      "Users store credentials in decentralized storage (IPFS, Filecoin)",
      "Linked securely to their DID",
    ],
  },
  {
    icon: CheckCircle,
    title: "Verification Process",
    points: [
      "Employers or service providers request credentials",
      "Users share cryptographic proof via DID wallet",
      "Verifiers validate proof on-chain",
    ],
  },
  {
    icon: UserCheck,
    title: "Decentralized Identity Layer",
    points: [
      "Integration with Hyperledger Indy or Ethereum-based DID solutions",
      "Seamless and secure identity management",
    ],
  },
];
