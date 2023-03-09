// require('dotenv').config({path: '../.env'})
const { Client } = require('pg')
const { DB_USERNAME, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env

const db = new Client({
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
})

db.connect((err) => {
    if (err) {
        console.log('db connection error', err)
    } else {
        console.log('Database connected - PostgreSQL');
    }
})

module.exports = db