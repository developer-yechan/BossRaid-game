const userRepo = require("../repos/user");
const raidRepo = require("../repos/raidLog");

const createUser = async () => {
  const userId = await userRepo.createUser();
  return userId;
};

const getUserRecord = async (id) => {
  const raidHistory = await raidRepo.getRaidHistoryByUser(id);
  const userRank = await raidRepo.getMyRaidRanking(id);
  const userRecord = {
    totalScore: userRank.dataValues.totalScore,
    bossRaidHistory: raidHistory,
  };
  return userRecord;
};

module.exports = { createUser, getUserRecord };
