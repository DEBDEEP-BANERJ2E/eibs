import QRCode from "qrcode.react";

const QRCodeGenerator = ({ value }) => (
    <QRCode value={value} size={256} />
);

export default QRCodeGenerator;
