const raidRepo = require("../repos/raidLog");
const createRaidDto = require("../dto/createRaidHistoryDto");
const endRaidDto = require("../dto/endRaidHistoryDto");

const createRaidHistory = async (userId, level) => {
  const raidHistory = await raidRepo.createRaidHistory(
    createRaidDto(userId, level)
  );
  return raidHistory;
};

const endRaidHistory = async (userId, raidRecordId, score) => {
  await raidRepo.endRaidHistory(endRaidDto(userId, raidRecordId, score));
};

const getRankingInfo = async (userId) => {
  const raidRankings = await raidRepo.getRaidRankings();

  raidRankings.forEach((rankInfo, idx) => {
    rankInfo.dataValues.ranking = idx;
  });

  const myRankingInfo = raidRankings.filter((rankInfo) => {
    return rankInfo.dataValues.userId === userId;
  });

  const rankingInfo = {
    topRankerInfoList: raidRankings,
    myRankingInfo: myRankingInfo[0],
  };

  return rankingInfo;
};

module.exports = { createRaidHistory, endRaidHistory, getRankingInfo };
