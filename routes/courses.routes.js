const express = require('express');
const coursesController = require('../controllers/courses.controller');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// קבלת כל הקורסים 
router.get('/', coursesController.getAllCourses);

// קבלת קורס לפי קוד קורס
router.get('/:courseCode', coursesController.getCourseByCode);

// עדכון קורס
router.put('/:courseCode', coursesController.updateCourse);

// הוספת קורס חדש
router.post('/', coursesController.createCourse);


module.exports = router;

