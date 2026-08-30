class ResultController {
  constructor(repository, electionService) {
    this.repository = repository;
    this.electionService = electionService;
  }

  buildResultData() {
    const election = this.repository.getElection();
    const ballots = election.ballots;
    const counts = {
      total: ballots.length,
      certified: ballots.filter((ballot) => ballot.status === "CERTIFIED").length,
      pending: ballots.filter((ballot) => ballot.status === "PENDING_REVIEW").length,
      notCount: ballots.filter((ballot) => ballot.status === "NOT_COUNT").length,
    };

    return {
      election,
      scores: this.electionService.getFinalScores(),
      counts,
    };
  }

  showVoterResult(req, res) {
    const data = this.buildResultData();
    res.render("result-voter", data);
  }

  showOfficerResult(req, res) {
    const data = this.buildResultData();
    res.render("result-officer", data);
  }
}

module.exports = ResultController;
