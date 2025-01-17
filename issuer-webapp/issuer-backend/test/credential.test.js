const Credential = artifacts.require("Credential");

contract("Credential", (accounts) => {
    it("should issue a credential", async () => {
        const instance = await Credential.deployed();
        const tx = await instance.issueCredential("John Doe", "Certificate", "Metadata", { from: accounts[0] });
        const event = tx.logs[0].args;
        assert.equal(event.holderName, "John Doe");
        assert.equal(event.credentialType, "Certificate");
    });
});
