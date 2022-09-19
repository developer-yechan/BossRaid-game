const bossStateDao = require("../dao/bossStateDao");

const setStaticData = async (req, res, next) => {
  const redis = req.app.get("redis");
  if (!redis) {
    next();
  }
  const bossRaidResponse = await axios.get(
    "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json"
  );
  const bossRaidData = bossRaidResponse.data;
  await redis.json.set("bossRaidData", "$", bossRaidData);

  if (!(await redis.json.get("bossRaidState"))) {
    await redis.json.set("bossRaidState", "$", bossStateDao(true, null));
  }
  //   console.log(
  //     await redis.json.get("bossRaidState", "bossRaidData", dsfjsdkflsj)
  //   );
  next();
};

module.exports = setStaticData;
