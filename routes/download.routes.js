const express  = require('express');
const downloadfile = require('../controllers/download.controller');
const  downloadRouter  = express.Router();

downloadRouter.get('/download/:share_code',downloadfile);

module.exports = downloadRouter;