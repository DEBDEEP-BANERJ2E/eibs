// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Credential {
    struct VC {
        string holderName;
        string credentialType;
        string metadata;
        address issuer;
    }

    mapping(bytes32 => VC) private credentials;

    event CredentialIssued(bytes32 indexed vcHash, string holderName, string credentialType, address indexed issuer);

    function issueCredential(
        string memory holderName,
        string memory credentialType,
        string memory metadata
    ) public {
        bytes32 vcHash = keccak256(abi.encodePacked(holderName, credentialType, metadata, msg.sender));
        credentials[vcHash] = VC(holderName, credentialType, metadata, msg.sender);
        emit CredentialIssued(vcHash, holderName, credentialType, msg.sender);
    }

    function getCredential(bytes32 vcHash) public view returns (string memory, string memory, string memory, address) {
        VC memory vc = credentials[vcHash];
        return (vc.holderName, vc.credentialType, vc.metadata, vc.issuer);
    }
}
