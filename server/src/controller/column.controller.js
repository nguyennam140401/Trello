const columnService = require('../services/column.service')
const columnController = {
    async createNew(req, res) {
        try {
            const result = await columnService.createNew(req.body)
            res.json({ status: 'true', data: result })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ status: 'false', message: error.message })
        }
    },
    async updateOne(req, res) {
        try {
            const { id } = req.params
            const result = await columnService.updateOne(id, req.body)

            res.json({ status: 'true', data: result })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ status: 'false', message: error.message })
        }
    },
    async deleteOne(req, res) {
        try {
            const { id } = req.params

            const result = await columnService.deleteOne(id)

            res.json({ status: 'true', data: result })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ status: 'false', message: error.message })
        }
    },
}
module.exports = columnController
