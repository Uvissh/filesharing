const express = require('express');
const editProfileController = require('../controllers/EditProfile.controller');
const editProfileRouter = express.Router();

editProfileRouter.put('/profile/edit',editProfileController);

module.exports = editProfileRouter;