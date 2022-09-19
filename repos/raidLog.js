const RaidLog = require("../database/models/raidLog");

const createRaidHistory = async (userId, level) => {
  let raidHistory = await RaidLog.create({
    userId,
    level,
  });
  raidHistory = {
    raidRecordId: raidHistory.id,
  };
  return raidHistory;
};

module.exports = { createRaidHistory };
