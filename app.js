const express = require('express')
const app = express()
const port = 3000
const monsterRouter = require('./routes/monsterRouter')
const assetsRouter = require('./routes/assetsRouter')

app.use(express.urlencoded({
    extended: false
}))

app.use('/explore',monsterRouter)
app.use('/assets',assetsRouter)

app.use('/index',(req,res)=>{
    res.render('index.ejs')
})
app.use('/*',(req,res)=>{
    res.send('404 not found')
})
app.listen(port,()=>{
    console.log("listening in port 3000");
    
})