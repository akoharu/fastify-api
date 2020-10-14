'use strict';
const faker = require('faker');

module.exports = {
  up: (models, mongoose) => {
    const companies = [];
    for (let index = 0; index < 100; index++) {
      companies.push({
        insertOne: {
          document: {
            name: faker.company.companyName(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress()
          }
        }
      })      
    }
    return models.Company.bulkWrite(companies).then(res => {
      console.log(res.insertedCount);
    });      
  },

  down: (models, mongoose) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return models.Test.bulkWrite([
        {
          deleteOne: {
            filter: {
              name: 'first test'
            }
          }
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    */
  }
};
