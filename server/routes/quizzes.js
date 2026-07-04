import express from 'express';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get quiz by id
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ id: req.params.id });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Get quiz by course id
router.get('/course/:courseId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ courseId: req.params.courseId });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found for this course' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Create quiz (for seeding data)
router.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create quiz' });
  }
});

export default router;
