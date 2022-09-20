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

module.exports = { createRaidHistory, endRaidHistory };
