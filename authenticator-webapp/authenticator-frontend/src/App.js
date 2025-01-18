import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ScanQRCode from './pages/ScanQRCode';
import VCList from './components/VCList';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/scan" element={<ScanQRCode />} />
                    <Route path="/wallet" element={<VCList />} />
                    <Route path="/cards" element={<Cards />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
