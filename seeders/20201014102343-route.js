'use strict';

module.exports = {
  up: (models, mongoose) => {

      return models.Route.bulkWrite([
        {
          insertOne: {
            document: {
              "server": "auth.eyzet.io",
              "name": "Get All User",
              "endpoint": "*",
              "method": "GET",
              "role": "5f85f9a45faa5455bf0d3b01"
            }
          }
        },
        {
          insertOne: {
            document: {
              "server": "auth.eyzet.io",
              "name": "Create User",
              "endpoint": "*",
              "method": "POST",
              "role": "5f85f9a45faa5455bf0d3b01"
            }
          }
        },
        {
          insertOne: {
            document: {
              "server": "auth.eyzet.io",
              "name": "Update User",
              "endpoint": "*",
              "method": "PUT",
              "role": "5f85f9a45faa5455bf0d3b01"
            }
          }
        },
        {
          insertOne: {
            document: {
              "server": "auth.eyzet.io",
              "name": "Delete User",
              "endpoint": "*",
              "method": "DELETE",
              "role": "5f85f9a45faa5455bf0d3b01"
            }
          }
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
      return models.Route.bulkWrite([
        {
          deleteMany: {
            filter: {
              server: 'auth.eyzet.io'
            }
          }
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};
