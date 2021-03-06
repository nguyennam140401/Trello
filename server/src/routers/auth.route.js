const argon2 = require('argon2')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth.middleware')
const authController = require('../controller/auth.controller')
const { route } = require('.')
router.post('/register', authController.createNew)
router.post('/login', authController.login)
router.get('/', authMiddleware.verifytoken, authController.getUser)
module.exports = router
