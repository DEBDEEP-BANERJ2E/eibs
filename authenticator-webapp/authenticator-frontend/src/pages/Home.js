import React from "react";
// import "../styles/Home.css";
import RetroGrid from "../components/ui/Retrogrid";
import { cn } from "../lib/utils";

const Home = () => {
    return (
        <div className="home">
           <RetroGrid />

            <h1>Welcome to the Authenticator App</h1>
            <p>Scan QR codes to verify credentials securely and efficiently.</p>
        </div>
    );
};

export default Home;
