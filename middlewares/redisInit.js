const Redis = require("redis");

const redisInit = async (req, res, next) => {
  if (req.app.get("redis")) {
    return next();
  }
  // 로컬 레디스 json 형태 staticData 안 들어가는 문제가 있어서 redis labs 저장소 연결해 사용
  const client = Redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  });

  client.on("error", (err) => {
    console.log("Redis Client Error", err);
    req.app.set("redis", null);
    next();
  });

  await client.connect();

  req.app.set("redis", client);
  next();
};

module.exports = redisInit;
