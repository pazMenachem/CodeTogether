const mongoose = require('mongoose');

//TODO
/**
 * 1. Change user 
 */

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model('user', UserSchema);
