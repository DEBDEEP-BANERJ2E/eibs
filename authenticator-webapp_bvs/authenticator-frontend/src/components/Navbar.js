import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Authenticator App</h1>
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
                {/* <li>
                    <Link to="/cards">Cards</Link>
                </li> */}
            </ul>
        </nav>
    );
};

export default Navbar;
