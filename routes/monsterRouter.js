const express = require('express')
const monsterRouter = express.Router()
const monsterController = require('../controller/monsterController')

monsterRouter.get('/hunting',monsterController.hunting)
monsterRouter.get('/hunting/:id',monsterController.getMonster) //id monster
monsterRouter.get('/hunting/:id/kill',monsterController.killMonster) //kill iditem

//buat tabel asset
module.exports = monsterRouter