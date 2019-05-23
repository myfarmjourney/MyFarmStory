'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    username: {
      type : DataTypes.STRING,
      validate : {
        unique : function (value,next) {
          User.findOne ({
            where:{
              username : value
            }
          })
            .then (result=> {
              if (result) {

                throw (`Username already in use`)
              }
              return next()
            })
            .catch(err=>{ 
              return next(err)
            })
        }
      }
    },
    password: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        is: {
          args : /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
          msg : "Wrong format email"
        },
        unique : function (value,next) {
          User.findOne ({
            where:{
              email : value
            }
          })
            .then (result=> {
              if (result) {

                throw (`email already in use`)
              }
              return next()
            })
            .catch(err=>{ 
              return next(err)
            })
        }
      }
    },
    money: DataTypes.INTEGER
  }, {
    hooks :{
      beforeCreate : function(user) {
        user.money = 5000

        const salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(user.password, salt)
        user.password = hash

      }
    }
  });

  User.prototype.getAge = function() {
    let now = new Date().getFullYear()
    // let birthday = new Date (this.birthday).getFullYear()
    let birthday = this.birthday.split('-')
console.log (now,birthday,this.birthday)
    return now - birthday[0]
  }
  User.associate = function(models) {
    User.belongsToMany(models.Item,{
      through: models.Asset,
      foreignKey: 'UserId'
    })
  };
  return User;
};