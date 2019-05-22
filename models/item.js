'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    itemName: DataTypes.STRING,
    jual: DataTypes.INTEGER,
    beli: DataTypes.INTEGER,
    kategori: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};