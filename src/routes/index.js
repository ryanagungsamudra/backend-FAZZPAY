const express = require('express');
const router = express();

const usersRoute = require('./users.route')
const authRoute = require('./auth.route')
const transactionRoute = require('./transaction.route')

router.get('/', (req, res) => {
    return res.send('Backend for Fazz Pay')
})

router.use('/users', usersRoute)
router.use('/auth', authRoute)
router.use('/transaction', transactionRoute)

module.exports = router;