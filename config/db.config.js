const mongoose = require('mongoose');

// התחברות ל-MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

mongoose.set('strictQuery', false);
