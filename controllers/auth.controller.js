const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

// יצירת JWT
const generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// התחברות משתמש
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // חפש את המשתמש לפי שם המשתמש
    const user = await User.findOne({ username });
    
    if (!user) {
      // אם המשתמש לא נמצא, החזר שגיאה 404
      return res.status(404).json({ message: 'User not found' });
    }

    // השווה את הסיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      // אם הסיסמה לא תואמת, החזר שגיאה 401
      return res.status(401).json({ message: 'Invalid password' });
    }

    // אם ההתחברות הצליחה, צור JWT
    const token = generateToken(user); // שימוש בפונקציה שנוצרה לצורך יצירת JWT
    
    // החזר את ה-JWT
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error during login' });
  }
};

// const User = require('../models/user.model');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// if (!process.env.JWT_SECRET) {
//   throw new Error('JWT_SECRET environment variable is not defined');
// }

// // יצירת JWT
// const generateToken = (user) => {
//   return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// // התחברות משתמש
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     // חפש את המשתמש לפי שם המשתמש
//     const user = await User.findOne({ username });
    
//     if (!user) {
//       // אם המשתמש לא נמצא, החזר שגיאה 404
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // השווה את הסיסמה
//     const isMatch = await bcrypt.compare(password, user.password);
    
//     if (!isMatch) {
//       // אם הסיסמה לא תואמת, החזר שגיאה 401
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // אם ההתחברות הצליחה, צור JWT
//     const token = jwt.sign({ id: user._id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    
//     // החזר את ה-JWT
//     res.json({ token });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Error during login' });
//   }
// };