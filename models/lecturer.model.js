const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const lecturerSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true},
  password: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  courseName:{ type: String, required: true }
});
 


module.exports = mongoose.model('Lecturer', lecturerSchema);
