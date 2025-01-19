const Credential = artifacts.require("Credential");

contract("Credential", (accounts) => {
    it("should add and verify a credential", async () => {
        const credential = await Credential.deployed();
        await credential.addCredential("hash123", "IssuerName", "HolderName");

        const isValid = await credential.verifyCredential("hash123");
        assert.equal(isValid, true, "Credential should be valid");
    });

    it("should revoke a credential", async () => {
        const credential = await Credential.deployed();
        await credential.revokeCredential("hash123");

        const isValid = await credential.verifyCredential("hash123");
        assert.equal(isValid, false, "Credential should be revoked");
    });
});
