import React, { useState } from "react";
import { issueCredential } from "../services/credentialService";

const CredentialForm = () => {
    const [holderName, setHolderName] = useState("");
    const [credentialType, setCredentialType] = useState("");
    const [metadata, setMetadata] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await issueCredential(holderName, credentialType, metadata);
        alert("Credential Issued!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Holder Name" onChange={(e) => setHolderName(e.target.value)} />
            <input placeholder="Credential Type" onChange={(e) => setCredentialType(e.target.value)} />
            <textarea placeholder="Metadata" onChange={(e) => setMetadata(e.target.value)} />
            <button type="submit">Issue</button>
        </form>
    );
};

export default CredentialForm;
