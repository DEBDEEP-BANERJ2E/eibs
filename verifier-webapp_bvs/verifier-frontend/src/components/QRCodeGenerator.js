import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ data }) => {
    return (
        <div>
            <h3>Generated QR Code:</h3>
            <QRCode value={data} size={256} />
        </div>
    );
};

export default QRCodeGenerator;
