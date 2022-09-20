const raidService = require("../services/raidLog");
const raidRepo = require("../repos/raidLog");
const moment = require("moment");

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
    bossRaidState.canEnter = false;
    return res.status(201).json(raidHistory);
  } catch (err) {
    next(err);
  }
};

const endRaidHistory = async (req, res, next) => {
  try {
    const { userId, raidRecordId } = req.body;
    const raidHistory = await raidRepo.getRaidHistory(userId, raidRecordId);
    if (!raidHistory) {
      throw new Error("게임을 시작한 기록이 없어요");
    }
    const timeInterval =
      raidHistory.createdAt < moment().subtract(3, "minutes");
    if (timeInterval) {
      await raidRepo.deleteRaidHistory(userId, raidRecordId);
      throw new Error("제한 시간을 초과했습니다.");
    }
    const redis = req.app.get("redis");
    if (!redis) {
      throw new Error("레디스 연결을 확인해 주세요");
    }
    const bossRaidData = await redis.json.get("bossRaidData");
    const bossRaidState = await redis.json.get("bossRaidState");

    const levels = bossRaidData.bossRaids[0].levels;
    let score;
    for (let i = 0; i < levels.length; i++) {
      if (levels[i].level === raidHistory.level) {
        score = levels[i].score;
        break;
      }
    }
    await raidService.endRaidHistory(userId, raidRecordId, score);
    bossRaidState.canEnter = true;
    return res
      .status(200)
      .json({ message: `보스레이드 Lv.${raidHistory.level} 클리어` });
  } catch (err) {
    next(err);
  }
};

module.exports = { createRaidHistory, endRaidHistory };
