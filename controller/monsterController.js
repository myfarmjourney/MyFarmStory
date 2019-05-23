const {Monster,Item,Asset} = require('../models')
let {randMonster} = require('../helper/randomMonster')
const session = require('express-session')

class monsterController{
    static hunting(req,res){
        let monsterId = randMonster()
        res.render('explore.ejs',{monsterid : monsterId})
    }

    static getMonster(req,res){
        let id = req.params.id
        Monster.findOne({
            where:{
                id: id
            },
            include: [Item]
        })
        .then((monster)=>{
            res.render('monsterAttack.ejs',{monster})
            // res.send(monster)
        })
    }

    static killMonster(req,res){
        let id = req.params.id
        console.log (req.session)
        Asset.create({
            ItemId : Number(id),
            UserId : req.session.user.id
        })
        .then((asset)=>{
            return Item.findOne({
                where:{
                    id: Number(id)
                }
            })
        .then((item)=>{
            res.send(`congrats you get ${item.itemName} item!`)
            // res.send(item)
        })
        })
        .catch((err)=>{
            res.send(err)
        })

        
    }
}

module.exports = monsterController