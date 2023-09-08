// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { expect } = require("chai");


async function main() {
    const address = '0xec7DADc6d571fb26db2E2E11A31cec8F5E23EE1b';
    const nft = await hre.ethers.getContractAt("GlacierNFT", address);
    const name = "Glacier Catalyst NFT";
    const symbol = "GLC";

    console.log(await nft.name())
    console.log(await nft.symbol())
    expect(await nft.name()).to.equal(name);
    expect(await nft.symbol()).to.equal(symbol);

    let tokenId = 1;
    let participants = [];
    let total = 100;

    for (i = 0; i < total; i++) {
        let randomWallet = ethers.Wallet.createRandom();
        participants.push({
            collector: randomWallet.address,
            tokenId: tokenId++,
        });
    }

    //  Gas used:            5140107 of 30000000
    console.log(await nft.mintBatchCollectionNFT(participants))

    for (i = 0; i < total; i++) {
        let p = participants[i];
        console.log(p.collector, p.tokenId)
        expect(await nft.balanceOf(p.collector)).to.equal(1);
        expect(await nft.ownerOf(i + 1)).to.equal(p.collector);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});