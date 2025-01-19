import React, { useState, useRef, useEffect } from "react";
import QRScanner from "../components/QRScanner";
import Cards from "../components/Cards";
import FlickeringGrid from "../components/ui/flickering-grid";


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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-700 text-white">

            
            <div style={{ textAlign: "center", marginTop: "20px" }} className="full">
            <div className="">
    <div style={{ textAlign: "center", marginTop: "20px" }} className="full">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-700 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-700">
            Scan <b><span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-violet-500 via-pink-500 to-violet-500 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent animate-gradient-move">
    QR
</span>


</b> Code
        </span>
    </div>
</div>

                
<QRScanner 
    onScan={handleCredentialScanned} 
    onError={handleScanError} 
    style={{ width: "150000px", height: "150000px" }} // Adjust dimensions here
/>

                {error && (
                    <div style={{ color: "red", marginTop: "20px" }}>
                        <h3>Error:</h3>
                        <p>{error}</p>
                    </div>
                )}

                {scanResult && (
                    <div style={{ marginTop: "10px" }}>
                    <div className="bg-gray-700 p-4 rounded-lg shadow-lg ">
                    <h2 class="text-green-500 text-xl">Decoded QR Message</h2>
                        <p className="text-lg text-white">{scanResult}</p>
                    </div>
                    </div>
                
                )}
                
                <Cards cards={walletCards} setCards={setWalletCards} />
            </div>
        </div>
    );
};

export default ScanQRCode;
