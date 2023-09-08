# Catalyst-NFT

An NFT721 Contract for Glacier Catalyst!

## Basic Usage

- Test on localhost
1. npx hardhat node
2. npx hardhat test --network localhost

- Deploy To OpBNB Testnet
1. `npx hardhat run scripts/deploy.js --network opbnbtestnet`
2. > https://opbnbscan.com/address/0xec7DADc6d571fb26db2E2E11A31cec8F5E23EE1b

- Verify Contract
1. `CONTRACT_ADDRESS=0xec7DADc6d571fb26db2E2E11A31cec8F5E23EE1b npx hardhat run scripts/verify.js --network opbnbtestnet`

- BatchMint
1. `npx hardhat run scripts/mint.js --network opbnbtestnet`



