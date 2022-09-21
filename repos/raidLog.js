const { sequelize } = require("../database/models/raidLog");
const RaidLog = require("../database/models/raidLog");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

const getRaidHistorys = async () => {
  const raidHistorys = await RaidLog.findAll({
    where: {
      score: {
        [Op.is]: null,
      },
    },
    order: sequelize.literal("createdAt DESC"),
  });
  return raidHistorys;
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

const getMyRaidRanking = async (userId) => {
  const raidRanking = await RaidLog.findOne({
    attributes: [[sequelize.fn("sum", sequelize.col("score")), "totalScore"]],
    group: ["UserId"],
    where: {
      UserId: userId,
    },
  });
  return raidRanking;
};

const getRaidHistoryByUser = async (userId) => {
  const raidHistory = await RaidLog.findAll({
    attributes: [
      ["id", "raidRecordId"],
      "score",
      ["createdAt", "enterTime"],
      ["updatedAt", "endTime"],
    ],
    where: {
      UserId: userId,
    },
  });
  return raidHistory;
};

module.exports = {
  createRaidHistory,
  getRaidHistory,
  getRaidHistorys,
  deleteRaidHistory,
  endRaidHistory,
  getRaidRankings,
  getMyRaidRanking,
  getRaidHistoryByUser,
};
