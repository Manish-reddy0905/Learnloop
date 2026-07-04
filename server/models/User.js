import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['student', 'instructor'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: ''
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  totalXP: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  coins: {
    type: Number,
    default: 0
  },
  gems: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastLoginDate: {
    type: Date
  },
  streakFreezes: {
    type: Number,
    default: 0
  },
  streakBadges: [{
    id: String,
    name: String,
    icon: String,
    tier: String,
    requiredDays: Number,
    earnedDate: Date
  }],
  badges: [{
    id: String,
    name: String,
    icon: String,
    description: String,
    earnedDate: Date
  }],
  achievements: [{
    id: String,
    title: String,
    description: String,
    icon: String,
    rarity: String,
    xpReward: Number,
    coinReward: Number,
    unlockedAt: Date
  }],
  dailyChallenges: [{
    date: String,
    challenges: [{
      id: String,
      title: String,
      description: String,
      target: Number,
      current: Number,
      completed: Boolean,
      xpReward: Number,
      coinReward: Number
    }]
  }],
  weeklyActivity: [{
    date: String,
    lessonsCompleted: Number,
    xpEarned: Number,
    timeSpent: Number
  }],
  enrolledCourses: [{
    type: String
  }],
  completedCourses: [{
    type: String
  }],
  wishlist: [{
    type: String
  }],
  friends: [{
    type: String
  }],
  teams: [{
    type: String
  }],
  joinedCompetitions: [{
    competitionId: String,
    joinedAt: Date
  }],
  competitionHistory: [{
    competitionId: String,
    competitionTitle: String,
    score: Number,
    totalQuestions: Number,
    completedAt: Date,
    type: {
      type: String,
      enum: ['daily', 'weekly', 'competition']
    }
  }],
  notes: [{
    courseId: String,
    lessonId: String,
    content: String,
    updatedAt: Date
  }],
  // Instructor-specific fields
  instructorXP: {
    type: Number,
    default: 0
  },
  instructorLevel: {
    type: Number,
    default: 1
  },
  instructorAchievements: [{
    id: String,
    title: String,
    description: String,
    icon: String,
    rarity: String,
    xpReward: Number,
    unlockedAt: Date
  }],
  coursesCreated: [{
    type: String
  }],
  totalRevenue: {
    type: Number,
    default: 0
  },
  totalStudentsTaught: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
