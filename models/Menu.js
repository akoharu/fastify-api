'use strict';
const mongoose_delete = require('mongoose-delete');
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String
    },
    url: {
      type: String
    },
    icon: {
      type: String
    },
    isExternal: {
      type: Boolean
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Menu'
    },
    order: {
      type: Number
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Role'
    },
    permissions: [
      { type : mongoose.Schema.Types.ObjectId, ref: 'Route' }
    ],
    active: {
      type: Boolean,
      default: true
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  newSchema.plugin(mongoose_delete, { deletedAt : true, deletedBy : true, overrideMethods: true});
  const Menu = mongoose.model('Menu', newSchema);
  return Menu;
};