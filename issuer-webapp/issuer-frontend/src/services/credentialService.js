import web3 from "./web3";
import Credential from "../contracts/Credential.json";

const address = "0x827fc2E1CA7DC21568c67BD4034F253fCbB43A07";
const instance = new web3.eth.Contract(Credential.abi, address);

export const issueCredential = async (holderName, credentialType, metadata) => {
    const accounts = await web3.eth.getAccounts();

    try {
        // Estimate the gas required
        const gasEstimate = await instance.methods
            .issueCredential(holderName, credentialType, metadata)
            .estimateGas({ from: accounts[0] });

        // Send the transaction with an increased gas limit
        await instance.methods
            .issueCredential(holderName, credentialType, metadata)
            .send({ from: accounts[0], gas: gasEstimate + 100000 }); // Add buffer to gasEstimate

        console.log("Credential issued successfully!");
    } catch (error) {
        console.error("Error issuing credential:", error.message);
    }
};
