import React, { useState, useRef, useEffect } from "react";
import QRScanner from "../components/QRScanner";
import Cards from "../components/Cards";

const ScanQRCode = () => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [walletCards, setWalletCards] = useState([]);
    const lastScannedRef = useRef(null); // Tracks the last scanned QR data

    // Load cards from localStorage on component mount
    useEffect(() => {
        const savedCards = JSON.parse(localStorage.getItem("walletCards")) || [];
        setWalletCards(savedCards);
    }, []);

    // Save cards to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("walletCards", JSON.stringify(walletCards));
    }, [walletCards]);

    const handleCredentialScanned = (data) => {
        if (data && data !== lastScannedRef.current) {
            lastScannedRef.current = data; // Update the last scanned result
            setScanResult(data);

            // Add the decoded QR data as a card in the wallet
            const newCard = { id: Date.now(), data, verified: false };
            setWalletCards((prevCards) => [...prevCards, newCard]);
        }
    };

    const handleScanError = (error) => {
        setError(error);
        console.error("Scan Error:", error);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Scan QR Code</h1>
            <QRScanner onScan={handleCredentialScanned} onError={handleScanError} />

            {error && (
                <div style={{ color: "red", marginTop: "20px" }}>
                    <h3>Error:</h3>
                    <p>{error}</p>
                </div>
            )}

            {scanResult && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Decoded QR Message:</h3>
                    <p>{scanResult}</p>
                </div>
            )}

            <Cards cards={walletCards} setCards={setWalletCards} />
        </div>
    );
};

export default ScanQRCode;
