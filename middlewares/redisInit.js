const { createClient } = require("redis");
const client = createClient();

const redisInit = async (req, res, next) => {
  if (req.app.get("redis")) {
    next();
  }

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
