const express = require('express');
const getProfileController = require('../controllers/getProfile.controllers');
const getprofileRouter = express.Router();

getprofileRouter.get('/profile',getProfileController);
module.exports = getprofileRouter