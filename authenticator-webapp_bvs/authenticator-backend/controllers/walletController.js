const Web3 = require('web3');
const CredentialABI = require('../contracts/Credential.json').abi;
const CredentialAddress = require('../contracts/Credential.json').networks['5777'].address; // Using Ganache network
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Local Ganache server

// Create new wallet card
exports.createWalletCard = async (req, res) => {
    const { credentialData } = req.body;

    try {
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(CredentialABI, CredentialAddress);

        // Call the smart contract method to store the credential
        const response = await contract.methods.createCredential(credentialData).send({
            from: accounts[0],
            gas: 3000000
        });

        res.status(200).json({
            message: 'Credential successfully added to wallet!',
            transactionHash: response.transactionHash
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating wallet card', error: error.message });
    }
};
