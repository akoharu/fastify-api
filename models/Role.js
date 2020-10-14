'use strict';
const mongoose_delete = require('mongoose-delete');
const _ = require('lodash');
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
    },
    status: {
      type: String
    },
    routes: {
      type: Array
    },
    menus: {
      type: Array
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  newSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true});
  const Role = mongoose.model('Role', newSchema);
  return Role;
};