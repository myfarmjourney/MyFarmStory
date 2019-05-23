const { Asset, Item, User, Market } = require('../models')
let { calculateMoney } = require('../helper/calculateMoney')
const session =require('express-session')

class assetsController {
    static showAssets(req, res) {
        console.log ('masuk sinii di aset')
        // res.send('ahaaa')
        console.log (req.session, 'ini username dari sesion diaset')
        User.findOne({
            where: {
                // id :5
                username : req.session.user.username //session id
            },
            include: [Item]
        })
            .then((assets) => {

                console.log ('sampai sini')
                console.log (assets.Items.length)
                res.render('assetTable.ejs', { datas: assets.Items })
                // res.send(assets)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static sellAsset(req, res) {
        let id = req.params.id
        User.findOne({
            where: {
                id: req.session.user.id
            },
            include: [{
                model: Item,
                where: {
                    id: id
                }
            }]
        })
            .then((assets) => {
                let money = calculateMoney(assets.money, assets.Items[0].beli,"sell")
                assets.money = money
                return assets.save() //update money
                // res.send(assets)
            })
            .then((data) => {
                Asset.destroy({
                    where: {
                        id: data.Items[0].Asset.id
                    }
                }) //hapus asset
                    .then((data) => {
                        Market.create({
                            ItemId: id
                        })
                            .then((market)=>{
                                res.redirect('/assets')
                            })
                            .catch((err) => {
                                res.send(err)
                            })
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static showProfile (req,res){
        // console.log (req.session.user,'iniiiii')
        User.findOne ({
            where :{
                username : req.session.user.username
            }
        })
            .then (user=> {
                // console.log  (user.getAge())
                user.age = user.getAge()
                res.render('profile.ejs',{
                    user
                })
            })
            .catch(err=> {
                res.redirect('/assets')
            })
    }
}

module.exports = assetsController