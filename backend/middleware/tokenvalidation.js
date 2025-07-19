const jwt = require('jsonwebtoken');
const User = require('../models/admin'); // Import your user model

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // ✅ Find user from token payload
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // ✅ Compare with stored token
    if (user.token !== token) {
      return res.status(403).json({ message: 'You have been logged out from another device' });
    }

    req.user = decoded; // or use the actual `user` document if needed
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticateToken;
