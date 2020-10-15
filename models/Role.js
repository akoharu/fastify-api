'use strict';
const mongoose_delete = require('mongoose-delete');
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String
    },
    type: {
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
  newSchema.plugin(mongoose_delete, { deletedAt : true, deletedBy : true, overrideMethods: true});
  const Role = mongoose.model('Role', newSchema);
  return Role;
};