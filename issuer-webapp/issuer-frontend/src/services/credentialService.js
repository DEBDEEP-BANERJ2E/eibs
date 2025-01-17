import web3 from "./web3";
import Credential from "../contracts/Credential.json";

const address = "0x2d8c427753afc21ea63901040f3eb971ad01ec5b";
const instance = new web3.eth.Contract(Credential.abi, address);

export const issueCredential = async (holderName, credentialType, metadata) => {
    const accounts = await web3.eth.getAccounts();
    await instance.methods.issueCredential(holderName, credentialType, metadata).send({ from: accounts[0] });
};
