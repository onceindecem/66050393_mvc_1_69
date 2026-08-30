const { BallotStatus } = require("./Status");

class Ballot {
  constructor({ id, voterId, ranking, status = BallotStatus.CERTIFIED, groupId = null }) {
    this.id = id;
    this.voterId = voterId;
    this.ranking = [...ranking];
    this.status = status;
    this.groupId = groupId;
  }

  getPattern() {
    return this.ranking.join(" > ");
  }
}

module.exports = Ballot;
