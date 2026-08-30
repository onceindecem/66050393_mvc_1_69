class HomeController {
  constructor(repository) {
    this.repository = repository;
  }

  showHome(req, res) {
    const election = this.repository.getElection();
    res.render("home", { election });
  }
}

module.exports = HomeController;
