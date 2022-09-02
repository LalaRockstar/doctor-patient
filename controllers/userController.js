const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteUsers = async (req, res) => {
  await User.deleteMany();
  res.status(200).json({
    status: "success",
  });
};
