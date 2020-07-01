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

module.exports.CREATE =  function CREATE(curr2_id,dept_id,curr2_tname,curr2_ename, cb) {
  var sqlString = `INSERT INTO curriculum2(curr2_id,dept_id,curr2_tname,curr2_ename)VALUES('${curr2_id}','${dept_id}','${curr2_tname}','${curr2_ename}')` 
  pool.getConnection((err, conn) => {
      if(err) throw err 
      pool.query(sqlString, function (err, rows) {
          console.log('Query String:\n '+this.sql);
          if(err) throw err 
          console.log('Data Insert: '+curr2_id+','+dept_id+','+curr2_tname+','+curr2_ename)
          conn.release();
          cb(null, 'Data Insert: '+curr2_id+','+dept_id+','+curr2_tname+','+curr2_ename)
      })
  })
  }

module.exports.DELETE = function DELETE(curr2_id,cb) {
  var sqlString = `DELETE from curriculum2 WHERE curr2_id='${curr2_id}'` 
  pool.getConnection((err, conn) => {
      if(err) throw err 
      pool.query(sqlString, function (err, rows) {
          console.log('Query String:\n '+this.sql);
          if(err) throw err 
          console.log('Data Delete: '+curr2_id)
          conn.release();
          cb(null,'Data Delete: '+curr2_id)
      })
    })
}

module.exports.UPDATE =  function UPDATE(curr2_id,dept_id,curr2_tname,curr2_ename, cb) {
  var sqlString = `UPDATE curriculum2 SET dept_id='${dept_id}', curr2_tname='${curr2_tname}',curr2_ename='${curr2_ename}' WHERE curr2_id='${curr2_id}'` 
  pool.getConnection((err, conn) => {
      if(err) throw err 
      pool.query(sqlString, function (err, rows) {
          console.log('Query String:\n '+this.sql);
          if(err) throw err 
          console.log('Data Change: '+curr2_id+','+dept_id+','+curr2_tname+','+curr2_ename)
          conn.release();
          cb(null,'Data Change: '+curr2_id+','+dept_id+','+curr2_tname+','+curr2_ename)
      })
    })
}

