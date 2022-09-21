const express = require("express");
const raidControllers = require("../controllers/raidLog");
const BossRaidEnd = require("../middlewares/BossRaidEnd");
const router = express();

router.post("/enter", raidControllers.createRaidHistory);
router.patch("/end", BossRaidEnd, raidControllers.endRaidHistory);
router.get("/topRankerList", raidControllers.getRaidRankings);
router.get("/", raidControllers.getRaidStatus);

module.exports = router;
