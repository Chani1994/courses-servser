const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authenticateToken = require('./middlewares/authenticateToken');
require('dotenv').config();
const categoryController = require('./controllers/category.controller'); // שנה את הנתיב לפי הצורך
const coursesController = require('./controllers/courses.controller'); // שנה את הנתיב לפי הצורך

// חיבור למסד הנתונים
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log('Connected to MongoDB');
  
// בדיקת והוספת קטגוריות ברירת מחדל
categoryController.checkAndAddDefaultCategories();
// בדיקת והוספת קורסים ברירת מחדל
coursesController.initializeDefaultCourses();})
  .catch((error) => console.error('MongoDB connection error:', error));

mongoose.set('strictQuery', false);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ייבוא ושימוש בנתיבים (Routes)
app.use('/login', require('./routes/auth.routes')); // לוודא שהנתיב מוגדר כאן
app.use('/users', require('./routes/users.routes'));
app.use('/courses', require('./routes/courses.routes'));
app.use('/lecturers', require('./routes/lecturers.routes'));
app.use('/categories',  require('./routes/category.routes'));

// הפעלת השרת
const port = process.env.PORT || 3000; // מוודא שהפורט מוגדר
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



