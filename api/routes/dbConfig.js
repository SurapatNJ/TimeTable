const mysql = require('mysql');
const pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "teachtable"
     });

console.log('MYSQL_DB Connected\n')
module.exports = pool;