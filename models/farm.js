'use strict';
let {randomAge} = require('../helper/randomAge')

module.exports = (sequelize, DataTypes) => {
  const Farm = sequelize.define('Farm', {
    matureAge: DataTypes.INTEGER,
    dieAge: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate:(input,option)=>{
        input.matureAge = randomAge()
        input.dieAge = randomAge()
        input.age = 0
      }
    }
  });
  Farm.associate = function(models) {
    Farm.belongsTo(models.Item)
  };
  return Farm;
};