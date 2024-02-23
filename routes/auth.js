const authController = require('../controller/auth')
const express = require("express");
const router = express.Router();

router.post("/signUp", authController.createUser)
exports.router = router;
