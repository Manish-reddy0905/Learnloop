import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    ref: 'User'
  },
  courseId: {
    type: String,
    required: true,
    ref: 'Course'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completedLessons: [{
    type: String
  }],
  quizScores: [{
    lessonId: String,
    score: Number,
    attempts: Number,
    completedAt: Date
  }],
  xpEarned: {
    type: Number,
    default: 0
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateIssuedAt: {
    type: Date
  }
}, {
  timestamps: true
});

enrollmentSchema.index({ courseId: 1 });
enrollmentSchema.index({ studentId: 1 });

export default mongoose.model('Enrollment', enrollmentSchema);
