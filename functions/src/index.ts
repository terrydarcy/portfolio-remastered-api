// https://medium.com/weekly-webtips/how-to-use-an-express-router-within-the-cloud-function-developing-environment-cb64face4043
// https://node-postgres.com/guides/async-express
//TODO: do not use for production
require('dotenv').config();
const cors = require("cors");
const functions = require("firebase-functions");
const express = require("express");
const app = express();
app.use(cors({origin: true}));

const notesRoute = require("./routes/notes");

// routings
app.use("/notes", notesRoute);
exports.devNotesAPI = functions.https.onRequest(app);