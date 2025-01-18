import web3 from "./web3";
import Credential from "../../backend/build/contracts/Credential.json";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
const contractInstance = new web3.eth.Contract(Credential.abi, CONTRACT_ADDRESS);

export const getCredentials = async (holderAddress) => {
    try {
        return await contractInstance.methods.getCredentials(holderAddress).call();
    } catch (error) {
        console.error("Error fetching credentials:", error);
        throw error;
    }
};

export const validateCredential = async (holder, credentialType, metadata) => {
    try {
        const accounts = await web3.eth.getAccounts();
        return await contractInstance.methods
            .validateCredential(holder, credentialType, metadata)
            .send({ from: accounts[0] });
    } catch (error) {
        console.error("Error validating credential:", error);
        throw error;
    }
};
