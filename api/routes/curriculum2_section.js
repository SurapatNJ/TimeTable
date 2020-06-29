const pool = require('./dbConfig');

module.exports.READ = function (callback) {
    var sqlString = 'SELECT * FROM curriculum2_section'
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

  module.exports.CREATE =  function CREATE(curr2_section,curr2_id,curr2_section_student_amount, cb) {
    var sqlString = `INSERT INTO curriculum2_section(curr2_id,curr2_section,curr2_section_student_amount)VALUES('${curr2_id}',${curr2_section},${curr2_section_student_amount})` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Insert: '+curr2_section+','+curr2_id+','+curr2_section_student_amount)
            conn.release();
            cb(null, 'Data Insert: '+curr2_section+','+curr2_id+','+curr2_section_student_amount);
        })
    })
    }

  module.exports.DELETE = function DELETE(curr2_section,cb) {
    var sqlString = `DELETE from curriculum2_section WHERE curr2_section=${curr2_section}` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Delete: '+curr2_section)
            conn.release();
            cb(null,'Data Delete: '+curr2_section)
        })
      })
  }

  module.exports.UPDATE = function UPDATE(curr2_section,curr2_id,curr2_section_student_amount,cb) {
    var sqlString = `UPDATE curriculum2_section SET curr2_id='${curr2_id}', curr2_section_student_amount=${curr2_section_student_amount} WHERE curr2_section=${curr2_section}` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Change: '+curr2_section+','+curr2_id+','+curr2_section_student_amount)
            conn.release();
            cb(null,'Data Change: '+curr2_section+','+curr2_id+','+curr2_section_student_amount)
        })
      })
  }

