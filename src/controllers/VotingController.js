class VotingController {
  constructor(votingService, repository, electionService) {
    this.votingService = votingService;
    this.repository = repository;
    this.electionService = electionService;
  }

  showForm(req, res) {
    const election = this.repository.getElection();
    const selectedVoter = this.repository.findVoter(req.query.voterId) || null;
    const scores = this.electionService.getTemporaryScores();
    const counts = {
      certified: election.ballots.filter((ballot) => ballot.status === "CERTIFIED").length,
      pending: election.ballots.filter((ballot) => ballot.status === "PENDING_REVIEW").length,
      notCount: election.ballots.filter((ballot) => ballot.status === "NOT_COUNT").length,
    };

    res.render("voter", {
      election,
      voters: election.voters,
      candidates: election.candidates,
      selectedVoter,
      scores,
      counts,
      success: req.query.success || null,
      error: req.query.error || null,
    });
  }

  submitVote(req, res) {
    try {
      const { voterId, rank1, rank2, rank3 } = req.body;
      this.votingService.castVote(voterId, [rank1, rank2, rank3]);
      res.redirect(`/voter?voterId=${encodeURIComponent(voterId)}&success=${encodeURIComponent("ลงคะแนนสำเร็จ")}`);
    } catch (error) {
      const voterId = req.body.voterId || "";
      res.redirect(`/voter?voterId=${encodeURIComponent(voterId)}&error=${encodeURIComponent(error.message)}`);
    }
  }
}

module.exports = VotingController;
