const express = require('express')
const assetsRouter = express.Router()
const assetsController = require('../controller/assetsController')
const {checkSession} = require('../middleware/index')

assetsRouter.get('/',checkSession,assetsController.showAssets)
assetsRouter.get('/:id/sell',assetsController.sellAsset) //id item

module.exports = assetsRouter