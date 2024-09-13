const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// קבלת כל המשתמשים
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send({ message: 'Error fetching users' });
  }
};

// קבלת משתמש לפי שם משתמש
exports.getUserByName = async (req, res) => {
  const name = decodeURIComponent(req.params.name).trim();
  try {
    const user = await User.findOne({ username: name });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send(err);
  }
};

// הוספת משתמש חדש
exports.createUser = async (req, res) => {
  const { code, username, password, address,email } = req.body;

  // בדיקת שדות חובה
  if (!code || !username || !password ||!address|| !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // בדוק אם המשתמש קיים כבר
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash של הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש
    const newUser = new User({
      code,
      username,
      password: hashedPassword,
      address,
      email,
    });

    // שמירה למסד הנתונים
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({ message: 'Error creating user' });
  }
};
