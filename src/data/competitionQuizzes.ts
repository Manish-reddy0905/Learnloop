export interface CompetitionQuiz {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'competition';
  competitionId?: string;
  timeLimit: number; // in minutes
  scheduledTime?: string; // ISO date string for when quiz becomes available
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Sample 50 questions for competitions (mix of categories)
export const generateCompetitionQuiz = (type: 'daily' | 'weekly' | 'competition', competitionId?: string): CompetitionQuiz => {
  const allQuestions: QuizQuestion[] = [
    // Programming/JavaScript
    { id: 'q1', question: 'What is the output of typeof null in JavaScript?', options: ['null', 'undefined', 'object', 'number'], correctAnswer: 2, category: 'JavaScript', difficulty: 'easy' },
    { id: 'q2', question: 'Which method is used to remove the last element from an array?', options: ['pop()', 'push()', 'shift()', 'unshift()'], correctAnswer: 0, category: 'JavaScript', difficulty: 'easy' },
    { id: 'q3', question: 'What does the === operator check?', options: ['Value only', 'Type only', 'Value and type', 'Reference'], correctAnswer: 2, category: 'JavaScript', difficulty: 'easy' },
    { id: 'q4', question: 'Which is not a JavaScript data type?', options: ['String', 'Boolean', 'Float', 'Symbol'], correctAnswer: 2, category: 'JavaScript', difficulty: 'medium' },
    { id: 'q5', question: 'What is closure in JavaScript?', options: ['A function with no name', 'Function with access to outer scope', 'A loop construct', 'A variable declaration'], correctAnswer: 1, category: 'JavaScript', difficulty: 'hard' },
    
    // React
    { id: 'q6', question: 'What hook is used for side effects in React?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctAnswer: 1, category: 'React', difficulty: 'easy' },
    { id: 'q7', question: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'], correctAnswer: 0, category: 'React', difficulty: 'easy' },
    { id: 'q8', question: 'Which hook manages state in functional components?', options: ['useEffect', 'useState', 'useContext', 'useMemo'], correctAnswer: 1, category: 'React', difficulty: 'easy' },
    { id: 'q9', question: 'What is virtual DOM?', options: ['Real DOM copy', 'Lightweight representation of DOM', 'Database', 'Server'], correctAnswer: 1, category: 'React', difficulty: 'medium' },
    { id: 'q10', question: 'What is the purpose of React.memo?', options: ['Memoize functions', 'Prevent re-render of components', 'Store state', 'Handle events'], correctAnswer: 1, category: 'React', difficulty: 'hard' },
    
    // HTML/CSS
    { id: 'q11', question: 'Which tag is used for the largest heading?', options: ['<h6>', '<heading>', '<h1>', '<head>'], correctAnswer: 2, category: 'HTML', difficulty: 'easy' },
    { id: 'q12', question: 'What property is used to change text color in CSS?', options: ['text-color', 'color', 'font-color', 'background-color'], correctAnswer: 1, category: 'CSS', difficulty: 'easy' },
    { id: 'q13', question: 'Which CSS unit is relative to font size?', options: ['px', 'em', 'vh', 'vw'], correctAnswer: 1, category: 'CSS', difficulty: 'medium' },
    { id: 'q14', question: 'What does flexbox do?', options: ['Creates animations', 'Provides flexible layout', 'Adds shadows', 'Changes colors'], correctAnswer: 1, category: 'CSS', difficulty: 'medium' },
    { id: 'q15', question: 'What is the box model in CSS?', options: ['3D modeling', 'Content, padding, border, margin', 'Animation model', 'Grid system'], correctAnswer: 1, category: 'CSS', difficulty: 'hard' },
    
    // Node.js
    { id: 'q16', question: 'What is npm?', options: ['Node Package Manager', 'New Program Mode', 'Node Process Manager', 'Network Protocol Module'], correctAnswer: 0, category: 'Node.js', difficulty: 'easy' },
    { id: 'q17', question: 'Which module is used for file operations in Node.js?', options: ['http', 'fs', 'path', 'os'], correctAnswer: 1, category: 'Node.js', difficulty: 'easy' },
    { id: 'q18', question: 'What is Express.js?', options: ['Database', 'Web framework for Node.js', 'Testing tool', 'CSS framework'], correctAnswer: 1, category: 'Node.js', difficulty: 'medium' },
    { id: 'q19', question: 'What is middleware in Express?', options: ['Database connection', 'Functions that process requests', 'Frontend library', 'UI component'], correctAnswer: 1, category: 'Node.js', difficulty: 'medium' },
    { id: 'q20', question: 'What is event loop in Node.js?', options: ['UI loop', 'Asynchronous callback mechanism', 'Database query', 'Animation loop'], correctAnswer: 1, category: 'Node.js', difficulty: 'hard' },
    
    // Database
    { id: 'q21', question: 'What is SQL?', options: ['Structured Query Language', 'Simple Query Language', 'System Query Language', 'Standard Query Logic'], correctAnswer: 0, category: 'Database', difficulty: 'easy' },
    { id: 'q22', question: 'Which is a NoSQL database?', options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'], correctAnswer: 2, category: 'Database', difficulty: 'easy' },
    { id: 'q23', question: 'What is a primary key?', options: ['First column', 'Unique identifier for records', 'Foreign key', 'Index'], correctAnswer: 1, category: 'Database', difficulty: 'medium' },
    { id: 'q24', question: 'What does CRUD stand for?', options: ['Create, Read, Update, Delete', 'Code, Run, Use, Debug', 'Connect, Read, Upload, Download', 'Create, Remove, Use, Display'], correctAnswer: 0, category: 'Database', difficulty: 'medium' },
    { id: 'q25', question: 'What is indexing in databases?', options: ['Sorting data', 'Improving query performance', 'Deleting data', 'Creating backups'], correctAnswer: 1, category: 'Database', difficulty: 'hard' },
    
    // Python
    { id: 'q26', question: 'What is the correct file extension for Python files?', options: ['.python', '.py', '.pt', '.pyt'], correctAnswer: 1, category: 'Python', difficulty: 'easy' },
    { id: 'q27', question: 'How do you create a function in Python?', options: ['function', 'def', 'func', 'create'], correctAnswer: 1, category: 'Python', difficulty: 'easy' },
    { id: 'q28', question: 'What is a list in Python?', options: ['Immutable sequence', 'Mutable sequence', 'Key-value pair', 'Set'], correctAnswer: 1, category: 'Python', difficulty: 'medium' },
    { id: 'q29', question: 'What is the difference between list and tuple?', options: ['No difference', 'List is mutable, tuple is immutable', 'Tuple is mutable, list is immutable', 'Both are immutable'], correctAnswer: 1, category: 'Python', difficulty: 'medium' },
    { id: 'q30', question: 'What is a decorator in Python?', options: ['UI element', 'Function that modifies another function', 'Data type', 'Loop construct'], correctAnswer: 1, category: 'Python', difficulty: 'hard' },
    
    // Git
    { id: 'q31', question: 'What command initializes a Git repository?', options: ['git start', 'git init', 'git begin', 'git create'], correctAnswer: 1, category: 'Git', difficulty: 'easy' },
    { id: 'q32', question: 'What does git commit do?', options: ['Saves changes', 'Deletes files', 'Creates branch', 'Merges code'], correctAnswer: 0, category: 'Git', difficulty: 'easy' },
    { id: 'q33', question: 'What is a branch in Git?', options: ['File type', 'Independent line of development', 'Database', 'Server'], correctAnswer: 1, category: 'Git', difficulty: 'medium' },
    { id: 'q34', question: 'What does git pull do?', options: ['Pushes changes', 'Fetches and merges changes', 'Creates branch', 'Deletes branch'], correctAnswer: 1, category: 'Git', difficulty: 'medium' },
    { id: 'q35', question: 'What is merge conflict?', options: ['Server error', 'When changes conflict in branches', 'Git crash', 'File deletion'], correctAnswer: 1, category: 'Git', difficulty: 'hard' },
    
    // APIs
    { id: 'q36', question: 'What does REST stand for?', options: ['Representational State Transfer', 'Remote State Transfer', 'Resource State Transfer', 'Representational Service Transfer'], correctAnswer: 0, category: 'API', difficulty: 'easy' },
    { id: 'q37', question: 'What is JSON?', options: ['JavaScript Object Notation', 'Java Source Object Notation', 'JavaScript Online Network', 'Java Object Network'], correctAnswer: 0, category: 'API', difficulty: 'easy' },
    { id: 'q38', question: 'What HTTP method is used to update data?', options: ['GET', 'POST', 'PUT', 'DELETE'], correctAnswer: 2, category: 'API', difficulty: 'medium' },
    { id: 'q39', question: 'What is an API endpoint?', options: ['Database URL', 'Specific URL for API resource', 'Frontend route', 'Server IP'], correctAnswer: 1, category: 'API', difficulty: 'medium' },
    { id: 'q40', question: 'What is CORS?', options: ['Cross-Origin Resource Sharing', 'Cross-Origin Request System', 'Client-Origin Resource Sharing', 'Cross-Origin Response System'], correctAnswer: 0, category: 'API', difficulty: 'hard' },
    
    // General Programming
    { id: 'q41', question: 'What is a variable?', options: ['Constant value', 'Named storage location', 'Function', 'Class'], correctAnswer: 1, category: 'Programming', difficulty: 'easy' },
    { id: 'q42', question: 'What is a loop?', options: ['Variable', 'Repeated execution of code', 'Function', 'Data type'], correctAnswer: 1, category: 'Programming', difficulty: 'easy' },
    { id: 'q43', question: 'What is recursion?', options: ['Loop', 'Function calling itself', 'Variable assignment', 'Array method'], correctAnswer: 1, category: 'Programming', difficulty: 'medium' },
    { id: 'q44', question: 'What is Big O notation?', options: ['Sorting algorithm', 'Time complexity measurement', 'Data structure', 'Variable type'], correctAnswer: 1, category: 'Programming', difficulty: 'medium' },
    { id: 'q45', question: 'What is a design pattern?', options: ['UI design', 'Reusable solution to common problems', 'Database schema', 'API structure'], correctAnswer: 1, category: 'Programming', difficulty: 'hard' },
    
    // Web Security
    { id: 'q46', question: 'What is XSS?', options: ['Cross-Site Scripting', 'Extra Secure System', 'Extended Style Sheet', 'External Source System'], correctAnswer: 0, category: 'Security', difficulty: 'easy' },
    { id: 'q47', question: 'What is CSRF?', options: ['Cross-Site Request Forgery', 'Client-Side Request Form', 'Cross-Site Resource Framework', 'Client-Side Resource Function'], correctAnswer: 0, category: 'Security', difficulty: 'medium' },
    { id: 'q48', question: 'What is HTTPS?', options: ['HyperText Transfer Protocol Secure', 'High Transfer Protocol Secure', 'HyperText Transfer Protocol Standard', 'HyperText Transfer Protocol System'], correctAnswer: 0, category: 'Security', difficulty: 'easy' },
    { id: 'q49', question: 'What is SQL injection?', options: ['Database optimization', 'Malicious SQL code injection', 'SQL query optimization', 'Database backup'], correctAnswer: 1, category: 'Security', difficulty: 'medium' },
    { id: 'q50', question: 'What is authentication vs authorization?', options: ['Same thing', 'Who you are vs what you can do', 'Login vs logout', 'Server vs client'], correctAnswer: 1, category: 'Security', difficulty: 'hard' },
  ];

  // Shuffle and select 50 questions
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  
  let timeLimit = 30; // default 30 minutes
  if (type === 'daily') timeLimit = 15;
  if (type === 'weekly') timeLimit = 45;
  if (type === 'competition') timeLimit = 60;

  return {
    id: `${type}_quiz_${Date.now()}`,
    title: type === 'daily' ? 'Daily Quiz Challenge' : type === 'weekly' ? 'Weekly Quiz Challenge' : 'Competition Quiz',
    type,
    competitionId,
    timeLimit,
    questions: shuffled.slice(0, 50)
  };
};

export const getDailyQuiz = (): CompetitionQuiz => {
  const quiz = generateCompetitionQuiz('daily');
  quiz.questions = quiz.questions.slice(0, 20);
  quiz.timeLimit = 15; // 15 minutes
  
  // Set scheduled time to 9:00 AM today
  const now = new Date();
  const scheduledTime = new Date(now);
  scheduledTime.setHours(9, 0, 0, 0);
  
  // If 9 AM has already passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  quiz.scheduledTime = scheduledTime.toISOString();
  return quiz;
};

export const getWeeklyQuiz = (): CompetitionQuiz => {
  const quiz = generateCompetitionQuiz('weekly');
  
  // Set scheduled time to next Sunday at 10:00 AM
  const now = new Date();
  const scheduledTime = new Date(now);
  const dayOfWeek = scheduledTime.getDay();
  const daysUntilSunday = (7 - dayOfWeek) % 7 || 7; // 0 if today is Sunday, otherwise days until next Sunday
  scheduledTime.setDate(scheduledTime.getDate() + daysUntilSunday);
  scheduledTime.setHours(10, 0, 0, 0);
  
  quiz.scheduledTime = scheduledTime.toISOString();
  return quiz;
};

export const getCompetitionQuiz = (competitionId: string): CompetitionQuiz => {
  return generateCompetitionQuiz('competition', competitionId);
};
