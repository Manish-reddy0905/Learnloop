import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Instructor login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Instructor login attempt for email:', email);
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if user is instructor
    if (user.role !== 'instructor') {
      console.log('User is not an instructor:', email, user.role);
      return res.status(403).json({ message: 'Not authorized as instructor' });
    }
    
    // For now, accept any password (in production, you should hash and verify passwords)
    // TODO: Implement proper password hashing with bcrypt
    console.log('Instructor login successful:', email);
    res.json(user);
  } catch (error) {
    console.error('Error during instructor login:', error);
    res.status(500).json({ message: error.message });
  }
});

// Check if email is authorized as instructor
router.get('/check/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Checking instructor authorization for email:', email);
    
    const user = await User.findOne({ email });
    
    if (user && user.role === 'instructor') {
      console.log('User is authorized as instructor:', email);
      res.json({ authorized: true, instructor: { name: user.name, email: user.email } });
    } else {
      console.log('User is not authorized as instructor:', email, user?.role || 'user not found');
      res.json({ authorized: false });
    }
  } catch (error) {
    console.error('Error checking instructor authorization:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all instructors (admin use)
router.get('/', async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' });
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new instructor (admin use)
router.post('/', async (req, res) => {
  try {
    const { email, password, name, bio, expertise } = req.body;
    
    console.log('Creating new instructor:', email, name);
    console.log('Request body:', req.body);
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Generate clerkId for the new instructor
    const clerkId = `instructor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('Generated clerkId:', clerkId);
    
    const userData = {
      clerkId,
      email,
      name,
      password, // TODO: Hash password with bcrypt in production
      role: 'instructor',
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      joinDate: new Date().toISOString(),
      totalXP: 0,
      level: 1,
      coins: 0,
      gems: 0,
      currentStreak: 0,
      longestStreak: 0,
      streakFreezes: 0,
      streakBadges: [],
      badges: [],
      achievements: [],
      dailyChallenges: [],
      weeklyActivity: [],
      enrolledCourses: [],
      completedCourses: [],
      wishlist: [],
      friends: [],
      teams: [],
      joinedCompetitions: [],
      competitionHistory: [],
      notes: [],
    };
    
    console.log('User data to save:', userData);
    
    const user = new User(userData);
    
    await user.save();
    console.log('Instructor created successfully:', email);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating instructor:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    res.status(500).json({ message: error.message });
  }
});

export default router;
