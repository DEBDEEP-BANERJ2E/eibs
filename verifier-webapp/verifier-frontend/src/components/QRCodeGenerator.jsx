import React from "react";
import QRCode from "qrcode.react";
import { motion } from 'framer-motion';

const QRCodeGenerator = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass p-6 text-center"
        >
            <h3 className="text-xl font-semibold mb-4">Generated QR Code:</h3>
            <QRCode value={data} size={256} bgColor="transparent" fgColor="#ffffff" />
        </motion.div>
    );
};

export default QRCodeGenerator;

