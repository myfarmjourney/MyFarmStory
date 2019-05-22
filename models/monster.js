'use strict';
module.exports = (sequelize, DataTypes) => {
  const Monster = sequelize.define('Monster', {
    monsterName: DataTypes.STRING,
    attribute: DataTypes.STRING,
    location: DataTypes.STRING,
    dropItem: DataTypes.STRING
  }, {});
  Monster.associate = function(models) {
    // associations can be defined here
  };
  return Monster;
};