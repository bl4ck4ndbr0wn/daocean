// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract MultiDAOTreasury is Ownable, ReentrancyGuard {
	using Address for address payable;

	IERC20 public stablecoin;

	uint256 public loanApprovalThreshold = 80; // % approval needed for loans and proposals
	uint256 public proposalStakeAmount = 100 * 10 ** 18; // Amount staked for proposal creation
	uint256 public loanExpiry = 7 days; // Loan request expiration
	uint256 public proposalExpiry = 30 days; // Proposal expiration
	uint256 public loanInterestRate = 5; // 5% interest rate

	// DAO Struct
	struct DAO {
		string name;
		address owner;
		uint256 totalFunds;
		uint256 totalMembers;
		mapping(address => Member) members;
		LoanRequest[] loanRequests;
		Proposal[] proposals;
		address[] signatories;
		mapping(address => bool) isSignatory;
		uint256 signaturesRequired;
	}

	struct Member {
		bool isMember;
		bool isApproved;
		uint256 savingsBalance;
		uint256 loanBalance;
		bool hasActiveLoan;
		uint256 votePower;
		mapping(uint256 => bool) votes; // Keep track of votes by proposal/loan ID
	}

	struct LoanRequest {
		uint256 amount;
		address borrower;
		uint256 votesInFavor;
		bool isApproved;
		bool isExpired;
		uint256 requestTime;
		uint256 dueDate;
	}

	enum ProposalType {
		Investment,
		ProjectFunding,
		TreasuryDiversification,
		FeeAdjustment
	}

	struct Proposal {
		ProposalType proposalType;
		uint256 amount;
		address proposer;
		string description;
		uint256 votesInFavor;
		bool isApproved;
		bool isExpired;
		bool isExecuted;
		uint256 creationTime;
	}

	// State variables
	mapping(uint256 => DAO) public daos; // Track all DAOs by ID
	uint256 public totalDAOs;

	// Events
	event DAOCreated(uint256 daoId, string name, address indexed owner);
	event MemberJoinedDAO(uint256 daoId, address indexed member);
	event FundsDeposited(uint256 daoId, address indexed member, uint256 amount);
	event LoanRequested(uint256 daoId, address indexed member, uint256 amount);
	event LoanApproved(uint256 daoId, address indexed member, uint256 amount);
	event LoanDisbursed(uint256 daoId, address indexed member, uint256 amount);
	event LoanRepaid(uint256 daoId, address indexed member, uint256 amount);
	event ProposalCreated(
		uint256 daoId,
		address indexed proposer,
		uint256 amount,
		string description,
		ProposalType proposalType
	);
	event ProposalExecuted(
		uint256 daoId,
		uint256 indexed proposalId,
		uint256 amount
	);
	event VoteCast(
		uint256 daoId,
		address indexed voter,
		address indexed borrower,
		uint256 indexed loanRequestId,
		uint256 votes
	);
	event ProposalVoteCast(
		uint256 daoId,
		address indexed voter,
		uint256 indexed proposalId,
		uint256 votes
	);
	event SignatoryAdded(uint256 daoId, address indexed newSignatory);
	event SignatoryRemoved(uint256 daoId, address indexed signatory);
	event FundsTransferred(
		uint256 daoId,
		address indexed recipient,
		uint256 amount
	);
	event InternalTransfer(
		uint256 daoId,
		address indexed from,
		address indexed to,
		uint256 amount
	);

	modifier onlyMember(uint256 _daoId) {
		require(
			daos[_daoId].members[msg.sender].isMember,
			"Not an approved DAO member"
		);
		_;
	}

	modifier onlySignatory(uint256 _daoId) {
		require(daos[_daoId].isSignatory[msg.sender], "Not a signatory");
		_;
	}

	constructor(address _stablecoin) {
		require(_stablecoin != address(0), "Invalid stablecoin address");
		stablecoin = IERC20(_stablecoin);
	}

	// Create a new DAO and become its owner
	function createDAO(
		string memory _name,
		address[] memory _initialSignatories,
		uint256 _signaturesRequired
	) external {
		require(bytes(_name).length > 0, "DAO name is required");
		require(
			_initialSignatories.length >= _signaturesRequired,
			"Invalid signatures requirement"
		);

		totalDAOs++;
		DAO storage dao = daos[totalDAOs];
		dao.name = _name;
		dao.owner = msg.sender;
		dao.signaturesRequired = _signaturesRequired;

		// Add initial signatories
		for (uint256 i = 0; i < _initialSignatories.length; i++) {
			dao.isSignatory[_initialSignatories[i]] = true;
			dao.signatories.push(_initialSignatories[i]);
		}

		// Automatically add the creator as a member
		joinDAO(totalDAOs);

		emit DAOCreated(totalDAOs, _name, msg.sender);
	}

	// Join an existing DAO
	function joinDAO(uint256 _daoId) public {
		require(_daoId > 0 && _daoId <= totalDAOs, "DAO does not exist");

		DAO storage dao = daos[_daoId];
		require(
			!dao.members[msg.sender].isMember,
			"Already a member of this DAO"
		);

		dao.members[msg.sender].isMember = true;
		dao.members[msg.sender].isApproved = true;
		dao.members[msg.sender].votePower = 1; // Initial voting power
		dao.totalMembers++;

		emit MemberJoinedDAO(_daoId, msg.sender);
	}

	// Deposit funds to a specific DAO
	function depositFunds(
		uint256 _daoId,
		uint256 _amount
	) external onlyMember(_daoId) {
		require(_amount > 0, "Amount must be greater than 0");
		DAO storage dao = daos[_daoId];
		require(
			stablecoin.transferFrom(msg.sender, address(this), _amount),
			"Transfer failed"
		);

		dao.members[msg.sender].savingsBalance += _amount;
		dao.members[msg.sender].votePower = dao
			.members[msg.sender]
			.savingsBalance;
		dao.totalFunds += _amount;

		emit FundsDeposited(_daoId, msg.sender, _amount);
	}

	// Loan Request and Voting for a specific DAO
	function requestLoan(
		uint256 _daoId,
		uint256 _amount
	) external onlyMember(_daoId) {
		DAO storage dao = daos[_daoId];
		require(
			dao.members[msg.sender].savingsBalance >= _amount / 2,
			"Must have 50% of loan amount in savings"
		);
		require(
			!dao.members[msg.sender].hasActiveLoan,
			"Already has an active loan"
		);

		dao.loanRequests.push(
			LoanRequest({
				amount: _amount,
				borrower: msg.sender,
				votesInFavor: 0,
				isApproved: false,
				isExpired: false,
				requestTime: block.timestamp,
				dueDate: block.timestamp + loanExpiry
			})
		);

		emit LoanRequested(_daoId, msg.sender, _amount);
	}

	function voteForLoan(
		uint256 _daoId,
		uint256 _loanRequestId
	) external onlyMember(_daoId) {
		DAO storage dao = daos[_daoId];
		LoanRequest storage request = dao.loanRequests[_loanRequestId];

		require(!request.isExpired, "Loan request expired");
		require(
			block.timestamp <= request.requestTime + loanExpiry,
			"Loan request expired"
		);
		require(
			!dao.members[msg.sender].votes[_loanRequestId],
			"Already voted"
		);
		require(!request.isApproved, "Loan already approved");

		request.votesInFavor += dao.members[msg.sender].votePower;
		dao.members[msg.sender].votes[_loanRequestId] = true;

		emit VoteCast(
			_daoId,
			msg.sender,
			request.borrower,
			_loanRequestId,
			request.votesInFavor
		);

		if (
			(request.votesInFavor * 100) / dao.totalFunds >=
			loanApprovalThreshold
		) {
			approveLoan(_daoId, _loanRequestId);
		}
	}

	function approveLoan(uint256 _daoId, uint256 _loanRequestId) internal {
		DAO storage dao = daos[_daoId];
		LoanRequest storage request = dao.loanRequests[_loanRequestId];
		request.isApproved = true;
		dao.members[request.borrower].hasActiveLoan = true;
		dao.members[request.borrower].loanBalance = request.amount;

		emit LoanApproved(_daoId, request.borrower, request.amount);
	}

	function disburseLoan(
		uint256 _daoId,
		uint256 _loanRequestId
	) external onlyOwner nonReentrant {
		DAO storage dao = daos[_daoId];
		LoanRequest storage request = dao.loanRequests[_loanRequestId];
		require(request.isApproved, "Loan not approved");

		dao.totalFunds -= request.amount;
		require(
			stablecoin.transfer(request.borrower, request.amount),
			"Disburse loan failed"
		);

		emit LoanDisbursed(_daoId, request.borrower, request.amount);
	}

	// Repay a loan in a specific DAO
	function repayLoan(
		uint256 _daoId
	) external onlyMember(_daoId) nonReentrant {
		DAO storage dao = daos[_daoId];
		require(dao.members[msg.sender].hasActiveLoan, "No active loan");

		uint256 loanBalance = dao.members[msg.sender].loanBalance;
		uint256 repaymentAmount = loanBalance +
			(loanBalance * loanInterestRate) /
			100; // Repay with interest

		require(
			stablecoin.transferFrom(msg.sender, address(this), repaymentAmount),
			"Transfer failed"
		);

		dao.members[msg.sender].loanBalance = 0;
		dao.members[msg.sender].hasActiveLoan = false;
		dao.totalFunds += repaymentAmount;

		emit LoanRepaid(_daoId, msg.sender, repaymentAmount);
	}

	// Create a proposal for a specific DAO
	function createProposal(
		uint256 _daoId,
		ProposalType _proposalType,
		uint256 _amount,
		string memory _description
	) external onlyMember(_daoId) {
		DAO storage dao = daos[_daoId];
		require(_amount > 0, "Proposal amount must be greater than 0");

		// The member must stake some tokens to create the proposal
		require(
			stablecoin.transferFrom(
				msg.sender,
				address(this),
				proposalStakeAmount
			),
			"Stake transfer failed"
		);

		dao.proposals.push(
			Proposal({
				proposalType: _proposalType,
				amount: _amount,
				proposer: msg.sender,
				description: _description,
				votesInFavor: 0,
				isApproved: false,
				isExpired: false,
				isExecuted: false,
				creationTime: block.timestamp
			})
		);

		emit ProposalCreated(
			_daoId,
			msg.sender,
			_amount,
			_description,
			_proposalType
		);
	}

	// Vote for a proposal in a specific DAO
	function voteForProposal(
		uint256 _daoId,
		uint256 _proposalId
	) external onlyMember(_daoId) {
		DAO storage dao = daos[_daoId];
		Proposal storage proposal = dao.proposals[_proposalId];

		require(!proposal.isExpired, "Proposal expired");
		require(
			block.timestamp <= proposal.creationTime + proposalExpiry,
			"Proposal expired"
		);
		require(!dao.members[msg.sender].votes[_proposalId], "Already voted");
		require(!proposal.isApproved, "Proposal already approved");

		proposal.votesInFavor += dao.members[msg.sender].votePower;
		dao.members[msg.sender].votes[_proposalId] = true;

		emit ProposalVoteCast(
			_daoId,
			msg.sender,
			_proposalId,
			proposal.votesInFavor
		);

		if (
			(proposal.votesInFavor * 100) / dao.totalFunds >=
			loanApprovalThreshold
		) {
			approveProposal(_daoId, _proposalId);
		}
	}

	// Approve a proposal (internal)
	function approveProposal(uint256 _daoId, uint256 _proposalId) internal {
		DAO storage dao = daos[_daoId];
		Proposal storage proposal = dao.proposals[_proposalId];
		proposal.isApproved = true;

		emit ProposalExecuted(_daoId, _proposalId, proposal.amount);
	}

	// Execute an approved proposal for a specific DAO
	function executeProposal(
		uint256 _daoId,
		uint256 _proposalId
	) external onlySignatory(_daoId) nonReentrant {
		DAO storage dao = daos[_daoId];
		Proposal storage proposal = dao.proposals[_proposalId];

		require(proposal.isApproved, "Proposal not approved");
		require(!proposal.isExecuted, "Proposal already executed");

		dao.totalFunds -= proposal.amount;
		require(
			stablecoin.transfer(proposal.proposer, proposal.amount),
			"Disburse the funds to the proposer failed"
		);

		proposal.isExecuted = true;

		emit ProposalExecuted(_daoId, _proposalId, proposal.amount);
	}

	// Add a new signatory to the DAO
	function addSignatory(
		uint256 _daoId,
		address _newSignatory
	) external onlySignatory(_daoId) {
		DAO storage dao = daos[_daoId];
		require(!dao.isSignatory[_newSignatory], "Already a signatory");

		dao.isSignatory[_newSignatory] = true;
		dao.signatories.push(_newSignatory);

		emit SignatoryAdded(_daoId, _newSignatory);
	}

	// Remove an existing signatory from the DAO
	function removeSignatory(
		uint256 _daoId,
		address _signatory
	) external onlySignatory(_daoId) {
		DAO storage dao = daos[_daoId];
		require(dao.isSignatory[_signatory], "Not a signatory");

		dao.isSignatory[_signatory] = false;

		for (uint256 i = 0; i < dao.signatories.length; i++) {
			if (dao.signatories[i] == _signatory) {
				dao.signatories[i] = dao.signatories[
					dao.signatories.length - 1
				];
				dao.signatories.pop();
				break;
			}
		}

		emit SignatoryRemoved(_daoId, _signatory);
	}

	// Execute a multi-signature transaction (for DAO funds)
	function executeMultisigTransaction(
		uint256 _daoId,
		uint256 _amount,
		address payable _recipient
	) external onlySignatory(_daoId) nonReentrant {
		DAO storage dao = daos[_daoId];
		require(_amount <= dao.totalFunds, "Insufficient funds");
		require(
			dao.signaturesRequired > 0,
			"No multi-signature requirement set"
		);

		uint256 approvals = 0;
		for (uint256 i = 0; i < dao.signatories.length; i++) {
			if (dao.isSignatory[dao.signatories[i]]) {
				approvals++;
			}
		}

		require(approvals >= dao.signaturesRequired, "Not enough signatories");

		dao.totalFunds -= _amount;
		_recipient.transfer(_amount);

		emit FundsTransferred(_daoId, _recipient, _amount);
	}

	// Withdraw funds from DAO treasury (requires multi-signature)
	function withdrawTreasuryFunds(
		uint256 _daoId,
		uint256 _amount,
		address payable _recipient
	) external onlySignatory(_daoId) nonReentrant {
		DAO storage dao = daos[_daoId];
		require(_amount <= dao.totalFunds, "Insufficient funds");

		// Check if multi-signature approval is required and achieved
		uint256 approvals = 0;
		for (uint256 i = 0; i < dao.signatories.length; i++) {
			if (dao.isSignatory[dao.signatories[i]]) {
				approvals++;
			}
		}

		require(approvals >= dao.signaturesRequired, "Not enough signatories");

		dao.totalFunds -= _amount;
		_recipient.transfer(_amount);

		emit FundsTransferred(_daoId, _recipient, _amount);
	}

	// Transfer funds within the DAO treasury
	function internalTransfer(
		uint256 _daoId,
		address _fromMember,
		address _toMember,
		uint256 _amount
	) external onlySignatory(_daoId) nonReentrant {
		DAO storage dao = daos[_daoId];
		require(
			dao.members[_fromMember].savingsBalance >= _amount,
			"Insufficient balance"
		);

		dao.members[_fromMember].savingsBalance -= _amount;
		dao.members[_toMember].savingsBalance += _amount;

		emit InternalTransfer(_daoId, _fromMember, _toMember, _amount);
	}
}
