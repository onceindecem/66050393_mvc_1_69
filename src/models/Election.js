const { ElectionStatus, GroupStatus } = require("./Status");

class Election {
  constructor({ id, title, status, rankingPoints, duplicatePatternThreshold }) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.rankingPoints = [...rankingPoints];
    this.duplicatePatternThreshold = duplicatePatternThreshold;
    this.candidates = [];
    this.voters = [];
    this.ballots = [];
    this.groups = [];
  }

  isOpen() {
    return this.status === ElectionStatus.OPEN;
  }

  isFinalized() {
    return this.status === ElectionStatus.FINALIZED;
  }

  closeVoting() {
    this.status = ElectionStatus.CLOSED;
  }

  finalize() {
    this.status = ElectionStatus.FINALIZED;
  }

  getBallotCount() {
    return this.ballots.length;
  }

  getPendingGroups() {
    return this.groups.filter((group) => group.status === GroupStatus.PENDING_REVIEW);
  }
}

module.exports = Election;
