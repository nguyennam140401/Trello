const express = require('express')
const router = express.Router()
const taskController = require('../controller/task.controller')
const taskValidation = require('../validation/task.validation')

router
    .route('/')
    .get((req, res) => {
        res.send('task get')
    })
    .post(taskValidation.createNew, taskController.createNew)

router.put('/:id', taskValidation.updateOne, taskController.updateOne)
router.delete('/:id', taskController.deleteOne)
module.exports = router
