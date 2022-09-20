const express = require("express");
const raidControllers = require("../controllers/raidLog");
const router = express();

router.post("/enter", raidControllers.createRaidHistory);
router.patch("/end", raidControllers.endRaidHistory);

module.exports = router;
