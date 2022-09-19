const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const user = require("./models/user");
const raidLog = require("./models/raidLog");
// const bossRaid = require("./models/bossRaid");
// const raidScoreByLevel = require("./models/raidScoreByLevel");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = user;
// db.BossRaid = bossRaid;
db.RaidLog = raidLog;
// db.RaidScoreByLevel = raidScoreByLevel;

user.init(sequelize);
raidLog.init(sequelize);
// bossRaid.init(sequelize);
// raidScoreByLevel.init(sequelize);

user.associate(db);
raidLog.associate(db);
// bossRaid.associate(db);
// raidScoreByLevel.associate(db);

module.exports = db;
