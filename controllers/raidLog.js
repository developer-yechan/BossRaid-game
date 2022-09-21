const raidService = require("../services/raidLog");
const raidRepo = require("../repos/raidLog");
const moment = require("moment");

const getRaidStatus = async (req, res, next) => {
  const redis = req.app.get("redis");
  if (!redis) {
    const e = new Error("레디스 연결을 확인해 주세요");
    e.status = 500;
    throw e;
  }
  const bossRaidState = await redis.json.get("bossRaidState");
  if (!bossRaidState) {
    const e = new Error("보스레이드 상태가 레디스에 캐싱 되어 있지 않습니다.");
    e.status = 500;
    throw e;
  }
  return res.status(200).json(bossRaidState);
};

const createRaidHistory = async (req, res, next) => {
  try {
    const { userId, level } = req.body;
    const redis = req.app.get("redis");

    if (!redis) {
      throw new Error("레디스 연결을 확인해 주세요");
    }
    const bossRaidState = await redis.json.get("bossRaidState");

    if (!bossRaidState) {
      const e = new Error(
        "보스레이드 상태가 레디스에 캐싱 되어 있지 않습니다."
      );
      e.status = 500;
      throw e;
    }

    const canEnter = bossRaidState.canEnter;
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
    await redis.json.set("bossRaidState", "$", {
      canEnter: true,
      enteredUserId: null,
    });
    return res
      .status(200)
      .json({ message: `보스레이드 Lv.${raidHistory.level} 클리어` });
  } catch (err) {
    next(err);
  }
};

const getRaidRankings = async (req, res, next) => {
  const redis = req.app.get("redis");
  if (!redis) {
    throw new Error("레디스 연결을 확인해 주세요");
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
