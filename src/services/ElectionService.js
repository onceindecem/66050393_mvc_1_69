const BallotGroup = require("../models/BallotGroup");
const { BallotStatus, GroupStatus, ElectionStatus } = require("../models/Status");

class ElectionService {
  constructor(repository, scoreService) {
    this.repository = repository;
    this.scoreService = scoreService;
  }

  closeElection() {
    const election = this.repository.getElection();

    if (!election.isOpen()) {
      throw new Error("Election is not OPEN. It cannot be closed again.");
    }

    election.closeVoting();
    this.detectDuplicateGroups();

    // If there are no groups waiting for officer review, the election
    // can be finalized immediately after closing
    const pendingGroups = election.getPendingGroups();
    if (pendingGroups.length === 0) {
      election.finalize();
    }

    return {
      pendingGroups,
      finalized: election.isFinalized(),
      temporaryScores: this.getTemporaryScores(),
    };
  }

  detectDuplicateGroups() {
    const election = this.repository.getElection();
    const grouped = new Map();

    for (const ballot of election.ballots) {
      const pattern = ballot.getPattern();
      if (!grouped.has(pattern)) {
        grouped.set(pattern, []);
      }
      grouped.get(pattern).push(ballot);
    }

    election.groups = [];
    let groupCounter = 1;

    for (const [pattern, ballots] of grouped.entries()) {
      if (ballots.length >= election.duplicatePatternThreshold) {
        const group = new BallotGroup({
          id: `G${String(groupCounter++).padStart(2, "0")}`,
          pattern,
          ballotIds: ballots.map((ballot) => ballot.id),
          status: GroupStatus.PENDING_REVIEW,
        });
        election.groups.push(group);
        ballots.forEach((ballot) => {
          ballot.status = BallotStatus.PENDING_REVIEW;
          ballot.groupId = group.id;
        });
      } else {
        ballots.forEach((ballot) => {
          ballot.status = BallotStatus.CERTIFIED;
          ballot.groupId = null;
        });
      }
    }
  }

  getTemporaryScores() {
    const election = this.repository.getElection();
    return this.scoreService.calculate(election.ballots);
  }

  reviewGroup(groupId, decision) {
    const election = this.repository.getElection();

    if (election.isFinalized()) {
      throw new Error("Election is already finalized.");
    }

    const group = this.repository.findGroup(groupId);
    if (!group) {
      throw new Error("Review group not found.");
    }

    if (group.status !== GroupStatus.PENDING_REVIEW) {
      throw new Error("Group is not pending review.");
    }

    if (decision === "CERTIFY") {
      group.status = GroupStatus.CERTIFIED;
      this.setGroupBallotsStatus(group, BallotStatus.CERTIFIED);
    } else if (decision === "NOT_COUNT") {
      group.status = GroupStatus.NOT_COUNT;
      this.setGroupBallotsStatus(group, BallotStatus.NOT_COUNT);
    } else {
      throw new Error("Invalid review decision.");
    }

    if (election.getPendingGroups().length === 0) {
      election.finalize();
    }

    return {
      group,
      finalized: election.status === ElectionStatus.FINALIZED,
      scores: this.getFinalScores(),
    };
  }

  setGroupBallotsStatus(group, status) {
    const election = this.repository.getElection();
    for (const ballotId of group.ballotIds) {
      const ballot = election.ballots.find((item) => item.id === ballotId);
      if (ballot) {
        ballot.status = status;
      }
    }
  }

  getFinalScores() {
    const election = this.repository.getElection();
    return this.scoreService.calculate(election.ballots);
  }
}

module.exports = ElectionService;
