module.exports.loginMiddleware = function loginMiddleware (req, res, next){
    if(req.body.username === "admin" && 
       req.body.password === "1234") next();
    else res.send("Wrong username and password") 
 }

 