import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Discussion Schema
const discussionSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  authorAvatar: { type: String, default: '👤' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  replies: [{
    id: String,
    author: String,
    authorId: String,
    authorAvatar: String,
    content: String,
    isInstructor: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  isPinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add virtual id field for compatibility
discussionSchema.virtual('id').get(function() {
  return this._id.toString();
});

// Ensure virtual fields are included in JSON
discussionSchema.set('toJSON', { virtuals: true });
discussionSchema.set('toObject', { virtuals: true });

const Discussion = mongoose.models.Discussion || mongoose.model('Discussion', discussionSchema);

// Get all discussions
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ updatedAt: -1 });
    console.log('Fetched discussions:', discussions.length);
    console.log('First discussion ID:', discussions[0]?._id);
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get discussions by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const discussions = await Discussion.find({ courseId: req.params.courseId }).sort({ updatedAt: -1 });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get discussions by instructor (for instructor dashboard)
router.get('/instructor/:instructorId', async (req, res) => {
  try {
    // Get all discussions for courses taught by this instructor
    // For now, return all discussions
    const discussions = await Discussion.find().sort({ updatedAt: -1 });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new discussion
router.post('/', async (req, res) => {
  try {
    const discussion = new Discussion(req.body);
    await discussion.save();
    console.log('Created discussion with _id:', discussion._id);
    console.log('Created discussion id:', discussion.id);
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a reply to a discussion
router.post('/:id/reply', async (req, res) => {
  try {
    const { author, authorId, authorAvatar, content, isInstructor } = req.body;
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const reply = {
      id: `r_${Date.now()}`,
      author,
      authorId,
      authorAvatar,
      content,
      isInstructor,
      createdAt: new Date()
    };

    discussion.replies.push(reply);
    discussion.updatedAt = new Date();
    await discussion.save();
    
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a discussion
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const hasLiked = discussion.likedBy.includes(userId);
    
    if (hasLiked) {
      discussion.likes -= 1;
      discussion.likedBy = discussion.likedBy.filter(id => id !== userId);
    } else {
      discussion.likes += 1;
      discussion.likedBy.push(userId);
    }

    await discussion.save();
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Pin/unpin a discussion
router.put('/:id/pin', async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    discussion.isPinned = !discussion.isPinned;
    await discussion.save();
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
