const raidRepo = require("../repos/raidLog");
const moment = require("moment");

const BossRaidEnd = async (req, res, next) => {
  try {
    const { userId, raidRecordId } = req.body;
    const redis = req.app.get("redis");
    if (!redis) {
      const e = new Error("레디스 연결을 확인해 주세요");
      e.status = 500;
      console.error(e);
      return res.status(500).json({ error: "Server Error" });
    }
    const raidHistory = await raidRepo.getRaidHistory(userId, raidRecordId);
    if (!raidHistory) {
      return res.status(400).json({ error: "게임을 시작한 기록이 없어요" });
    }
    const timeInterval =
      raidHistory.createdAt < moment().subtract(3, "minutes");
    if (timeInterval) {
      await raidRepo.deleteRaidHistory(userId, raidRecordId);
      await redis.json.set("bossRaidState", "$", {
        canEnter: true,
        enteredUserId: null,
      });
      return res.status(400).json({ error: "제한 시간을 초과했습니다." });
    }
    req.raidHistory = raidHistory;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = BossRaidEnd;
