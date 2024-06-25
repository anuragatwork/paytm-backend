// backend/user/index.js
const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account");
const tokenRouter =require("./me")

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/me",tokenRouter);

module.exports = router;