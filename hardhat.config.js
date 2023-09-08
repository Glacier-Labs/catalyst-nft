require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

OPBNB_PRIVATE_KEY = process.env.OPBNB_PRIVATE_KEY
NODEREAL_API_KEY = process.env.NODEREAL_API_KEY


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    opbnbtestnet: {
      url: `https://opbnb-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3`,
      chainId: 5611,
      accounts: [OPBNB_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      opbnbtestnet: NODEREAL_API_KEY,//replace your nodereal API key
    },
   customChains: [
    {
     network: "opbnbtestnet",
     chainId: 5611,
     urls: {
       apiURL:  `https://open-platform.nodereal.io/${NODEREAL_API_KEY}/op-bnb-testnet/contract/`,
       browserURL: "https://opbnbscan.com/",
     },
    },
   ],
   },
};
