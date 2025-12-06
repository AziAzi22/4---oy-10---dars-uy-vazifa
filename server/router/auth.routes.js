const { Router } = require("express");
const { register, login } = require("../controller/auth.controller");

const authRoter = Router();

authRoter.post("/register", register);
authRoter.post("/login", login);

module.exports = authRoter