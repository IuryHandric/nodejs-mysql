const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
    connectionLimit: 10
})

module.exports = pool;