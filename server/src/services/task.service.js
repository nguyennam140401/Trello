const taskModel = require('../models/task.model')
const columnModel = require('../models/column.model')
const taskService = {
    async createNew(data) {
        try {
            const result = await taskModel.createNew(data)
            const taskOrder = await columnModel.pushTaskOrder(
                result.columnId,
                result._id.toString()
            )
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
            if (updateData._id) delete updateData._id
            const result = await taskModel.updateOne(id, updateData)
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
    async deleteOne(id) {
        try {
            const result = await taskModel.deleteOne(id)
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
}
module.exports = taskService
