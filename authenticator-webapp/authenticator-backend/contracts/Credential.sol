// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Credential {
    struct CredentialData {
        address holderName;
        string credentialType;
        string metadata;
        address issuer;
    }

    mapping(address => CredentialData[]) public credentials;

    event CredentialIssued(address indexed holder, string credentialType, string metadata);

    function issueCredential(address holder, string memory credentialType, string memory metadata) public {
        credentials[holder].push(CredentialData(holder, credentialType, metadata, msg.sender));
        emit CredentialIssued(holder, credentialType, metadata);
    }

    function getCredentials(address holder) public view returns (CredentialData[] memory) {
        return credentials[holder];
    }
}
