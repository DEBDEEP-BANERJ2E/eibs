import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import RetroGrid from "../components/ui/interactive";
import { ShimmerButton } from "../components/ui/shimmer-button";

const Home = () => {
    return (
        <div className="home flex flex-col items-center justify-center min-h-screen">
            <RetroGrid />
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-900 to-gray-800 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-gray-800 dark:to-gray-600">
                Welcome to the Authenticator App
            </span>

            <p className="text-center mt-2 text-lg">
                Scan QR codes to verify credentials securely and efficiently
            </p>

            {/* Wrap the ShimmerButton with Link to navigate to /scan */}
            <Link to="/scan">
                <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                        Get Started
                    </span>
                </ShimmerButton>
            </Link>
        </div>
    );
};

export default Home;
