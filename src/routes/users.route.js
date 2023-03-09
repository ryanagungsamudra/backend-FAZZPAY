const express = require('express');
const router = express();
// const formUpload = require('../middlewares/formUpload')
const formUploadOnline = require('../middlewares/formUploadOnline')

// import controller
const usersController = require('../controllers/users.controller')

router.get('/', usersController.read)
router.get('/:id', usersController.readDetail)
router.post('/', formUploadOnline.single('img_profile'), usersController.create)
router.patch('/:id', formUploadOnline.single('img_profile'), usersController.update)
router.delete('/:id', usersController.remove)

module.exports = router