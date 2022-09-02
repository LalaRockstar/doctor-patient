const express = require("express");
const { signup, login } = require("../controllers/authController");
const { getUsers, deleteUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/users", getUsers);
router.delete("/users", deleteUsers);

module.exports = router;
