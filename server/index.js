import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'http://localhost:5179', 'http://localhost:5180', 'http://localhost:5181', 'http://localhost:5182', 'http://localhost:5183', 'http://localhost:5184', 'http://localhost:5185', 'http://localhost:5186', 'http://localhost:5187', 'http://localhost:5188', 'http://localhost:5189', 'http://localhost:5190', 'http://localhost:5191', 'http://localhost:5192', 'http://localhost:5193', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175', 'http://127.0.0.1:5176', 'http://127.0.0.1:5177', 'http://127.0.0.1:5178', 'http://127.0.0.1:5179', 'http://127.0.0.1:5180', 'http://127.0.0.1:5181', 'http://127.0.0.1:5182', 'http://127.0.0.1:5183', 'http://127.0.0.1:5184', 'http://127.0.0.1:5185', 'http://127.0.0.1:5186', 'http://127.0.0.1:5187', 'http://127.0.0.1:5188', 'http://127.0.0.1:5189', 'http://127.0.0.1:5190', 'http://127.0.0.1:5191', 'http://127.0.0.1:5192', 'http://127.0.0.1:5193', /^http:\/\/127\.0\.0\.1:\d+$/],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', JSON.stringify(req.body));
  }
  next();
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://varalamanishreddy_db_user:iMa4upOAlgDdLR7d@cluster0.uuggl5b.mongodb.net/';
const MONGODB_DB = process.env.MONGODB_DB || 'learnloop';

mongoose.connect(MONGODB_URI, { 
  dbName: MONGODB_DB,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('\n=== MONGODB CONNECTION FAILED ===');
    console.error('Please check your MongoDB Atlas IP whitelist:');
    console.error('1. Go to https://cloud.mongodb.com/');
    console.error('2. Navigate to Network Access');
    console.error('3. Add your current IP or allow 0.0.0.0/0 for development');
    console.error('=====================================\n');
  });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'LearnLoop API Server' });
});

// User Routes
import userRoutes from './routes/users.js';
app.use('/api/users', userRoutes);

// Progress Routes
import progressRoutes from './routes/progress.js';
app.use('/api/progress', progressRoutes);

// Course Routes
import courseRoutes from './routes/courses.js';
app.use('/api/courses', courseRoutes);

// Quiz Routes
import quizRoutes from './routes/quizzes.js';
app.use('/api/quizzes', quizRoutes);

// Wishlist Routes
import wishlistRoutes from './routes/wishlist.js';
app.use('/api/wishlist', wishlistRoutes);

// Instructor Routes
import instructorRoutes from './routes/instructors.js';
app.use('/api/instructors', instructorRoutes);

// Instructor Analytics Routes
import instructorAnalyticsRoutes from './routes/instructorAnalytics.js';
app.use('/api/instructor-analytics', instructorAnalyticsRoutes);

// Discussion Routes
import discussionRoutes from './routes/discussions.js';
app.use('/api/discussions', discussionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
