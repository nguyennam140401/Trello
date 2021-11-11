const { getDB } = require('../config/mongodb')
const Joi = require('joi')
const { ObjectId } = require('mongodb')

const taskCollectionName = 'Tasks'
const taskCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().min(3).max(30).required(),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    destroyedAt: Joi.date().timestamp().default(null),
})
const validateSchema = async (data) => {
    return await taskCollectionSchema.validateAsync(data, {
        abortEarly: false,
    })
}
const createNew = async (data) => {
    try {
        const value = await validateSchema(data)

        const result = await getDB()
            .collection(taskCollectionName)
            .insertOne(value)

        const response = await getDB()
            .collection(taskCollectionName)
            .findOne({ _id: result.insertedId })

        return response
        // return result.ops[0]
    } catch (err) {}
}

const updateOne = async (id, data) => {
    try {
        const result = await getDB()
            .collection(taskCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: data },
                { new: true }
            )

        return result.value
    } catch (err) {
        throw new Error(err)
    }
}
const deleteOne = async (id) => {
    try {
        const result = await getDB()
            .collection(taskCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: { destroyedAt: Date.now() } },
                { new: true }
            )
        return result.value
    } catch (error) {
        throw new Error(err)
    }
}
module.exports = { createNew, updateOne, deleteOne, taskCollectionName }
