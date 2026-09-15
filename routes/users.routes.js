const express = require('express');
const userController = require("../controllers/users.controllers");
const userRouter = express.Router();

userRouter.post('/register',userController.Register);
userRouter.post('/login',userController.Login);

module.exports = userRouter;