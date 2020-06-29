const mysql = require('mysql');
const pool = mysql.createPool({
        connectionLimit: 10,
        host: "0.tcp.ngrok.io",
        port: "17986",
        user: "root",
        password: "",
        database: "teachtable"
     });

console.log('MYSQL_DB Connected\n')
module.exports = pool;