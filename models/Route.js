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
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Role'
    },
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  newSchema.plugin(mongoose_delete, { deletedAt : true, deletedBy : true, overrideMethods: true});
  const Route = mongoose.model('Route', newSchema);
  return Route;
};