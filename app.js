const express = require('express')
const app = express()
const port = 3000
const User = require('./routes/userconnect/user')
const monsterRouter = require('./routes/monsterRouter')
const assetsRouter = require('./routes/assetsRouter')
const marketRouter = require('./routes/marketRouter')
const session = require('express-session')
const {checkSession} = require('./middleware/index')

app.use(session({secret: 'bertanisetiaphari', cookie : {}}))
app.use(express.static("public"))


app.use(express.urlencoded({
    extended: false
}))



app.use('/users',User) 
app.use('/assets',checkSession,assetsRouter)
app.use('/explore',checkSession,monsterRouter)
app.use('/market',checkSession,marketRouter)
app.use('/index',(req,res)=>{
    res.render('index.ejs')
})
app.use ('/',(req,res)=> {
    res.render("welcomePage.ejs")
})
app.use('/*',(req,res)=>{
    res.send('404 not found')
})
app.listen(port,()=>{
    console.log("listening in port 3000");
    
})