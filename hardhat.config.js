require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const {SEPOLIA_URL, PRIVATE_KEY , ETHERSCAN_KEY} = process.env;
module.exports = {
  solidity: "0.8.24",
 networks: {
    // for testnet
    "lisk-sepolia": {
      url: process.env.LISK_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
   
    apiKey: {
      "lisk-sepolia": "123",
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

