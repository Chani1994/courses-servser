const jwt = require('jsonwebtoken');

// Middleware לאימות JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // וודא שהטוקן מתפצל נכון

  console.log('Authorization Header:', authHeader);
  console.log('Token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

