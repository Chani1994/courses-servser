const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  address: String,
});

module.exports = mongoose.model('User', userSchema);
