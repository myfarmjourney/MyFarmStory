'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   let monsterData =fs.readFileSync('monsterList.csv',"utf8").split('\n')
   let insert =[]
   
   monsterData.forEach((monster,i)=>{
     monster = monster.split(',')
       insert.push({
         monsterName : monster[1],
         attribute :monster[2],
         location : monster[3],
         ItemId : Number(monster[4]),
         createdAt :new Date(),
         updatedAt : new Date()
       })
       console.log(monster)
   })
// console.log(insert);

  return queryInterface.bulkInsert('Monsters',insert,{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Monsters', null, {});
  }
};
