import React, { useState } from "react";
import CredentialForm from "../components/CredentialForm";
import QRCodeGenerator from "../components/QRCodeGenerator";

const IssueCredential = () => {
    const [qrCodeData, setQrCodeData] = useState("");
    const [showQRCode, setShowQRCode] = useState(false);

    // Function to generate the VC and QR code data
    const handleIssueCredential = (holderName, credentialType, metadata) => {
        // Create VC data (this is just an example structure)
        const vcData = {
            holderName,
            credentialType,
            metadata,
            issuedAt: new Date().toISOString(),
            // Add any additional fields as required by your VC specification
        };

        // Convert VC data to a JSON string
        const vcDataString = JSON.stringify(vcData);

        // Set the QR code data
        setQrCodeData(vcDataString);
        setShowQRCode(true);
    };

    return (
        <div className="issue-credential">
            <h1>Issue a Credential</h1>
            
            {/* Passing the handleIssueCredential function to CredentialForm */}
            <CredentialForm onIssueCredential={handleIssueCredential} />
            
            {/* Conditionally render the QR Code Generator */}
            {showQRCode && <QRCodeGenerator data={qrCodeData} />}
        </div>
    );
};

export default IssueCredential;
