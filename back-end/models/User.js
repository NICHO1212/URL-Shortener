const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);