const express = require('express')
const app = express()
require('dotenv').config()
const dbConnection = require('./config/dbConnection.js')
const router = require('./routes/index.js')

dbConnection()

app.use(express.json())
app.use(router)

app.listen(8000)