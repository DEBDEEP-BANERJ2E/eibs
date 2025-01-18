import React from "react";

const Cards = ({ cards, setCards }) => {
    // Delete a card
    const handleDelete = (id) => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };

    // Toggle verification status
    const toggleVerified = (id) => {
        const updatedCards = cards.map((card) =>
            card.id === id ? { ...card, verified: !card.verified } : card
        );
        setCards(updatedCards);
    };

    return (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h2>Digital Wallet Cards</h2>
            {cards.length === 0 ? (
                <p>No cards in your wallet yet.</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            style={{
                                position: "relative",
                                width: "300px",
                                padding: "15px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(card.id)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    background: "red",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>

                            {/* Card Content */}
                            <h3 style={{ margin: "10px 0" }}>Card ID: {card.id}</h3>
                            <p>{card.data}</p>

                            {/* Verified Button */}
                            <button
                                onClick={() => toggleVerified(card.id)}
                                style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    left: "10px",
                                    background: card.verified ? "green" : "gray",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                }}
                            >
                                {card.verified ? "Verified" : "Not Verified"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cards;
