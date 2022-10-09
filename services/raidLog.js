const raidRepo = require("../repos/raidLog");
const createRaidDao = require("../dao/createRaidHistoryDao");
const endRaidDao = require("../dao/endRaidHistoryDao");
const moment = require("moment");

const createRaidHistory = async (userId, level) => {
  const raidHistory = await raidRepo.createRaidHistory(
    createRaidDao(userId, level)
  );
  return raidHistory;
};

const getRaidStatus = async () => {
  let raidStatus;
  const raidHistorys = await raidRepo.getRaidHistorys();
  if (!raidHistorys) {
    raidStatus = {
      canEnter: true,
      enteredUserId: null,
    };
    return raidStatus;
  }
  const timeInterval =
    raidHistorys[0].createdAt < moment().subtract(3, "minutes");
  if (timeInterval) {
    raidStatus = {
      canEnter: true,
      enteredUserId: null,
    };
  } else {
    raidStatus = {
      canEnter: false,
      enteredUserId: raidHistorys[0].UserId,
    };
  }
  return raidStatus;
};

const endRaidHistory = async (userId, raidRecordId, score) => {
  await raidRepo.endRaidHistory(endRaidDao(userId, raidRecordId, score));
};

const getRankingInfo = async (userId) => {
  const raidRankings = await raidRepo.getRaidRankings();

  let currentRanking = 0;
  for (let i = 0; i < raidRankings.length; i++) {
    if (i === 0) {
      raidRankings[i].dataValues.ranking = currentRanking;
      continue;
    }
    const currentScore = raidRankings[i].dataValues.totalScore;
    if (currentScore === raidRankings[i - 1].dataValues.totalScore) {
      raidRankings[i].dataValues.ranking = currentRanking;
      continue;
    }
    raidRankings[i].dataValues.ranking = currentRanking + 1;
    currentRanking += 1;
  }

  const myRankingInfo = raidRankings.filter((rankInfo) => {
    return rankInfo.dataValues.userId === userId;
  });

  const rankingInfo = {
    ranking: raidRankings,
    userRanking: myRankingInfo[0],
  };

  return rankingInfo;
};

module.exports = {
  createRaidHistory,
  endRaidHistory,
  getRankingInfo,
  getRaidStatus,
};
