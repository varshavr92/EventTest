const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings');
const analyticsRoutes = require('./routes/analytics');
const paymentRoutes = require('./routes/payment');
const recommendationRoutes = require('./routes/recommendation');

// Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FRONTEND ORIGIN CONFIG (allow local + Docker + dev)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:8080', // Docker frontend
  'http://localhost:5173', // Vite default port
  'http://localhost:5174', // Alternate Vite port
  'http://127.0.0.1:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5000', // Same origin (if full-stack in one container)
  'https://eventsapp-bjhyb7hje9a7fze3.canadacentral-01.azurewebsites.net' // ✅ your deployed frontend
];


// ✅ Improved CORS Middleware with debug logs
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from server-to-server or curl (no origin)
      if (!origin) return callback(null, true);

      console.log(`🌐 Incoming Origin: ${origin}`);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`🚫 CORS blocked request from: ${origin}`);
        callback(new Error('CORS policy: This origin is not allowed'));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Serve uploaded files (event images)
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/recommendations', recommendationRoutes);

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ✅ Serve React frontend (for Docker / production build)
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname1, 'public', 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
