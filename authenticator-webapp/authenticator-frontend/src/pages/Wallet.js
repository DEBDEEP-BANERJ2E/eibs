import React, { useState, useEffect } from "react";
import QRScanner from "../components/QRScanner";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
    const [walletCards, setWalletCards] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [decodedMessage, setDecodedMessage] = useState("");
    const [isMessageSent, setIsMessageSent] = useState(false);
    const navigate = useNavigate();

    // Load cards from localStorage on component mount
    useEffect(() => {
        const savedCards = JSON.parse(localStorage.getItem("walletCards")) || [];
        setWalletCards(savedCards);
    }, []);

    const handleCredentialScanned = (data) => {
        try {
            setDecodedMessage(data);
            const scannedData = JSON.parse(data);
            const scannedDocuments = scannedData.documents || [];
            const matchingCard = walletCards.find(card =>
                scannedDocuments.some(doc => card.data.includes(doc.name))
            );

            if (matchingCard) {
                setSearchResult(matchingCard);
            } else {
                setSearchResult(null);
            }
        } catch (error) {
            console.error("Error parsing scanned QR data:", error);
            setSearchResult(null);
        }

        setIsScanning(false);
    };

    const handleScanError = (error) => {
        console.error("Scan Error:", error);
        setIsScanning(false);
    };

    const handleStartScan = () => {
        setIsScanning(true);
        setSearchResult(null);
        setDecodedMessage("");
    };

    const handleGoToWallet = () => {
        navigate("/wallet");
    };

    const handleReject = () => {
        setSearchResult(null);
    };

    const handleAccept = async () => {
        if (searchResult) {
            try {
                const response = await fetch("http://localhost:5177", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        card: searchResult
                    }),
                });
    
                if (response.ok) {
                    console.log("Card details successfully sent to server");
                    setIsMessageSent(true);  // Indicate that the message was sent successfully
                    setTimeout(() => {
                        setSearchResult(null);
                        setDecodedMessage("");
                        setIsScanning(false);
                        setIsMessageSent(false);
                    }, 2000); // Adjust the delay as needed
                } else {
                    console.error("Failed to send details to the server");
                }
            } catch (error) {
                console.error("Error while sending details:", error);
            }
        }
    };
    
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-700 text-white">
            <div className="container">
                <h2 className="text-4xl font-semibold text-center text-green-500 mb-8">Your Digital Wallet</h2>

                {/* Render Wallet Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {walletCards.length === 0 && (
                        <div className="text-center text-white">
                            <p>No cards in your wallet.</p>
                        </div>
                    )}

                    {walletCards.map((card) => (
                        <div
                            key={card.id}
                            className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white">Card ID: {card.id}</h3>
                                <p className={`text-sm font-semibold ${card.verified ? "text-green-300" : "text-red-300"}`}>
                                    {card.verified ? "Verified" : "Not Verified"}
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white opacity-10"></div>
                            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white opacity-10"></div>
                        </div>
                    ))}
                </div>

                {/* If there is a search result, show it */}
                {searchResult && (
                    <div className="mt-4 p-4 bg-blue-600 text-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">Card Found!</h3>
                        <p>Card ID: {searchResult.id}</p>
                        <p>Verified: {searchResult.verified ? "Yes" : "No"}</p>

                        {/* Accept/Reject buttons */}
                        <div className="mt-4">
                            <button
                                onClick={handleAccept}
                                className="mr-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Accept
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                )}

                {/* If no matching card found, show this message */}
                {searchResult === null && isScanning === false && !isMessageSent && (
                    <div className="mt-4 text-red-500">
                        <p>No matching card found in the wallet.</p>
                    </div>
                )}

                {/* Success message after sending the data */}
                {isMessageSent && (
                    <div className="mt-4 text-green-500">
                        <p>Message successfully sent to the server!</p>
                    </div>
                )}

                {/* Button to Start Scanning */}
                {!isScanning && !isMessageSent && (
                    <button
                        onClick={handleStartScan}
                        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Scan QR to Search Card
                    </button>
                )}

                {/* QRScanner when scanning */}
                {isScanning && (
                    <QRScanner
                        onScan={handleCredentialScanned}
                        onError={handleScanError}
                        style={{ width: "100%", height: "400px" }}
                    />
                )}

                {/* Display decoded message below the QR scanner */}
                {decodedMessage && !isMessageSent && (
                    <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">Decoded Message:</h3>
                        <p>{decodedMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wallet;
