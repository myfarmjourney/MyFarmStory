const router = require('express').Router()
const User = require('../../models').User

router.get('/',(req,res)=> {
    console.log (req.body)
    res.render("users.ejs")
})

router.get('/login',(req,res)=> {
    // res.send('masuk di user login')
    res.redirect('/')
    // res.render('home.ejs')
})
router.post('/login',(req,res)=> {
    res.send('asiyaaaapppp')
})


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
        res.redirect('/')
    })
    .catch(err=> {
        res.send(err)
    })
})

module.exports = router