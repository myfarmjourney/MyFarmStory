'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull : false,
      autoIncrement: true
    },
    ItemId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Asset.associate = function(models) {
    // associations can be defined here
  };
  return Asset;
};