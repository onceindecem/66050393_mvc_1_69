class ScoreService {
  constructor(repository) {
    this.repository = repository;
  }

  calculate(ballots) {
    const election = this.repository.getElection();
    const scores = new Map(
      election.candidates.map((candidate) => [candidate.id, 0])
    );

    for (const ballot of ballots) {
      if (ballot.status !== "CERTIFIED") {
        continue;
      }

      ballot.ranking.forEach((candidateId, index) => {
        scores.set(candidateId, (scores.get(candidateId) || 0) + election.rankingPoints[index]);
      });
    }

    return election.candidates
      .map((candidate) => ({
        candidate,
        score: scores.get(candidate.id) || 0,
      }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.candidate.id.localeCompare(b.candidate.id);
      });
  }
}

module.exports = ScoreService;
