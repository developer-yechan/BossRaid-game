const Sequelize = require("sequelize");

module.exports = class RaidLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        level: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "RaidLog",
        tableName: "raidLogs",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.RaidLog.belongsTo(db.User);
    db.RaidLog.belongsTo(db.BossRaid);
  }
};
