import { ethers } from "ethers";

export const verifyCredential = async (hash, contractAddress, abi) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return await contract.isCredentialValid(hash);
};
