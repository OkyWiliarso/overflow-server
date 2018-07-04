const express = require('express')
const router = express.Router()
const {
  signUp,
  login,
  fblogin
} = require('../controllers/user.controller')
const {
  sendNotification
} = require('../controllers/mail.controller')

router
  .post('/signup', signUp)
  .post('/login', login)
  .post('/fblogin', fblogin)
  .post('/email', sendNotification)

module.exports = router
