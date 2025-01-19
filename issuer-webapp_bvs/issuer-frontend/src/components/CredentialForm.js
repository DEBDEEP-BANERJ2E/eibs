import React, { useState } from "react";

const CredentialForm = ({ onIssueCredential }) => {
    const [holderName, setHolderName] = useState("");
    const [credentialType, setCredentialType] = useState("");
    const [metadata, setMetadata] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onIssueCredential function passed as a prop
        onIssueCredential(holderName, credentialType, metadata);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Holder Name</label>
                <input 
                    type="text" 
                    value={holderName} 
                    onChange={(e) => setHolderName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Credential Type</label>
                <input 
                    type="text" 
                    value={credentialType} 
                    onChange={(e) => setCredentialType(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Metadata</label>
                <input 
                    type="text" 
                    value={metadata} 
                    onChange={(e) => setMetadata(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Issue Credential</button>
        </form>
    );
};

export default CredentialForm;
