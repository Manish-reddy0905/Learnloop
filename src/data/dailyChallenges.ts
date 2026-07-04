export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  rewardClaimed: boolean;
  xpReward: number;
  icon: string;
  category: 'lessons' | 'courses' | 'quizzes' | 'streak' | 'xp';
  courseId?: string; // Optional course-specific challenge
}

export const generateDailyChallenges = (availableCourses: any[] = []): DailyChallenge[] => {
  const challenges: DailyChallenge[] = [];

  // Add generic lesson challenges
  challenges.push({
    id: 'daily_lessons_3',
    title: 'Complete 3 Lessons',
    description: 'Finish 3 lessons today',
    target: 3,
    current: 0,
    completed: false,
    rewardClaimed: false,
    xpReward: 50,
    icon: '📚',
    category: 'lessons'
  });

  // Add course-specific challenges for available courses
  if (availableCourses.length > 0) {
    // Pick 2 random courses for daily challenges
    const shuffledCourses = [...availableCourses].sort(() => 0.5 - Math.random());
    const selectedCourses = shuffledCourses.slice(0, 2);

    selectedCourses.forEach((course) => {
      challenges.push({
        id: `daily_course_${course.id}`,
        title: `Complete a Lesson in ${course.title}`,
        description: `Finish at least 1 lesson in ${course.title}`,
        target: 1,
        current: 0,
        completed: false,
        rewardClaimed: false,
        xpReward: 30,
        icon: '�',
        category: 'lessons',
        courseId: course.id
      });
    });
  }

  // Add XP challenge
  challenges.push({
    id: 'daily_xp_100',
    title: 'Earn 100 XP',
    description: 'Gain 100 XP today',
    target: 100,
    current: 0,
    completed: false,
    rewardClaimed: false,
    xpReward: 50,
    icon: '⭐',
    category: 'xp'
  });

  // Add quiz challenge if courses have quizzes
  const coursesWithQuizzes = availableCourses.filter(c => 
    c.modules && c.modules.some((m: any) => 
      m.lessons && m.lessons.some((l: any) => l.quiz && l.quiz.length > 0)
    )
  );

  if (coursesWithQuizzes.length > 0) {
    const randomQuizCourse = coursesWithQuizzes[Math.floor(Math.random() * coursesWithQuizzes.length)];
    challenges.push({
      id: `daily_quiz_${randomQuizCourse.id}`,
      title: `Complete ${randomQuizCourse.title} Quiz`,
      description: `Finish the quiz for ${randomQuizCourse.title}`,
      target: 1,
      current: 0,
      completed: false,
      rewardClaimed: false,
      xpReward: 75,
      icon: '�',
      category: 'quizzes',
      courseId: randomQuizCourse.id
    });
  }

  return challenges;
};

export const getWeeklyChallenges = (): DailyChallenge[] => {
  return [
    {
      id: 'weekly_lessons_20',
      title: 'Weekly Learning Goal',
      description: 'Complete 20 lessons this week',
      target: 20,
      current: 0,
      completed: false,
      rewardClaimed: false,
      xpReward: 300,
      icon: '🏆',
      category: 'lessons'
    },
    {
      id: 'weekly_courses_2',
      title: 'Course Explorer',
      description: 'Complete lessons in 2 different courses',
      target: 2,
      current: 0,
      completed: false,
      rewardClaimed: false,
      xpReward: 200,
      icon: '🌟',
      category: 'courses'
    },
    {
      id: 'weekly_streak_5',
      title: 'Streak Master',
      description: 'Maintain a 5-day streak this week',
      target: 5,
      current: 0,
      completed: false,
      rewardClaimed: false,
      xpReward: 250,
      icon: '🔥',
      category: 'streak'
    }
  ];
};
