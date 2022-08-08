const express = require('express')
const {getProjects,postProjects,updateProjects,deleteProjects} = require('../controllers/project')
const router = express.Router()
const authenticateMiddleware = require('../middleware/auth')

router.route('/').get(getProjects).post(authenticateMiddleware,postProjects)
.patch(authenticateMiddleware,updateProjects).delete(authenticateMiddleware,deleteProjects)

module.exports = router
