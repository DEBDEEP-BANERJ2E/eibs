// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract DIDRegistry {
    mapping(address => string) private dids;

    function registerDID(string memory did) public {
        dids[msg.sender] = did;
    }

    function getDID(address user) public view returns (string memory) {
        return dids[user];
    }
}
