'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    money: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Item,{
      through: models.Asset,
      foreignKey: 'UserId'
    })
  };
  return User;
};