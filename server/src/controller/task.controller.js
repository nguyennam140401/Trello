const taskService = require('../services/task.service')
const taskController = {
    async createNew(req, res) {
        try {
            const result = await taskService.createNew(req.body)
            res.json({ status: 'true', data: result })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ status: 'false', message: error.message })
        }
    },
    async updateOne(req, res) {
        try {
            const { id } = req.params
            const result = await taskService.updateOne(id, req.body)
            res.json({ status: 'true', data: result })
        } catch (error) {
            res.status(400).json({ status: 'false', message: error.message })
        }
    },
    async deleteOne(req, res) {
        try {
            const { id } = req.params
            const result = await taskService.deleteOne(id)

            res.json({ status: 'true', data: result })
        } catch (error) {
            res.status(400).json({ status: 'false', message: error.message })
        }
    },
}
module.exports = taskController
