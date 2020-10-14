'use strict';
const mongoose_delete = require('mongoose-delete');

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    server: {
      type: String
    },
    name: {
      type: String
    },
    endpoint: {
      type: String
    },
    method: {
      type: String
    },
    description: {
      type: String
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  newSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true});
  const Route = mongoose.model('Route', newSchema);
  return Route;
};