const Category = require('../models/category.model'); // שנה את הנתיב לפי הצורך

// קבלת כל הקטגוריות
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// קבלת קטגוריה לפי קוד
exports.getCategoryByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const category = await Category.findOne({ code });

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.json(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// יצירת קטגוריה חדשה
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// עדכון קטגוריה לפי קוד
exports.updateCategory = async (req, res) => {
  try {
    const { code } = req.params;
    const updatedCategory = await Category.findOneAndUpdate({ code }, req.body, { new: true });

    if (!updatedCategory) {
      return res.status(404).send('Category not found');
    }

    res.json(updatedCategory);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// מחיקת קטגוריה לפי קוד
exports.deleteCategory = async (req, res) => {
  try {
    const { code } = req.params;
    const deletedCategory = await Category.findOneAndDelete({ code });

    if (!deletedCategory) {
      return res.status(404).send('Category not found');
    }

    res.json(deletedCategory);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// פונקציה לבדיקת והוספת קטגוריות ברירת מחדל אם אין קטגוריות
exports.checkAndAddDefaultCategories = async () => {
  try {
    const categoriesCount = await Category.countDocuments();
    if (categoriesCount === 0) {
      const defaultCategories = [
      { code: '001', name: 'הוראה', iconPath: 'assets/images/teach-1968076_1280.jpg' },
      { code: '002', name: 'יצירה ואומנות', iconPath: 'assets/images/hand-4752642_1280.jpg' },
      { code: '003', name: 'מחשבים', iconPath: 'assets/images/pexels-pixabay-38568.jpg' },
      { code: '004', name: 'רפואה', iconPath: 'assets/images/syringes-3539565_1280.jpg' },
      ];
      await Category.insertMany(defaultCategories);
      console.log('Default categories added');
    }
  } catch (err) {
    console.error('Error checking or adding default categories:', err);
  }
};
