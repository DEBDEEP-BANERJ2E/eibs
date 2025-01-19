import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="text-6xl font-extrabold text-center text-fuchsia-400 mb-16">
  CredKey
</h1>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/scan">Scan QR</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/wallet">DigiWallet</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
