const express = require("express");
const userController = require("../controllers/user");
const router = express();

router.post("/", userController.createUser);
router.get("/:id", userController.getUserRecord);

module.exports = router;
