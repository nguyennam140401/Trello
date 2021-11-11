const { getDB } = require('../config/mongodb')
const Joi = require('joi')
const columnModel = require('./column.model')
const taskModel = require('./task.model')
const { ObjectId } = require('mongodb')

const boardCollectionName = 'Boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    columnOrder: Joi.array().items(Joi.string().min(3).max(20)).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    destroyedAt: Joi.date().timestamp().default(null),
})
const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, {
        abortEarly: false,
    })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB()
            .collection(boardCollectionName)
            .insertOne(value)
        const response = await getDB()
            .collection(boardCollectionName)
            .findOne({ _id: result.insertedId })

        return response
    } catch (err) {
        throw new Error(err)
    }
}
const updateOne = async (id, data) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: data },
                { returnOrginal: false }
            )
        return result.value
    } catch (error) {
        throw new Error(err)
    }
}
const getAllBoard = async () => {
    try {
        const response = await getDB()
            .collection(boardCollectionName)
            .find()
            .toArray()

        return response
    } catch (error) {
        throw new Error(error)
    }
}
const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(boardId) },
                {
                    $push: {
                        columnOrder: columnId,
                    },
                },
                { new: true }
            )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}
const getFullBoard = async (id) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .aggregate([
                //tra du lieu noi nhieu bangr ( giong join trong sql)
                {
                    $match: {
                        _id: ObjectId(id),
                    },
                },
                {
                    $addFields: {
                        _id: {
                            $toString: '$_id', //chuyen gia tri _id cua board ve String de su dung co ten bien la _id neu trung thi ghi de( khong anh huong trong database)
                        },
                    },
                },
                {
                    $lookup: {
                        from: columnModel.columnCollectionName, //ten bang muon noi
                        localField: '_id',
                        foreignField: 'boardId', //ten khoa phu noi voi bang dang xet
                        as: 'columns',
                    },
                },
                {
                    $lookup: {
                        from: taskModel.taskCollectionName, //ten bang muon noi
                        localField: '_id',
                        foreignField: 'boardId', //ten khoa phu noi voi bang dang xet
                        as: 'tasks',
                    },
                },
            ])
            .toArray()

        return result[0] || null
    } catch (err) {
        throw new Error(err)
    }
}
module.exports = {
    getAllBoard,
    createNew,
    getFullBoard,
    pushColumnOrder,
    updateOne,
}
