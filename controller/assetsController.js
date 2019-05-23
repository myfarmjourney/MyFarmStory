const { Asset, Item, User, Market } = require('../models')
let { calculateMoney } = require('../helper/calculateMoney')

class assetsController {
    static createUser(req, res) {
        User.create({
            name: 'viuty',
            birthday: '06-12-1995',
            username: 'tviuty',
            password: 'viuty1234',
            email: 'tviuty@gmail.com',
            money: 3000
        })
            .then(() => {
                res.send("success")
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static showAssets(req, res) {
        User.findOne({
            where: {
                id: 1 //session id
            },
            include: [Item]
        })
            .then((assets) => {
                res.render('assetTable.ejs', { 
                    datas: assets.Items
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static sellAsset(req, res) {
        let id = req.params.id
        User.findOne({
            where: {
                id: 1 //session user id
            },
            include: [{
                model: Item,
                where: {
                    id: id
                }
            }]
        })
            .then((assets) => {
                let money = calculateMoney(assets.money, assets.Items[0].jual,"sell")
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
}

module.exports = assetsController