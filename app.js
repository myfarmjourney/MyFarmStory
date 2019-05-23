const express = require('express')
const app = express()
const port = 3000
const User = require('./routes/userconnect/user')
const monsterRouter = require('./routes/monsterRouter')
const assetsRouter = require('./routes/assetsRouter')
const marketRouter = require('./routes/marketRouter')
const session = require('express-session')

app.use(session({secret: 'bertanisetiaphari', cookie : {}}))

app.use('/*',(req,res,next)=> {
    if (req.session.user === undefined) {
        req.session.user = {}
    }
    next()
})

app.use(express.urlencoded({
    extended: false
}))

app.use('/users',User) 
//dikasih kondisi login 
app.use('/explore',monsterRouter)
app.use('/assets',assetsRouter)
app.use('/market',marketRouter)

app.use('/index',(req,res)=>{
    res.render('index.ejs')
})
app.use('/*',(req,res)=>{
    res.send('404 not found')
})
app.listen(port,()=>{
    console.log("listening in port 3000");
    
})