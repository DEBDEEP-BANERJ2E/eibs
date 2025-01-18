import React, { useState } from "react";
import { motion } from 'framer-motion';
import { verifyCredential } from "../services/verificationService";

const VerificationForm = () => {
    const [hash, setHash] = useState("");
    const [result, setResult] = useState(null);

    const handleVerify = async () => {
        const isValid = await verifyCredential(hash);
        setResult(isValid ? "Valid Credential" : "Invalid Credential");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass p-6 max-w-md mx-auto"
        >
            <h3 className="text-xl font-semibold mb-4">Verify Credential</h3>
            <input
                type="text"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                placeholder="Enter Credential Hash"
                className="input w-full p-2 mb-4"
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVerify}
                className="button w-full p-2"
            >
                Verify
            </motion.button>
            {result && <p className={`mt-4 ${result.includes('Valid') ? 'text-success' : 'text-error'}`}>{result}</p>}
        </motion.div>
    );
};

export default VerificationForm;

