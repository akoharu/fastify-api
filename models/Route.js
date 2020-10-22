'use strict';
const mongoose_delete = require('mongoose-delete');

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    server: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    endpoint: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
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