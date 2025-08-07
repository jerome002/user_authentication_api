const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes  = require('./src/routes/auth');
const cors = require('cors');
const app = express();

// Load environment variables
dotenv.config();
// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

//  Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
