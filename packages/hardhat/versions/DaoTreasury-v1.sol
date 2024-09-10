// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract DAOTreasury is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using Address for address payable;

    IERC20 public stablecoin;
    uint256 public totalFunds;
    uint256 public loanApprovalThreshold = 80; // % approval needed for loans and proposals
    uint256 public proposalStakeAmount = 100 * 10 ** 18; // Amount staked for proposal creation
    uint256 public loanExpiry = 7 days; // Loan request expiration
    uint256 public proposalExpiry = 30 days; // Proposal expiration

    // Data structures
    struct Member {
        bool isMember;
        bool isApproved;
        uint256 savingsBalance;
        uint256 loanBalance;
        bool hasActiveLoan;
        uint256 votePower;
        mapping(address => bool) votes;
    }

    struct LoanRequest {
        uint256 amount;
        address borrower;
        uint256 votesInFavor;
        bool isApproved;
        uint256 requestTime;
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
        bool isExecuted;
        uint256 creationTime;
    }

    // State variables
    mapping(address => Member) public members;
    LoanRequest[] public loanRequests;
    Proposal[] public proposals;
    uint256 public totalMembers;

    // Multi-signature related variables
    address[] public signatories;
    mapping(address => bool) public isSignatory;
    uint256 public signaturesRequired = 3;
    mapping(bytes32 => uint256) public signatureCount; // Track approvals by proposal ID

    // Events
    event FundsDeposited(address indexed member, uint256 amount);
    event LoanRequested(address indexed member, uint256 amount);
    event LoanApproved(address indexed member, uint256 amount);
    event LoanDisbursed(address indexed member, uint256 amount);
    event LoanRepaid(address indexed member, uint256 amount);
    event ProposalCreated(
        address indexed proposer,
        uint256 amount,
        string description,
        ProposalType proposalType
    );
    event ProposalExecuted(uint256 indexed proposalId, uint256 amount);
    event VoteCast(
        address indexed voter,
        address indexed borrower,
        uint256 votes
    );
    event MemberJoined(address indexed member);
    event MemberApproved(address indexed member);
    event SignatoryAdded(address indexed newSignatory);

    modifier onlyMember() {
        require(
            members[msg.sender].isMember && members[msg.sender].isApproved,
            "Not an approved DAO member"
        );
        _;
    }

    modifier onlySignatory() {
        require(isSignatory[msg.sender], "Not a signatory");
        _;
    }

    constructor(address _stablecoin) Ownable() {
        stablecoin = IERC20(_stablecoin);
    }

    // Admin approves a member to join DAO
    function approveMember(address _member) external onlyOwner {
        require(members[_member].isMember, "Not a member");
        require(!members[_member].isApproved, "Member already approved");
        members[_member].isApproved = true;
        emit MemberApproved(_member);
    }

    // Join DAO - Admin approval required
    function joinDAO() external {
        require(!members[msg.sender].isMember, "Already a member");
        members[msg.sender].isMember = true;
        totalMembers++;
        emit MemberJoined(msg.sender);
    }

    function depositFunds(uint256 _amount) external onlyMember {
        require(_amount > 0, "Amount must be greater than 0");
        stablecoin.transferFrom(msg.sender, address(this), _amount);
        members[msg.sender].savingsBalance = members[msg.sender]
            .savingsBalance
            .add(_amount);
        members[msg.sender].votePower = members[msg.sender].savingsBalance;
        totalFunds = totalFunds.add(_amount);
        emit FundsDeposited(msg.sender, _amount);
    }

    // Loan Request and Voting
    function requestLoan(uint256 _amount) external onlyMember {
        require(
            members[msg.sender].savingsBalance >= _amount.div(2),
            "Must have 50% of loan amount in savings"
        );
        require(
            !members[msg.sender].hasActiveLoan,
            "Already has an active loan"
        );

        loanRequests.push(
            LoanRequest({
                amount: _amount,
                borrower: msg.sender,
                votesInFavor: 0,
                isApproved: false,
                requestTime: block.timestamp
            })
        );

        emit LoanRequested(msg.sender, _amount);
    }

    function voteForLoan(uint256 _loanRequestId) external onlyMember {
        LoanRequest storage request = loanRequests[_loanRequestId];
        require(
            block.timestamp <= request.requestTime.add(loanExpiry),
            "Loan request expired"
        );
        require(!members[request.borrower].votes[msg.sender], "Already voted");
        require(!request.isApproved, "Loan already approved");

        request.votesInFavor = request.votesInFavor.add(
            members[msg.sender].votePower
        );
        members[request.borrower].votes[msg.sender] = true;
        emit VoteCast(msg.sender, request.borrower, request.votesInFavor);

        if (
            request.votesInFavor.mul(100).div(totalFunds) >=
            loanApprovalThreshold
        ) {
            approveLoan(_loanRequestId);
        }
    }

    function approveLoan(uint256 _loanRequestId) internal {
        LoanRequest storage request = loanRequests[_loanRequestId];
        request.isApproved = true;
        members[request.borrower].hasActiveLoan = true;
        members[request.borrower].loanBalance = request.amount;
        emit LoanApproved(request.borrower, request.amount);
    }

    function disburseLoan(
        uint256 _loanRequestId
    ) external onlyOwner nonReentrant {
        LoanRequest storage request = loanRequests[_loanRequestId];
        require(request.isApproved, "Loan not approved");

        stablecoin.transfer(request.borrower, request.amount);
        totalFunds = totalFunds.sub(request.amount);
        emit LoanDisbursed(request.borrower, request.amount);
    }

    // Loan repayment function
    function repayLoan(uint256 _amount) external onlyMember {
        require(
            members[msg.sender].loanBalance >= _amount,
            "Repayment exceeds loan balance"
        );
        stablecoin.transferFrom(msg.sender, address(this), _amount);
        members[msg.sender].loanBalance = members[msg.sender].loanBalance.sub(
            _amount
        );
        totalFunds = totalFunds.add(_amount);
        if (members[msg.sender].loanBalance == 0) {
            members[msg.sender].hasActiveLoan = false;
        }
        emit LoanRepaid(msg.sender, _amount);
    }

    // Proposal Creation and Voting
    function createProposal(
        uint256 _amount,
        string memory _description,
        ProposalType _proposalType
    ) external onlyMember {
        require(_amount <= totalFunds, "Requested amount exceeds DAO funds");
        require(
            members[msg.sender].savingsBalance >= proposalStakeAmount,
            "Insufficient stake"
        );

        members[msg.sender].savingsBalance = members[msg.sender]
            .savingsBalance
            .sub(proposalStakeAmount); // Stake amount

        proposals.push(
            Proposal({
                proposalType: _proposalType,
                amount: _amount,
                proposer: msg.sender,
                description: _description,
                votesInFavor: 0,
                isApproved: false,
                isExecuted: false,
                creationTime: block.timestamp
            })
        );

        emit ProposalCreated(msg.sender, _amount, _description, _proposalType);
    }

    function voteForProposal(uint256 _proposalId) external onlyMember {
        Proposal storage proposal = proposals[_proposalId];
        require(
            block.timestamp <= proposal.creationTime.add(proposalExpiry),
            "Proposal expired"
        );
        require(!members[proposal.proposer].votes[msg.sender], "Already voted");
        require(!proposal.isApproved, "Proposal already approved");

        proposal.votesInFavor = proposal.votesInFavor.add(
            members[msg.sender].votePower
        );
        members[proposal.proposer].votes[msg.sender] = true;

        if (
            proposal.votesInFavor.mul(100).div(totalFunds) >=
            loanApprovalThreshold
        ) {
            approveProposal(_proposalId);
        }
    }

    function approveProposal(uint256 _proposalId) internal {
        Proposal storage proposal = proposals[_proposalId];
        proposal.isApproved = true;
    }

    function executeProposal(
        uint256 _proposalId
    ) external onlyOwner nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.isApproved, "Proposal not approved");
        require(!proposal.isExecuted, "Proposal already executed");

        stablecoin.transfer(proposal.proposer, proposal.amount);
        totalFunds = totalFunds.sub(proposal.amount);
        proposal.isExecuted = true;

        emit ProposalExecuted(_proposalId, proposal.amount);
    }

    // Multi-Signature Approvals
    function addSignatory(address _newSignatory) external onlyOwner {
        signatories.push(_newSignatory);
        isSignatory[_newSignatory] = true;
        emit SignatoryAdded(_newSignatory);
    }

    function multiSigApproval(
        bytes32 _proposalId,
        address _to,
        uint256 _amount
    ) external onlySignatory {
        signatureCount[_proposalId] = signatureCount[_proposalId].add(1);

        if (signatureCount[_proposalId] >= signaturesRequired) {
            stablecoin.transfer(_to, _amount);
            signatureCount[_proposalId] = 0; // Reset signature count after approval
        }
    }
}
