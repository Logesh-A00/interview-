// ✅ All Imports At Top
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import ticketRoutes from './routes/ticketRoutes.js';

// ✅ Load .env
dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Test route
app.get('/', (req, res) => {
  res.send('🎉 Support Ticket System API is running!');
});

// ✅ Routes
app.use('/api/tickets', ticketRoutes); // Route file handles CRUD

// ✅ MongoDB Connection (MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  // ✅ Start Server after DB connection
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
