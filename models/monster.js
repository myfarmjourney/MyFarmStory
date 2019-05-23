'use strict';
module.exports = (sequelize, DataTypes) => {
  const Monster = sequelize.define('Monster', {
    monsterName: DataTypes.STRING,
    attribute: DataTypes.STRING,
    location: DataTypes.STRING,
    ItemId: DataTypes.INTEGER
  }, {});
  Monster.associate = function(models) {
    Monster.belongsTo(models.Item,{
      foreignKey: 'ItemId'
    })
    // associations can be defined here
  };
  return Monster;
};