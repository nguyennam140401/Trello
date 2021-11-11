const authModel = require('../models/auth.model')
const authService = {
    async createNew(data) {
        try {
            const result = await authModel.createNew(data)
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
    async getUser(userId) {
        try {
            const result = await authModel.findById(userId)
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
}

module.exports = authService
