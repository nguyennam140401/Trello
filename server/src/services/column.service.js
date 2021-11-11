const columnModel = require('../models/column.model')
const boardModel = require('../models/board.model')
const columnService = {
    async createNew(data) {
        try {
            const result = await columnModel.createNew(data)
            updateBoard = await boardModel.pushColumnOrder(
                result.boardId,
                result._id.toString()
            )
            result.tasks = []
            result.taskOrder = []
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
    async updateOne(id, data) {
        try {
            const updateData = {
                ...data,
                updatedAt: Date.now(),
            }
            console.log(updateData)
            const result = await columnModel.updateOne(id, updateData)
            return result
        } catch (error) {
            console.log(error.message)
            throw new Error(error)
        }
    },
    async deleteOne(id) {
        try {
            const result = await columnModel.deleteOne(id)
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
}
module.exports = columnService
