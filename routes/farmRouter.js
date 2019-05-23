const express = require('express')
const farmRouter = express.Router()
const FarmController = require('../controller/farmController')

farmRouter.get('/',FarmController.showFarm) 
farmRouter.post('/',FarmController.farmPost)
farmRouter.get('/water/:id',FarmController.countAge) //id farm
farmRouter.get('/harvest/:id',FarmController.harvest) //id item


module.exports = farmRouter