const path = require("path");
const express = require("express");

const ElectionRepository = require("./models/ElectionRepository");
const VotingService = require("./services/VotingService");
const ScoreService = require("./services/ScoreService");
const ElectionService = require("./services/ElectionService");

const VotingController = require("./controllers/VotingController");
const ElectionController = require("./controllers/ElectionController");
const ReviewController = require("./controllers/ReviewController");
const HomeController = require("./controllers/HomeController");
const ResultController = require("./controllers/ResultController");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

const repository = new ElectionRepository(path.join(__dirname, "..", "data", "seed_data.json"));
const scoreService = new ScoreService(repository);
const votingService = new VotingService(repository);
const electionService = new ElectionService(repository, scoreService);

const votingController = new VotingController(votingService, repository, electionService);
const electionController = new ElectionController(repository, electionService);
const reviewController = new ReviewController(repository, electionService);
const homeController = new HomeController(repository);
const resultController = new ResultController(repository, electionService);

app.get("/", homeController.showHome.bind(homeController));

app.get("/voter", votingController.showForm.bind(votingController));
app.get("/voter/result", resultController.showVoterResult.bind(resultController));
app.get("/vote", (req, res) => res.redirect(`/voter${req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""}`));
app.post("/voter", votingController.submitVote.bind(votingController));
app.post("/vote", votingController.submitVote.bind(votingController));

app.get("/officer", electionController.showStatus.bind(electionController));
app.get("/officer/result", resultController.showOfficerResult.bind(resultController));
app.get("/status", (req, res) => res.redirect(`/officer${req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""}`));
app.post("/officer/close", electionController.closeVoting.bind(electionController));
app.post("/status/close", electionController.closeVoting.bind(electionController));

app.get("/review", reviewController.showReview.bind(reviewController));
app.post("/review", reviewController.decideGroup.bind(reviewController));

app.use((req, res) => {
  res.status(404).render("error", {
    title: "404",
    message: "ไม่พบหน้าที่ต้องการ",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("error", {
    title: "500",
    message: "เกิดข้อผิดพลาดภายในระบบ",
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Election MVC app running at http://localhost:${PORT}`);
  });
}

module.exports = { app, repository, services: { votingService, electionService, scoreService } };
