
const router = require('express').Router()
const User = require('../../models').User
const bcrypt = require('bcryptjs')

router.post('/',(req,res)=> {
    // res.send('yesss berhasil login')
    let loginInput = {
        username : req.body.username,
        password : req.body.password
    }
    console.log (loginInput)
    User.findOne ({
        where :{
            username :loginInput.username
        }
    })
        .then (userData=> {
            // if (userData.password === loginInput.password){
            let hash = userData.password
            console.log (hash)
            if (bcrypt.compareSync(loginInput.password,hash)){
                res.render("farm.ejs",{userData})
            }
            else {
                throw('password wrong')
            }
        })
        .catch (err=>{
            // console.log("masuk sini, throw")
            console.log(err)
            res.redirect('/')
        })
})

router.get("/profil/:username",(req,res)=> {
    let username = req.params.username
    // console.log (username)
    User.findOne({
        where :{
            username
        }
    })
        .then (users=> {
            if(users.money === null) {
                users.money = 0
            }
            res.render('userProfil.ejs',{
                users
            })
        })
        .catch (err=> {
            res.send(err)
        })
})


module.exports = router