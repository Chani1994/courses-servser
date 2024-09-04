const Lecturer = require('../models/lecturer.model');

// קבלת כל המרצים
exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find({});
    res.json(lecturers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch lecturers' });
  }
};

// קבלת פרטי מרצה לפי קוד
exports.getLecturerByCode = async (req, res) => {
  try {
    const code = req.params.code.trim();
    const lecturer = await Lecturer.findOne({ code });

    if (lecturer) {
      res.status(200).json(lecturer);
    } else {
      res.status(404).json({ message: 'Lecturer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// הוספת מרצה חדש
exports.createLecturer = async (req, res) => {
  try {
    const newLecturer = new Lecturer(req.body);
    const lecturer = await newLecturer.save();
    return res.status(201).send(lecturer);
  } catch (err) {
    res.status(500).send(err);
  }
};
