const express = require("express");
const router = express();
const validation = require('../middlewares/validation')

//import controller
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)
router.post('/signup', validation.users, authController.signup)

module.exports = router