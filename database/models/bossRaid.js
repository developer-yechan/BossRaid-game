const Sequelize = require("sequelize");

module.exports = class BossRaid extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        limitSeconds: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        canEnter: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        enteredUserId: {
          type: Sequelize.UUID,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "BossRaid",
        tableName: "bossRaids",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.BossRaid.hasMany(db.RaidScoreByLevel);
    db.BossRaid.hasMany(db.RaidLog);
    db.BossRaid.belongsTo(db.User, {
      foreignKey: "enteredUserId",
    });
  }
};
