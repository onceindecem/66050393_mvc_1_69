class VotingService {
  constructor(repository) {
    this.repository = repository;
  }

  castVote(voterId, ranking) {
    const election = this.repository.getElection();
    const voter = this.repository.findVoter(voterId);

    if (!election.isOpen()) {
      throw new Error("Election is not OPEN.");
    }

    if (!voter) {
      throw new Error("Voter not found.");
    }

    if (!voter.active) {
      throw new Error("Voter is not active.");
    }

    if (voter.hasVoted) {
      throw new Error("Voter has already voted.");
    }

    if (!Array.isArray(ranking) || ranking.length !== 3 || ranking.some((id) => !id)) {
      throw new Error("Must select exactly 3 candidates.");
    }

    const unique = new Set(ranking);
    if (unique.size !== 3) {
      throw new Error("Candidates must be different.");
    }

    for (const candidateId of ranking) {
      if (!this.repository.findCandidate(candidateId)) {
        throw new Error(`Candidate ${candidateId} not found.`);
      }
    }

    const ballot = this.repository.addBallot(voter.id, ranking);
    voter.hasVoted = true;
    return ballot;
  }
}

module.exports = VotingService;
