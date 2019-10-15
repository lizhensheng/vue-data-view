const jwt = require('jsonwebtoken')
//检查token是否过期
module.exports = function (req,res,next) {

    const authorization = req.body['Authorization'];
    if (authorization === ''){
        let err = new Error("no token detected in http headerAuthorization")
        err.status = 401
        res.end(err)
    }
    let token = authorization.split(' ')[1];
    try{
        jwt.verify(token,'lizhensheng');
    }catch(e){
        let err =  new Error("invalid token")
        err.status = 401
        res.end(err)
    }
    next()
}