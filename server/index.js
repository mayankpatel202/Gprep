require('dotenv').config();

const express = require('express')
require('../database/index');

const routes = require('./router');

const app = express()
const port = process.env.PORT || 3000



app.use('/', routes);

app.listen(port, () => console.log(`Server listening on ${port}`))