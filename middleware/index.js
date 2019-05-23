function checkSession(req,res,next){
    console.log("ini middle");
    console.log(req.session.user)
    if (req.session.user !== undefined) {
        console.log ('ini berhasil di next')
        next()
    }
    else {
        console.log ('disini objek kosong')
        res.redirect('/index')
    }
}

module.exports = {checkSession}