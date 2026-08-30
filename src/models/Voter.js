class Voter {
  constructor({ id, name, active, hasVoted = false }) {
    this.id = id;
    this.name = name;
    this.active = Boolean(active);
    this.hasVoted = Boolean(hasVoted);
  }
}

module.exports = Voter;
