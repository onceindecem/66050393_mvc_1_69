class ElectionController {
  constructor(repository, electionService) {
    this.repository = repository;
    this.electionService = electionService;
  }

  showStatus(req, res) {
    const election = this.repository.getElection();
    res.render("officer", {
      election,
      role: "OFFICER",
      scores: this.electionService.getTemporaryScores(),
      error: req.query.error || null,
      success: req.query.success || null,
    });
  }

  closeVoting(req, res) {
    try {
      const result = this.electionService.closeElection();
      const message = result.finalized
        ? "ปิดรับคะแนนแล้วและไม่มีบัตรที่ต้องตรวจสอบ การเลือกตั้งเข้าสู่สถานะสรุปผลแล้ว"
        : "ปิดรับคะแนนและตรวจ pattern เรียบร้อย";
      res.redirect(`/officer?success=${encodeURIComponent(message)}`);
    } catch (error) {
      res.redirect(`/officer?error=${encodeURIComponent(error.message)}`);
    }
  }
}

module.exports = ElectionController;
