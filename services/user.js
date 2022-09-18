const userRepo = require("../repos/user");

const createUser = async (req, res, next) => {
  try {
    const userId = await userRepo.createUser();
    return res.status(201).json({ userId });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser };
