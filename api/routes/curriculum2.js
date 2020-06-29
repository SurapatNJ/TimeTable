const pool = require('./dbConfig');

module.exports.READ = function (callback) {
    var sqlString = 'SELECT * FROM curriculum2'  
    pool.getConnection((err, conn) => {
      if(err) throw err 
      pool.query(sqlString, function (err, rows) {
          console.log('Query String: '+this.sql);
          if(err) throw err 
          callback(rows);
          conn.release();
    })
  })
}