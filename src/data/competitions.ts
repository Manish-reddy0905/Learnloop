export interface Competition {
  id: string;
  title: string;
  description: string;
  type: 'tournament' | 'quiz_battle' | 'speed_challenge';
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  prize: {
    coins: number;
    gems: number;
    xp: number;
  };
  requirements: {
    minLevel: number;
    minCourses: number;
  };
  status: 'upcoming' | 'active' | 'completed';
}

export const competitions: Competition[] = [
  {
    id: 'weekly_xp_tournament',
    title: 'Weekly XP Tournament',
    description: 'Compete with other learners to earn the most XP this week',
    type: 'tournament',
    startDate: '2026-07-01T00:00:00.000Z',
    endDate: '2026-07-08T00:00:00.000Z',
    participants: 124,
    maxParticipants: 500,
    prize: { coins: 1000, gems: 50, xp: 5000 },
    requirements: { minLevel: 5, minCourses: 2 },
    status: 'active'
  },
  {
    id: 'quiz_battle_java',
    title: 'Java Quiz Battle',
    description: 'Test your Java knowledge in this intense quiz competition',
    type: 'quiz_battle',
    startDate: '2026-06-30T00:00:00.000Z',
    endDate: '2026-07-04T00:00:00.000Z',
    participants: 45,
    maxParticipants: 100,
    prize: { coins: 500, gems: 25, xp: 2500 },
    requirements: { minLevel: 3, minCourses: 1 },
    status: 'active'
  },
  {
    id: 'speed_challenge_spring',
    title: 'Spring Boot Speed Challenge',
    description: 'Complete Spring Boot lessons as fast as you can',
    type: 'speed_challenge',
    startDate: '2026-07-04T00:00:00.000Z',
    endDate: '2026-07-11T00:00:00.000Z',
    participants: 89,
    maxParticipants: 200,
    prize: { coins: 750, gems: 35, xp: 3500 },
    requirements: { minLevel: 7, minCourses: 3 },
    status: 'upcoming'
  },
  {
    id: 'python_mastery',
    title: 'Python Mastery Challenge',
    description: 'Master Python fundamentals in this comprehensive challenge',
    type: 'tournament',
    startDate: '2026-06-25T00:00:00.000Z',
    endDate: '2026-06-30T00:00:00.000Z',
    participants: 156,
    maxParticipants: 300,
    prize: { coins: 800, gems: 40, xp: 4000 },
    requirements: { minLevel: 4, minCourses: 2 },
    status: 'completed'
  }
];

export const getActiveCompetitions = () => {
  const now = new Date();
  return competitions.filter(comp => {
    const start = new Date(comp.startDate);
    const end = new Date(comp.endDate);
    return now >= start && now <= end;
  });
};

export const getUpcomingCompetitions = () => {
  const now = new Date();
  return competitions.filter(comp => new Date(comp.startDate) > now);
};

export const getCompletedCompetitions = () => {
  const now = new Date();
  return competitions.filter(comp => new Date(comp.endDate) < now);
};

export const canJoinCompetition = (competition: Competition, userLevel: number, completedCourses: number) => {
  return userLevel >= competition.requirements.minLevel && 
         completedCourses >= competition.requirements.minCourses;
};
