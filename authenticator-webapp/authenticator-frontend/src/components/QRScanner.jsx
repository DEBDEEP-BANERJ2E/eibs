import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { motion } from 'framer-motion';

const QRScanner = ({ onScan, onError }) => {
    const [previewStyle] = useState({
        height: 480, // Increased height
        width: 640,  // Increased width
        margin: "auto",
    });

    let debounceTimeout;

    const handleScan = (data) => {
        if (data) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                console.log("Scanned Data:", data.text);
                onScan && onScan(data.text);
            }, 1000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass p-6 text-center"
        >
            <QrScanner
                delay={300}
                style={previewStyle} // Use the updated previewStyle
                onError={(err) => {
                    console.error("QR Scanner Error:", err);
                    onError && onError(err.message || "Error scanning QR code");
                }}
                onScan={handleScan}
            />
        </motion.div>
    );
};

export default QRScanner;

