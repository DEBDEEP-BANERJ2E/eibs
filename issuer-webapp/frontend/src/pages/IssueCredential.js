import React from "react";
import CredentialForm from "../components/CredentialForm";

const IssueCredential = () => {
    return (
        <div className="issue-credential">
            <h1>Issue a Credential</h1>
            <CredentialForm />
        </div>
    );
};

export default IssueCredential;
