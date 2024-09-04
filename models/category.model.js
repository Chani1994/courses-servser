const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true // מבטיח שהקוד יהיה ייחודי
  },
  name: {
    type: String,
    required: true
  },
  iconPath: {
    type: String,
    required: false // לא חובה
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
