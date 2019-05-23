const { Asset, Item, Market, User } = require('../models')
let { calculateMoney } = require('../helper/calculateMoney')

class marketController {
    static showMarket(req, res) {
        Market.findAll({
            include: [Item]
        })
            .then((markets) => {
                res.render('marketlist.ejs', {
                    datas: markets
                })
                // res.send(markets)
            })
            .catch((err) => {
                res.send(err)
            })

    }

    static buyItem(req, res) {
        let id = req.params.id
        let market 
        Market.findOne({
            where: {
                id: Number(id)
            },
            include: [Item]
        })
            .then((newmarket) => {
                market = newmarket
                return Asset.create({
                    ItemId: market.ItemId,
                    UserId: req.session.user.id
                })
            })
            .then((newAsset) => {
                market.status = "Sold"
                return market.save()
            })
            .then(() => {
                return User.findOne({
                    where: {
                        id: req.session.user.id
                    },
                    include: [{
                        model: Item,
                        where: {

                              id: market.ItemId
                        }
                    }]
                })
            })
            .then((assets) => {
                let money = calculateMoney(assets.money, assets.Items[0].jual, "buy")
                    assets.money = money
                        return assets.save()
            })
            .then(() => {
                    res.redirect('/market')
            })
            .catch((err) => {
                res.send(err)
            })

            })

        })

    }
}

module.exports = marketController