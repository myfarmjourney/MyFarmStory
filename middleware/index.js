function checkSession(req,res,next){
    console.log("ini middle");
    
    console.log(req.session);
    next()
}

module.exports = {checkSession}