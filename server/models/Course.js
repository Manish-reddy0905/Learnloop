import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'reading', 'exercise', 'quiz'],
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  xp: {
    type: Number,
    required: true
  },
  videoId: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  resources: [{
    title: String,
    url: String,
    type: String
  }],
  attachments: [{
    name: String,
    url: String
  }],
  learningObjectives: [{
    type: String
  }],
  notes: {
    type: String,
    default: ''
  },
  codeExamples: [{
    title: String,
    code: String,
    language: String
  }],
  exercise: {
    question: String,
    expectedOutput: String,
    hints: [String]
  },
  quiz: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }]
});

const moduleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  locked: {
    type: Boolean,
    default: false
  },
  lessons: [lessonSchema]
});

const reviewSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: false
  },
  userName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const courseSchema = new mongoose.Schema({
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
  instructor: {
    type: String,
    required: true
  },
  instructorId: {
    type: String,
    required: true
  },
  instructorAvatar: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  totalRatings: {
    type: Number,
    required: true
  },
  totalStudents: {
    type: Number,
    required: true
  },
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
  xpReward: {
    type: Number,
    required: true
  },
  certificateAvailable: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0
  },
  isFree: {
    type: Boolean,
    default: true
  },
  published: {
    type: Boolean,
    default: false
  },
  skillsLearned: [{
    type: String
  }],
  prerequisites: [{
    type: String
  }],
  relatedCourses: [{
    type: String
  }],
  learningPath: [{
    type: String
  }],
  totalXPGenerated: {
    type: Number,
    default: 0
  },
  certificatesIssued: {
    type: Number,
    default: 0
  },
  quizAttempts: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  modules: [moduleSchema]
}, {
  timestamps: true
});

export default mongoose.model('Course', courseSchema);
