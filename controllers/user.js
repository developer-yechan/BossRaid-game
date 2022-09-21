const userService = require("../services/user");

const createUser = async (req, res, next) => {
  try {
    const userId = await userService.createUser();
    return res.status(201).json({ userId });
  } catch (err) {
    next(err);
  }
};

const getUserRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.getUserRecord(id);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
module.exports = { createUser, getUserRecord };
