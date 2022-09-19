require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const db = require("./database");
const dotenv = require("dotenv");
const routes = require("./routes");
// const { swaggerUi, specs } = require("./swagger/swagger");
// const errorCodes = require("./codes/errorCodes");
const errorHandler = require("./errorHandler/errorHandler");
dotenv.config();
const redisInit = require("./middlewares/redisInit");
const setStaticData = require("./middlewares/setStaticData");
// const redis = require("redis");
// const { default: axios } = require("axios");
// const client = redis.createClient();
const app = express();
app.set("port", process.env.PORT);

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
app.use(redisInit);
app.use(setStaticData);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);

// app.get("/data", async (req, res) => {
//   try {
//     const bossRaidResponse = await axios.get(
//       "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json"
//     );
//     console.log(bossRaidResponse.data);
//     const bossRaidData = bossRaidResponse.data;
//     await client.connect();
//     await client.setEx("staticData", 1440, JSON.stringify(bossRaidData));

//     return res.json(bossRaidData);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json(error);
//   }
// });

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello world" });
});

app.use((req, res) => {
  res.status(404).json({ message: "page is not found" });
});
app.use(errorHandler);

module.exports = app;
