const express = require("express");
const raidControllers = require("../controllers/raidLog");
const router = express();

router.post("/enter", raidControllers.createRaidHistory);
router.patch("/end", raidControllers.endRaidHistory);
router.get("/topRankerList", raidControllers.getRaidRankings);

module.exports = router;
