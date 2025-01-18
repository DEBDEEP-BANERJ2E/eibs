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
            } catch (error) {
                console.error('Error fetching wallet cards:', error);
            }
        };

        fetchWalletCards();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass p-6"
        >
            <h2 className="text-2xl font-semibold mb-4">Your Digital Wallet Cards</h2>
            <ul className="space-y-2">
                {walletCards.map((card, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="glass p-2"
                    >
                        {card}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default VCList;

