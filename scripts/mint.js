// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { expect } = require("chai");
const fs = require("fs");

async function loadAddrs() {
    const lines = fs.readFileSync('./scripts/bsc0921.txt').toString().split('\n')
    const addrs = []
    for (const line of lines) {
        const addr = hre.ethers.getAddress(line)
        console.log(addr, line)
        addrs.push(addr)
    }
    return addrs
}

async function main() {
    const address = '0xa2315a9d91dA9D572d14030A2252C5cf204f4330';
    const nft = await hre.ethers.getContractAt("GlacierNFT", address);
    const name = "Glacier Catalyst NFT";
    const symbol = "GLC";

    console.log(await nft.name())
    console.log(await nft.symbol())
    expect(await nft.name()).to.equal(name);
    expect(await nft.symbol()).to.equal(symbol);

    let tokenId = 1;
    let participants = [];

    let addrs = await loadAddrs()
    
    for (i = 0; i < addrs.length; i++) {
        const p = {
            collector: addrs[i],
            tokenId: tokenId++,
        }
        participants.push(p);
        console.log(p.collector, p.tokenId)
    }

    //  Gas used:            5140107 of 30000000
    console.log(await nft.mintBatchCollectionNFT(participants))

    // for (i = 0; i < addrs.length; i++) {
    //     let p = participants[i];
    //     console.log(p.collector, p.tokenId)
    //     expect(await nft.balanceOf(p.collector)).to.equal(1);
    // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});