import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRScanner = ({ onScan, onError }) => {
    const [previewStyle] = useState({
        height: 240,
        width: 320,
        margin: "auto",
    });

    let debounceTimeout;

    const handleScan = (data) => {
        if (data) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                console.log("Scanned Data:", data.text);
                onScan && onScan(data.text);
            }, 1000); // Debounce interval (1 second)
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <QrScanner
                delay={300}
                style={previewStyle}
                onError={(err) => {
                    console.error("QR Scanner Error:", err);
                    onError && onError(err.message || "Error scanning QR code");
                }}
                onScan={handleScan}
            />
        </div>
    );
};

export default QRScanner;
