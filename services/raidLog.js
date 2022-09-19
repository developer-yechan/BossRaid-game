const raidRepo = require("../repos/raidLog");

const createRaidHistory = async (userId, level) => {
  const raidHistory = await raidRepo.createRaidHistory(userId, level);
  return raidHistory;
};

module.exports = { createRaidHistory };
