import { ERC20Mock, MultiDAOTreasury } from "../typechain";

import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("MultiDAOTreasury", function () {
  let multiDAOTreasury: MultiDAOTreasury;
  let stablecoin: ERC20Mock;
  let owner: SignerWithAddress;
  let daoMember1: SignerWithAddress;
  let daoMember2: SignerWithAddress;
  let borrower: SignerWithAddress;

  before(async function () {
    // Signers
    [owner, daoMember1, daoMember2, borrower] = await ethers.getSigners();

    // Deploy a mock stablecoin (e.g., DAI)
    const ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
    stablecoin = (await ERC20MockFactory.deploy(
      "Mock Stablecoin",
      "MST",
      ethers.utils.parseEther("1000000"),
    )) as ERC20Mock;
    await stablecoin.deployed();

    // Deploy the MultiDAOTreasury contract
    const MultiDAOTreasuryFactory = await ethers.getContractFactory("MultiDAOTreasury");
    multiDAOTreasury = (await MultiDAOTreasuryFactory.deploy(stablecoin.address)) as MultiDAOTreasury;
    await multiDAOTreasury.deployed();

    // Distribute stablecoin to DAO members and borrower
    await stablecoin.transfer(daoMember1.address, ethers.utils.parseEther("10000"));
    await stablecoin.transfer(daoMember2.address, ethers.utils.parseEther("10000"));
    await stablecoin.transfer(borrower.address, ethers.utils.parseEther("1000"));
  });

  describe("DAO Creation", function () {
    it("Should create a new DAO", async function () {
      const signatories = [daoMember1.address, daoMember2.address];
      const quorum = 2;

      // Create a new DAO
      await expect(multiDAOTreasury.connect(daoMember1).createDAO("My First DAO", signatories, quorum))
        .to.emit(multiDAOTreasury, "DAOCreated")
        .withArgs(1, "My First DAO", signatories);

      // Check that the DAO was created correctly
      const dao = await multiDAOTreasury.daos(1);
      expect(dao.name).to.equal("My First DAO");
      expect(dao.signatories.length).to.equal(2);
      expect(dao.quorum).to.equal(quorum);
    });
  });

  describe("Deposit Funds", function () {
    it("Should allow DAO members to deposit stablecoins", async function () {
      const depositAmount = ethers.utils.parseEther("1000");

      // Approve the treasury contract to spend the stablecoins
      await stablecoin.connect(daoMember1).approve(multiDAOTreasury.address, depositAmount);

      // Deposit funds to DAO
      await expect(multiDAOTreasury.connect(daoMember1).depositFunds(1, depositAmount))
        .to.emit(multiDAOTreasury, "FundsDeposited")
        .withArgs(1, daoMember1.address, depositAmount);

      // Check the DAO's balance
      const daoBalance = await multiDAOTreasury.daoBalances(1);
      expect(daoBalance).to.equal(depositAmount);
    });
  });

  describe("Request Loan", function () {
    it("Should allow a user to request a loan", async function () {
      const loanAmount = ethers.utils.parseEther("500");

      // Borrower requests a loan
      await expect(multiDAOTreasury.connect(borrower).requestLoan(1, loanAmount))
        .to.emit(multiDAOTreasury, "LoanRequested")
        .withArgs(1, borrower.address, loanAmount);

      // Check loan request
      const loanRequest = await multiDAOTreasury.loanRequests(1, borrower.address);
      expect(loanRequest.amount).to.equal(loanAmount);
    });
  });

  describe("Approve Loan", function () {
    it("Should allow signatories to approve a loan request", async function () {
      // DAO signatories approve the loan request
      await expect(multiDAOTreasury.connect(daoMember1).approveLoan(1, borrower.address))
        .to.emit(multiDAOTreasury, "LoanApproved")
        .withArgs(1, borrower.address, daoMember1.address);

      await expect(multiDAOTreasury.connect(daoMember2).approveLoan(1, borrower.address))
        .to.emit(multiDAOTreasury, "LoanApproved")
        .withArgs(1, borrower.address, daoMember2.address);

      // After reaching quorum, the loan should be issued
      const borrowerBalance = await stablecoin.balanceOf(borrower.address);
      expect(borrowerBalance).to.equal(ethers.utils.parseEther("1500")); // Original balance + loan amount
    });
  });

  describe("Repay Loan", function () {
    it("Should allow the borrower to repay the loan", async function () {
      const repaymentAmount = ethers.utils.parseEther("500");

      // Borrower approves the treasury to take stablecoins for repayment
      await stablecoin.connect(borrower).approve(multiDAOTreasury.address, repaymentAmount);

      // Borrower repays the loan
      await expect(multiDAOTreasury.connect(borrower).repayLoan(1))
        .to.emit(multiDAOTreasury, "LoanRepaid")
        .withArgs(1, borrower.address, repaymentAmount);

      // Check that the loan is marked as repaid
      const loanRequest = await multiDAOTreasury.loanRequests(1, borrower.address);
      expect(loanRequest.amount).to.equal(0); // Loan is repaid
    });
  });
});
