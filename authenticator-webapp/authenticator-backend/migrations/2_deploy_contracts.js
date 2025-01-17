const DIDRegistry = artifacts.require('Credential');

module.exports = function (deployer) {
  deployer.deploy(DIDRegistry);
};
