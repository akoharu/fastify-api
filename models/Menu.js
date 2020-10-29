'use strict';
const mongoose_delete = require('mongoose-delete');
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    isExternal: {
      type: Boolean,
      required: true
    },
    parent: {
      type: String,
      default: undefined,
      ref:'Menu',
    },
    order: {
      type: Number,
      required: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Role',
      required: true
    },
    permissions: [
      { type : mongoose.Schema.Types.ObjectId, ref: 'Route',
    required: true }
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