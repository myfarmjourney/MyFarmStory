const express = require ('express')
const app = express()
const port = 3000
const User = require('./routes/userconnect/user')
const Farm = require('./routes/farm/farm')


app.use(express.urlencoded(({
    extended :false
})))

app.get('/',(req,res)=> {
    // res.send('oh my farm')
    console.log (req.body,'dari app.js')
    res.render('home.ejs')
})

app.use('/users',User) 
app.use('/farm',Farm)



app.listen(port,()=> {
    console.log (`See magc happened in port : ${port}`)
})