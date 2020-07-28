const pool = require('./dbConfig');

module.exports.READ = function (callback) {
    var sqlString = 'SELECT * FROM teach_table'
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

  module.exports.CREATE = function CREATE(subject_id,subject_section,curr2_section,teach_time,semester,year,curr2_id,teach_day,teach_time2,lect_or_prac,break_time,cb){
    var sqlString = `INSERT INTO teach_table(subject_id,subject_section,curr2_section,teach_time,semester,year,curr2_id,teach_day,teach_time2,lect_or_prac,break_time)VALUES('${subject_id}',${subject_section},${curr2_section},'${teach_time}',${semester},${year},'${curr2_id}','${teach_day}','${teach_time2}','${lect_or_prac}',${break_time})` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Insert: '+subject_id+','+subject_section+','+curr2_section+','+teach_time+','+semester+','+year+','+curr2_id+','+teach_day+','+teach_time2+','+lect_or_prac+','+break_time)
            conn.release();
            cb(null,'Data Insert: '+subject_id+','+subject_section+','+curr2_section+','+teach_time+','+semester+','+year+','+curr2_id+','+teach_day+','+teach_time2+','+lect_or_prac+','+break_time)
        })
    })
  }

  module.exports.DELETE = function DELETE(subject_id,subject_section,curr2_section,teach_time,semester,year,cb) {
    var sqlString = `DELETE from teach_table WHERE subject_id='${subject_id}' AND subject_section=${subject_section} AND curr2_section=${curr2_section} AND teach_time=${teach_time} AND semester=${semester} AND year=${year}` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Delete: '+subject_id+','+subject_section+','+curr2_section+','+teach_time+','+semester+','+year)
            conn.release();
            cb(null,'Data Delete: '+subject_id+','+subject_section+','+curr2_section+','+teach_time+','+semester+','+year)
        })
      })
  }
  
  module.exports.UPDATE = function UPDATE(subject_id,subject_section,curr2_section,teach_time,semester,year,curr2_id,teach_day,teach_time2,lect_or_prac,break_time,cb){
    var sqlString = `UPDATE teach_table SET teach_day=${teach_day},teach_time2=${teach_time2},lect_or_prac=${lect_or_prac},break_time=${break_time} WHERE subject_id='${subject_id}' AND subject_section=${subject_section} AND curr2_section=${curr2_section} AND teach_time=${teach_time} AND semester=${semester} AND year=${year} AND curr2_id=${curr2_id}` 
    pool.getConnection((err, conn) => {
        if(err) throw err 
        pool.query(sqlString, function (err, rows) {
            console.log('Query String:\n '+this.sql);
            if(err) throw err 
            console.log('Data Change: '+subject_id+','+subject_section+','+curr2_section+','+teach_time+','+semester+','+year+','+curr2_id+','+teach_day+','+teach_time2+','+lect_or_prac+','+break_time)
            conn.release();
            cb(null,'Data Change:  '+subject_id+','+subject_section+','+curr2_section+','+teach_time+','+semester+','+year+','+curr2_id+','+teach_day+','+teach_time2+','+lect_or_prac+','+break_time)
        })
    })
  }
