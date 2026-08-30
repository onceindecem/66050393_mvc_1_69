const fs = require("fs");
const path = require("path");

const Candidate = require("./Candidate");
const Voter = require("./Voter");
const Ballot = require("./Ballot");
const Election = require("./Election");
const { BallotStatus } = require("./Status");

class ElectionRepository {
  constructor(seedPath) {
    this.seedPath = seedPath;
    this.election = null;
    this.nextBallotNumber = 1;
    this.loadSeed();
  }

  loadSeed() {
    const raw = JSON.parse(fs.readFileSync(this.seedPath, "utf8"));
    const e = raw.election;

    this.election = new Election({
      id: e.id,
      title: e.title,
      status: e.status,
      rankingPoints: e.ranking_points,
      duplicatePatternThreshold: e.duplicate_pattern_threshold,
    });

    this.election.candidates = raw.candidates.map((candidate) => new Candidate(candidate));
    this.election.voters = raw.voters.map((voter) => new Voter(voter));
    this.election.ballots = raw.ballots.map(
      (ballot) => new Ballot({ ...ballot, status: BallotStatus.CERTIFIED })
    );

    this.election.voters.forEach((voter) => {
      voter.hasVoted = this.election.ballots.some((ballot) => ballot.voterId === voter.id);
    });

    this.nextBallotNumber = this.election.ballots.reduce((max, ballot) => {
      const n = Number(String(ballot.id).replace(/^B/, ""));
      return Number.isFinite(n) ? Math.max(max, n + 1) : max;
    }, 1);
  }

  reset() {
    this.loadSeed();
  }

  getElection() {
    return this.election;
  }

  findVoter(voterId) {
    return this.election.voters.find((voter) => voter.id === voterId);
  }

  findCandidate(candidateId) {
    return this.election.candidates.find((candidate) => candidate.id === candidateId);
  }

  findGroup(groupId) {
    return this.election.groups.find((group) => group.id === groupId);
  }

  addBallot(voterId, ranking) {
    const ballot = new Ballot({
      id: `B${String(this.nextBallotNumber++).padStart(2, "0")}`,
      voterId,
      ranking,
      status: BallotStatus.CERTIFIED,
    });
    this.election.ballots.push(ballot);
    return ballot;
  }
}

module.exports = ElectionRepository;
