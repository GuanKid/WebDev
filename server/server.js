const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { setupEnvironment } = require('./src/config/env');

// Setup environment variables (including JWT_SECRET)
setupEnvironment();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const patientRoutes = require('./src/routes/patients');
const authRoutes = require('./src/routes/auth');

app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
