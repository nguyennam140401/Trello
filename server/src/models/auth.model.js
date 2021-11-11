const { getDB } = require('../config/mongodb')
const Joi = require('joi')
const { ObjectId } = require('mongodb')
const authCollectionName = 'Auth'
const authCollectionSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).required(),
    createdAt: Joi.date().timestamp().default(Date.now()),
})

const validateSchema = async (data) => {
    return await authCollectionSchema.validateAsync(data, {
        abortEarly: false,
    })
}
const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB()
            .collection(authCollectionName)
            .insertOne(value)
        const response = await getDB().collection(authCollectionName).findOne({
            _id: result.insertedId,
        })
        return response
    } catch (error) {
        throw new Error(error)
    }
}
const findByName = async (name) => {
    try {
        const result = await getDB()
            .collection(authCollectionName)
            .findOne({ userName: name })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const findById = async (id) => {
    try {
        const result = await getDB()
            .collection(authCollectionName)
            .findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = { createNew, findByName, findById }
