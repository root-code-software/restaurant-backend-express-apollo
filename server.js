const express = require("express");
const consign = require("consign");
const app = express();

consign()
  .include("util/logger.js")
  .then("config/middlewares.js")
  .then("config/apollo.js")
  .then("api/index.js")
  .then("config/boot.js")
  .into(app);

module.exports = app;
