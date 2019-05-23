'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    itemName: DataTypes.STRING,
    jual: DataTypes.INTEGER,
    beli: DataTypes.INTEGER,
    kategori: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
      Item.hasMany(models.Monster,{
        foreignKey:'ItemId'
      })
      Item.belongsToMany(models.User,{
        through : models.Asset,
        foreignKey: 'ItemId'
      })
      Item.hasMany(models.Market,{
        foreignKey:'ItemId'
      })
      Item.hasMany(models.Farm,{
        foreignKey:'ItemId'
      })
  };
  return Item;
};