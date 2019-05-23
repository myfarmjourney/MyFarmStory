const express = require('express')
const marketRouter = express.Router()
const marketController = require('../controller/marketController')

marketRouter.get('/',marketController.showMarket)
marketRouter.get('/:id/buy',marketController.buyItem) //id market

module.exports = marketRouter