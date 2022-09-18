const express = require("express");
const { createUser } = require("../services/user");
const router = express();

router.post("/", createUser);

module.exports = router;
