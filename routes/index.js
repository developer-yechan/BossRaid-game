const express = require("express");
const router = express();
const userRouter = require("../routes/user");
const raidRouter = require("../routes/raidLog");

router.use("/user", userRouter);
router.use("/bossRaid", raidRouter);

module.exports = router;
