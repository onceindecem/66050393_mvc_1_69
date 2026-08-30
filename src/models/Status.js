const ElectionStatus = Object.freeze({
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  FINALIZED: "FINALIZED",
});

const BallotStatus = Object.freeze({
  PENDING_REVIEW: "PENDING_REVIEW",
  CERTIFIED: "CERTIFIED",
  NOT_COUNT: "NOT_COUNT",
});

const GroupStatus = Object.freeze({
  PENDING_REVIEW: "PENDING_REVIEW",
  CERTIFIED: "CERTIFIED",
  NOT_COUNT: "NOT_COUNT",
});

module.exports = { ElectionStatus, BallotStatus, GroupStatus };
