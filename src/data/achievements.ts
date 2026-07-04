export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  coinReward: number;
  requirement: {
    type: 'lessons_completed' | 'courses_completed' | 'streak_days' | 'quiz_score' | 'total_xp' | 'enrolled_courses';
    value: number;
    courseId?: string;
  };
  unlocked: boolean;
  unlockedAt?: string;
}

export const achievements: Achievement[] = [
  // Course Completion Achievements
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    rarity: 'common',
    xpReward: 50,
    coinReward: 10,
    requirement: { type: 'lessons_completed', value: 1 },
    unlocked: false
  },
  {
    id: 'ten_lessons',
    title: 'Learning Momentum',
    description: 'Complete 10 lessons',
    icon: '📚',
    rarity: 'common',
    xpReward: 100,
    coinReward: 25,
    requirement: { type: 'lessons_completed', value: 10 },
    unlocked: false
  },
  {
    id: 'fifty_lessons',
    title: 'Dedicated Learner',
    description: 'Complete 50 lessons',
    icon: '🎓',
    rarity: 'rare',
    xpReward: 250,
    coinReward: 50,
    requirement: { type: 'lessons_completed', value: 50 },
    unlocked: false
  },
  {
    id: 'hundred_lessons',
    title: 'Knowledge Master',
    description: 'Complete 100 lessons',
    icon: '🏆',
    rarity: 'epic',
    xpReward: 500,
    coinReward: 100,
    requirement: { type: 'lessons_completed', value: 100 },
    unlocked: false
  },
  
  // Course Completion Achievements
  {
    id: 'first_course',
    title: 'Course Graduate',
    description: 'Complete your first course',
    icon: '🎓',
    rarity: 'common',
    xpReward: 200,
    coinReward: 50,
    requirement: { type: 'courses_completed', value: 1 },
    unlocked: false
  },
  {
    id: 'five_courses',
    title: 'Course Collector',
    description: 'Complete 5 courses',
    icon: '🌟',
    rarity: 'rare',
    xpReward: 500,
    coinReward: 100,
    requirement: { type: 'courses_completed', value: 5 },
    unlocked: false
  },
  {
    id: 'ten_courses',
    title: 'Learning Champion',
    description: 'Complete 10 courses',
    icon: '👑',
    rarity: 'epic',
    xpReward: 1000,
    coinReward: 200,
    requirement: { type: 'courses_completed', value: 10 },
    unlocked: false
  },
  
  // Streak Achievements
  {
    id: 'streak_3',
    title: 'Consistent Learner',
    description: 'Maintain a 3-day learning streak',
    icon: '🔥',
    rarity: 'common',
    xpReward: 75,
    coinReward: 15,
    requirement: { type: 'streak_days', value: 3 },
    unlocked: false
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '⚡',
    rarity: 'rare',
    xpReward: 200,
    coinReward: 40,
    requirement: { type: 'streak_days', value: 7 },
    unlocked: false
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Maintain a 30-day learning streak',
    icon: '💎',
    rarity: 'epic',
    xpReward: 500,
    coinReward: 100,
    requirement: { type: 'streak_days', value: 30 },
    unlocked: false
  },
  {
    id: 'streak_100',
    title: 'Century Streak',
    description: 'Maintain a 100-day learning streak',
    icon: '🌟',
    rarity: 'legendary',
    xpReward: 2000,
    coinReward: 500,
    requirement: { type: 'streak_days', value: 100 },
    unlocked: false
  },
  
  // Quiz Achievements
  {
    id: 'perfect_quiz',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: '💯',
    rarity: 'rare',
    xpReward: 150,
    coinReward: 30,
    requirement: { type: 'quiz_score', value: 100 },
    unlocked: false
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Score 90% or higher on 5 quizzes',
    icon: '🎯',
    rarity: 'epic',
    xpReward: 400,
    coinReward: 80,
    requirement: { type: 'quiz_score', value: 90 },
    unlocked: false
  },
  
  // XP Achievements
  {
    id: 'xp_1000',
    title: 'XP Rookie',
    description: 'Earn 1,000 total XP',
    icon: '⭐',
    rarity: 'common',
    xpReward: 100,
    coinReward: 20,
    requirement: { type: 'total_xp', value: 1000 },
    unlocked: false
  },
  {
    id: 'xp_5000',
    title: 'XP Expert',
    description: 'Earn 5,000 total XP',
    icon: '🌟',
    rarity: 'rare',
    xpReward: 300,
    coinReward: 60,
    requirement: { type: 'total_xp', value: 5000 },
    unlocked: false
  },
  {
    id: 'xp_25000',
    title: 'XP Legend',
    description: 'Earn 25,000 total XP',
    icon: '👑',
    rarity: 'legendary',
    xpReward: 1000,
    coinReward: 200,
    requirement: { type: 'total_xp', value: 25000 },
    unlocked: false
  },
  
  // Enrollment Achievements
  {
    id: 'first_enroll',
    title: 'Curious Mind',
    description: 'Enroll in your first course',
    icon: '📖',
    rarity: 'common',
    xpReward: 25,
    coinReward: 5,
    requirement: { type: 'enrolled_courses', value: 1 },
    unlocked: false
  },
  {
    id: 'five_enroll',
    title: 'Knowledge Seeker',
    description: 'Enroll in 5 courses',
    icon: '🎯',
    rarity: 'common',
    xpReward: 100,
    coinReward: 20,
    requirement: { type: 'enrolled_courses', value: 5 },
    unlocked: false
  }
];

export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return 'from-gray-500 to-gray-600';
    case 'rare': return 'from-blue-500 to-cyan-500';
    case 'epic': return 'from-purple-500 to-pink-500';
    case 'legendary': return 'from-yellow-500 to-orange-500';
    default: return 'from-gray-500 to-gray-600';
  }
};

export const getRarityBorder = (rarity: string): string => {
  switch (rarity) {
    case 'common': return 'border-gray-500/30';
    case 'rare': return 'border-blue-500/30';
    case 'epic': return 'border-purple-500/30';
    case 'legendary': return 'border-yellow-500/30';
    default: return 'border-gray-500/30';
  }
};
