export interface JoinedCompetition {
  competitionId: string;
  joinedAt: string;
}

export interface User {
  clerkId: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate: string;
  totalXP: number;
  level: number;
  coins: number;
  gems: number;
  currentStreak: number;
  longestStreak: number;
  streakFreezes: number;
  streakBadges: StreakBadge[];
  badges: Badge[];
  achievements: Achievement[];
  dailyChallenges: DailyChallengeEntry[];
  weeklyActivity: WeeklyActivityEntry[];
  enrolledCourses: string[];
  completedCourses: string[];
  wishlist: string[];
  role?: 'student' | 'instructor';
  friends: string[];
  teams: string[];
  joinedCompetitions: JoinedCompetition[];
  competitionHistory: CompetitionHistoryEntry[];
  notes: NoteEntry[];
  // Instructor-specific fields
  instructorXP?: number;
  instructorLevel?: number;
  instructorAchievements?: Achievement[];
  coursesCreated?: string[];
  totalRevenue?: number;
  totalStudentsTaught?: number;
  averageRating?: number;
}

export interface CompetitionHistoryEntry {
  competitionId: string;
  competitionTitle: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  type: 'daily' | 'weekly' | 'competition';
}

export interface NoteEntry {
  courseId: string;
  lessonId: string;
  content: string;
  updatedAt: string;
}

export interface WeeklyActivityEntry {
  date: string;
  lessonsCompleted: number;
  xpEarned: number;
  timeSpent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  coinReward: number;
  unlockedAt: string;
}

export interface DailyChallengeEntry {
  date: string;
  challenges: DailyChallenge[];
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  xpReward: number;
  coinReward: number;
  icon: string;
  category: 'lessons' | 'courses' | 'quizzes' | 'streak' | 'xp';
}

export interface StreakBadge {
  id: string;
  name: string;
  icon: string;
  tier: string;
  requiredDays: number;
  earnedDate: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  expertise: string[];
  joinDate: string;
  totalCourses: number;
  totalStudents: number;
  rating: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // minutes
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  completed: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  videoId?: string;
  videoUrl?: string;
  description?: string;
  content?: string;
  resources?: Array<{ title: string; url: string; type: string }>;
  attachments?: Array<{ name: string; url: string }>;
  learningObjectives?: string[];
  notes?: string;
  codeExamples?: CodeExample[];
  exercise?: {
    question: string;
    expectedOutput: string;
    hints: string[];
  };
  quiz?: LessonQuiz[];
  moduleId?: string;
  moduleTitle?: string;
  courseId?: string;
  courseTitle?: string;
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
  locked: boolean;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit: number; // minutes
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId?: string;
  instructorName?: string;
  instructorAvatar: string;
  category: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // total hours
  rating: number;
  totalRatings: number;
  totalStudents: number;
  thumbnail: string;
  color: string;
  icon: string;
  modules: Module[];
  prerequisites: string[];
  relatedCourses: string[];
  quiz?: Quiz;
  xpReward: number;
  certificateAvailable: boolean;
  price: number;
  isFree: boolean;
  learningPath: string[];
  skillsLearned?: string[];
  published?: boolean;
  totalXPGenerated?: number;
  certificatesIssued?: number;
  quizAttempts?: number;
  reviews?: CourseReview[];
}

export interface CourseReview {
  clerkId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  career: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  courseIds: string[];
  thumbnail: string;
  color: string;
  icon: string;
  totalXP: number;
  enrolledStudents: number;
  createdAt: string;
  courses?: Course[];
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  percentage: number;
  startDate: string;
  lastAccessed: string;
  timeSpent: number; // minutes
  quizScore?: number;
  certificateEarned: boolean;
}


export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type AppView =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'courses'
  | 'course-detail'
  | 'learn'
  | 'lesson'
  | 'profile'
  | 'quiz'
  | 'certificate'
  | 'video-player'
  | 'instructor-login'
  | 'instructor-dashboard'
  | 'instructor-courses'
  | 'instructor-create-course'
  | 'instructor-course-details'
  | 'instructor-student-progress'
  | 'student-login'
  | 'leaderboard'
  | 'certificates'
  | 'wishlist'
  | 'achievements'
  | 'daily-challenges'
  | 'social'
  | 'competitions'
  | 'discussion';
