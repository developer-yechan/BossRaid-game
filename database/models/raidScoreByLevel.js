const Sequelize = require("sequelize");

module.exports = class RaidScoreByLevel extends Sequelize.Model {
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
        timestamps: false,
        underscored: false,
        modelName: "RaidScoreByLevel",
        tableName: "raidScoreByLevels",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.RaidScoreByLevel.belongsTo(db.BossRaid);
  }
};
