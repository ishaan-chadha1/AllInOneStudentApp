const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const classroomRoutes = require('./routes/classroomRoute');

// Import error handler
const errorHandler = require('./middleware/errorHandler');

// Initialize the app
const app = express();

// Connect to MongoDB
mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Use bodyParser to parse application/json
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Use routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/classrooms', classroomRoutes);

// Use the error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export for testing purposes
