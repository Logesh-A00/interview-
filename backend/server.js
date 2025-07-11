// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // stop server if DB connection fails
  });

// Routes
const ticketRoutes = require('./routes/TicketRoutes');
const authRoutes = require('./routes/AuthRoutes');
const commentRoutes = require('./routes/CommentRoutes');

// Register routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('🎉 Customer Support Ticketing API is live');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
