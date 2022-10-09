const bossStateDao = require("../dao/bossStateDao");
const axios = require("axios");

const setStaticData = async (req, res, next) => {
  const redis = req.app.get("redis");
  if (!redis) {
    return next();
  }
  const bossRaidResponse = await axios.get(
    "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json"
  );
  const bossRaidData = bossRaidResponse.data;

  await redis.json.set("bossRaidData", "$", bossRaidData);

  next();
};

module.exports = setStaticData;
