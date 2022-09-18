const User = require("../database/models/user");
const { v4: uuidv4 } = require("uuid");

const createUser = async () => {
  const user = await User.create({
    id: uuidv4(),
  });
  const userId = user.id;
  return userId;
};

module.exports = { createUser };
