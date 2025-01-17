module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",    // Localhost
        port: 8545,           // Ganache default port
        network_id: "*",      // Match any network id
      },
      // Additional networks like 'sepolia', 'rinkeby', etc. can stay here if needed
    },
    compilers: {
      solc: {
        version: "0.8.20", // Compatible version of Solidity
      },
    },
  };
  