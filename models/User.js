'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    username: {
      type: String
    },
    password: {
      type: String
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

  const User = mongoose.model('User', newSchema);
  return User;
};