import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const VCList = () => {
    const [walletCards, setWalletCards] = useState([]);

    useEffect(() => {
        const fetchWalletCards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/wallet/getCards');
                setWalletCards(response.data.cards);
                console.log('Fetched wallet cards:', walletCards);
            } catch (error) {
                console.error('Error fetching wallet cards:', error);
            }
        };

        fetchWalletCards();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass p-6 w-full sm:w-96 rounded-lg shadow-lg text-center"
            >
                <h2 className="text-2xl font-semibold mb-4">Your Digital Wallet Cards</h2>
                <div className="mt-6 flex flex-row items-center">
                    <ul className="space-y-4 flex items-center">
                        {walletCards.map((card, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                className="glass p-4 rounded-md shadow-md text-center"
                            >
                                {card}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>

    );
};

export default VCList;
