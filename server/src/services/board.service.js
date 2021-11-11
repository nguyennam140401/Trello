const boardModel = require('../models/board.model')
const { cloneDeep } = require('lodash')
const boardService = {
    async createNew(data) {
        try {
            const result = await boardModel.createNew(data)
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
    async getAllBoard() {
        try {
            const result = await boardModel.getAllBoard()
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
    async getFullBoard(id) {
        try {
            const result = await boardModel.getFullBoard(id)

            if (!result) {
                throw new Error('Board not found')
            }
            const dataBoard = cloneDeep(result)

            dataBoard.columns = dataBoard.columns.filter(
                (column) => column.destroyedAt === null
            )
            dataBoard.columns.forEach((column) => {
                column.tasks = result.tasks.filter(
                    (task) => task.columnId.toString() === column._id.toString()
                )
            })

            delete dataBoard.tasks

            return dataBoard
        } catch (error) {
            console.log(error.message)
            throw new Error(error)
        }
    },
    async updateOne(id, data) {
        try {
            const boardUpdate = cloneDeep(data)
            boardUpdate.updatedAt = Date.now()
            const result = await boardModel.updateOne(id, data)

            return result
        } catch (error) {
            console.log(error.message)
            throw new Error(error)
        }
    },
}
module.exports = boardService
