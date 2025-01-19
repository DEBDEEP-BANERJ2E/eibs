import React, { useState, useRef, useEffect } from "react";
import QRScanner from "../components/QRScanner";
import { useNavigate } from "react-router-dom";

const ScanQRCode = () => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [scanSuccess, setScanSuccess] = useState(false); // New state for success message
    const lastScannedRef = useRef(null); // Tracks the last scanned QR data
    const navigate = useNavigate();

    // Load cards from localStorage on component mount
    useEffect(() => {
        const savedCards = JSON.parse(localStorage.getItem("walletCards")) || [];
        setScanResult(savedCards);
    }, []);

    // Save cards to localStorage whenever they change
    useEffect(() => {
        if (scanResult && scanResult.length > 0) {
            localStorage.setItem("walletCards", JSON.stringify(scanResult));
        }
    }, [scanResult]);

    const handleCredentialScanned = (data) => {
        if (data && data !== lastScannedRef.current) {
            lastScannedRef.current = data;

            // Only proceed if the scanned data is valid (non-empty and non-null)
            if (data.trim()) {
                setScanResult(data);
                setScanSuccess(true); // Set success when scanning is done

                // Add the decoded QR data as a card in the wallet
                const newCard = { id: Date.now(), data, verified: false };
                const updatedCards = JSON.parse(localStorage.getItem("walletCards")) || [];

                // Remove any invalid or empty cards (in case there are any leftover invalid attempts)
                const validCards = updatedCards.filter(card => card.data && card.data.trim() !== "");

                // Add the new valid card to the list
                validCards.push(newCard);

                // Update localStorage with valid cards only
                localStorage.setItem("walletCards", JSON.stringify(validCards));

                // Update state with the valid cards
                setScanResult(validCards);
            } else {
                // If invalid, do not add it to the wallet and reset success message
                setScanSuccess(false);
            }
        }
    };

    const handleScanError = (error) => {
        setError(error);
        console.error("Scan Error:", error);
    };

    const handleGoToWallet = () => {
        navigate("/wallet"); // Navigate to wallet page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-700 text-white">
            <div className="text-center">
                <h2 className="vpointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-900 to-gray-800 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-gray-800 dark:to-gray-600text-5xl font-bold mb-6 text-center text-green-500">Scan a QR Code</h2>
                <QRScanner 
                    onScan={handleCredentialScanned} 
                    onError={handleScanError} 
                    style={{ width: "100%", height: "400px" }} // Adjust dimensions here
                />

                {error && (
                    <div className="mt-4 text-red-500">
                        <h3>Error:</h3>
                        <p>{error}</p>
                    </div>
                )}

                {scanSuccess && (
                    <div className="mt-6 p-4 bg-green-600 text-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">Scan Successful!</h3>
                        <p>Your card has been added to the wallet.</p>
                        <button 
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={handleGoToWallet}
                        >
                            Go to Wallet
                        </button>
                    </div>
                )}

                {/* Render individual properties of the scanResult */}
                {!scanSuccess && scanResult && (
                    <div className="bg-gray-700 p-4 rounded-lg shadow-lg mt-4">
                        <h2 className="text-green-500 text-xl">Decoded QR Message</h2>
                        <p className="text-white">{scanResult.data}</p> {/* Render the data property */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScanQRCode;
