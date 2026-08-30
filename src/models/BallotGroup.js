const { GroupStatus } = require("./Status");

class BallotGroup {
  constructor({ id, pattern, ballotIds = [], status = GroupStatus.PENDING_REVIEW }) {
    this.id = id;
    this.pattern = pattern;
    this.ballotIds = [...ballotIds];
    this.status = status;
  }

  get count() {
    return this.ballotIds.length;
  }
}

module.exports = BallotGroup;
