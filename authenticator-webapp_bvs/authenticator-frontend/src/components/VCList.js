import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VCList = () => {
    const [walletCards, setWalletCards] = useState([]);

    useEffect(() => {
        const fetchWalletCards = async () => {
            try {
                // Fetch wallet cards from the backend (assuming they are stored)
                const response = await axios.get('http://localhost:5000/api/wallet/getCards');
                setWalletCards(response.data.cards);
            } catch (error) {
                console.error('Error fetching wallet cards:', error);
            }
        };

        fetchWalletCards();
    }, []);

    return (
        <div>
            <h2>Your Digital Wallet Cards</h2>
            <ul>
                {walletCards.map((card, index) => (
                    <li key={index}>{card}</li>
                ))}
            </ul>
        </div>
    );
};

export default VCList;
