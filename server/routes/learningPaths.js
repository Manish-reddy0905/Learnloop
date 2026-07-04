import express from 'express';
import LearningPath from '../models/LearningPath.js';
import Course from '../models/Course.js';

const router = express.Router();

// Get all learning paths
router.get('/', async (req, res) => {
  try {
    const paths = await LearningPath.find();
    res.json(paths);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch learning paths' });
  }
});

// Get learning path by id
router.get('/:id', async (req, res) => {
  try {
    const path = await LearningPath.findOne({ id: req.params.id });
    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    // Fetch course details for each course in the path
    const courses = await Course.find({ id: { $in: path.courseIds } });

    res.json({
      ...path.toObject(),
      courses
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch learning path' });
  }
});

// Create learning path
router.post('/', async (req, res) => {
  try {
    const path = new LearningPath(req.body);
    await path.save();
    res.status(201).json(path);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create learning path' });
  }
});

// Enroll in learning path
router.post('/enroll', async (req, res) => {
  try {
    const { clerkId, pathId } = req.body;

    const path = await LearningPath.findOne({ id: pathId });
    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    path.enrolledStudents += 1;
    await path.save();

    res.json({ success: true, enrolledStudents: path.enrolledStudents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll in learning path' });
  }
});

export default router;
