'use strict';
module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('Market', {
    status: DataTypes.STRING,
    ItemId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate:(input,options)=>{
        input.status = "available"
      }
    }
  });
  Market.associate = function(models) {
    Market.belongsTo(models.Item,{
      foreignKey:'ItemId'
    })
  };
  return Market;
};