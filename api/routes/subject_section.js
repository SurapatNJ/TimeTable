const pool = require('./dbConfig');

module.exports.READ = function (callback) {
    var sqlString = 'SELECT * FROM subject_section'
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

  module.exports.CREATE = function CREATE(subject_id,subject_section,teach_hr,subject_section_student_amount,teach_day,teach_time,teach_time2,lect_or_prac,break_time,cb){
    var sqlString = `INSERT INTO subject_section(subject_id,subject_section,teach_hr,subject_section_student_amount,teach_day,teach_time,teach_time2,lect_or_prac,break_time)VALUES('${subject_id}',${subject_section},${teach_hr},${subject_section_student_amount},'${teach_day}','${teach_time}','${teach_time2}','${lect_or_prac}',${break_time})` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Insert: '+subject_id+','+subject_section+','+teach_hr+','+subject_section_student_amount+','+teach_day+','+teach_time+','+teach_time2+','+lect_or_prac+','+break_time)
            conn.release();
            cb(null,'Data Insert: '+subject_id+','+subject_section+','+teach_hr+','+subject_section_student_amount+','+teach_day+','+teach_time+','+teach_time2+','+lect_or_prac+','+break_time)
        })
    })
  }

  module.exports.DELETE = function DELETE(subject_id,subject_section,cb) {
    var sqlString = `DELETE from subject_section WHERE subject_id='${subject_id}'AND subject_section=${subject_section}` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Delete: '+subject_id+','+subject_section)
            conn.release();
            cb(null,'Data Delete: '+subject_id+','+subject_section)
        })
      })
  }

  
  module.exports.UPDATE = function UPDATE(subject_id,subject_section,teach_hr,subject_section_student_amount,teach_day,teach_time,teach_time2,lect_or_prac,break_time,cb){
    var sqlString = `UPDATE subject_section SET teach_hr="${teach_hr}", subject_section_student_amount=${subject_section_student_amount},teach_day='${teach_day}',teach_time='${teach_time}',teach_time2='${teach_time2}',lect_or_prac='${lect_or_prac}',break_time=${break_time} WHERE subject_id='${subject_id}' AND subject_section=${subject_section}` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Change: '+subject_id+','+subject_section+','+teach_hr+','+subject_section_student_amount+','+teach_day+','+teach_time+','+teach_time2+','+lect_or_prac+','+break_time)
            conn.release();
            cb(null,'Data Change: '+subject_id+','+subject_section+','+teach_hr+','+subject_section_student_amount+','+teach_day+','+teach_time+','+teach_time2+','+lect_or_prac+','+break_time)
        })
    })
  }

