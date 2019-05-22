'use strict';
const fs =require('fs')

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
   let itemData = fs.readFileSync('itemLib.csv','utf8').split('\n')
   let insert= []

   itemData.forEach((element,i)=>{
     element = element.split(',')
     if (i !== 0) {
       if (element.length !== 5) {
        //  console.log(element)
       }
      insert.push({
        itemName : element[1],
        kategori : element[2],
        jual : Number(element[3]),
        beli : Number(element[4]),
        createdAt : new Date(),
        updatedAt : new Date()
      })
     }
   })
  //  console.log (insert[0])
   return queryInterface.bulkInsert('Items',insert,{})
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Items', null, {});
  }

};
