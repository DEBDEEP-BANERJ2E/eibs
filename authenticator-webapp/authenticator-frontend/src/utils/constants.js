export const CONTRACT_ADDRESS = "0x7ccd92d8c331b40d4833ac1eaee132137c09b1e0";
export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "holder",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "credentialType",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "metadata",
            "type": "string"
          }
        ],
        "name": "CredentialIssued",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "credentials",
        "outputs": [
          {
            "internalType": "address",
            "name": "holderName",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "credentialType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "metadata",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "issuer",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "holder",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "credentialType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "metadata",
            "type": "string"
          }
        ],
        "name": "issueCredential",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "holder",
            "type": "address"
          }
        ],
        "name": "getCredentials",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "holderName",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "credentialType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "metadata",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "issuer",
                "type": "address"
              }
            ],
            "internalType": "struct Credential.CredentialData[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
];
