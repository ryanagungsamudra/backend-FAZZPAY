const express = require('express');
const router = express();

// import controller
const transactionController = require('../controllers/transaction.controller.js')

router.get('/', transactionController.read)
router.get('/:id', transactionController.readDetail)
router.post('/', transactionController.create)
router.patch('/:id', transactionController.update)
router.delete('/:id', transactionController.remove)

module.exports = router