const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  numberOfLessons: { type: Number, required: true },
  startDate: { type: Date,required: true },
  syllabus: [String],
  learningMethod: { type: String, required: true },
  lecturerCode: { type: String, required: true },
  imagePath: { type: String, required: true },
  categoryCode: {  type: String, required: true}
});


module.exports = mongoose.model('Course', courseSchema);
