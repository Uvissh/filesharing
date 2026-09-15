const express =  require('express');
const uploadController = require('../controllers/upload.controllers');
const  uploadRouter = express.Router();
// const upload = require('../middleware/upload')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage});

uploadRouter.post('/uploads',upload.single('uploadfile'),uploadController);

module.exports = uploadRouter;
