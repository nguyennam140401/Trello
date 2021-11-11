const Joi = require('joi')
const createNew = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(3).max(20).required(),
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(400).json({ status: 'false', message: error.message })
    }
}

module.exports = { createNew }
