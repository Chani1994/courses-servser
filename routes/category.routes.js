const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller'); // שנה את הנתיב לפי הצורך

// קבלת כל הקטגוריות
router.get('/', categoryController.getCategories);

// קבלת קטגוריה לפי קוד
router.get('/:code', categoryController.getCategoryByCode);

// יצירת קטגוריה חדשה
router.post('/', categoryController.createCategory);

// עדכון קטגוריה לפי קוד
router.put('/:code', categoryController.updateCategory);

module.exports = router;

