import express from 'express';
import Wishlist from '../models/Wishlist.js';
import User from '../models/User.js';

const router = express.Router();

// Get user's wishlist
router.get('/:clerkId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ clerkId: req.params.clerkId });
    if (!wishlist) {
      return res.json({ courseIds: [] });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// Add course to wishlist
router.post('/add', async (req, res) => {
  try {
    const { clerkId, courseId } = req.body;

    let wishlist = await Wishlist.findOne({ clerkId });
    if (!wishlist) {
      wishlist = new Wishlist({ clerkId, courseIds: [courseId] });
    } else {
      if (!wishlist.courseIds.includes(courseId)) {
        wishlist.courseIds.push(courseId);
      }
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

// Remove course from wishlist
router.post('/remove', async (req, res) => {
  try {
    const { clerkId, courseId } = req.body;

    const wishlist = await Wishlist.findOne({ clerkId });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishlist.courseIds = wishlist.courseIds.filter(id => id !== courseId);
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

export default router;
