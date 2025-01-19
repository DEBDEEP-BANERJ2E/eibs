const Credential = artifacts.require("Credential");

contract("Credential", (accounts) => {
  it("should issue a credential", async () => {
    const instance = await Credential.deployed();
    const holder = accounts[1];
    const credentialType = "University Degree";
    const metadata = "Issued by University X";

    await instance.issueCredential(holder, credentialType, metadata, { from: accounts[0] });

    const credentials = await instance.getCredentials(holder);
    assert.equal(credentials.length, 1, "Credential not issued correctly");
    assert.equal(credentials[0].credentialType, credentialType, "Credential type mismatch");
    assert.equal(credentials[0].metadata, metadata, "Metadata mismatch");
  });
});
