import React, { useState } from "react";
import { verifyCredential } from "../services/verificationService";

const VerificationForm = () => {
    const [hash, setHash] = useState("");
    const [result, setResult] = useState(null);

    const handleVerify = async () => {
        const isValid = await verifyCredential(hash);
        setResult(isValid ? "Valid Credential" : "Invalid Credential");
    };

    return (
        <div>
            <h3>Verify Credential</h3>
            <input
                type="text"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                placeholder="Enter Credential Hash"
            />
            <button onClick={handleVerify}>Verify</button>
            {result && <p>{result}</p>}
        </div>
    );
};

export default VerificationForm;
