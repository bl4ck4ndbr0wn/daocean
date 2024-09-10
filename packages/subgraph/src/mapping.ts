import {
  DAOCreated,
  FundsDeposited,
  FundsTransferred,
  InternalTransfer,
  LoanApproved,
  LoanDisbursed,
  LoanRepaid,
  LoanRequested,
  MemberJoinedDAO,
  OwnershipTransferred,
  ProposalCreated,
  ProposalExecuted,
  ProposalVoteCast,
  SignatoryAdded,
  SignatoryRemoved,
  VoteCast,
} from "../generated/schema";
import {
  DAOCreated as DAOCreatedEvent,
  FundsDeposited as FundsDepositedEvent,
  FundsTransferred as FundsTransferredEvent,
  InternalTransfer as InternalTransferEvent,
  LoanApproved as LoanApprovedEvent,
  LoanDisbursed as LoanDisbursedEvent,
  LoanRepaid as LoanRepaidEvent,
  LoanRequested as LoanRequestedEvent,
  MemberJoinedDAO as MemberJoinedDAOEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  ProposalVoteCast as ProposalVoteCastEvent,
  SignatoryAdded as SignatoryAddedEvent,
  SignatoryRemoved as SignatoryRemovedEvent,
  VoteCast as VoteCastEvent,
} from "../generated/MultiDAOTreasury/MultiDAOTreasury";

export function handleDAOCreated(event: DAOCreatedEvent): void {
  let entity = new DAOCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.name = event.params.name;
  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFundsDeposited(event: FundsDepositedEvent): void {
  let entity = new FundsDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.member = event.params.member;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFundsTransferred(event: FundsTransferredEvent): void {
  let entity = new FundsTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.recipient = event.params.recipient;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInternalTransfer(event: InternalTransferEvent): void {
  let entity = new InternalTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLoanApproved(event: LoanApprovedEvent): void {
  let entity = new LoanApproved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.member = event.params.member;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLoanDisbursed(event: LoanDisbursedEvent): void {
  let entity = new LoanDisbursed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.member = event.params.member;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLoanRepaid(event: LoanRepaidEvent): void {
  let entity = new LoanRepaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.member = event.params.member;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLoanRequested(event: LoanRequestedEvent): void {
  let entity = new LoanRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.member = event.params.member;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMemberJoinedDAO(event: MemberJoinedDAOEvent): void {
  let entity = new MemberJoinedDAO(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.member = event.params.member;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let entity = new ProposalCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.proposer = event.params.proposer;
  entity.amount = event.params.amount;
  entity.description = event.params.description;
  entity.proposalType = event.params.proposalType;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  let entity = new ProposalExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.proposalId = event.params.proposalId;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProposalVoteCast(event: ProposalVoteCastEvent): void {
  let entity = new ProposalVoteCast(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.voter = event.params.voter;
  entity.proposalId = event.params.proposalId;
  entity.votes = event.params.votes;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSignatoryAdded(event: SignatoryAddedEvent): void {
  let entity = new SignatoryAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.newSignatory = event.params.newSignatory;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSignatoryRemoved(event: SignatoryRemovedEvent): void {
  let entity = new SignatoryRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.signatory = event.params.signatory;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVoteCast(event: VoteCastEvent): void {
  let entity = new VoteCast(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoId = event.params.daoId;
  entity.voter = event.params.voter;
  entity.borrower = event.params.borrower;
  entity.loanRequestId = event.params.loanRequestId;
  entity.votes = event.params.votes;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
