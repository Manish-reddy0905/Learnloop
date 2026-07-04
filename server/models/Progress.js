import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  completedLessons: [{
    type: String
  }],
  percentage: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  quizScore: {
    type: Number
  },
  certificateEarned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for clerkId and courseId
progressSchema.index({ clerkId: 1, courseId: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
