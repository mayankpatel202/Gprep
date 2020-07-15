require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
require('../database/index');

const routes = require('./router');

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000



app.use('/', routes);

app.listen(port, () => console.log(`Server listening on ${port}`))