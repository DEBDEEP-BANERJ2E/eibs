import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <nav className="glass p-4 mb-8">
            <div className="container mx-auto flex justify-between items-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/" className="text-2xl font-bold">CertChain</Link>
                </motion.div>
                <div className="space-x-4">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/verify">Verify</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, children }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <Link to={to} className="hover:text-gray-300 transition-colors">{children}</Link>
    </motion.div>
);

export default Navbar;

