const express = require('express');
const getUploadController = require('../controllers/getUpload.controllers');
const getUpload = express.Router();


getUpload.get('/:share_code',getUploadController);

module.exports = getUpload;