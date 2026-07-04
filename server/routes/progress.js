import express from 'express';
import Progress from '../models/Progress.js';

const router = express.Router();

// Get all progress for a user
router.get('/user/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const progress = await Progress.find({ clerkId });
    
    // Convert to record format
    const progressRecord = {};
    progress.forEach(p => {
      progressRecord[p.courseId] = {
        courseId: p.courseId,
        completedLessons: p.completedLessons,
        percentage: p.percentage,
        startDate: p.startDate,
        lastAccessed: p.lastAccessed,
        timeSpent: p.timeSpent,
        quizScore: p.quizScore,
        certificateEarned: p.certificateEarned
      };
    });
    
    res.json(progressRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get progress for specific course
router.get('/user/:clerkId/course/:courseId', async (req, res) => {
  try {
    const { clerkId, courseId } = req.params;
    const progress = await Progress.findOne({ clerkId, courseId });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update progress
router.post('/', async (req, res) => {
  try {
    const { clerkId, courseId } = req.body;
    
    let progress = await Progress.findOne({ clerkId, courseId });
    
    if (progress) {
      // Update existing
      Object.assign(progress, req.body);
      await progress.save();
    } else {
      // Create new
      progress = new Progress(req.body);
      await progress.save();
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update progress
router.put('/:id', async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete lesson
router.post('/complete', async (req, res) => {
  try {
    const { clerkId, courseId, lessonId, xp } = req.body;

    let progress = await Progress.findOne({ clerkId, courseId });

    if (!progress) {
      progress = new Progress({
        clerkId,
        courseId,
        completedLessons: [lessonId],
        percentage: 0,
        timeSpent: 15
      });
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
        progress.timeSpent += 15;
      }
    }

    // Recalculate percentage based on completed lessons
    // Fetch course data from MongoDB
    try {
      const Course = await import('../models/Course.js').then(m => m.default);
      const course = await Course.findOne({ id: courseId });
      
      const totalLessons = course ? course.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 20;
      
      progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
      if (progress.percentage > 100) progress.percentage = 100;
      
      // If course is completed, update user's completedCourses array
      if (progress.percentage >= 100) {
        const User = await import('../models/User.js').then(m => m.default);
        const user = await User.findOne({ clerkId });
        if (user && !user.completedCourses.includes(courseId)) {
          user.completedCourses.push(courseId);
          await user.save();
        }
      }
    } catch (error) {
      console.error('Error calculating percentage:', error);
      // Fallback to default calculation
      const totalLessons = 20;
      progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
      if (progress.percentage > 100) progress.percentage = 100;
    }

    await progress.save();

    // Update user's weeklyActivity
    const User = await import('../models/User.js').then(m => m.default);
    const user = await User.findOne({ clerkId });
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const weeklyActivity = user.weeklyActivity || [];
      const todayActivity = weeklyActivity.find((a) => a.date === today);
      
      if (todayActivity) {
        todayActivity.lessonsCompleted += 1;
        todayActivity.xpEarned += xp;
        todayActivity.timeSpent += 15;
      } else {
        weeklyActivity.push({
          date: today,
          lessonsCompleted: 1,
          xpEarned: xp,
          timeSpent: 15
        });
      }
      
      // Keep only last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      user.weeklyActivity = weeklyActivity.filter((a) => new Date(a.date) >= sevenDaysAgo);
      
      await user.save();
      console.log('Updated weeklyActivity for user:', clerkId);
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit quiz for a lesson
router.post('/quiz/submit', async (req, res) => {
  try {
    const { clerkId, courseId, lessonId, answers, score } = req.body;

    let progress = await Progress.findOne({ clerkId, courseId });

    if (!progress) {
      progress = new Progress({
        clerkId,
        courseId,
        completedLessons: [],
        percentage: 0,
        timeSpent: 0,
        quizScore: score
      });
    } else {
      // Preserve existing data, only update quiz score
      progress.quizScore = score;
    }

    await progress.save();
    res.json({ success: true, score, progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
