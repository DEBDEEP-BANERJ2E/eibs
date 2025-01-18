// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Credential {
    struct CredentialData {
        string issuer;
        string holder;
        string dataHash;
        bool isValid;
    }

    mapping(string => CredentialData) private credentials;

    function addCredential(string memory dataHash, string memory issuer, string memory holder) public {
        credentials[dataHash] = CredentialData(issuer, holder, dataHash, true);
    }

    function verifyCredential(string memory dataHash) public view returns (bool) {
        return credentials[dataHash].isValid;
    }

    function revokeCredential(string memory dataHash) public {
        require(credentials[dataHash].isValid, "Credential is already revoked");
        credentials[dataHash].isValid = false;
    }
}
