var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jwt = require("jwt-simple");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////swaggerUI

var options = {
    swaggerOptions: {
        defaultModelsExpandDepth: -1
    },
    //customCss: '.swagger-ui .topbar { display: none }'
  };
//var curriculum2 = require('./curriculum2');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.static('public'));
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument,options));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////authentication
const SECRET = "MY_SECRET_KEY";
var authentication = require('./authentication.js');

//สร้าง Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: SECRET
 };
 const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
    if (payload.sub === "kennaruk") done(null, true);
    else done(null, false);
 });
 //เสียบ Strategy เข้า Passport
 passport.use(jwtAuth);
 //ทำ Passport Middleware
 const requireJWTAuth = passport.authenticate("jwt",{session:false});

 router.post("/login", authentication.loginMiddleware, (req, res) => {
    const payload = {
       sub: req.body.username,
       iat: new Date().getTime()
    };
    res.send(jwt.encode(payload, SECRET));
 })
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////index

router.get('/', function(req, res, next) {
    res.send('API is working properly');
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////curriculum2_section

var curriculum2_section = require('./curriculum2_section');

router.get('/curriculum2_section',(req,res)=> {
    curriculum2_section.READ(function(callback){
    res.json(callback);
    });
})

//V1  Know Nothing
// router.get('/curriculum2',(req,res)=> {
//     let sql = 'SELECT * FROM curriculum2'  
//     let query = db.query(sql,(err,results) => { 
//         if(err) throw err 
//         console.log(results) 
//         res.json(results)   
//     })
// })

//V2 Call function from another .js (Clean Code)
// router.get('/curriculum2_section/add',(req,res)=> {
//     const {curr2_id,curr2_section,curr2_section_student_amount} =req.query;
//     curriculum2_section.add(curr2_id,curr2_section,curr2_section_student_amount)
// })

//V3 Use http method other than get (Normalize HTTP Methods)
// router.post('/curriculum2_section/:curr2_section/:curr2_id/:curr2_section_student_amount',(req,res)=> {
//     curriculum2_section.READ(req.params.curr2_id,req.params.curr2_section,req.params.curr2_section_student_amount)
// })

//V4 use Request Body in POST , PUT , PATCH (Normalize HTTP Methods)
router.post('/curriculum2_section/', (req,res)=> {
    curriculum2_section.CREATE(req.body.curr2_section,req.body.curr2_id,req.body.curr2_section_student_amount, (err, data) => {
      res.send(data);
   });
  });

router.put('/curriculum2_section/', (req,res)=> {
    curriculum2_section.UPDATE(req.body.curr2_section,req.body.curr2_id,req.body.curr2_section_student_amount, (err, data) => {
        res.send(data);
     });
})

router.delete('/curriculum2_section/',(req,res)=> {
    curriculum2_section.DELETE(req.body.curr2_section, (err, data) => {
        res.send(data);
     });
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////curriculum2_subject

var curriculum2_subject = require('./curriculum2_subject');

router.get('/curriculum2_subject',(req,res)=> {
    curriculum2_subject.READ(function(callback){
    res.json(callback);
    });
})

router.post('/curriculum2_subject/',(req,res)=> {
    curriculum2_subject.CREATE(req.body.curr2_id,req.body.subject_id,req.body.semester, (err, data) => {
        res.send(data);
     });
})

// //CANT UPDATE bc same primary key
// router.post('/curriculum2_subject/',(req,res)=> {
//     curriculum2_subject.UPDATE(req.body.curr2_id,req.body.subject_id,req.body.semester, (err, data) => {
//         res.send(data);
//      });
// })

router.delete('/curriculum2_subject/',(req,res)=> {
    curriculum2_subject.DELETE(req.body.curr2_id,req.body.subject_id,req.body.semester, (err, data) => {
        res.send(data);
     });
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////subject_section

var subject_section = require('./subject_section');

router.get('/subject_section',(req,res)=> {
    subject_section.READ(function(callback){
    res.json(callback);
    });
})

router.post('/subject_section/',(req,res)=> {
    subject_section.CREATE(req.body.subject_id,req.body.subject_section,req.body.teach_hr,req.body.subject_section_student_amount,req.body.teach_day,req.body.teach_time,req.body.teach_time2,req.body.lect_or_prac,req.body.break_time, (err, data) => {
        res.send(data);
    });
})

router.put('/subject_section/',(req,res)=> {
    subject_section.UPDATE(req.body.subject_id,req.body.subject_section,req.body.teach_hr,req.body.subject_section_student_amount,req.body.teach_day,req.body.teach_time,req.body.teach_time2,req.body.lect_or_prac,req.body.break_time, (err, data) => {
        res.send(data);
    });
})

router.delete('/subject_section/',(req,res)=> {
    subject_section.DELETE(req.body.subject_id,req.body.subject_section, (err, data) => {
        res.send(data);
     });
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////teach_table
var teach_table = require('./teach_table');

router.get('/teach_table',(req,res)=> {
    teach_table.READ(function(callback){
    res.json(callback);
    });
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////curriculum2
var curriculum2 = require('./curriculum2');

router.get('/curriculum2',(req,res)=> {
    curriculum2.READ(function(callback){
    res.json(callback);
    });
})

router.post('/curriculum2/', (req,res)=> {
    curriculum2.CREATE(req.body.curr2_id,req.body.dept_id,req.body.curr2_tname,req.body.curr2_ename, (err, data) => {
      res.send(data);
   });
  });

router.put('/curriculum2/', (req,res)=> {
    curriculum2.UPDATE(req.body.curr2_id,req.body.dept_id,req.body.curr2_tname,req.body.curr2_ename, (err, data) => {
        res.send(data);
     });
})

router.delete('/curriculum2/',(req,res)=> {
    curriculum2.DELETE(req.body.curr2_id, (err, data) => {
        res.send(data);
     });
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////subject
var subject = require('./subject');

router.get('/subject',(req,res)=> {
    subject.READ(function(callback){
    res.json(callback);
    });
})

module.exports = router;