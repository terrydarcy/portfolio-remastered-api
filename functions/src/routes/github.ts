const notesRouter = require("express").Router();

let github_controller = require("../controllers/githubController");

notesRouter.get("/", github_controller.getRepos);

module.exports = notesRouter;
