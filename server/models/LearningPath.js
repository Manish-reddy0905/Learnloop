import mongoose from 'mongoose';

const learningPathSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  career: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  courseIds: [{
    type: String,
    required: true
  }],
  thumbnail: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  totalXP: {
    type: Number,
    required: true
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('LearningPath', learningPathSchema);
