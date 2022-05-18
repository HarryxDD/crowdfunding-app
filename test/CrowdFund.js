const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Crowdfunding contract', () => {
    let CrowdFund, crowdfund, owner, wallet1, wallet2;

    beforeEach(async () => {
        [owner, wallet1, wallet2, _] = await ethers.getSigners(); 
        CrowdFund = await ethers.getContractFactory("CrowdFund");
        crowdfund = await CrowdFund.deploy("0x2EF1F8AfBfC85A2dEB8267794244A214a6F77c27");
        await crowdfund.deployed();
        // await crowdfund.transfer(owner, 500);
        // await crowdfund.transfer(wallet1, 500);
        // await crowdfund.transfer(wallet2, 500);

        // launch for testing
        crowdfund.launch(
            100,
            1652341100,
            1652341200
        )

    });

    describe('Launching', () => {
        // it("should have 500 tokens in owner accounts", async () => {
        //     expect(await crowdfund.balanceOf(owner)).to.equal(0);
        // });
        
        
        // success
        // it("should launch", async () => {
        //     crowdfund.launch(
        //         100,
        //         1652340800,
        //         1652340900
        //     )

        //     expect(await crowdfund.count()).to.equal(1);
        // });


        // success
        // it("should cancel", async () => {
        //     crowdfund.cancel(1);
        //     expect(await crowdfund.count()).to.equal(0);
        // });


        // success
        it("should not have any tokens and goal is 100", async () => {
            const [id, creator, goal, pledged] = await crowdfund.campaigns(1);
            console.log(await crowdfund.getCampaign(1));

            expect(id).to.equal(1);
            expect(goal).to.equal(100);
            expect(pledged).to.equal(0);
        });


    });
    
})