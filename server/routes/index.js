const express = require("express");
const router = express.Router();

// API Home Page
router.get("/", (_, res) => {
  res.render("index", { title: "Welcome to the EntryLogs API :)" });
});

module.exports = router;
