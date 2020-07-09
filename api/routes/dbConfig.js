const mysql = require('mysql');
const pool = mysql.createPool({
        connectionLimit: 10,
        host: "2.tcp.ngrok.io",
        port: "13680",
        user: "root",
        password: "",
        database: "teachtable"
     });

console.log('MYSQL_DB Connected\n')
module.exports = pool;