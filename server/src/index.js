const express = require('express')
const cors = require('cors')
const port = 5000
const db = require('./config/mongodb')
const boardModel = require('./models/board.model')
const api = require('./routers')
const constand = require('./config/constand')
db.connectDB()
    .then(() => console.log('connect successfuly to database'))
    .then(() => bootServer())
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
const bootServer = () => {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use('/', api)
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}
