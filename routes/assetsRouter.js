const express = require('express')
const assetsRouter = express.Router()
const assetsController = require('../controller/assetsController')

assetsRouter.get('/',assetsController.showAssets)
assetsRouter.get('/:id/sell',assetsController.sellAsset) //id item
assetsRouter.get('/profile',assetsController.showProfile)

module.exports = assetsRouter