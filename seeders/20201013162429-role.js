'use strict';

module.exports = {
  up: (models, mongoose) => {
      return models.Role.bulkWrite([
        {
          insertOne: {
            document: {
              name: 'Super Admin',
              type: 'superAdmin',
              description: 'Super Admin Permission',
              status: 'active'
            }
          }
        },
        {
          insertOne: {
            document: {
              name: 'Client',
              type: 'client',
              description: 'Client Permission',
              status: 'active'
            }
          }
        }
      ]).then(res => {
        // Prints "1"
        console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
      return models.Role.bulkWrite([
        {
          deleteOne: {
            filter: {
              name: 'Super Admin',
            }
          }
        },
        {
          deleteOne: {
            filter: {
              name: 'Client',
            }
          }
        }
      ]).then(res => {
        // Prints "1"
        console.log(res.deletedCount);
      });
  }
};
