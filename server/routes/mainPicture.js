const express = require('express')
const router = express.Router()
const {getMainPicture,updateMainPicture} = require('../controllers/mainPicture')
const authenticateMiddleware = require('../middleware/auth')

router.route('/').get(getMainPicture).patch(authenticateMiddleware,updateMainPicture)



module.exports = router