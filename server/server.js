require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Support CORS for local dev and deployed frontend
app.use(cors({
  origin: true, // Allow frontend origin
  credentials: true
}));

app.use(express.json());

// Database connection helper with connection caching for serverless
let isConnected = false;
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGO_URI) {
    console.warn('Warning: MONGO_URI is not set');
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// Middleware to ensure database connection before processing requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Health check routes
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Crate Store API is running' }));
app.get('/api', (req, res) => res.json({ status: 'ok', message: 'Crate Store API is running' }));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// Run server locally if not in a serverless environment
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  }).catch((err) => {
    console.error('Failed to start server:', err);
  });
}

module.exports = app;
