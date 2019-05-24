const { Farm, Item, Asset, User } = require('../models')
const Sequelize = require('sequelize')
const { getHarvested } = require('../helper/getHarvested')

class FarmController {
    static showFarm(req, res) {
        console.log('ini GET');
// res.send('semampunya')
        const Op = Sequelize.Op
        let farms
        Farm.findAll({
            include: [Item]
        })
        // User.findAll()
            .then(((datas) => {
                // res.send(datas)
                farms = datas
                return User.findOne({
                    where: {
                        username: req.session.user.username //session id
                    },
                    include: [{
                        model: Item,
                        where: {
                            [Op.or]: [{ kategori: "fruit" }, { kategori: "vegetable" }, { kategori: "grass" }]
                        }
                    }]
                })

            }))
            .then((items) => {
                // console.log (farms)
                // console.log (items)
                // res.send(farms)
                res.render('myfarm.ejs', {
                    farms,
                    items
                })

                // res.send(items)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static farmPost(req, res) {
        console.log('INI BODY');
        if (req.body.selectitem != "null") {
            Asset.destroy({
                where: {
                    ItemId: req.body.selectitem
                }
            })
                .then(() => {
                    return Farm.create({
                        ItemId: req.body.selectitem
                    })
                })
                .then((farm) => {
                    res.redirect('/myfarm')
                })
                .catch((err) => {
                    res.send(err)
                })
        }else{
            res.send("Cannot Plant Anything")
        }
    }

    static countAge(req, res) {
        let temp
        Farm.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                temp = data
                return Farm.update({
                    age: data.age += 1,
                }, {
                        where: {
                            id: Number(req.params.id)
                        }
                    })
            })
            .then((farm) => {
                if (temp.age > temp.matureAge) {
                    temp.age = temp.matureAge
                } else if (temp.age > temp.dieAge) {
                    temp.age = temp.dieAge
                }
                
                let getharvest = getHarvested(temp.matureAge, temp.dieAge, temp.age)
                
                if (getharvest == "harvested") {
                    res.render('harvested.ejs', {
                        id: temp.ItemId
                    })
                } else if (getharvest == "die") {
                    Farm.destroy({
                        where:{
                            ItemId: temp.ItemId
                        }
                    })
                    .then(()=>{
                        res.render('failedHarvest.ejs')
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                }else{
                    res.redirect('/myfarm')
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static harvest(req, res) {
        let id = req.params.id

        Asset.create({
            ItemId: Number(id),
            UserId: req.session.user.id
        })
            .then((asset) => {
                return Asset.create({
                    ItemId: Number(id),
                    UserId: req.session.user.id
                })
            })
            .then((asset) => {
                return Asset.create({
                    ItemId: Number(id),
                    UserId: req.session.user.id
                })
            })
            .then(()=>{
                return Farm.destroy({
                    where:{
                        ItemId: Number(id)
                    }
                })
            })
            .then(() => {
                res.redirect("/myfarm")
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = FarmController