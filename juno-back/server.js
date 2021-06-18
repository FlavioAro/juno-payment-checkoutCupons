const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('config')
const database = require('./config/db');
const port = process.env.PORT || config.get('server.port')

app.set('port', port)
app.use(cors())
app.use(bodyParser.json())
app.use('/payment', require('./api/routes/payment'))
app.use('/user', require('./api/routes/user'))
app.use('/products', require('./api/routes/products'))
app.listen(port)
database.sync()

module.exports = app