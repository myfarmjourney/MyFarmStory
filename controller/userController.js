const User = require('../models').User
const bcyript = require('bcryptjs')
const session = require('express-session')

class UserController {
    static login (req,res) {
        let loginInfo = {
            username : req.body.username,
            password : req.body.password}
        
            // req.session.user = loginInfo
            // console.log (req.session.user,'ini session')
        User.findOne({
            where : {
                username : loginInfo.username
            }
        })
            .then(user=>{
                req.session.user = {
                    id : user.id,
                    username : user.username
                }
                // req.session.user =  user.username

                console.log (req.session.user)

                console.log (user.password,'tapi belomdicek')
                let hash = user.password

                if (bcyript.compareSync(loginInfo.password,hash)){
                    console.log (user.dataValues)
                    res.redirect('/assets')
                    // res.send(user)
                }
                else {
                    throw 'weitsss ada erornyaaa'
                }
            })
            .catch(err=> {
                console.log (err)
                res.send(err)
            })
        // res.send('aaaaaa')
    }

    static logout (req,res) {
        req.session.destroy((err)=> {
            
        })
        res.redirect('/index')
    }
}

module.exports = UserController