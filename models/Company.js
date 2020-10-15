'use strict';
const mongoose_delete = require('mongoose-delete');

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String
    },
    phone: {
      type: String
    },
    address: {
      type: String
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  newSchema.plugin(mongoose_delete, { deletedAt : true, deletedBy : true, overrideMethods: true});
  const Company = mongoose.model('Company', newSchema);
  return Company;
};