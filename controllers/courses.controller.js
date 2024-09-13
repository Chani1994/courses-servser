const Course = require('../models/course.model');
const Category = require('../models/category.model'); // שנה את הנתיב לפי הצורך

// קורסים ברירת מחדל
const defaultCourses = [
  { 
      category: { code: '001', name: 'Teaching', iconPath: 'assets/images/teach-1968076_1280.jpg' }, 
      courseCode: 'DEF001', 
      courseName: 'English Course', 
      numberOfLessons: 10, 
      startDate: new Date('2024-09-25'), 
      syllabus: ['Introduction to Teaching'], 
      learningMethod: 'Zoom',
      lecturerCode: 'USR-4662', 
      imagePath: 'assets/images/english-british-england-language-education-concept.jpg' 
  },
  { 
      category: { code: '002', name: 'Creation and Art', iconPath: 'assets/images/hand-4752642_1280.jpg' }, 
      courseCode: 'DEF002', 
      courseName: 'Sewing for Beginners', 
      numberOfLessons: 5, 
      startDate: new Date('2024-09-15'), 
      syllabus: ['Sewing Basics'], 
      learningMethod: 'In-Person', 
      lecturerCode: 'USR-8948', 
      imagePath: 'assets/images/top-view-variety-fabrics-with-thread-scissors.jpg' 
  },
  { 
      category: { code: '003', name: 'Computers', iconPath: 'assets/images/pexels-pixabay-38568.jpg' }, 
      courseCode: 'DEF003', 
      courseName: 'Architecture Course', 
      numberOfLessons: 12, 
      startDate: new Date('2024-10-30'), 
      syllabus: ['Introduction to Architecture'], 
      learningMethod: 'Zoom', 
      lecturerCode: 'USR-7609', 
      imagePath: 'assets/images/high-angle-architectural-objects-desk.jpg' 
  },
  { 
      category: { code: '004', name: 'Medicine', iconPath: 'assets/images/syringes-3539565_1280.jpg' }, 
      courseCode: 'DEF004', 
      courseName: 'Medical Secretarial Studies', 
      numberOfLessons: 8, 
      startDate: new Date('2024-09-30'), 
      syllabus: ['Basics of Medicine'], 
      learningMethod: 'In-Person', 
      lecturerCode: 'USR-445', 
      imagePath: 'assets/images/cold-1972619_1280.jpg' 
  },
];


// פונקציה להוספת קורסים ברירת מחדל אם הם לא קיימים
exports.initializeDefaultCourses = async () => {
  try {
    const courseCount = await Course.countDocuments();
    
    if (courseCount === 0) {
      await Course.insertMany(defaultCourses);
      console.log('Default courses loaded successfully.');
    } else {
      console.log('Courses already exist in the database. Skipping default courses load.');
    }
  } catch (error) {
    console.error('Error initializing default courses:', error);
  }
};

// פונקציה לבדיקה אם קורס כבר קיים
exports.courseExists = async (courseCode) => {
  try {
    const course = await Course.findOne({ courseCode });
    return !!course;
  } catch (err) {
    throw err;
  }
};

// קבלת כל הקורסים
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send(err);
  }
};

// קבלת קורס לפי קוד קורס
exports.getCourseByCode = async (req, res) => {
  const courseCode = req.params.courseCode;
  try {
    const course = await Course.findOne({ courseCode: courseCode.trim() });
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.json(course);
  } catch (err) {
    res.status(500).send('Server error');
  }
};



//עדכון קורס לפי קוד קורס
exports.updateCourse = async (req, res) => {
  const courseCode = req.params.courseCode;
  try {
    const updatedCourseData = req.body;
    console.log('Updated Course Data:', updatedCourseData);

    // בדיקה אם יש שם קטגוריה בעדכון
    if (updatedCourseData.category && updatedCourseData.category.name) {
      const category = await Category.findOne({ name: updatedCourseData.category.name });

      if (category) {
        updatedCourseData.category = {
          code: category.code,
          name: category.name,
          iconPath: category.iconPath
        };
      } else {
        return res.status(400).json({ error: 'Invalid category name' });
      }
    }

    const updatedCourse = await Course.findOneAndUpdate({ courseCode: courseCode }, updatedCourseData, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ error: `Course with code ${courseCode} not found` });
    }

    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// הוספת קורס חדש
exports.createCourse = async (req, res) => {
  const newCourse = new Course(req.body);

  try {
    const exists = await exports.courseExists(newCourse.courseCode);
    if (exists) {
      return res.status(400).send({ message: 'Course already exists' });
    }

    await newCourse.validate();
    const course = await newCourse.save();
    res.status(201).send(course);
  } catch (err) {
    res.status(500).send({ message: 'An error occurred', error: err.message });
  }
};
