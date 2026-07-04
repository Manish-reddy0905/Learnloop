import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Get all courses with advanced search and filters
router.get('/', async (req, res) => {
  try {
    const { search, category, level, minRating, tags } = req.query;

    let filter = {};

    // Search by title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by level
    if (level) {
      filter.level = level;
    }

    // Filter by minimum rating
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    // Filter by tags
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(',');
      filter.tags = { $in: tagArray };
    }

    const courses = await Course.find(filter);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by id
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Get all lessons for a course
router.get('/:id/lessons', async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Flatten all lessons from all modules
    const allLessons = [];
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        allLessons.push({
          ...lesson.toObject(),
          moduleId: module.id,
          moduleTitle: module.title
        });
      });
    });

    res.json(allLessons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get specific lesson from a course
router.get('/:courseId/lessons/:lessonId', async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.courseId });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    let lessonData = null;
    let moduleData = null;

    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === req.params.lessonId);
      if (lesson) {
        lessonData = lesson.toObject();
        moduleData = {
          id: module.id,
          title: module.title
        };
        break;
      }
    }

    if (!lessonData) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({
      ...lessonData,
      module: moduleData,
      courseId: course.id,
      courseTitle: course.title
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// Create course (for seeding data)
router.post('/', async (req, res) => {
  try {
    console.log('Creating course with data:', JSON.stringify(req.body, null, 2));
    const course = new Course(req.body);
    await course.save();
    console.log('Course created successfully:', course.id);
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    console.error('Error details:', error.message);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })));
    }
    res.status(400).json({ error: 'Failed to create course', details: error.message });
  }
});

// Add review to course
router.post('/:id/reviews', async (req, res) => {
  try {
    const { clerkId, userName, rating, comment } = req.body;
    const course = await Course.findOne({ id: req.params.id });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if user already reviewed
    const existingReview = course.reviews.find(r => r.clerkId === clerkId);
    if (existingReview) {
      return res.status(400).json({ error: 'User already reviewed this course' });
    }

    // Add review
    course.reviews.push({ clerkId, userName, rating, comment });

    // Update rating
    const totalRating = course.reviews.reduce((sum, r) => sum + r.rating, 0);
    course.rating = Math.round((totalRating / course.reviews.length) * 10) / 10;
    course.totalRatings = course.reviews.length;

    await course.save();
    res.json(course);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review', details: error.message });
  }
});

// Get course reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course.reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;
