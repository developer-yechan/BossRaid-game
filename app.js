require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const db = require("./database");
const dotenv = require("dotenv");
const routes = require("./routes");
const { swaggerUi, specs } = require("./swagger/swagger");
const errorHandler = require("./errorHandler/errorHandler");
dotenv.config();
const redisInit = require("./middlewares/redisInit");
const setStaticData = require("./middlewares/setStaticData");
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello world" });
});

app.use((req, res) => {
  res.status(404).json({ message: "page is not found" });
});
app.use(errorHandler);

module.exports = app;
