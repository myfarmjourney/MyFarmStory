const router = require('express').Router()
const User = require('../../models').User
const userController = require('../../controller/userController')

router.get('/',(req,res)=> {
    console.log (req.body)
    res.render("users.ejs")
})

router.get('/login',(req,res)=> {
    // res.send('masuk di user login')
    res.redirect('/assets')
    res.redirect('/') //--awal
    // res.render('home.ejs')
})
router.post('/login',userController.login)
router.get ('/logout',userController.logout)
// router.post('/login',(req,res)=> {

//     let username = req.body.username
//     console.log (username)

//     console.log ("masuk buat login")
//     res.send('asiyaaaapppp')
//     // res.redirect('/assets')
// })


router.get('/register',(req,res)=> {
    console.log ('masuk get')
    res.render("register.ejs")
})
router.post('/register',(req,res)=> {
    console.log (req.body)

    User.create({
        name : req.body.name,
        birthday :req.body.birthday,
        username : req.body.username,
        password : req.body.password,
        email :req.body.email
    })
    .then (()=> {
        res.redirect('/index')
    })
    .catch(err=> {
        res.send(err)
    })
})

module.exports = router