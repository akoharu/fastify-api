'use strict';
const bcrypt = require('bcrypt');
const mongoose_delete = require('mongoose-delete');

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Role',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'active'
    },
    tokenReset: {
      type: String,
    },
    timezone: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  /**
   * Password hash middleware.
   */
  newSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  });

  /**
   * Helper method for validating user's password.
   */
  newSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { reject(err); }
        resolve(isMatch);
      });
    });
  };
  
  newSchema.plugin(mongoose_delete, { deletedAt : true, deletedBy : true, overrideMethods: 'all'});
  const User = mongoose.model('User', newSchema);
  return User;
};