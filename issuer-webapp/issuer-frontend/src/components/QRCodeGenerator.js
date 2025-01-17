import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({ data }) => {
    return (
        <div className="qr-code">
            <h2>Scan this QR Code</h2>
            <QRCodeCanvas value={data} />
        </div>
    );
};

export default QRCodeGenerator;
