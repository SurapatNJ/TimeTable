const pool = require('./dbConfig');

module.exports.READ = function (callback) {
    var sqlString = 'SELECT * FROM curriculum2_subject'
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

  module.exports.CREATE = function CREATE(curr2_id,subject_id,semester,cb) {
    var sqlString = `INSERT INTO curriculum2_subject(curr2_id,subject_id,semester)VALUES('${curr2_id}','${subject_id}',${semester})` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Insert: '+curr2_id+','+subject_id+','+semester)
            conn.release();
            cb(null,'Data Insert: '+curr2_id+','+subject_id+','+semester)
        })
    })
  }

//CANT UPDATE bc same primary key
//   module.exports.UPDATE = function UPDATE(curr2_id,subject_id,semester,new_curr2_id,new_subject_id,new_semester) {
//     var sqlString = `UPDATE curriculum2_subject SET curr2_id='${curr2_id}',subject_id='${subject_id}',semester=${semester}} WHERE curr2_id='${new_curr2_id}',subject_id=${new_subject_id},semester=${new_semester}}` 
//     pool.getConnection((err, conn) => {
//         if(err) throw err 
//         pool.query(sqlString, function (err, rows) {
//             console.log('Query String:\n '+this.sql);
//             if(err) throw err 
//             console.log('Data Change: '+new_curr2_id+','+new_subject_id+','+new_semester)
//             conn.release();
//         })
//       })
//   }

  module.exports.DELETE = function DELETE(curr2_id,subject_id,semester,cb) {
    var sqlString = `DELETE from curriculum2_subject WHERE curr2_id='${curr2_id}'AND subject_id='${subject_id}' AND semester=${semester}` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Delete: '+curr2_id+','+subject_id+','+semester)
            conn.release();
            cb(null,'Data Delete: '+curr2_id+','+subject_id+','+semester)
        })
      })
  }


