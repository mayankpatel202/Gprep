const { Client } = require('pg');

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

client.connect()
.then(() => console.log(`${ process.env.PG_DATABASE } Database Successfully connected to port ${ process.env.PG_PORT } `))
.catch(e => console.log(e));


module.exports = client;