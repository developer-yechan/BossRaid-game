const express = require("express");
const { createRaidHistory } = require("../controllers/raidLog");
const router = express();

router.post("/enter", createRaidHistory);

module.exports = router;
