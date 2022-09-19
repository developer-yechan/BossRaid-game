const raidService = require("../services/raidLog");

const createRaidHistory = async (req, res, next) => {
  try {
    const { userId, level } = req.body;
    const redis = req.app.get("redis");
    if (!redis) {
      throw new Error("레디스 연결을 확인해 주세요");
    }
    const bossRaidState = await redis.json.get("bossRaidState");
    const canEnter = bossRaidState.canEnter;
    if (!canEnter) {
      res.status(400).json({ isEntered: false });
    }
    const raidHistory = await raidService.createRaidHistory(userId, level);
    raidHistory.isEntered = true;
    return res.status(201).json(raidHistory);
  } catch (err) {
    next(err);
  }
};

module.exports = { createRaidHistory };
