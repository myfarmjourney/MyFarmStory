const express = require('express')
const marketRouter = express.Router()
const assetsController = require('../controller/assetsController')

marketRouter.get('/',assetsController.showAssets)
// marketRouter.get('/add',assetsController.createUser)
marketRouter.get('/:id/sell',assetsController.sellAsset) //id item

module.exports = marketRouter