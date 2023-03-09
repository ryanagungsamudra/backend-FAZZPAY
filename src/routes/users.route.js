const express = require('express');
const router = express();
const formUpload = require('../middlewares/formUpload')

// import controller
const usersController = require('../controllers/users.controller')

router.get('/', usersController.read)
router.get('/:id', usersController.readDetail)
router.post('/', formUpload.single('img_profile'), usersController.create)
router.patch('/:id', formUpload.single('img_profile'), usersController.update)
router.delete('/:id', usersController.remove)

module.exports = router