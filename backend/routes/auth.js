const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/admin'); // Import the User model

const SECRET_KEY = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user in the database
    const user = await User.findOne({ username });
    // console.log(user);
    if (!user) {
        console.log("User not found:");
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In production, use bcrypt to compare hashed passwords!
    if (password !== user.password) {
        console.log('Invalid password attempt for user');
        return res.status(401).json({ message: 'Invalid credentials' });
        
    }

    const payload = {
        userId: user._id,
        username: user.username,
        email: user.email
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
});

module.exports = router;