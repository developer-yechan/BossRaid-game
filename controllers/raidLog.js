const raidService = require("../services/raidLog");
const moment = require("moment");

const getRaidStatus = async (req, res, next) => {
  const raidStatus = await raidService.getRaidStatus();
  const redis = req.app.get("redis");

  if (!redis) {
    const e = new Error("레디스 연결을 확인해 주세요");
    e.status = 500;
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
  await redis.json.set("bossRaidState", "$", raidStatus);
  return res.status(200).json(raidStatus);
};

const createRaidHistory = async (req, res, next) => {
  try {
    const { userId, level } = req.body;
    const redis = req.app.get("redis");
    if (!redis) {
      const e = new Error("레디스 연결을 확인해 주세요");
      e.status = 500;
      console.error(e);
      return res.status(500).json({ error: "Server Error" });
    }
    const bossRaidState = await redis.json.get("bossRaidState");
    let canEnter;
    if (!bossRaidState) {
      const raidStatus = raidService.getRaidStatus();
      canEnter = raidStatus.canEnter;
    } else {
      canEnter = bossRaidState.canEnter;
    }
    if (!canEnter) {
      return res.status(400).json({ isEntered: false });
    }
    const raidHistory = await raidService.createRaidHistory(userId, level);
    raidHistory.isEntered = true;
    await redis.json.set("bossRaidState", "$", {
      canEnter: false,
      enteredUserId: userId,
    });
    return res.status(201).json(raidHistory);
  } catch (err) {
    next(err);
  }
};

const endRaidHistory = async (req, res, next) => {
  try {
    const { userId, raidRecordId } = req.body;
    const redis = req.app.get("redis");
    const bossRaidData = await redis.json.get("bossRaidData");
    const levels = bossRaidData.bossRaids[0].levels;
    let score;
    for (let i = 0; i < levels.length; i++) {
      if (levels[i].level === req.raidHistory.level) {
        score = levels[i].score;
        break;
      }
    }
    await raidService.endRaidHistory(userId, raidRecordId, score);
    await redis.json.set("bossRaidState", "$", {
      canEnter: true,
      enteredUserId: null,
    });
    return res
      .status(200)
      .json({ message: `보스레이드 Lv.${req.raidHistory.level} 클리어` });
  } catch (err) {
    next(err);
  }
};

const getRaidRankings = async (req, res, next) => {
  const redis = req.app.get("redis");
  if (!redis) {
    const e = new Error("레디스 연결을 확인해 주세요");
    e.status = 500;
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }

  const { userId } = req.body;
  const rankingInfo = await raidService.getRankingInfo(userId);
  //랭킹데이터 레디스 캐싱
  await redis.json.set("RankingInfo", "$", rankingInfo);
  return res.status(200).json(rankingInfo);
};

module.exports = {
  createRaidHistory,
  endRaidHistory,
  getRaidRankings,
  getRaidStatus,
};
