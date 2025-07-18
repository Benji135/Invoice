const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // <-- Import the db connection

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));