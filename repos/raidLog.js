const { sequelize } = require("../database/models/raidLog");
const RaidLog = require("../database/models/raidLog");

const createRaidHistory = async (dto) => {
  let raidHistory = await RaidLog.create(dto);
  raidHistory = {
    raidRecordId: raidHistory.id,
  };
  return raidHistory;
};

const getRaidHistory = async (userId, raidRecordId) => {
  const raidHistory = await RaidLog.findOne({
    where: {
      UserId: userId,
      id: raidRecordId,
    },
  });
  return raidHistory;
};

const deleteRaidHistory = async (userId, raidRecordId) => {
  await RaidLog.destroy({
    where: {
      UserId: userId,
      id: raidRecordId,
    },
  });
};

const endRaidHistory = async (dto) => {
  await RaidLog.update(
    { score: dto.score },
    {
      where: {
        id: dto.raidRecordId,
        UserId: dto.userId,
      },
    }
  );
};

const getRaidRankings = async () => {
  const raidRanking = await RaidLog.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("score")), "totalScore"],
      ["UserId", "userId"],
    ],
    group: ["UserId"],
    order: sequelize.literal("totalScore DESC"),
  });
  return raidRanking;
};

const getMyRaidRankings = async (userId) => {
  const raidRanking = await RaidLog.findOne({
    attributes: [
      [sequelize.fn("sum", sequelize.col("score")), "totalScore"],
      ["UserId", "userId"],
    ],
    group: ["UserId"],
    order: sequelize.literal("totalScore DESC"),
    where: {
      UserId: userId,
    },
  });
  return raidRanking;
};

module.exports = {
  createRaidHistory,
  getRaidHistory,
  deleteRaidHistory,
  endRaidHistory,
  getRaidRankings,
  getMyRaidRankings,
};
