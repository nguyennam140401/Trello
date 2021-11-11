const { getDB } = require('../config/mongodb')
const { ObjectID, ObjectId } = require('mongodb')
const Joi = require('joi')

const columnCollectionName = 'Columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().min(3).max(30).required(),
    taskOrder: Joi.array().items(Joi.string().min(3).max(20)).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    destroyedAt: Joi.date().timestamp().default(null),
})
const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, {
        abortEarly: false,
    })
}
const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB()
            .collection(columnCollectionName)
            .insertOne(value)
        const response = await getDB()
            .collection(columnCollectionName)
            .findOne({ _id: result.insertedId })

        return response
    } catch (err) {
        throw new Error(err)
    }
}
const pushTaskOrder = async (columnId, taskId) => {
    try {
        const result = await getDB()
            .collection(columnCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(columnId) },
                {
                    $push: {
                        taskOrder: taskId,
                    },
                },
                { new: true }
            )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}
const updateOne = async (id, data) => {
    try {
        const result = await getDB()
            .collection(columnCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: data },
                { returnOrginal: false }
            )
        return result.value
    } catch (err) {
        throw new Error(err)
    }
}
const deleteOne = async (id) => {
    try {
        const result = await getDB()
            .collection(columnCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: { destroyedAt: Date.now() } },
                { new: true }
            )

        return result.value
    } catch (err) {
        throw new Error(err)
    }
}
module.exports = {
    createNew,
    updateOne,
    deleteOne,
    pushTaskOrder,
    columnCollectionName,
}
