const express = require('express')
const {getContacts,postContacts,updateContacts,deleteContacts} = require('../controllers/contact')
const router = express.Router()
const authenticateMiddleware = require('../middleware/auth')

router.route('/').get(getContacts).post(authenticateMiddleware,postContacts)
.patch(authenticateMiddleware,updateContacts).delete(authenticateMiddleware,deleteContacts)

module.exports = router
