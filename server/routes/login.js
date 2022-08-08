const express = require('express')
const {login,authenticate} = require('../controllers/login')
const router = express.Router()

router.route('/').post(login).get(authenticate)

module.exports = router