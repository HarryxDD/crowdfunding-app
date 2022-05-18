const { ethers } = require("hardhat");

async function main() {
    [owner, wallet1, wallet2] = await ethers.getSigners();
    
    const CrowdFund = await ethers.getContractFactory("CrowdFund");
    const crowdfund = await CrowdFund.deploy("0x2EF1F8AfBfC85A2dEB8267794244A214a6F77c27");

    // const Token = ...

    console.log("contract deploy to: ", crowdfund.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit;
    })