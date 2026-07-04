export interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  skills: string[];
  courses: string[];
  prerequisites: string[];
  xpReward: number;
}

export const learningPaths: LearningPath[] = [
  {
    id: 'backend-java',
    name: 'Backend Developer with Java',
    description: 'Master backend development with Java, Spring Boot, and database management',
    difficulty: 'intermediate',
    estimatedTime: '8-10 weeks',
    skills: ['Java', 'Spring Boot', 'MongoDB', 'REST APIs', 'Database Design'],
    courses: ['mongodb', 'spring-boot', 'backend-fundamentals'],
    prerequisites: ['javascript-basics'],
    xpReward: 5000
  },
  {
    id: 'fullstack-python',
    name: 'Full Stack Developer with Python',
    description: 'Build complete web applications using Python, Django, and modern frontend technologies',
    difficulty: 'intermediate',
    estimatedTime: '10-12 weeks',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'API Development'],
    courses: ['python', 'django', 'react', 'fullstack'],
    prerequisites: ['programming-basics'],
    xpReward: 6000
  },
  {
    id: 'frontend-react',
    name: 'Frontend Developer with React',
    description: 'Create modern, responsive user interfaces with React and related technologies',
    difficulty: 'beginner',
    estimatedTime: '6-8 weeks',
    skills: ['React', 'JavaScript', 'CSS', 'TypeScript', 'State Management'],
    courses: ['javascript-basics', 'react', 'typescript'],
    prerequisites: [],
    xpReward: 4000
  },
  {
    id: 'data-science',
    name: 'Data Science & Machine Learning',
    description: 'Learn data analysis, visualization, and machine learning with Python',
    difficulty: 'advanced',
    estimatedTime: '12-16 weeks',
    skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization'],
    courses: ['python', 'data-analysis', 'machine-learning'],
    prerequisites: ['python', 'statistics'],
    xpReward: 8000
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud Engineering',
    description: 'Master deployment, CI/CD, and cloud infrastructure management',
    difficulty: 'advanced',
    estimatedTime: '8-10 weeks',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure as Code'],
    courses: ['docker', 'kubernetes', 'aws', 'cicd'],
    prerequisites: ['linux-basics', 'git'],
    xpReward: 7000
  }
];

export const getRecommendedPaths = (completedCourses: string[], currentLevel: number) => {
  return learningPaths
    .filter(path => {
      // Check if prerequisites are met
      const prerequisitesMet = path.prerequisites.every(prereq => 
        completedCourses.includes(prereq)
      );
      
      // Check if difficulty matches user level
      const difficultyMatch = 
        (path.difficulty === 'beginner' && currentLevel >= 1) ||
        (path.difficulty === 'intermediate' && currentLevel >= 5) ||
        (path.difficulty === 'advanced' && currentLevel >= 10);
      
      // Check if not already completed
      const notCompleted = !path.courses.every(course => completedCourses.includes(course));
      
      return prerequisitesMet && difficultyMatch && notCompleted;
    })
    .sort((a, b) => {
      // Prioritize paths with fewer prerequisites
      return a.prerequisites.length - b.prerequisites.length;
    });
};

export const getPathProgress = (pathId: string, completedCourses: string[]) => {
  const path = learningPaths.find(p => p.id === pathId);
  if (!path) return 0;
  
  const completedInPath = path.courses.filter(course => completedCourses.includes(course)).length;
  return Math.round((completedInPath / path.courses.length) * 100);
};

export const getNextCourseInPath = (pathId: string, completedCourses: string[]) => {
  const path = learningPaths.find(p => p.id === pathId);
  if (!path) return null;
  
  for (const courseId of path.courses) {
    if (!completedCourses.includes(courseId)) {
      return courseId;
    }
  }
  
  return null; // All courses completed
};
