// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateContract {
    struct Certificate {
        string hash;
        address issuer;
        address recipient;
        uint256 timestamp;
        bool isRevoked;
    }

    mapping(string => Certificate) public certificates;
    address public owner;

    event CertificateIssued(string hash, address issuer, address recipient, uint256 timestamp);
    event CertificateRevoked(string hash, uint256 timestamp);
    event CertificateVerified(string hash, bool isValid, uint256 timestamp);
    event FundsReceived(address sender, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Payable function to receive Ether when issuing a certificate
    function issueCertificate(string memory hash, address recipient) public payable {
        require(bytes(hash).length > 0, "Hash cannot be empty");
        require(recipient != address(0), "Invalid recipient address");
        require(certificates[hash].timestamp == 0, "Certificate already exists");

        // Emit event that funds were received
        emit FundsReceived(msg.sender, msg.value);

        certificates[hash] = Certificate({
            hash: hash,
            issuer: msg.sender,
            recipient: recipient,
            timestamp: block.timestamp,
            isRevoked: false
        });

        emit CertificateIssued(hash, msg.sender, recipient, block.timestamp);
    }

    // Payable function to allow the contract to accept funds directly
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }

    function revokeCertificate(string memory hash) public {
        require(bytes(hash).length > 0, "Hash cannot be empty");
        require(certificates[hash].timestamp != 0, "Certificate does not exist");
        require(certificates[hash].issuer == msg.sender || msg.sender == owner, "Not authorized");
        require(!certificates[hash].isRevoked, "Certificate already revoked");

        certificates[hash].isRevoked = true;
        emit CertificateRevoked(hash, block.timestamp);
    }

    function verifyCertificate(string memory hash) public returns (bool) {
        require(bytes(hash).length > 0, "Hash cannot be empty");
        
        bool isValid = certificates[hash].timestamp != 0 && !certificates[hash].isRevoked;
        emit CertificateVerified(hash, isValid, block.timestamp);
        return isValid;
    }

    function getCertificateDetails(string memory hash) public view returns (
        address issuer,
        address recipient,
        uint256 timestamp,
        bool isRevoked
    ) {
        Certificate memory cert = certificates[hash];
        require(cert.timestamp != 0, "Certificate does not exist");
        
        return (
            cert.issuer,
            cert.recipient,
            cert.timestamp,
            cert.isRevoked
        );
    }

    // Function to allow the owner to withdraw Ether from the contract
    function withdraw(uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient funds");
        payable(owner).transfer(amount);
    }
}
