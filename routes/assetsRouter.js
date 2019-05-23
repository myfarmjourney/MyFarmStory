const express = require('express')
const assetsRouter = express.Router()
const assetsController = require('../controller/assetsController')

assetsRouter.get('/',assetsController.showAssets)
assetsRouter.get('/add',assetsController.createUser)
assetsRouter.get('/:id/sell',assetsController.sellAsset) //id item

module.exports = assetsRouter