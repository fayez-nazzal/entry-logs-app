const express = require("express");
const router = express.Router();
const EntryLog = require("../models/EntryLog");
const { uuid } = require("uuidv4");
const dayjs = require("dayjs");

router.get("/", (_, res) =>
  EntryLog.findAll()
    .then((entryLogs) => res.status(200).json(entryLogs))
    .catch((err) => res.status(500).json(err))
);

router.delete("/", (_, res) =>
  EntryLog.destroy({
    where: {},
    truncate: true,
  })
    .then((entryLogs) => res.status(200).json({ message: "deleted" }))
    .catch((err) => res.status(500).json(err))
);

router.get("/:id", (req, res) => {
  EntryLog.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((entryLog) => res.status(200).json({ message: "deleted" }))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  EntryLog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((entryLog) => res.status(200).json(entryLog))
    .catch((err) => res.status(500).json(err));
});

router.post("/add", (req, res) => {
  const body = req.body;

  // validate that startDateTime is provided
  if (!body.startDateTime) {
    res.status(400).json({ error: "startDateTime is required" });
    return;
  }

  const startDateTime = dayjs(body.startDateTime);

  // validate we have a valid startDateTime
  if (!startDateTime.isValid()) {
    res
      .status(400)
      .json({ error: "Invalid startDateTime, use ISO 8601 format" });
    return;
  }

  const endDateTime = dayjs(body.endDateTime);

  // validate that endDateTime is provided
  if (!body.endDateTime) {
    res.status(400).json({ error: "endDateTime is required" });
    return;
  }

  // validate we have a valid endDateTime
  if (!endDateTime.isValid()) {
    res.status(400).json({ error: "Invalid endDateTime, use ISO 8601 format" });
    return;
  }

  // validate that startDateTime is before endDateTime
  if (!endDateTime.isAfter(startDateTime, "seconds")) {
    res
      .status(400)
      .json({ error: "startDateTime must be less than endDateTime" });
    return;
  }

  const description = body.description;

  // validate that description is provided
  if (!description) {
    res.status(400).json({ error: "Empty description is not allowed" });
    return;
  }

  EntryLog.create({
    id: uuid(),
    startDateTime,
    endDateTime,
    description,
  })
    .then((entryLog) => res.status(200).json(entryLog))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
