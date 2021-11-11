const express = require('express')
const router = express.Router()
const columnController = require('../controller/column.controller')
const columnValidation = require('../validation/column.validation')

router
    .route('/')
    .get((req, res) => {
        res.send('column get')
    })
    .post(columnValidation.createNew, columnController.createNew)

router.put('/:id', columnValidation.updateOne, columnController.updateOne)
router.delete('/:id', columnController.deleteOne)
module.exports = router
