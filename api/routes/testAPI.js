var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var bodyParser = require('body-parser');
const db = mysql.createConnection({
    host: "0.tcp.ngrok.io",
    port: "14369",
    user: "root",
    password: "",
    database: "test"
});

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.static('public'));

db.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + db.threadId)
});

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.get('/mysqldb',(req,res)=> {   // Router เวลาเรียกใช้งาน
    let sql = 'SELECT * FROM temp'  // คำสั่ง sql
    let query = db.query(sql,(err,results) => { // สั่ง Query คำสั่ง sql
        if(err) throw err  // ดัก error
        console.log(results) // แสดงผล บน Console 
        res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
    })
});

router.get('/mysqldb/add',(req,res)=> {   
    const {insertdata} =req.query;
    res.send('WAITING FOR INSERT DATA')
    const INSERT_QUERY = `INSERT INTO temp (temp) VALUES('${insertdata}')`;
    console.log(insertdata);
    db.query(INSERT_QUERY, function(err, results){
        if(err) {
            return res.send(err)
        }
    })
});

router.get('/mysqldb/delete',(req,res)=> {   
    const {insertdata} =req.query;
    res.send('WAITING FOR DELETE DATA')
    console.log(insertdata);
    const DELETE_QUERY = `DELETE from temp WHERE temp=('${insertdata}')`;
    db.query(DELETE_QUERY, function(err, results){
        if(err) {
            return res.send(err)
        }
    })
});

router.get('/mysqldb/truncate',(req,res)=> {   
    const {insertdata} =req.query;
    res.send('WAITING FOR TRUNCATE DATA')
    console.log(insertdata);
    const TRUNCATE_QUERY = `TRUNCATE TABLE temp`;
    db.query(TRUNCATE_QUERY, function(err, results){
        if(err) {
            return res.send(err)
        }
    })
});
module.exports = router;