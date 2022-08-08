const express = require('express')
const router = express.Router()
const authenticateMiddleware = require('../middleware/auth')
const {getSkills,postSkills,updateSkills,deleteSkills} = require('../controllers/skill')

router.route('/').get(getSkills).post(authenticateMiddleware,postSkills)
.patch(authenticateMiddleware,updateSkills).delete(authenticateMiddleware,deleteSkills)

module.exports = router