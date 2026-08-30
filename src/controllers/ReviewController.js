class ReviewController {
  constructor(repository, electionService) {
    this.repository = repository;
    this.electionService = electionService;
  }

  showReview(req, res) {
    const election = this.repository.getElection();
    res.render("review", {
      election,
      groups: election.groups,
      getBallotById: (id) => election.ballots.find((ballot) => ballot.id === id),
      error: req.query.error || null,
      success: req.query.success || null,
    });
  }

  decideGroup(req, res) {
    try {
      const { groupId, decision } = req.body;
      const result = this.electionService.reviewGroup(groupId, decision);
      const message = result.finalized
        ? "ตรวจสอบครบทุกใบ และสรุปผลการเลือกตั้งแล้ว"
        : "บันทึกผลการตรวจสอบแล้ว";
      res.redirect(`/review?success=${encodeURIComponent(message)}`);
    } catch (error) {
      res.redirect(`/review?error=${encodeURIComponent(error.message)}`);
    }
  }
}

module.exports = ReviewController;
