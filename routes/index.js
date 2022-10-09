const express = require("express");
const router = express();
const userRouter = require("../routes/user");
const raidRouter = require("../routes/raidLog");

router.use("/api/user", userRouter);
router.use("/api/bossraids", raidRouter);

module.exports = router;
