// https://medium.com/weekly-webtips/how-to-use-an-express-router-within-the-cloud-function-developing-environment-cb64face4043
// https://node-postgres.com/guides/async-express
//TODO: do not use for production
require('dotenv').config();
const cors = require("cors");
const functions = require("firebase-functions");
const express = require("express");
const app = express();
app.use(cors({origin: true}));

const githubRoutes = require("./routes/github");
const statusRoutes = require("./routes/status");

// routings
app.use("/github", githubRoutes);
app.use("/status", statusRoutes);

exports.portfolio_remastered = functions.https.onRequest(app);