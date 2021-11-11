const authService = require('../services/auth.service')
const authModel = require('../models/auth.model')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authController = {
    async createNew(req, res) {
        try {
            const { username, password } = req.body
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'missing username or password',
                })
            }
            const user = await authModel.findByName(username)
            console.log(user, 1)
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'user name is already in use',
                })
            }
            const hasPassword = await argon2.hash(password)
            const newUser = { userName: username, password: hasPassword }
            const result = await authService.createNew(newUser)
            return res.json({ success: true, result: result })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ success: false, error: error.message })
        }
    },
    async login(req, res) {
        try {
            const { username, password } = req.body
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'missing username or password',
                })
            }
            const user = await authModel.findByName(username)
            console.log(user, 1)
            if (user) {
                const passwordValid = await argon2.verify(
                    user.password,
                    password
                )
                if (!passwordValid) {
                    return res.status(400).json({
                        success: false,
                        message: 'incorrect username or password',
                    })
                }
                const acessToken = jwt.sign(
                    { userId: user._id },
                    process.env.TOKEN_SECRET
                )
                return res.json({
                    success: true,
                    message: 'Chao mung ban da den voi chung toi',
                    acessToken,
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'incorrect username or password',
                })
            }
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ success: false, error: error.message })
        }
    },
    async getUser(req, res) {
        try {
            const result = await authService.getUser(req.userId)
            res.json({ success: true, data: result })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ success: false, error: error.message })
        }
    },
}
module.exports = authController
