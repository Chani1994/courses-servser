const express = require('express');
const lecturersController = require('../controllers/lecturers.controller');

const router = express.Router();

// קבלת כל המרצים
router.get('/', lecturersController.getAllLecturers);

// קבלת פרטי מרצה לפי קוד
router.get('/:code', lecturersController.getLecturerByCode);

// הוספת מרצה חדש
router.post('/', lecturersController.createLecturer);

module.exports = router;
