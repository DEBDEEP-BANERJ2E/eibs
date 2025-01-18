import React from "react";
import { motion } from 'framer-motion';

const Cards = ({ cards, setCards }) => {
    const handleDelete = (id) => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };

    const toggleVerified = (id) => {
        const updatedCards = cards.map((card) =>
            card.id === id ? { ...card, verified: !card.verified } : card
        );
        setCards(updatedCards);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
        >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Digital Wallet Cards</h2>
            {cards.length === 0 ? (
                <p className="text-gray-600">No cards in your wallet yet.</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow-lg rounded-lg p-6 relative border border-gray-200 hover:shadow-xl transition-shadow"
                        >
                            <button
                                onClick={() => handleDelete(card.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                            >
                                ✕
                            </button>
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Card ID: {card.id}</h3>
                            <p className="text-gray-700 mb-4">{card.data}</p>
                            <button
                                onClick={() => toggleVerified(card.id)}
                                className={`px-4 py-2 rounded text-white font-medium ${card.verified ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                            >
                                {card.verified ? "Verified" : "Not Verified"}
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default Cards;
