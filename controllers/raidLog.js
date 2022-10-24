const raidService = require("../services/raidLog");
const moment = require("moment");
// staticData, BossRaidState, Ranking 레디스 캐싱
// API 캐싱 해보기 --> https://fors.tistory.com/582 참고
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
  //레디스 연결 확인
  const redis = req.app.get("redis");
  if (!redis) {
    const e = new Error("레디스 연결을 확인해 주세요");
    e.status = 500;
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
  try {
    const { userId, level } = req.body;
    // 보스레이드 입장 가능 여부 확인
    const bossRaidState = await redis.json.get("bossRaidState");
    let canEnter;
    if (!bossRaidState) {
      const raidStatus = await raidService.getRaidStatus();
      canEnter = raidStatus.canEnter;
    } else {
      canEnter = bossRaidState.canEnter;
    }
    if (!canEnter) {
      return res.status(400).json({ isEntered: false });
    }
    try {
      // 동시성 처리
      await redis.watch("bossRaidState");
      const transaction = await redis
        .multi()
        .json.set("bossRaidState", "$", {
          canEnter: false,
          enteredUserId: userId,
        })
        .exec();
      if (transaction.includes(null)) {
        return res
          .status(400)
          .json({ message: "먼저 게임을 시작한 유저가 있습니다." });
      }
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ message: "먼저 게임을 시작한 유저가 있습니다." });
    }
    // 유저 기록 생성
    const raidHistory = await raidService.createRaidHistory(userId, level);
    raidHistory.isEntered = true;
    return res.status(201).json(raidHistory);
  } catch (err) {
    await redis.json.set("bossRaidState", "$", {
      canEnter: true,
      enteredUserId: null,
    });
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
  if (redis.json.get("RankingInfo")) {
    const ranking = await redis.json.get("RankingInfo");
    return res.status(200).json(ranking);
  }
  const { userId } = req.params;
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
