import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    required: true
  }
});

const quizSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  courseId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  passingScore: {
    type: Number,
    required: true
  },
  timeLimit: {
    type: Number,
    required: true
  },
  questions: [questionSchema]
}, {
  timestamps: true
});

export default mongoose.model('Quiz', quizSchema);
