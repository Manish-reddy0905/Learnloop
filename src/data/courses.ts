import { Course, Quiz } from '../types';

export const quizzes: Record<string, Quiz> = {
  'java-basics': {
    id: 'quiz-java',
    courseId: 'java-basics',
    title: 'Java Fundamentals Final Quiz',
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        question: 'Which keyword is used to create a class in Java?',
        options: ['struct', 'class', 'object', 'define'],
        correctAnswer: 1,
        explanation: 'The "class" keyword is used to define a class in Java.'
      },
      {
        id: 'q2',
        question: 'What is the correct way to declare a variable in Java?',
        options: ['var x = 5', 'int x = 5;', 'x = 5;', 'declare int x = 5;'],
        correctAnswer: 1,
        explanation: 'Java requires explicit type declaration: int x = 5;'
      },
      {
        id: 'q3',
        question: 'Which of these is NOT a primitive data type in Java?',
        options: ['int', 'String', 'boolean', 'char'],
        correctAnswer: 1,
        explanation: 'String is a class (reference type) in Java, not a primitive type.'
      },
      {
        id: 'q4',
        question: 'What does JVM stand for?',
        options: ['Java Visual Machine', 'Java Virtual Machine', 'Java Variable Manager', 'Java Version Manager'],
        correctAnswer: 1,
        explanation: 'JVM stands for Java Virtual Machine, which executes Java bytecode.'
      },
      {
        id: 'q5',
        question: 'Which method is the entry point of a Java program?',
        options: ['start()', 'run()', 'main()', 'execute()'],
        correctAnswer: 2,
        explanation: 'The main() method with signature "public static void main(String[] args)" is the entry point.'
      },
      {
        id: 'q6',
        question: 'What is the output of: System.out.println(10 % 3)?',
        options: ['3', '1', '0', '2'],
        correctAnswer: 1,
        explanation: '10 % 3 = 1 (remainder when 10 is divided by 3)'
      },
      {
        id: 'q7',
        question: 'Which loop is used when the number of iterations is known?',
        options: ['while', 'do-while', 'for', 'foreach'],
        correctAnswer: 2,
        explanation: 'The for loop is best when you know exactly how many times to iterate.'
      },
      {
        id: 'q8',
        question: 'What does OOP stand for?',
        options: ['Object Oriented Programming', 'Open Object Protocol', 'Output Oriented Processing', 'Object Order Protocol'],
        correctAnswer: 0,
        explanation: 'OOP stands for Object-Oriented Programming.'
      },
      {
        id: 'q9',
        question: 'Which access modifier makes a member accessible everywhere?',
        options: ['private', 'protected', 'public', 'default'],
        correctAnswer: 2,
        explanation: 'The public access modifier makes the member accessible from anywhere.'
      },
      {
        id: 'q10',
        question: 'What is the size of int in Java?',
        options: ['8 bits', '16 bits', '32 bits', '64 bits'],
        correctAnswer: 2,
        explanation: 'int in Java is 32 bits (4 bytes).'
      }
    ]
  },
  'dsa': {
    id: 'quiz-dsa',
    courseId: 'dsa',
    title: 'Data Structures & Algorithms Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(nÂ²)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Binary search has O(log n) time complexity as it halves the search space each iteration.'
      },
      {
        id: 'q2',
        question: 'Which data structure uses LIFO (Last In, First Out)?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1,
        explanation: 'Stack uses LIFO - the last element added is the first one removed.'
      },
      {
        id: 'q3',
        question: 'What is the worst-case time complexity of QuickSort?',
        options: ['O(n log n)', 'O(n)', 'O(nÂ²)', 'O(log n)'],
        correctAnswer: 2,
        explanation: 'QuickSort worst case is O(nÂ²) when pivot is always the smallest or largest element.'
      },
      {
        id: 'q4',
        question: 'Which traversal visits root first, then left, then right?',
        options: ['Inorder', 'Postorder', 'Preorder', 'Level-order'],
        correctAnswer: 2,
        explanation: 'Preorder traversal: Root â†’ Left â†’ Right'
      },
      {
        id: 'q5',
        question: 'What is a Hash Table collision?',
        options: ['When table is full', 'When two keys map to the same index', 'When key is not found', 'When memory overflows'],
        correctAnswer: 1,
        explanation: 'A collision occurs when two different keys hash to the same index in the table.'
      },
      {
        id: 'q6',
        question: 'Which data structure is used for BFS traversal?',
        options: ['Stack', 'Queue', 'Heap', 'Tree'],
        correctAnswer: 1,
        explanation: 'BFS uses a Queue (FIFO) to process nodes level by level.'
      },
      {
        id: 'q7',
        question: 'What is the space complexity of merge sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(nÂ²)'],
        correctAnswer: 2,
        explanation: 'Merge sort requires O(n) extra space for the temporary arrays during merging.'
      },
      {
        id: 'q8',
        question: 'A complete binary tree with 7 nodes has how many leaf nodes?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
        explanation: 'A complete binary tree with 7 nodes has 4 leaf nodes at the last level.'
      }
    ]
  },
  'react': {
    id: 'quiz-react',
    courseId: 'react-typescript',
    title: 'React & TypeScript Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is the virtual DOM in React?',
        options: ['A copy of the real DOM', 'A database for React', 'A testing tool', 'A state management library'],
        correctAnswer: 0,
        explanation: 'The virtual DOM is a lightweight copy of the real DOM that React uses for efficient updates.'
      },
      {
        id: 'q2',
        question: 'Which hook is used for side effects in React?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useEffect is used for side effects like data fetching, subscriptions, or DOM manipulation.'
      },
      {
        id: 'q3',
        question: 'What does TypeScript add to JavaScript?',
        options: ['New syntax only', 'Static typing', 'Runtime checks', 'Database integration'],
        correctAnswer: 1,
        explanation: 'TypeScript adds static typing to JavaScript, catching errors at compile time.'
      }
    ]
  },
  'mongodb': {
    id: 'quiz-mongodb',
    courseId: 'mongodb',
    title: 'MongoDB Mastery Final Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What type of database is MongoDB?',
        options: ['Relational', 'Document-oriented NoSQL', 'Graph', 'Key-Value'],
        correctAnswer: 1,
        explanation: 'MongoDB is a document-oriented NoSQL database that stores data in BSON format.'
      },
      {
        id: 'q2',
        question: 'Which MongoDB method is used to insert a document?',
        options: ['db.collection.add()', 'db.collection.insert()', 'db.collection.insertOne()', 'db.collection.push()'],
        correctAnswer: 2,
        explanation: 'insertOne() inserts a single document into a collection.'
      },
      {
        id: 'q3',
        question: 'What is the Aggregation Pipeline in MongoDB?',
        options: ['A backup tool', 'A series of stages that process documents', 'An indexing strategy', 'A replication method'],
        correctAnswer: 1,
        explanation: 'Aggregation pipeline is a framework for data aggregation, modeled as a pipeline of stages.'
      },
      {
        id: 'q4',
        question: 'Which aggregation stage filters documents?',
        options: ['$group', '$match', '$project', '$sort'],
        correctAnswer: 1,
        explanation: '$match stage filters documents to pass only those that match specified conditions.'
      },
      {
        id: 'q5',
        question: 'What does BSON stand for?',
        options: ['Binary Standard Object Notation', 'Binary JSON', 'Boolean JSON', 'Basic Storage Object Notation'],
        correctAnswer: 1,
        explanation: 'BSON stands for Binary JSON - MongoDB\'s binary-encoded serialization of JSON-like documents.'
      },
      {
        id: 'q6',
        question: 'Which MongoDB feature ensures horizontal scalability?',
        options: ['Indexing', 'Sharding', 'Replication', 'Aggregation'],
        correctAnswer: 1,
        explanation: 'Sharding distributes data across multiple machines, providing horizontal scalability.'
      }
    ]
  },
  'python': {
    id: 'quiz-python',
    courseId: 'python',
    title: 'Python Programming Quiz',
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        question: 'What is the correct way to create a list in Python?',
        options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
        correctAnswer: 1,
        explanation: 'Lists in Python are created using square brackets [].'
      },
      {
        id: 'q2',
        question: 'What does the "def" keyword do in Python?',
        options: ['Defines a variable', 'Defines a function', 'Defines a class', 'Defines a module'],
        correctAnswer: 1,
        explanation: 'The "def" keyword is used to define a function in Python.'
      },
      {
        id: 'q3',
        question: 'Which Python data type is immutable?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correctAnswer: 2,
        explanation: 'Tuples are immutable in Python - their contents cannot be changed after creation.'
      },
      {
        id: 'q4',
        question: 'What is a lambda function?',
        options: ['A named function', 'An anonymous function', 'A recursive function', 'A built-in function'],
        correctAnswer: 1,
        explanation: 'Lambda functions are anonymous (unnamed) functions defined with the lambda keyword.'
      },
      {
        id: 'q5',
        question: 'Which operator is used for integer division in Python?',
        options: ['/', '%', '//', '**'],
        correctAnswer: 2,
        explanation: 'The // operator performs integer (floor) division in Python.'
      }
    ]
  },
  'fullstack': {
    id: 'quiz-fullstack',
    courseId: 'fullstack',
    title: 'Full Stack Development Quiz',
    passingScore: 70,
    timeLimit: 25,
    questions: [
      {
        id: 'q1',
        question: 'What does REST stand for?',
        options: ['Representational State Transfer', 'Remote State Transfer', 'Resource State Transfer', 'Real-time State Transfer'],
        correctAnswer: 0,
        explanation: 'REST stands for Representational State Transfer, an architectural style for APIs.'
      },
      {
        id: 'q2',
        question: 'Which HTTP method is used to update data?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 2,
        explanation: 'PUT is used to update existing resources in REST APIs.'
      },
      {
        id: 'q3',
        question: 'What is JWT used for?',
        options: ['Database queries', 'Authentication', 'Styling', 'Testing'],
        correctAnswer: 1,
        explanation: 'JWT (JSON Web Token) is used for secure authentication and information exchange.'
      }
    ]
  },
  'ai': {
    id: 'quiz-ai',
    courseId: 'artificial-intelligence',
    title: 'Artificial Intelligence Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is a neural network?',
        options: ['A type of database', 'A computing system inspired by biological brains', 'A programming language', 'A web framework'],
        correctAnswer: 1,
        explanation: 'Neural networks are computing systems inspired by biological neural networks in human brains.'
      },
      {
        id: 'q2',
        question: 'What is TensorFlow?',
        options: ['A database', 'An ML framework', 'A web server', 'A CSS library'],
        correctAnswer: 1,
        explanation: 'TensorFlow is an open-source machine learning framework developed by Google.'
      },
      {
        id: 'q3',
        question: 'What is deep learning?',
        options: ['Learning with deep databases', 'ML with neural networks with many layers', 'Learning underwater', 'Slow learning'],
        correctAnswer: 1,
        explanation: 'Deep learning uses neural networks with many layers to learn complex patterns.'
      }
    ]
  },
  'ml': {
    id: 'quiz-ml',
    courseId: 'machine-learning',
    title: 'Machine Learning Quiz',
    passingScore: 70,
    timeLimit: 25,
    questions: [
      {
        id: 'q1',
        question: 'What is supervised learning?',
        options: ['Learning without labels', 'Learning with labeled data', 'Learning from images', 'Learning from text'],
        correctAnswer: 1,
        explanation: 'Supervised learning uses labeled data to train models to predict outcomes.'
      },
      {
        id: 'q2',
        question: 'What is cross-validation?',
        options: ['Data validation', 'Model evaluation technique', 'Database backup', 'API testing'],
        correctAnswer: 1,
        explanation: 'Cross-validation is a technique to evaluate ML models by splitting data into subsets.'
      },
      {
        id: 'q3',
        question: 'What is overfitting?',
        options: ['Model too simple', 'Model too complex, memorizes training data', 'Perfect model', 'No training needed'],
        correctAnswer: 1,
        explanation: 'Overfitting occurs when a model is too complex and memorizes training data instead of learning patterns.'
      }
    ]
  },
  'cloud': {
    id: 'quiz-cloud',
    courseId: 'cloud-computing',
    title: 'Cloud Computing Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is EC2 in AWS?',
        options: ['Email service', 'Elastic Compute Cloud', 'Database service', 'Storage service'],
        correctAnswer: 1,
        explanation: 'EC2 (Elastic Compute Cloud) provides scalable computing capacity in AWS.'
      },
      {
        id: 'q2',
        question: 'What is S3 used for?',
        options: ['Compute', 'Storage', 'Database', 'Networking'],
        correctAnswer: 1,
        explanation: 'S3 (Simple Storage Service) is AWS object storage service.'
      },
      {
        id: 'q3',
        question: 'What is Docker?',
        options: ['A cloud provider', 'Container platform', 'Database', 'Programming language'],
        correctAnswer: 1,
        explanation: 'Docker is a platform for developing, shipping, and running applications in containers.'
      }
    ]
  },
  'security': {
    id: 'quiz-security',
    courseId: 'cyber-security',
    title: 'Cyber Security Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is ethical hacking?',
        options: ['Illegal hacking', 'Authorized hacking to find vulnerabilities', 'Hacking for fun', 'Hacking competitors'],
        correctAnswer: 1,
        explanation: 'Ethical hacking is authorized hacking to find and fix security vulnerabilities.'
      },
      {
        id: 'q2',
        question: 'What is encryption?',
        options: ['Deleting data', 'Encoding data for security', 'Compressing data', 'Backing up data'],
        correctAnswer: 1,
        explanation: 'Encryption encodes data so only authorized parties can read it.'
      },
      {
        id: 'q3',
        question: 'What is a firewall?',
        options: ['A heating system', 'Network security system', 'A database', 'A programming language'],
        correctAnswer: 1,
        explanation: 'A firewall is a network security system that monitors and controls traffic.'
      }
    ]
  },
  'design': {
    id: 'quiz-design',
    courseId: 'ui-ux-design',
    title: 'UI/UX Design Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is Figma?',
        options: ['A programming language', 'A design tool', 'A database', 'A cloud provider'],
        correctAnswer: 1,
        explanation: 'Figma is a collaborative design tool for UI/UX design.'
      },
      {
        id: 'q2',
        question: 'What is a design system?',
        options: ['A single design', 'Collection of reusable components', 'A color palette', 'A font'],
        correctAnswer: 1,
        explanation: 'A design system is a collection of reusable components and guidelines for consistent design.'
      },
      {
        id: 'q3',
        question: 'What is UX design?',
        options: ['User Experience design', 'User Exit design', 'Universal XML', 'Unix Extension'],
        correctAnswer: 0,
        explanation: 'UX (User Experience) design focuses on creating meaningful user experiences.'
      }
    ]
  },
  'devops': {
    id: 'quiz-devops',
    courseId: 'devops',
    title: 'DevOps Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is CI/CD?',
        options: ['Code Input/Code Debug', 'Continuous Integration/Continuous Deployment', 'Computer Interface/Computer Design', 'Cloud Integration/Cloud Deployment'],
        correctAnswer: 1,
        explanation: 'CI/CD stands for Continuous Integration and Continuous Deployment.'
      },
      {
        id: 'q2',
        question: 'What is Kubernetes?',
        options: ['A database', 'Container orchestration platform', 'A programming language', 'A cloud provider'],
        correctAnswer: 1,
        explanation: 'Kubernetes is a container orchestration platform for managing containerized applications.'
      },
      {
        id: 'q3',
        question: 'What is the purpose of DevOps?',
        options: ['Slowing development', 'Automating and integrating development and operations', 'Only writing code', 'Only testing'],
        correctAnswer: 1,
        explanation: 'DevOps aims to automate and integrate development and operations processes.'
      }
    ]
  },
  'spring-boot': {
    id: 'quiz-spring-boot',
    courseId: 'spring-boot',
    title: 'Spring Boot & Microservices Quiz',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is Spring Boot?',
        options: ['A database', 'A framework for building Spring applications', 'A testing tool', 'A cloud provider'],
        correctAnswer: 1,
        explanation: 'Spring Boot is a framework that simplifies the creation of Spring-based applications.'
      },
      {
        id: 'q2',
        question: 'What annotation is used to create a REST controller in Spring Boot?',
        options: ['@Controller', '@RestController', '@Service', '@Component'],
        correctAnswer: 1,
        explanation: '@RestController is used to create REST controllers in Spring Boot.'
      },
      {
        id: 'q3',
        question: 'What is dependency injection in Spring?',
        options: ['A database connection', 'A design pattern for implementing loose coupling', 'A testing framework', 'A build tool'],
        correctAnswer: 1,
        explanation: 'Dependency injection is a design pattern that implements loose coupling between components.'
      },
      {
        id: 'q4',
        question: 'What is the purpose of @Autowired annotation?',
        options: ['To create beans', 'To inject dependencies automatically', 'To configure databases', 'To handle exceptions'],
        correctAnswer: 1,
        explanation: '@Autowired is used to automatically inject dependencies into Spring beans.'
      },
      {
        id: 'q5',
        question: 'What is a microservice?',
        options: ['A single large application', 'Small independent services that work together', 'A database service', 'A testing framework'],
        correctAnswer: 1,
        explanation: 'Microservices are small, independent services that work together to form a larger application.'
      }
    ]
  }
};

export const courses: Course[] = [
  {
    id: 'java-basics',
    title: 'Java Programming Fundamentals',
    description: 'Master Java from scratch. Learn OOP, data types, control flow, and build real-world applications with industry best practices.',
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: 'ðŸ‘©â€ðŸ’»',
    category: 'Programming',
    tags: ['Java', 'OOP', 'Backend', 'Beginner'],
    level: 'beginner',
    duration: 24,
    rating: 4.8,
    totalRatings: 12450,
    totalStudents: 89320,
    thumbnail: '',
    color: 'from-orange-500 to-red-600',
    icon: 'â˜•',
    xpReward: 500,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['dsa', 'spring-boot', 'python'],
    learningPath: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    quiz: quizzes['java-basics'],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Java',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'What is Java & JVM?', duration: 12, type: 'video', completed: false, difficulty: 'beginner', xp: 20, videoId: 'GoXwIVyNvX0' },
          { id: 'l2', title: 'Setting Up Development Environment', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoId: 'GoXwIVyNvX0', notes: '## Setting Up Java Development Environment\n\n### 1. Install JDK (Java Development Kit)\n- Download JDK 17 or later from Oracle or OpenJDK\n- For Windows: Run the installer and follow the setup wizard\n- For Mac: Use Homebrew: `brew install openjdk@17`\n- For Linux: `sudo apt install openjdk-17-jdk`\n\n### 2. Set JAVA_HOME Environment Variable\n- Windows: System Properties > Environment Variables > New\n  - Variable name: JAVA_HOME\n  - Variable value: C:\\Program Files\\Java\\jdk-17\n- Mac/Linux: Add to ~/.bash_profile or ~/.zshrc:\n  ```bash\n  export JAVA_HOME=/usr/lib/jvm/java-17-openjdk\n  export PATH=$JAVA_HOME/bin:$PATH\n  ```\n\n### 3. Install an IDE\n- **IntelliJ IDEA** (Recommended): Download Community Edition for free\n- **Eclipse**: Free and open-source\n- **VS Code**: Install Java Extension Pack\n\n### 4. Verify Installation\nOpen terminal/command prompt and run:\n```bash\njava -version\njavac -version\n```\n\n### 5. Create Your First Project\n- In IntelliJ: File > New > Project > Java\n- Name your project and select JDK\n- Create a new Java class: right-click src > New > Java Class\n\n### Practice Exercise\n1. Install JDK on your system\n2. Set up JAVA_HOME environment variable\n3. Install IntelliJ IDEA Community Edition\n4. Create a new Java project\n5. Write a simple Hello World program' },
          { id: 'l3', title: 'Your First Java Program', duration: 10, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoId: 'GoXwIVyNvX0', notes: '## Your First Java Program\n\n### Java Program Structure\nEvery Java program must have at least one class and a main method.\n\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, LearnLoop!\");\n    }\n}\n```\n\n### Breaking It Down\n- **public class HelloWorld**: Defines a class named HelloWorld\n- **public static void main**: The entry point of the program\n  - public: Accessible from anywhere\n  - static: Can be called without creating an object\n  - void: Returns nothing\n  - main: Method name (JVM looks for this)\n  - String[] args: Command line arguments\n- **System.out.println()**: Prints output to console\n\n### Compiling and Running\n1. Save file as `HelloWorld.java`\n2. Compile: `javac HelloWorld.java`\n3. Run: `java HelloWorld`\n\n### Practice Exercise\n1. Create a class named `MyFirstProgram`\n2. Add the main method\n3. Print your name to the console\n4. Compile and run the program\n5. Try printing multiple lines using multiple println statements' },
          { id: 'l4', title: 'Java Syntax & Structure', duration: 8, type: 'video', completed: false, difficulty: 'beginner', xp: 15, videoId: 'GoXwIVyNvX0', notes: '## Java Syntax & Structure\n\n### Key Syntax Rules\n1. **Case Sensitive**: `HelloWorld` â‰  `helloworld`\n2. **Class Names**: Should start with uppercase (PascalCase)\n3. **Method Names**: Should start with lowercase (camelCase)\n4. **File Name**: Must match class name (HelloWorld.java)\n5. **Statements**: End with semicolon (;)\n6. **Blocks**: Enclosed in curly braces {}\n\n### Comments\n```java\n// Single-line comment\n\n/*\n * Multi-line comment\n * Spans multiple lines\n */\n\n/**\n * Documentation comment\n * Used for generating JavaDoc\n */\n```\n\n### Identifiers\nRules for naming variables, classes, methods:\n- Can contain letters, digits, underscores, dollar signs\n- Cannot start with a digit\n- Cannot be a Java keyword\n- Should be meaningful\n\n### Java Keywords (Reserved Words)\nabstract, assert, boolean, break, byte, case, catch, char, class, const, continue, default, do, double, else, enum, extends, final, finally, float, for, goto, if, implements, import, instanceof, int, interface, long, native, new, package, private, protected, public, return, short, static, strictfp, super, switch, synchronized, this, throw, throws, transient, try, void, volatile, while\n\n### Whitespace\n- Spaces, tabs, newlines are ignored by compiler\n- Use for readability\n- Indentation is important for code organization' },
          { id: 'l4-quiz', title: 'Java Basics Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'beginner', xp: 25, quiz: [
            { question: 'What is the correct way to declare a String variable in Java?', options: ['String text = "Hello";', 'string text = "Hello";', 'str text = "Hello";', 'String text = Hello;'], correctAnswer: 0, explanation: 'In Java, String is a class and should be capitalized. String literals are enclosed in double quotes.' },
            { question: 'Which method returns the length of a string?', options: ['size()', 'length()', 'getLength()', 'count()'], correctAnswer: 1, explanation: 'The length() method returns the number of characters in a string.' },
            { question: 'What is the output of: "Hello".charAt(1)?', options: ['H', 'e', 'l', 'o'], correctAnswer: 1, explanation: 'charAt() is zero-indexed, so index 1 returns the second character \'e\'.' },
            { question: 'Are strings in Java mutable?', options: ['Yes, they can be changed', 'No, they are immutable', 'Only if declared as final', 'Only primitive strings are immutable'], correctAnswer: 1, explanation: 'Strings in Java are immutable, meaning they cannot be changed once created.' },
            { question: 'Which method is used to compare string content?', options: ['==', 'equals()', 'compareTo()', 'compare()'], correctAnswer: 1, explanation: 'equals() compares the actual content of strings, while == compares references.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Data Types & Variables',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'Primitive Data Types', duration: 14, type: 'video', completed: false, difficulty: 'beginner', xp: 20, videoId: 'GoXwIVyNvX0' },
          { id: 'l6', title: 'Type Casting & Conversion', duration: 12, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoId: 'GoXwIVyNvX0' },
          { id: 'l7', title: 'String Manipulation', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 35, videoId: 'GoXwIVyNvX0', notes: '## String Manipulation in Java\n\n### String Basics\nStrings in Java are objects, not primitive types. They are immutable.\n\nString str1 = "Hello";\nString str2 = new String("World");\n\n### Common String Methods\n- length(): Returns string length\n  String text = "LearnLoop";\n  int len = text.length(); // 9\n\n- charAt(int index): Returns character at index\n  char c = text.charAt(0); // L\n\n- substring(int start, int end): Extracts substring\n  String sub = text.substring(0, 5); // "Learn"\n\n- toUpperCase() / toLowerCase(): Case conversion\n  String upper = text.toUpperCase(); // "LEARNLOOP"\n\n- trim(): Removes whitespace\n  String spaced = "  Hello  ";\n  String clean = spaced.trim(); // "Hello"\n\n- replace(char old, char new): Replaces characters\n  String replaced = text.replace("L", "l"); // "learnLoop"\n\n- contains(CharSequence): Checks if string contains substring\n  boolean has = text.contains("Loop"); // true\n\n### String Concatenation\nString firstName = "John";\nString lastName = "Doe";\nString fullName = firstName + " " + lastName;\n\n### String Comparison\n- equals(): Compares content (case-sensitive)\n- equalsIgnoreCase(): Compares content (ignores case)\n- compareTo(): Lexicographical comparison\n\nString a = "Hello";\nString b = "hello";\na.equals(b); // false\na.equalsIgnoreCase(b); // true\n\n### Practice Exercise\n1. Create a string with your full name\n2. Print the length of the string\n3. Extract and print your first name\n4. Convert to uppercase and print\n5. Check if it contains a specific character' },
          { id: 'l8', title: 'Variables Practice', duration: 20, type: 'video', completed: false, difficulty: 'beginner', xp: 40, videoId: 'GoXwIVyNvX0', notes: '## Variables Practice\n\n### Variable Declaration Syntax\nint age = 25;\ndouble price = 19.99;\nboolean isActive = true;\nString name = "John";\n\n### Naming Conventions\n- Variables: camelCase (firstName, userAge)\n- Constants: UPPER_SNAKE_CASE (MAX_SIZE, PI)\n- Classes: PascalCase (UserAccount, DatabaseManager)\n\n### Variable Scope\n- Local variables: Declared inside methods/blocks\n- Instance variables: Declared in class (outside methods)\n- Static variables: Shared across all instances\n\n### Practice Problems\n\nProblem 1: Declare variables for a student\nString studentName = "Alice";\nint studentAge = 20;\ndouble gpa = 3.8;\nboolean isGraduated = false;\n\nProblem 2: Calculate area of rectangle\ndouble length = 5.0;\ndouble width = 3.0;\ndouble area = length * width;\nSystem.out.println("Area: " + area);\n\nProblem 3: Temperature conversion\ndouble celsius = 25.0;\ndouble fahrenheit = (celsius * 9/5) + 32;\nSystem.out.println(celsius + "C = " + fahrenheit + "F");\n\n### Quiz Topics\n1. Variable declaration syntax\n2. Data type selection\n3. Naming conventions\n4. Scope and lifetime\n5. Default values\n6. Type casting rules' },
          { id: 'l8-quiz', title: 'Data Types Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'beginner', xp: 25, quiz: [
            { question: 'Which data type should be used for a whole number?', options: ['double', 'float', 'int', 'String'], correctAnswer: 2, explanation: 'int is used for whole numbers (integers) without decimal points.' },
            { question: 'What is the default value of a boolean variable?', options: ['true', 'false', 'null', '0'], correctAnswer: 1, explanation: 'The default value of a boolean in Java is false.' },
            { question: 'Which keyword is used to declare a constant?', options: ['static', 'final', 'const', 'constant'], correctAnswer: 1, explanation: 'final is used to declare constants in Java.' },
            { question: 'What is the size of a double in Java?', options: ['32 bits', '64 bits', '16 bits', '8 bits'], correctAnswer: 1, explanation: 'A double in Java is 64 bits, providing double-precision floating-point numbers.' },
            { question: 'Which type casting is automatic?', options: ['Narrowing', 'Widening', 'Both', 'Neither'], correctAnswer: 1, explanation: 'Widening type casting (smaller to larger type) is automatic in Java.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'Control Flow',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l9', title: 'If-Else Statements', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 20, videoId: 'GoXwIVyNvX0' },
          { id: 'l10', title: 'Switch Statements', duration: 12, type: 'video', completed: false, difficulty: 'beginner', xp: 20, videoId: 'GoXwIVyNvX0' },
          { id: 'l11', title: 'For Loops', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoId: 'GoXwIVyNvX0', notes: '## For Loops in Java\n\n### Basic For Loop Syntax\nfor (initialization; condition; increment/decrement) {\n    // code to be executed\n}\n\n### Example: Print numbers 1 to 10\nfor (int i = 1; i <= 10; i++) {\n    System.out.println(i);\n}\n\n### For Loop Components\n1. **Initialization**: Executed once at the beginning\n2. **Condition**: Checked before each iteration\n3. **Increment/Decrement**: Executed after each iteration\n\n### Enhanced For Loop (For-Each)\nUsed to iterate over arrays and collections.\n\nint[] numbers = {1, 2, 3, 4, 5};\nfor (int num : numbers) {\n    System.out.println(num);\n}\n\n### Common Patterns\n\n**Counting up**:\nfor (int i = 0; i < n; i++)\n\n**Counting down**:\nfor (int i = n; i >= 0; i--)\n\n**Step by 2**:\nfor (int i = 0; i < n; i += 2)\n\n### Practice Exercise\n1. Print even numbers from 2 to 20\n2. Calculate sum of numbers 1 to 100\n3. Print array elements using for-each loop\n4. Find factorial of a number using for loop' },
          { id: 'l12', title: 'While & Do-While Loops', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoId: 'GoXwIVyNvX0', notes: '## While & Do-While Loops\n\n### While Loop\nExecutes as long as condition is true. Condition checked before execution.\n\nwhile (condition) {\n    // code to be executed\n}\n\n**Example**:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}\n\n### Do-While Loop\nExecutes at least once. Condition checked after execution.\n\ndo {\n    // code to be executed\n} while (condition);\n\n**Example**:\nint i = 1;\ndo {\n    System.out.println(i);\n    i++;\n} while (i <= 5);\n\n### Key Differences\n- **While**: Condition checked first, may not execute\n- **Do-While**: Executes at least once, condition checked after\n\n### When to Use Each\n- **While**: When you are unsure if loop should run\n- **Do-While**: When loop must run at least once\n- **For**: When you know the number of iterations\n\n### Practice Exercise\n1. Use while loop to find factorial\n2. Use do-while for menu-driven program\n3. Convert for loop to while loop\n4. Create a number guessing game' },
          { id: 'l13', title: 'Break & Continue', duration: 10, type: 'video', completed: false, difficulty: 'beginner', xp: 15, videoId: 'GoXwIVyNvX0' },
          { id: 'l13-quiz', title: 'Control Flow Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'beginner', xp: 25, quiz: [
            { question: 'What does the break statement do in a loop?', options: ['Skips current iteration', 'Exits the loop completely', 'Restarts the loop', 'Pauses the loop'], correctAnswer: 1, explanation: 'break immediately exits the loop, transferring control to the statement after the loop.' },
            { question: 'What is the difference between while and do-while?', options: ['No difference', 'do-while executes at least once', 'while executes at least once', 'do-while checks condition first'], correctAnswer: 1, explanation: 'do-while guarantees at least one execution as condition is checked after the loop body.' },
            { question: 'Which loop is best when you know the number of iterations?', options: ['while loop', 'do-while loop', 'for loop', 'All are equally good'], correctAnswer: 2, explanation: 'for loop is ideal when the number of iterations is known in advance.' },
            { question: 'What does continue do in a loop?', options: ['Exits the loop', 'Skips the current iteration', 'Restarts from beginning', 'Pauses execution'], correctAnswer: 1, explanation: 'continue skips the remaining statements in the current iteration and moves to the next iteration.' },
            { question: 'What is the output of: for(int i=0;i<3;i++) { if(i==1) continue; System.out.print(i); }', options: ['012', '02', '013', '01'], correctAnswer: 1, explanation: 'When i=1, continue skips the print, so only 0 and 2 are printed.' }
          ] },
        ]
      },
      {
        id: 'm4',
        title: 'Arrays & Collections',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l14', title: 'Arrays Fundamentals', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoId: 'GoXwIVyNvX0' },
          { id: 'l15', title: 'Multidimensional Arrays', duration: 18, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'GoXwIVyNvX0', notes: '## Multidimensional Arrays in Java\n\n### 2D Arrays\nArrays of arrays. Think of them as a grid or table.\n\n// Declaration and initialization\nint[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9}\n};\n\n### Accessing Elements\nint value = matrix[1][2]; // Row 1, Column 2 = 6\n\n### Iterating Through 2D Array\nfor (int i = 0; i < matrix.length; i++) {\n    for (int j = 0; j < matrix[i].length; j++) {\n        System.out.print(matrix[i][j] + " ");\n    }\n    System.out.println();\n}\n\n### Common Operations\n\n**Sum of all elements**:\nint sum = 0;\nfor (int[] row : matrix) {\n    for (int val : row) {\n        sum += val;\n    }\n}\n\n**Find maximum**:\nint max = matrix[0][0];\nfor (int[] row : matrix) {\n    for (int val : row) {\n        if (val > max) max = val;\n    }\n}\n\n### Practice Exercise\n1. Create a 3x3 matrix and fill with random numbers\n2. Calculate sum of each row\n3. Find the diagonal elements\n4. Transpose the matrix' },
          { id: 'l16', title: 'ArrayList & LinkedList', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'GoXwIVyNvX0' },
          { id: 'l17', title: 'Collections Practice', duration: 30, type: 'video', completed: false, difficulty: 'intermediate', xp: 50, videoId: 'GoXwIVyNvX0', notes: '## Collections Practice\n\n### ArrayList vs LinkedList\n- **ArrayList**: Fast random access, slow insert/delete\n- **LinkedList**: Fast insert/delete, slow random access\n\n### Common ArrayList Operations\n\nArrayList<String> list = new ArrayList<>();\n\n// Add elements\nlist.add("Apple");\nlist.add("Banana");\n\n// Access element\nString fruit = list.get(0);\n\n// Update element\nlist.set(0, "Apricot");\n\n// Remove element\nlist.remove("Banana");\n\n// Check if contains\nboolean hasApple = list.contains("Apple");\n\n// Get size\nint size = list.size();\n\n### Practice Problems\n\n**Problem 1**: Remove duplicates from ArrayList\nSet<String> set = new HashSet<>(list);\nlist = new ArrayList<>(set);\n\n**Problem 2**: Sort ArrayList\nCollections.sort(list);\n\n**Problem 3**: Find second largest\nCollections.sort(list);\nint secondLargest = list.get(list.size() - 2);\n\n### Practice Exercise\n1. Create ArrayList of student names\n2. Add, remove, and update elements\n3. Sort the list alphabetically\n4. Find and remove duplicates\n5. Convert to array and back' },
          { id: 'l17-quiz', title: 'Arrays Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is the index of the first element in an array?', options: ['1', '0', '-1', 'Depends on array size'], correctAnswer: 1, explanation: 'Arrays in Java are zero-indexed, so the first element is at index 0.' },
            { question: 'How do you get the length of an array?', options: ['array.length()', 'array.size', 'array.length', 'array.getLength()'], correctAnswer: 2, explanation: 'length is a property of arrays, not a method, so no parentheses are needed.' },
            { question: 'What happens when you access an invalid array index?', options: ['Returns null', 'Returns 0', 'Throws ArrayIndexOutOfBoundsException', 'Does nothing'], correctAnswer: 2, explanation: 'Accessing an invalid index throws ArrayIndexOutOfBoundsException at runtime.' },
            { question: 'Which collection allows duplicate elements?', options: ['Set', 'List', 'Map', 'Both Set and Map'], correctAnswer: 1, explanation: 'List allows duplicate elements, while Set and Map do not.' },
            { question: 'What is the time complexity of ArrayList get()?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(nÂ²)'], correctAnswer: 0, explanation: 'ArrayList get() is O(1) because it uses random access via index.' }
          ] },
        ]
      },
      {
        id: 'm5',
        title: 'Object-Oriented Programming',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l18', title: 'Classes & Objects', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'GoXwIVyNvX0' },
          { id: 'l19', title: 'Inheritance', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'GoXwIVyNvX0' },
          { id: 'l20', title: 'Polymorphism', duration: 18, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'GoXwIVyNvX0' },
          { id: 'l21', title: 'Encapsulation & Abstraction', duration: 15, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'GoXwIVyNvX0' },
          { id: 'l22', title: 'Interfaces', duration: 20, type: 'video', completed: false, difficulty: 'advanced', xp: 50, videoId: 'GoXwIVyNvX0', notes: '## Interfaces in Java\n\n### What is an Interface?\nAn interface is a contract that defines what a class can do, not how it does it.\n\n// Interface declaration\ninterface Animal {\n    void makeSound();\n    void eat();\n}\n\n// Implementing interface\nclass Dog implements Animal {\n    public void makeSound() {\n        System.out.println("Woof!");\n    }\n    \n    public void eat() {\n        System.out.println("Dog is eating");\n    }\n}\n\n### Key Points\n- All methods in an interface are abstract by default\n- A class can implement multiple interfaces\n- Interface variables are public, static, and final by default\n- Cannot instantiate an interface\n\n### Multiple Interfaces\nclass Cat implements Animal, Pet {\n    // Must implement all methods from both interfaces\n}\n\n### Default Methods (Java 8+)\ninterface Vehicle {\n    default void start() {\n        System.out.println("Vehicle starting");\n    }\n}\n\n### Practice Exercise\n1. Create an interface for Shape with area() method\n2. Implement it for Circle and Rectangle\n3. Create multiple interfaces and implement them\n4. Use default methods in interfaces' },
          { id: 'l23', title: 'OOP Final Project', duration: 45, type: 'video', completed: false, difficulty: 'advanced', xp: 100, videoId: 'GoXwIVyNvX0', notes: '## OOP Final Project: Library Management System\n\n### Project Overview\nBuild a complete library management system using OOP concepts.\n\n### Classes to Create\n\n**1. Book Class**\n- Properties: title, author, ISBN, isAvailable\n- Methods: borrow(), return(), getDetails()\n\n**2. Member Class**\n- Properties: memberId, name, borrowedBooks\n- Methods: borrowBook(), returnBook()\n\n**3. Library Class**\n- Properties: books, members\n- Methods: addBook(), addMember(), findBook()\n\n### Implementation Steps\n\nStep 1: Create Book class with encapsulation\nStep 2: Create Member class with validation\nStep 3: Create Library class with collection management\nStep 4: Implement borrowing logic\nStep 5: Add search functionality\nStep 6: Create main menu interface\n\n### Requirements\n- Use proper encapsulation (private fields, getters/setters)\n- Implement inheritance if needed\n- Use interfaces for extensibility\n- Handle edge cases (book not available, member limit)\n- Add input validation\n\n### Bonus Features\n- Add due date tracking\n- Implement fine calculation\n- Add book categories\n- Create reports\n\n### Submission\nSubmit your complete project with all classes and a demo main class.' },
          { id: 'l23-quiz', title: 'OOP Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is the main principle of encapsulation?', options: ['Hiding implementation details', 'Inheriting from multiple classes', 'Creating multiple objects', 'Using abstract methods'], correctAnswer: 0, explanation: 'Encapsulation is about hiding internal implementation details and exposing only necessary functionality.' },
            { question: 'Which keyword is used to inherit from a class?', options: ['implements', 'extends', 'inherits', 'super'], correctAnswer: 1, explanation: 'extends is used to inherit from a class in Java.' },
            { question: 'Can a class implement multiple interfaces?', options: ['No, only one', 'Yes, multiple interfaces', 'Only if they are abstract', 'Only if they have no methods'], correctAnswer: 1, explanation: 'A class can implement multiple interfaces in Java.' },
            { question: 'What is polymorphism?', options: ['Creating multiple objects', 'Same method different behaviors', 'Multiple inheritance', 'Data hiding'], correctAnswer: 1, explanation: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass.' },
            { question: 'What is an abstract class?', options: ['A class with no methods', 'A class that cannot be instantiated', 'A class with only static methods', 'A final class'], correctAnswer: 1, explanation: 'An abstract class cannot be instantiated and may contain abstract methods.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master DSA with Java. Learn arrays, linked lists, trees, graphs, sorting algorithms, and crack coding interviews.',
    instructor: 'Prof. Alex Kumar',
    instructorAvatar: 'ðŸ‘¨â€ðŸ«',
    category: 'Computer Science',
    tags: ['DSA', 'Algorithms', 'Java', 'Interview Prep'],
    level: 'intermediate',
    duration: 40,
    rating: 4.9,
    totalRatings: 18200,
    totalStudents: 124500,
    thumbnail: '',
    color: 'from-blue-500 to-indigo-600',
    icon: 'ðŸŒ³',
    xpReward: 800,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['java-basics'],
    relatedCourses: ['java-basics', 'spring-boot', 'python'],
    learningPath: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    quiz: quizzes['dsa'],
    modules: [
      {
        id: 'm1',
        title: 'Arrays & Strings',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Array Operations & Complexity', duration: 20, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoId: 'GoXwIVyNvX0', notes: '## Array Operations & Complexity\n\n### What is an Array?\nAn array is a collection of elements stored at contiguous memory locations.\n\n### Time Complexity Analysis\n\n**Access**: O(1)\n- Direct access by index\n- arr[5] takes constant time\n\n**Search**: O(n)\n- Linear search through elements\n- Binary search: O(log n) for sorted arrays\n\n**Insert**: O(n)\n- Shifting elements required\n- Inserting at end: O(1) amortized\n\n**Delete**: O(n)\n- Shifting elements required\n- Deleting from end: O(1)\n\n### Space Complexity\n- O(n) where n is the number of elements\n\n### Common Operations\n```java\nint[] arr = {1, 2, 3, 4, 5};\n\n// Access\nint element = arr[2]; // O(1)\n\n// Search\nfor (int i = 0; i < arr.length; i++) {\n    if (arr[i] == target) return i; // O(n)\n}\n\n// Insert (requires new array)\nint[] newArr = new int[arr.length + 1];\n// Copy elements and insert\n```\n\n### Practice Exercise\n1. Implement linear search\n2. Implement binary search\n3. Calculate time complexity for various operations' },
          { id: 'l2', title: 'Two Pointer Technique', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'GoXwIVyNvX0', notes: '## Two Pointer Technique\n\n### What is Two Pointer?\nA technique where two pointers move through the array to solve problems efficiently.\n\n### Common Use Cases\n- Finding pairs with given sum\n- Removing duplicates from sorted array\n- Checking for palindromes\n- Merging sorted arrays\n\n### Example: Two Sum (Sorted Array)\n```java\nint[] twoSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int sum = nums[left] + nums[right];\n        if (sum == target) {\n            return new int[]{left, right};\n        } else if (sum < target) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    return new int[]{-1, -1};\n}\n```\n\n### Time Complexity\n- O(n) - single pass through array\n- Space: O(1) - only using pointers\n\n### Practice Exercise\n1. Find if array contains a pair with given sum\n2. Remove duplicates from sorted array\n3. Check if string is palindrome using two pointers' },
          { id: 'l3', title: 'Sliding Window', duration: 28, type: 'video', completed: false, difficulty: 'intermediate', xp: 50, videoId: 'GoXwIVyNvX0', notes: '## Sliding Window Technique\n\n### What is Sliding Window?\nA technique for maintaining a window of elements that slides through the array.\n\n### Types\n1. **Fixed Size Window**: Window size is constant\n2. **Variable Size Window**: Window size changes based on conditions\n\n### Example: Maximum Sum Subarray (Size K)\n```java\nint maxSumSubarray(int[] arr, int k) {\n    int maxSum = 0, windowSum = 0;\n    \n    // Calculate first window\n    for (int i = 0; i < k; i++) {\n        windowSum += arr[i];\n    }\n    maxSum = windowSum;\n    \n    // Slide the window\n    for (int i = k; i < arr.length; i++) {\n        windowSum += arr[i] - arr[i - k];\n        maxSum = Math.max(maxSum, windowSum);\n    }\n    return maxSum;\n}\n```\n\n### Time Complexity\n- O(n) - each element visited at most twice\n- Space: O(1) - only storing sum variables\n\n### Practice Exercise\n1. Find maximum sum subarray of size k\n2. Find smallest subarray with sum >= target\n3. Longest substring with unique characters' },
          { id: 'l4', title: 'String Problems', duration: 30, type: 'video', completed: false, difficulty: 'intermediate', xp: 55, videoId: 'GoXwIVyNvX0', notes: '## String Problems\n\n### Common String Operations\n\n**Length**: O(1)\nString s = "Hello";\nint len = s.length();\n\n**Concatenation**: O(n)\nString result = s1 + s2;\n\n**Substring**: O(n)\nString sub = s.substring(0, 3);\n\n**Character Access**: O(1)\nchar c = s.charAt(0);\n\n### Common Patterns\n\n**Pattern 1: Two Pointers**\n- Palindrome check\n- Reverse string\n\n**Pattern 2: Sliding Window**\n- Longest substring without repeating characters\n- Minimum window substring\n\n**Pattern 3: Hash Map**\n- Character frequency\n- Anagram detection\n\n### Example: Valid Anagram\n```java\nboolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    \n    int[] count = new int[26];\n    for (char c : s.toCharArray()) {\n        count[c - \'a\']++;\n    }\n    for (char c : t.toCharArray()) {\n        count[c - \'a\']--;\n        if (count[c - \'a\'] < 0) return false;\n    }\n    return true;\n}\n```\n\n### Practice Exercise\n1. Check if two strings are anagrams\n2. Find longest palindromic substring\n3. Count character frequency in string' },
          { id: 'l4-quiz', title: 'Arrays & Strings Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is the time complexity of accessing an element by index in an array?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(nÂ²)'], correctAnswer: 0, explanation: 'Array access by index is O(1) because elements are stored at contiguous memory locations.' },
            { question: 'What is the space complexity of the two pointer technique?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(nÂ²)'], correctAnswer: 0, explanation: 'Two pointer uses only two pointers, so space complexity is O(1).' },
            { question: 'What is the time complexity of sliding window technique?', options: ['O(n)', 'O(nÂ²)', 'O(log n)', 'O(1)'], correctAnswer: 0, explanation: 'Sliding window visits each element at most twice, resulting in O(n) time complexity.' },
            { question: 'Which technique is best for finding pairs with a given sum in a sorted array?', options: ['Two pointer', 'Sliding window', 'Binary search', 'Brute force'], correctAnswer: 0, explanation: 'Two pointer technique efficiently finds pairs with given sum in O(n) time for sorted arrays.' },
            { question: 'What is the time complexity of string concatenation in Java?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(nÂ²)'], correctAnswer: 1, explanation: 'String concatenation in Java creates a new string, taking O(n) time where n is the total length.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Linked Lists',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'Singly Linked List', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'GoXwIVyNvX0', notes: '## Singly Linked List\n\n### What is a Linked List?\nA linear data structure where elements are stored in nodes, each containing data and a reference to the next node.\n\n### Node Structure\n```java\nclass Node {\n    int data;\n    Node next;\n    \n    Node(int data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n```\n\n### Basic Operations\n\n**Insertion**: O(1) at head, O(n) at tail\n```java\nvoid insertAtHead(int data) {\n    Node newNode = new Node(data);\n    newNode.next = head;\n    head = newNode;\n}\n```\n\n**Deletion**: O(n)\n```java\nvoid delete(int key) {\n    if (head == null) return;\n    if (head.data == key) {\n        head = head.next;\n        return;\n    }\n    Node current = head;\n    while (current.next != null) {\n        if (current.next.data == key) {\n            current.next = current.next.next;\n            return;\n        }\n        current = current.next;\n    }\n}\n```\n\n**Traversal**: O(n)\n```java\nvoid printList() {\n    Node current = head;\n    while (current != null) {\n        System.out.print(current.data + " ");\n        current = current.next;\n    }\n}\n```\n\n### Advantages vs Arrays\n- Dynamic size\n- Efficient insertion/deletion\n- No wasted memory\n\n### Disadvantages\n- No random access\n- Extra memory for pointers\n- Not cache-friendly\n\n### Practice Exercise\n1. Implement a linked list with insert, delete, and search\n2. Find the middle of a linked list\n3. Reverse a linked list' },
          { id: 'l6', title: 'Doubly Linked List', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'GoXwIVyNvX0', notes: '## Doubly Linked List\n\n### What is Doubly Linked List?\nEach node has pointers to both the next and previous nodes, allowing bidirectional traversal.\n\n### Node Structure\n```java\nclass DoublyNode {\n    int data;\n    DoublyNode next;\n    DoublyNode prev;\n    \n    DoublyNode(int data) {\n        this.data = data;\n        this.next = null;\n        this.prev = null;\n    }\n}\n```\n\n### Advantages over Singly Linked List\n- Can traverse in both directions\n- Easier deletion of a node (given reference)\n- Can implement more complex data structures\n\n### Common Operations\n\n**Insert at Head**: O(1)\n```java\nvoid insertAtHead(int data) {\n    DoublyNode newNode = new DoublyNode(data);\n    newNode.next = head;\n    if (head != null) {\n        head.prev = newNode;\n    }\n    head = newNode;\n}\n```\n\n**Delete a Node**: O(1) given node reference\n```java\nvoid deleteNode(DoublyNode node) {\n    if (node.prev != null) {\n        node.prev.next = node.next;\n    }\n    if (node.next != null) {\n        node.next.prev = node.prev;\n    }\n}\n```\n\n### Use Cases\n- Implementing LRU Cache\n- Browser history (back/forward)\n- Undo/Redo functionality\n- Music playlist navigation\n\n### Practice Exercise\n1. Implement doubly linked list\n2. Add delete at head and tail operations\n3. Implement reverse traversal' },
          { id: 'l7', title: 'Cycle Detection (Floyd\'s)', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60, videoId: 'GoXwIVyNvX0' },
          { id: 'l8', title: 'Reverse a Linked List', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'GoXwIVyNvX0' },
          { id: 'l8-quiz', title: 'Linked Lists Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is the time complexity of inserting at the head of a linked list?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(nÂ²)'], correctAnswer: 0, explanation: 'Inserting at the head of a linked list is O(1) as it only requires updating the head pointer.' },
            { question: 'What is the main advantage of a doubly linked list over a singly linked list?', options: ['Less memory', 'Bidirectional traversal', 'Faster insertion', 'Smaller node size'], correctAnswer: 1, explanation: 'Doubly linked lists allow traversal in both directions due to previous and next pointers.' },
            { question: 'Which algorithm is used to detect cycles in a linked list?', options: ['Binary search', 'Floyd\'s Cycle Detection', 'Linear search', 'Depth-first search'], correctAnswer: 1, explanation: 'Floyd\'s Cycle Detection (tortoise and hare) algorithm efficiently detects cycles in linked lists.' },
            { question: 'What is the space complexity of reversing a linked list?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(nÂ²)'], correctAnswer: 0, explanation: 'Reversing a linked list in place uses O(1) extra space by only changing pointer references.' },
            { question: 'How do you find the middle element of a linked list in one pass?', options: ['Two pointers (slow and fast)', 'Binary search', 'Hash map', 'Recursion'], correctAnswer: 0, explanation: 'Two pointer technique with slow (1 step) and fast (2 steps) pointers finds the middle in one pass.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'Stacks & Queues',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l9', title: 'Stack Implementation', duration: 18, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoId: 'GoXwIVyNvX0', notes: '## Stack Implementation\n\n### What is a Stack?\nA LIFO (Last In, First Out) data structure. Think of it like a stack of plates.\n\n### Core Operations\n- **push**: Add element to top - O(1)\n- **pop**: Remove element from top - O(1)\n- **peek**: View top element - O(1)\n- **isEmpty**: Check if stack is empty - O(1)\n\n### Array Implementation\n```java\nclass Stack {\n    private int[] arr;\n    private int top;\n    private int capacity;\n    \n    Stack(int size) {\n        arr = new int[size];\n        capacity = size;\n        top = -1;\n    }\n    \n    void push(int x) {\n        if (isFull()) return;\n        arr[++top] = x;\n    }\n    \n    int pop() {\n        if (isEmpty()) return -1;\n        return arr[top--];\n    }\n    \n    int peek() {\n        if (isEmpty()) return -1;\n        return arr[top];\n    }\n    \n    boolean isEmpty() {\n        return top == -1;\n    }\n    \n    boolean isFull() {\n        return top == capacity - 1;\n    }\n}\n```\n\n### Common Applications\n- Function call stack\n- Undo/Redo operations\n- Expression evaluation\n- Backtracking algorithms\n- Browser history\n\n### Practice Exercise\n1. Implement stack using array\n2. Implement stack using linked list\n3. Check for balanced parentheses using stack' },
          { id: 'l10', title: 'Queue & Deque', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoId: 'GoXwIVyNvX0', notes: '## Queue & Deque\n\n### What is a Queue?\nA FIFO (First In, First Out) data structure. Think of it like a line at a store.\n\n### Core Operations\n- **enqueue**: Add element to rear - O(1)\n- **dequeue**: Remove element from front - O(1)\n- **front**: View front element - O(1)\n- **isEmpty**: Check if queue is empty - O(1)\n\n### Array Implementation\n```java\nclass Queue {\n    private int[] arr;\n    private int front, rear, size, capacity;\n    \n    Queue(int cap) {\n        arr = new int[cap];\n        capacity = cap;\n        front = size = 0;\n        rear = cap - 1;\n    }\n    \n    void enqueue(int x) {\n        if (isFull()) return;\n        rear = (rear + 1) % capacity;\n        arr[rear] = x;\n        size++;\n    }\n    \n    int dequeue() {\n        if (isEmpty()) return -1;\n        int item = arr[front];\n        front = (front + 1) % capacity;\n        size--;\n        return item;\n    }\n}\n```\n\n### Deque (Double-Ended Queue)\nCan add/remove from both ends.\n- addFront, addRear\n- removeFront, removeRear\n\n### Common Applications\n- Task scheduling\n- Print job spooling\n- BFS in graphs\n- Buffer management\n\n### Practice Exercise\n1. Implement queue using array\n2. Implement queue using linked list\n3. Implement deque with all operations' },
          { id: 'l11', title: 'Monotonic Stack Problems', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70, videoId: 'GoXwIVyNvX0' },
          { id: 'l11-quiz', title: 'Stacks & Queues Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is the principle of a Stack?', options: ['FIFO', 'LIFO', 'LILO', 'Random access'], correctAnswer: 1, explanation: 'Stack follows LIFO (Last In, First Out) principle - the last element added is the first to be removed.' },
            { question: 'What is the principle of a Queue?', options: ['FIFO', 'LIFO', 'LILO', 'Random access'], correctAnswer: 0, explanation: 'Queue follows FIFO (First In, First Out) principle - the first element added is the first to be removed.' },
            { question: 'What is the time complexity of push and pop operations in a stack?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(nÂ²)'], correctAnswer: 1, explanation: 'Push and pop operations in a stack are O(1) as they only affect the top element.' },
            { question: 'What is a Deque?', options: ['Double-ended queue', 'Dynamic queue', 'Data queue', 'Delayed queue'], correctAnswer: 0, explanation: 'Deque (Double-ended queue) allows insertion and deletion from both ends.' },
            { question: 'Which data structure is used for function call management?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correctAnswer: 1, explanation: 'Stack is used for function call management due to its LIFO nature, handling nested calls properly.' }
          ] },
        ]
      },
      {
        id: 'm4',
        title: 'Trees & Graphs',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l12', title: 'Binary Trees & BST', duration: 30, type: 'video', completed: false, difficulty: 'intermediate', xp: 50, videoId: 'GoXwIVyNvX0', notes: '## Binary Trees & BST\n\n### What is a Binary Tree?\nA tree data structure where each node has at most two children (left and right).\n\n### Tree Node Structure\n```java\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    \n    TreeNode(int val) {\n        this.val = val;\n        this.left = null;\n        this.right = null;\n    }\n}\n```\n\n### Binary Search Tree (BST)\nA binary tree with the property:\n- Left subtree contains only nodes with keys less than the node\'s key\n- Right subtree contains only nodes with keys greater than the node\'s key\n- Both left and right subtrees are also BSTs\n\n### BST Operations\n\n**Search**: O(h) where h is height\n```java\nTreeNode search(TreeNode root, int key) {\n    if (root == null || root.val == key) return root;\n    if (key < root.val) return search(root.left, key);\n    return search(root.right, key);\n}\n```\n\n**Insert**: O(h)\n```java\nTreeNode insert(TreeNode root, int key) {\n    if (root == null) return new TreeNode(key);\n    if (key < root.val) root.left = insert(root.left, key);\n    else if (key > root.val) root.right = insert(root.right, key);\n    return root;\n}\n```\n\n### Time Complexity\n- Average case: O(log n)\n- Worst case (skewed tree): O(n)\n\n### Practice Exercise\n1. Implement BST search and insert\n2. Find minimum and maximum in BST\n3. Check if a tree is a valid BST' },
          { id: 'l13', title: 'Tree Traversals', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50, videoId: 'GoXwIVyNvX0', notes: '## Tree Traversals\n\n### Types of Traversals\n\n**Inorder (Left, Root, Right)**\n- For BST: Gives sorted order\n```java\nvoid inorder(TreeNode root) {\n    if (root == null) return;\n    inorder(root.left);\n    System.out.print(root.val + " ");\n    inorder(root.right);\n}\n```\n\n**Preorder (Root, Left, Right)**\n- Used for copying tree\n```java\nvoid preorder(TreeNode root) {\n    if (root == null) return;\n    System.out.print(root.val + " ");\n    preorder(root.left);\n    preorder(root.right);\n}\n```\n\n**Postorder (Left, Right, Root)**\n- Used for deleting tree\n```java\nvoid postorder(TreeNode root) {\n    if (root == null) return;\n    postorder(root.left);\n    postorder(root.right);\n    System.out.print(root.val + " ");\n}\n```\n\n**Level Order (BFS)**\n- Traverse level by level\n```java\nvoid levelOrder(TreeNode root) {\n    if (root == null) return;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.add(root);\n    while (!queue.isEmpty()) {\n        TreeNode node = queue.poll();\n        System.out.print(node.val + " ");\n        if (node.left != null) queue.add(node.left);\n        if (node.right != null) queue.add(node.right);\n    }\n}\n```\n\n### Practice Exercise\n1. Implement all four traversal methods\n2. Find height of binary tree\n3. Count nodes in binary tree' },
          { id: 'l14', title: 'Graph Representation', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'GoXwIVyNvX0', notes: '## Graph Representation\n\n### What is a Graph?\nA collection of vertices (nodes) connected by edges.\n\n### Types of Graphs\n- **Directed**: Edges have direction\n- **Undirected**: Edges have no direction\n- **Weighted**: Edges have weights\n- **Unweighted**: All edges have same weight\n\n### Adjacency Matrix\n```java\nint[][] adjMatrix = new int[V][V];\n\n// Add edge\nadjMatrix[u][v] = 1;\nadjMatrix[v][u] = 1; // for undirected\n\n// Check edge\nif (adjMatrix[u][v] == 1) // edge exists\n```\n\n**Space**: O(VÂ²)\n**Edge check**: O(1)\n\n### Adjacency List\n```java\nList<List<Integer>> adjList = new ArrayList<>();\nfor (int i = 0; i < V; i++) adjList.add(new ArrayList<>());\n\n// Add edge\nadjList.get(u).add(v);\nadjList.get(v).add(u); // for undirected\n```\n\n**Space**: O(V + E)\n**Edge check**: O(degree)\n\n### When to Use Each\n- **Matrix**: Dense graphs, frequent edge checks\n- **List**: Sparse graphs, memory efficient\n\n### Practice Exercise\n1. Implement graph using adjacency list\n2. Implement graph using adjacency matrix\n3. Convert between representations' },
          { id: 'l15', title: 'BFS & DFS', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70, videoId: 'GoXwIVyNvX0', notes: '## BFS & DFS\n\n### Breadth-First Search (BFS)\nExplores neighbors first, then neighbors of neighbors. Uses queue.\n\n```java\nvoid bfs(int start, List<List<Integer>> adj) {\n    boolean[] visited = new boolean[adj.size()];\n    Queue<Integer> queue = new LinkedList<>();\n    \n    visited[start] = true;\n    queue.add(start);\n    \n    while (!queue.isEmpty()) {\n        int node = queue.poll();\n        System.out.print(node + " ");\n        \n        for (int neighbor : adj.get(node)) {\n            if (!visited[neighbor]) {\n                visited[neighbor] = true;\n                queue.add(neighbor);\n            }\n        }\n    }\n}\n```\n\n### Depth-First Search (DFS)\nExplores as deep as possible before backtracking. Uses stack/recursion.\n\n```java\nvoid dfs(int node, List<List<Integer>> adj, boolean[] visited) {\n    visited[node] = true;\n    System.out.print(node + " ");\n    \n    for (int neighbor : adj.get(node)) {\n        if (!visited[neighbor]) {\n            dfs(neighbor, adj, visited);\n        }\n    }\n}\n```\n\n### Time Complexity\n- Both: O(V + E)\n- Space: O(V) for visited array\n\n### Use Cases\n- **BFS**: Shortest path (unweighted), level-order traversal\n- **DFS**: Path finding, topological sort, cycle detection\n\n### Practice Exercise\n1. Implement BFS for shortest path\n2. Implement DFS for cycle detection\n3. Find connected components using BFS' },
          { id: 'l16', title: 'Dijkstra\'s Algorithm', duration: 40, type: 'exercise', completed: false, difficulty: 'advanced', xp: 80, videoId: 'GoXwIVyNvX0', notes: '## Dijkstra\'s Algorithm\n\n### What is Dijkstra\'s?\nAn algorithm for finding the shortest paths between nodes in a weighted graph.\n\n### Key Concepts\n- Greedy algorithm\n- Uses priority queue\n- Works only with non-negative weights\n\n### Algorithm Steps\n1. Set distance to source = 0, all others = infinity\n2. Mark all nodes as unvisited\n3. While unvisited nodes exist:\n   - Pick unvisited node with smallest distance\n   - Mark as visited\n   - Update distances to neighbors\n\n### Implementation\n```java\nint[] dijkstra(int[][] graph, int src) {\n    int V = graph.length;\n    int[] dist = new int[V];\n    boolean[] visited = new boolean[V];\n    \n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[src] = 0;\n    \n    for (int count = 0; count < V - 1; count++) {\n        int u = minDistance(dist, visited);\n        visited[u] = true;\n        \n        for (int v = 0; v < V; v++) {\n            if (!visited[v] && graph[u][v] != 0 && \n                dist[u] != Integer.MAX_VALUE && \n                dist[u] + graph[u][v] < dist[v]) {\n                dist[v] = dist[u] + graph[u][v];\n            }\n        }\n    }\n    return dist;\n}\n```\n\n### Time Complexity\n- With priority queue: O((V + E) log V)\n- Without priority queue: O(VÂ²)\n\n### Practice Exercise\n1. Implement Dijkstra\'s with priority queue\n2. Find shortest path from source to all nodes\n3. Reconstruct the actual path' },
          { id: 'l16-quiz', title: 'Trees & Graphs Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is the time complexity of searching in a balanced BST?', options: ['O(n)', 'O(log n)', 'O(nÂ²)', 'O(1)'], correctAnswer: 1, explanation: 'Searching in a balanced BST is O(log n) because the height is log n.' },
            { question: 'Which traversal gives sorted order for a BST?', options: ['Preorder', 'Inorder', 'Postorder', 'Level order'], correctAnswer: 1, explanation: 'Inorder traversal (Left, Root, Right) gives sorted order for a BST.' },
            { question: 'What is the difference between BFS and DFS?', options: ['BFS uses stack, DFS uses queue', 'BFS uses queue, DFS uses stack', 'Both use queue', 'Both use stack'], correctAnswer: 1, explanation: 'BFS uses a queue (level-by-level), DFS uses a stack (depth-first).' },
            { question: 'What is the time complexity of BFS on a graph?', options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'], correctAnswer: 2, explanation: 'BFS visits each vertex and edge once, so time complexity is O(V + E).' },
            { question: 'What data structure is best for implementing a graph?', options: ['Array', 'Linked List', 'Adjacency List or Matrix', 'Stack'], correctAnswer: 2, explanation: 'Graphs are commonly implemented using adjacency lists (for sparse graphs) or adjacency matrices (for dense graphs).' }
          ] },
        ]
      },
      {
        id: 'm5',
        title: 'Sorting & Searching',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l17', title: 'Bubble, Selection, Insertion Sort', duration: 25, type: 'video', completed: false, difficulty: 'beginner', xp: 40, videoId: 'GoXwIVyNvX0', notes: '## Bubble, Selection, Insertion Sort\n\n### Bubble Sort\nRepeatedly swaps adjacent elements if they are in wrong order.\n\n```java\nvoid bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                // swap\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}\n```\n\n**Time**: O(nÂ²)\n**Space**: O(1)\n\n### Selection Sort\nFinds minimum element and places it at beginning.\n\n```java\nvoid selectionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        int temp = arr[minIdx];\n        arr[minIdx] = arr[i];\n        arr[i] = temp;\n    }\n}\n```\n\n**Time**: O(nÂ²)\n**Space**: O(1)\n\n### Insertion Sort\nBuilds sorted array one element at a time.\n\n```java\nvoid insertionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}\n```\n\n**Time**: O(nÂ²)\n**Space**: O(1)\n**Best case**: O(n) for nearly sorted\n\n### Practice Exercise\n1. Implement all three sorting algorithms\n2. Compare their performance on different inputs\n3. Count number of swaps/comparisons' },
          { id: 'l18', title: 'Merge Sort & Quick Sort', duration: 35, type: 'video', completed: false, difficulty: 'intermediate', xp: 60, videoId: 'GoXwIVyNvX0', notes: '## Merge Sort & Quick Sort\n\n### Merge Sort\nDivide and conquer algorithm. Divides array, sorts halves, merges them.\n\n```java\nvoid mergeSort(int[] arr, int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}\n\nvoid merge(int[] arr, int l, int m, int r) {\n    // Merge two sorted subarrays\n}\n```\n\n**Time**: O(n log n)\n**Space**: O(n)\n**Stable**: Yes\n\n### Quick Sort\nDivide and conquer using pivot element.\n\n```java\nvoid quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\nint partition(int[] arr, int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(arr, i, j);\n        }\n    }\n    swap(arr, i + 1, high);\n    return i + 1;\n}\n```\n\n**Time**: O(n log n) average, O(nÂ²) worst\n**Space**: O(log n)\n**Stable**: No\n\n### Practice Exercise\n1. Implement merge sort with merge function\n2. Implement quick sort with different pivot strategies\n3. Compare performance on various inputs' },
          { id: 'l19', title: 'Binary Search & Variants', duration: 30, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 55, videoId: 'GoXwIVyNvX0', notes: '## Binary Search & Variants\n\n### Binary Search\nEfficient search algorithm for sorted arrays.\n\n```java\nint binarySearch(int[] arr, int target) {\n    int left = 0, right = arr.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n```\n\n**Time**: O(log n)\n**Space**: O(1)\n\n### Variants\n\n**Lower Bound**: First element >= target\n```java\nint lowerBound(int[] arr, int target) {\n    int left = 0, right = arr.length;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid;\n    }\n    return left;\n}\n```\n\n**Upper Bound**: First element > target\n```java\nint upperBound(int[] arr, int target) {\n    int left = 0, right = arr.length;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] <= target) left = mid + 1;\n        else right = mid;\n    }\n    return left;\n}\n```\n\n### Practice Exercise\n1. Implement standard binary search\n2. Implement lower and upper bound\n3. Find first and last occurrence of element' },
          { id: 'l20', title: 'Dynamic Programming Intro', duration: 45, type: 'exercise', completed: false, difficulty: 'advanced', xp: 90, videoId: 'GoXwIVyNvX0', notes: '## Dynamic Programming Intro\n\n### What is DP?\nOptimization technique that solves complex problems by breaking them into simpler subproblems.\n\n### Key Concepts\n1. **Overlapping Subproblems**: Same subproblems solved multiple times\n2. **Optimal Substructure**: Optimal solution can be constructed from optimal solutions of subproblems\n\n### Approaches\n\n**Top-Down (Memoization)**: Recursion + cache\n```java\nint[] memo = new int[n + 1];\nArrays.fill(memo, -1);\n\nint fib(int n) {\n    if (n <= 1) return n;\n    if (memo[n] != -1) return memo[n];\n    memo[n] = fib(n - 1) + fib(n - 2);\n    return memo[n];\n}\n```\n\n**Bottom-Up (Tabulation)**: Iterative, fills table\n```java\nint fib(int n) {\n    int[] dp = new int[n + 2];\n    dp[0] = 0;\n    dp[1] = 1;\n    for (int i = 2; i <= n; i++) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n    }\n    return dp[n];\n}\n```\n\n### Common DP Problems\n- Fibonacci\n- Knapsack Problem\n- Longest Common Subsequence\n- Longest Increasing Subsequence\n- Matrix Chain Multiplication\n\n### Practice Exercise\n1. Solve Fibonacci using both approaches\n2. Implement 0/1 Knapsack problem\n3. Solve Longest Common Subsequence' },
          { id: 'l20-quiz', title: 'Sorting & Searching Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is the time complexity of merge sort?', options: ['O(n)', 'O(n log n)', 'O(nÂ²)', 'O(log n)'], correctAnswer: 1, explanation: 'Merge sort has O(n log n) time complexity in all cases due to divide and conquer.' },
            { question: 'What is the worst-case time complexity of quick sort?', options: ['O(n log n)', 'O(nÂ²)', 'O(n)', 'O(log n)'], correctAnswer: 1, explanation: 'Quick sort worst case is O(nÂ²) when pivot is always smallest or largest element.' },
            { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(nÂ²)', 'O(1)'], correctAnswer: 1, explanation: 'Binary search has O(log n) time complexity as it halves the search space each iteration.' },
            { question: 'Which sorting algorithm is stable?', options: ['Quick sort', 'Heap sort', 'Merge sort', 'Selection sort'], correctAnswer: 2, explanation: 'Merge sort is stable, meaning it preserves the relative order of equal elements.' },
            { question: 'What is the best sorting algorithm for nearly sorted data?', options: ['Quick sort', 'Merge sort', 'Insertion sort', 'Bubble sort'], correctAnswer: 2, explanation: 'Insertion sort is efficient for nearly sorted data with O(n) best case.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'mongodb',
    title: 'MongoDB â€” The Complete Guide',
    description: 'Master MongoDB from basics to advanced. Learn CRUD, Aggregation Pipeline, Atlas, Compass, Mongoose, and build scalable apps.',
    instructor: 'Dr. Maria Rodriguez',
    instructorAvatar: 'ðŸ‘©â€ðŸ”¬',
    category: 'Database',
    tags: ['MongoDB', 'NoSQL', 'Database', 'Backend', 'Atlas'],
    level: 'intermediate',
    duration: 30,
    rating: 4.9,
    totalRatings: 9800,
    totalStudents: 67400,
    thumbnail: '',
    color: 'from-green-500 to-emerald-600',
    icon: 'ðŸƒ',
    xpReward: 750,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['java-basics'],
    relatedCourses: ['spring-boot', 'dsa', 'react'],
    learningPath: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    quiz: quizzes['mongodb'],
    modules: [
      {
        id: 'm1',
        title: 'MongoDB Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'What is MongoDB & NoSQL?', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoId: 'Www6cTUymCY', notes: '## What is MongoDB & NoSQL?\n\n### What is NoSQL?\nNoSQL (Not Only SQL) databases provide a mechanism for storage and retrieval of data that is modeled differently from relational databases.\n\n### Types of NoSQL Databases\n1. **Document**: MongoDB, CouchDB\n2. **Key-Value**: Redis, DynamoDB\n3. **Column-family**: Cassandra, HBase\n4. **Graph**: Neo4j, ArangoDB\n\n### What is MongoDB?\nMongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents.\n\n### Key Features\n- **Document Model**: Data stored as BSON (Binary JSON)\n- **Flexible Schema**: No predefined schema required\n- **Horizontal Scalability**: Easy to scale via sharding\n- **High Performance**: In-memory processing, indexing\n- **Rich Query Language**: Powerful aggregation framework\n\n### When to Use MongoDB\n- Unstructured or semi-structured data\n- Rapid prototyping and agile development\n- Large volumes of data with varying structures\n- Real-time applications\n- Content management systems\n\n### Document Structure\n```json\n{\n  "_id": ObjectId("..."),\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com",\n  "address": {\n    "street": "123 Main St",\n    "city": "New York"\n  },\n  "hobbies": ["reading", "coding"]\n}\n```\n\n### Practice Exercise\n1. Install MongoDB locally or create Atlas account\n2. Understand BSON vs JSON differences\n3. Compare MongoDB with relational databases' },
          { id: 'l2', title: 'Documents & Collections', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoId: 'Www6cTUymCY', notes: '## Documents & Collections\n\n### Documents\nThe basic unit of data in MongoDB. Similar to rows in relational databases.\n\n### Document Structure\n```json\n{\n  "_id": ObjectId("507f1f77bcf86cd799439011"),\n  "name": "Alice",\n  "age": 25,\n  "courses": ["Java", "Python"]\n}\n```\n\n### Collections\nA grouping of MongoDB documents. Similar to tables in relational databases.\n\n### Key Differences from SQL\n- **No Schema**: Documents in same collection can have different fields\n- **Nested Documents**: Can embed documents within documents\n- **Arrays**: Can store arrays of values\n- **_id Field**: Unique identifier (ObjectId by default)\n\n### BSON Data Types\n- String, Number (int, long, double), Boolean, Date, Null\n- Array, Object (document), ObjectId, Binary\n- MinKey, MaxKey, Code, Regex\n\n### Naming Rules\n- Collection names: up to 128 chars, no spaces, no $\n- Field names: cannot start with $, cannot contain .\n\n### Practice Exercise\n1. Create a database and collection\n2. Insert documents with different structures\n3. Explore different BSON data types' },
          { id: 'l3', title: 'MongoDB Atlas Setup', duration: 20, type: 'exercise', completed: false, difficulty: 'beginner', xp: 35, videoId: 'Www6cTUymCY', notes: '## MongoDB Atlas Setup\n\n### What is MongoDB Atlas?\nMongoDB Atlas is a fully-managed cloud database service.\n\n### Setup Steps\n\n1. **Create Account**\n   - Go to https://www.mongodb.com/cloud/atlas\n   - Sign up for free account\n\n2. **Create Cluster**\n   - Click "Build a Database"\n   - Choose "M0" (free tier)\n   - Select region closest to you\n   - Name your cluster\n\n3. **Configure Security**\n   - Create username and password\n   - Whitelist IP addresses (0.0.0.0/0 for development)\n\n4. **Connect**\n   - Choose connection method\n   - Get connection string\n   - Use MongoDB Compass or Node.js driver\n\n### Connection String Format\n```\nmongodb+srv://<username>:<password>@cluster.mongodb.net/\n```\n\n### Using Node.js Driver\n```javascript\nconst { MongoClient } = require(\'mongodb\');\nconst uri = "mongodb+srv://...";\nconst client = new MongoClient(uri);\n\nasync function run() {\n  await client.connect();\n  const db = client.db("learnloop");\n  const collection = db.collection("users");\n  // Perform operations\n  await client.close();\n}\n```\n\n### Practice Exercise\n1. Create free Atlas account\n2. Set up M0 cluster\n3. Connect using MongoDB Compass\n4. Connect using Node.js driver' },
          { id: 'l4', title: 'MongoDB Compass', duration: 15, type: 'exercise', completed: false, difficulty: 'beginner', xp: 25, videoId: 'Www6cTUymCY', notes: '## MongoDB Compass\n\n### What is MongoDB Compass?\nGUI for MongoDB that allows you to visualize and interact with your data.\n\n### Features\n- **Visual Query Builder**: Build queries without writing code\n- **Aggregation Pipeline Builder**: Visual pipeline construction\n- **Schema Analysis**: Analyze document structure\n- **Index Management**: Create and manage indexes\n- **Performance Monitoring**: Real-time stats\n\n### Installation\n- Download from MongoDB website\n- Available for Windows, Mac, Linux\n\n### Connecting to Atlas\n1. Open Compass\n2. Paste connection string\n3. Replace <password> with actual password\n4. Click Connect\n\n### Key Operations\n\n**View Documents**: Click on collection to see documents\n**Insert Document**: Click "Add Data" button\n**Query**: Use query bar or visual builder\n**Update**: Edit documents directly\n**Delete**: Select documents and delete\n\n### Aggregation Pipeline\n- Visual stage-by-stage builder\n- Preview results at each stage\n- Export pipeline as code\n\n### Practice Exercise\n1. Install MongoDB Compass\n2. Connect to your Atlas cluster\n3. Explore existing collections\n4. Try inserting and querying documents' },
          { id: 'l4-quiz', title: 'MongoDB Fundamentals Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'beginner', xp: 25, quiz: [
            { question: 'What type of database is MongoDB?', options: ['Relational', 'Document-oriented', 'Key-value', 'Graph'], correctAnswer: 1, explanation: 'MongoDB is a document-oriented NoSQL database that stores data in flexible JSON-like documents.' },
            { question: 'What is the basic unit of data in MongoDB?', options: ['Table', 'Row', 'Document', 'Column'], correctAnswer: 2, explanation: 'Documents are the basic unit of data in MongoDB, similar to rows in relational databases.' },
            { question: 'What is a collection in MongoDB?', options: ['A group of databases', 'A grouping of documents', 'A single document', 'A field in a document'], correctAnswer: 1, explanation: 'A collection is a grouping of MongoDB documents, similar to tables in relational databases.' },
            { question: 'What data format does MongoDB use internally?', options: ['JSON', 'XML', 'BSON', 'CSV'], correctAnswer: 2, explanation: 'MongoDB uses BSON (Binary JSON) internally for efficient storage and traversal.' },
            { question: 'What is MongoDB Atlas?', options: ['A local MongoDB tool', 'A cloud database service', 'A MongoDB driver', 'A query language'], correctAnswer: 1, explanation: 'MongoDB Atlas is a fully-managed cloud database service for MongoDB.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'CRUD Operations',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'insertOne & insertMany', duration: 20, type: 'exercise', completed: false, difficulty: 'beginner', xp: 35, videoId: 'Www6cTUymCY', notes: '## insertOne & insertMany\n\n### insertOne\nInserts a single document into a collection.\n\n```javascript\nconst result = await db.collection(\'users\').insertOne({\n  name: "Alice",\n  age: 25,\n  email: "alice@example.com"\n});\n\nconsole.log(result.insertedId); // ObjectId of inserted document\n```\n\n### insertMany\nInserts multiple documents in a single operation.\n\n```javascript\nconst result = await db.collection(\'users\').insertMany([\n  { name: "Bob", age: 30, email: "bob@example.com" },\n  { name: "Charlie", age: 28, email: "charlie@example.com" }\n]);\n\nconsole.log(result.insertedCount); // Number of documents inserted\nconsole.log(result.insertedIds); // Array of ObjectIds\n```\n\n### Key Points\n- **_id Auto-generation**: If not provided, MongoDB generates ObjectId\n- **Ordered Insert**: insertMany stops at first error by default\n- **Unordered Insert**: Use { ordered: false } to continue on errors\n\n### Best Practices\n- Use insertMany for bulk operations (faster)\n- Validate data before insertion\n- Use transactions for related operations\n\n### Practice Exercise\n1. Insert single document with various data types\n2. Insert multiple documents in one operation\n3. Handle duplicate key errors' },
          { id: 'l6', title: 'find & findOne with Filters', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'Www6cTUymCY', notes: '## find & findOne with Filters\n\n### find\nReturns a cursor to all matching documents.\n\n```javascript\n// Find all documents\nconst cursor = db.collection(\'users\').find({});\nconst users = await cursor.toArray();\n\n// Find with filter\nconst adults = await db.collection(\'users\')\n  .find({ age: { $gte: 18 } })\n  .toArray();\n\n// Find with multiple conditions\nconst result = await db.collection(\'users\')\n  .find({ age: { $gte: 18 }, city: "New York" })\n  .toArray();\n```\n\n### findOne\nReturns the first matching document.\n\n```javascript\nconst user = await db.collection(\'users\').findOne({\n  email: "alice@example.com"\n});\n```\n\n### Common Query Operators\n- **$eq**: Equal to\n- **$ne**: Not equal to\n- **$gt**: Greater than\n- **$gte**: Greater than or equal\n- **$lt**: Less than\n- **$lte**: Less than or equal\n- **$in**: In array\n- **$nin**: Not in array\n\n### Projection\nSelect specific fields:\n```javascript\nconst users = await db.collection(\'users\')\n  .find({}, { name: 1, age: 1, _id: 0 })\n  .toArray();\n```\n\n### Practice Exercise\n1. Find all users above a certain age\n2. Find users in specific cities\n3. Use projection to limit returned fields' },
          { id: 'l7', title: 'updateOne, updateMany, $set', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'Www6cTUymCY', notes: '## updateOne, updateMany, $set\n\n### updateOne\nUpdates the first document that matches the filter.\n\n```javascript\nconst result = await db.collection(\'users\').updateOne(\n  { _id: userId },\n  { $set: { age: 26 } }\n);\n\nconsole.log(result.modifiedCount); // Number of documents modified\n```\n\n### updateMany\nUpdates all documents that match the filter.\n\n```javascript\nconst result = await db.collection(\'users\').updateMany(\n  { status: "active" },\n  { $set: { lastUpdated: new Date() } }\n);\n```\n\n### Update Operators\n\n**$set**: Set value of field\n```javascript\n{ $set: { name: "Alice Smith", age: 26 } }\n```\n\n**$inc**: Increment field value\n```javascript\n{ $inc: { score: 10, attempts: 1 } }\n```\n\n**$mul**: Multiply field value\n```javascript\n{ $mul: { price: 1.1 } }\n```\n\n**$rename**: Rename field\n```javascript\n{ $rename: { "oldName": "newName" } }\n```\n\n**$unset**: Remove field\n```javascript\n{ $unset: { "temporaryField": "" } }\n```\n\n**Array Operators**\n- $push: Add to array\n- $pull: Remove from array\n- $addToSet: Add if not exists\n\n### Practice Exercise\n1. Update single user document\n2. Update multiple documents with conditions\n3. Use various update operators' },
          { id: 'l8', title: 'deleteOne & deleteMany', duration: 15, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 30, videoId: 'Www6cTUymCY', notes: '## deleteOne & deleteMany\n\n### deleteOne\nDeletes the first document that matches the filter.\n\n```javascript\nconst result = await db.collection(\'users\').deleteOne({\n  _id: userId\n});\n\nconsole.log(result.deletedCount); // 1 if deleted, 0 if not found\n```\n\n### deleteMany\nDeletes all documents that match the filter.\n\n```javascript\nconst result = await db.collection(\'users\').deleteMany({\n  status: "deleted"\n});\n\nconsole.log(result.deletedCount); // Number of documents deleted\n```\n\n### Warning\n- **No Undo**: Deleted data cannot be recovered\n- **Use with Care**: Always test filters with find first\n- **Consider Soft Delete**: Use status field instead of deleting\n\n### Soft Delete Pattern\nInstead of deleting, mark as deleted:\n```javascript\nawait db.collection(\'users\').updateOne(\n  { _id: userId },\n  { $set: { deleted: true, deletedAt: new Date() } }\n);\n```\n\n### Practice Exercise\n1. Delete single document by ID\n2. Delete all documents matching criteria\n3. Implement soft delete pattern' },
          { id: 'l8-quiz', title: 'CRUD Operations Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'Which method inserts multiple documents in MongoDB?', options: ['insertOne', 'insertMany', 'bulkInsert', 'addMany'], correctAnswer: 1, explanation: 'insertMany is used to insert multiple documents in a single operation.' },
            { question: 'What does findOne return?', options: ['All matching documents', 'First matching document', 'A cursor', 'Null only'], correctAnswer: 1, explanation: 'findOne returns the first document that matches the filter criteria.' },
            { question: 'Which operator is used to update a field value?', options: ['$update', '$set', '$change', '$modify'], correctAnswer: 1, explanation: '$set is used to set the value of a field in MongoDB update operations.' },
            { question: 'What is the difference between deleteOne and deleteMany?', options: ['No difference', 'deleteOne deletes one, deleteMany deletes all matching', 'deleteMany is faster', 'deleteOne is safer'], correctAnswer: 1, explanation: 'deleteOne deletes only the first matching document, while deleteMany deletes all documents matching the filter.' },
            { question: 'What is soft delete?', options: ['Deleting from disk', 'Marking as deleted instead of removing', 'Deleting slowly', 'Deleting with confirmation'], correctAnswer: 1, explanation: 'Soft delete marks documents as deleted using a status field instead of actually removing them from the database.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'Aggregation Pipeline',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l9', title: '$match, $project, $group', duration: 35, type: 'video', completed: false, difficulty: 'intermediate', xp: 60, videoId: 'Www6cTUymCY', notes: '## $match, $project, $group\n\n### Aggregation Pipeline\nA framework for data aggregation modeled as a pipeline of stages.\n\n```javascript\nconst result = await db.collection(\'orders\').aggregate([\n  { $match: { status: "completed" } },\n  { $group: { _id: "$productId", total: { $sum: "$amount" } } },\n  { $sort: { total: -1 } }\n]).toArray();\n```\n\n### $match\nFilters documents to pass only those that match specified conditions.\n\n```javascript\n{ $match: { age: { $gte: 18 }, city: "New York" } }\n```\n\n**Best Practice**: Place $match early in pipeline to reduce documents processed.\n\n### $project\nReshapes documents in stream - can include, exclude, or add fields.\n\n```javascript\n{ $project: { name: 1, age: 1, _id: 0 } }\n```\n\n**Computed Fields**:\n```javascript\n{ $project: {\n  fullName: { $concat: ["$firstName", " ", "$lastName"] },\n  age: 1,\n  _id: 0\n}}\n```\n\n### $group\nGroups documents by specified expression and accumulates values.\n\n```javascript\n{ $group: {\n  _id: "$department",\n  totalEmployees: { $sum: 1 },\n  averageSalary: { $avg: "$salary" },\n  maxSalary: { $max: "$salary" }\n}}\n```\n\n**Group Operators**:\n- $sum: Sum of values\n- $avg: Average of values\n- $min: Minimum value\n- $max: Maximum value\n- $first: First value\n- $last: Last value\n- $push: Array of values\n\n### Practice Exercise\n1. Filter documents with $match\n2. Project specific fields with $project\n3. Group and aggregate data with $group' },
          { id: 'l10', title: '$sort, $limit, $skip', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50, videoId: 'Www6cTUymCY', notes: '## $sort, $limit, $skip\n\n### $sort\nSorts documents in the stream.\n\n```javascript\n{ $sort: { age: 1 } }  // Ascending\n{ $sort: { age: -1 } } // Descending\n{ $sort: { age: 1, name: 1 } } // Sort by multiple fields\n```\n\n**Performance Tip**: Use $sort with indexes for better performance.\n\n### $limit\nLimits the number of documents passed to the next stage.\n\n```javascript\n{ $limit: 10 } // Only pass first 10 documents\n```\n\n### $skip\nSkips specified number of documents.\n\n```javascript\n{ $skip: 5 } // Skip first 5 documents\n```\n\n### Pagination Pattern\nCombine $skip and $limit for pagination:\n\n```javascript\nconst page = 2;\nconst pageSize = 10;\n\nconst result = await db.collection(\'products\').aggregate([\n  { $match: { category: "electronics" } },\n  { $sort: { price: 1 } },\n  { $skip: (page - 1) * pageSize },\n  { $limit: pageSize }\n]).toArray();\n```\n\n### Order Matters\n- $sort before $limit: Sorts all, then limits\n- $limit before $sort: Limits first, then sorts limited set\n\n### Practice Exercise\n1. Sort documents by multiple fields\n2. Implement pagination with $skip and $limit\n3. Optimize pipeline by ordering stages correctly' },
          { id: 'l11', title: '$lookup (Joins)', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65, videoId: 'Www6cTUymCY', notes: '## $lookup (Joins)\n\n### What is $lookup?\nPerforms a left outer join to another collection.\n\n### Basic Syntax\n```javascript\n{ $lookup: {\n  from: "orders",\n  localField: "userId",\n  foreignField: "userId",\n  as: "userOrders"\n}}\n```\n\n### Example: Join Users with Orders\n```javascript\nconst result = await db.collection(\'users\').aggregate([\n  { $match: { status: "active" } },\n  { $lookup: {\n    from: "orders",\n    localField: "_id",\n    foreignField: "userId",\n    as: "orders"\n  }},\n  { $project: {\n    name: 1,\n    email: 1,\n    orderCount: { $size: "$orders" },\n    _id: 0\n  }}\n]).toArray();\n```\n\n### Unwind + Lookup Pattern\nJoin with array fields:\n\n```javascript\n[\n  { $unwind: "$productIds" },\n  { $lookup: {\n    from: "products",\n    localField: "productIds",\n    foreignField: "_id",\n    as: "product"\n  }},\n  { $unwind: "$product" }\n]\n```\n\n### Performance Considerations\n- $lookup can be expensive on large collections\n- Use indexes on join fields\n- Consider denormalization for frequent joins\n\n### Practice Exercise\n1. Join two collections with $lookup\n2. Use unwind with lookup for array joins\n3. Optimize lookup with indexes' },
          { id: 'l12', title: '$unwind & Array Operators', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65, videoId: 'Www6cTUymCY', notes: '## $unwind & Array Operators\n\n### $unwind\nDeconstructs an array field into individual documents.\n\n```javascript\n// Before\n{ name: "Alice", hobbies: ["reading", "coding", "gaming"] }\n\n// After $unwind: "$hobbies"\n{ name: "Alice", hobbies: "reading" }\n{ name: "Alice", hobbies: "coding" }\n{ name: "Alice", hobbies: "gaming" }\n```\n\n**Include Empty Arrays**:\n```javascript\n{ $unwind: { path: "$hobbies", preserveNullAndEmptyArrays: true } }\n```\n\n### Array Operators\n\n**$size**: Get array length\n```javascript\n{ $project: { hobbyCount: { $size: "$hobbies" } } }\n```\n\n**$filter**: Filter array elements\n```javascript\n{ $project: {\n  activeHobbies: {\n    $filter: {\n      input: "$hobbies",\n      as: "hobby",\n      cond: { $eq: ["$$hobby.status", "active"] }\n    }\n  }\n}}\n```\n\n**$map**: Transform array elements\n```javascript\n{ $project: {\n  upperHobbies: {\n    $map: {\n      input: "$hobbies",\n      as: "hobby",\n      in: { $toUpper: "$$hobby" }\n    }\n  }\n}}\n```\n\n**$reduce**: Reduce array to single value\n```javascript\n{ $project: {\n  total: {\n    $reduce: {\n      input: "$scores",\n      initialValue: 0,\n      in: { $add: ["$$value", "$$this"] }\n    }\n  }\n}}\n```\n\n### Practice Exercise\n1. Use $unwind to flatten arrays\n2. Filter arrays with $filter\n3. Transform arrays with $map' },
          { id: 'l13', title: 'Real Analytics Pipeline', duration: 45, type: 'exercise', completed: false, difficulty: 'advanced', xp: 90, videoId: 'Www6cTUymCY', notes: '## Real Analytics Pipeline\n\n### Complete Analytics Example\nBuild a sales analytics dashboard.\n\n```javascript\nconst analytics = await db.collection(\'orders\').aggregate([\n  // 1. Filter by date range\n  { $match: {\n    createdAt: {\n      $gte: new Date("2024-01-01"),\n      $lte: new Date("2024-12-31")\n    }\n  }},\n  \n  // 2. Join with products\n  { $lookup: {\n    from: "products",\n    localField: "productId",\n    foreignField: "_id",\n    as: "product"\n  }},\n  { $unwind: "$product" },\n  \n  // 3. Group by category\n  { $group: {\n    _id: "$product.category",\n    totalSales: { $sum: "$amount" },\n    totalOrders: { $sum: 1 },\n    avgOrderValue: { $avg: "$amount" },\n    topProducts: { $push: "$product.name" }\n  }},\n  \n  // 4. Calculate percentage\n  { $addFields: {\n    percentage: {\n      $multiply: [\n        { $divide: ["$totalSales", 100000] },\n        100\n      ]\n    }\n  }},\n  \n  // 5. Sort by sales\n  { $sort: { totalSales: -1 } },\n  \n  // 6. Limit to top 10\n  { $limit: 10 }\n]).toArray();\n```\n\n### Pipeline Optimization Tips\n1. **$match early**: Reduce documents early\n2. **$project selectively**: Only include needed fields\n3. **Use indexes**: Index fields used in $match and $sort\n4. **Limit results**: Use $limit when possible\n5. **Avoid $lookup on large collections**: Consider denormalization\n\n### Practice Exercise\n1. Build sales analytics pipeline\n2. Add customer segmentation\n3. Calculate growth metrics over time' },
          { id: 'l13-quiz', title: 'Aggregation Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What does the $match stage do in aggregation?', options: ['Updates documents', 'Filters documents', 'Sorts documents', 'Groups documents'], correctAnswer: 1, explanation: '$match filters documents to pass only those that match specified conditions.' },
            { question: 'Which stage is used to reshape documents?', options: ['$match', '$project', '$group', '$sort'], correctAnswer: 1, explanation: '$project reshapes documents by including, excluding, or adding fields.' },
            { question: 'What does $group do in aggregation?', options: ['Filters documents', 'Groups documents for aggregation', 'Sorts documents', 'Limits results'], correctAnswer: 1, explanation: '$group groups documents together and can perform aggregation operations like sum, avg, count.' },
            { question: 'How do you sort in descending order?', options: ['{ $sort: { field: 0 } }', '{ $sort: { field: -1 } }', '{ $sort: { field: "desc" } }', '{ $sort: { field: true } }'], correctAnswer: 1, explanation: 'Using -1 in $sort sorts in descending order, while 1 sorts in ascending order.' },
            { question: 'What is the best practice for $match placement?', options: ['At the end of pipeline', 'In the middle', 'Early in pipeline', 'After $group'], correctAnswer: 2, explanation: 'Place $match early in the pipeline to reduce the number of documents processed in subsequent stages.' }
          ] },
        ]
      },
      {
        id: 'm4',
        title: 'Indexing & Performance',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l14', title: 'Index Types & Creation', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 55, videoId: 'Www6cTUymCY', notes: '## Index Types & Creation\n\n### What is an Index?\nIndexes support efficient query execution by providing ordered access to documents.\n\n### Creating Indexes\n\n**Single Field Index**:\n```javascript\nawait db.collection(\'users\').createIndex({ email: 1 });\n```\n\n**Compound Index**:\n```javascript\nawait db.collection(\'users\').createIndex({\n  age: 1,\n  city: 1\n});\n```\n\n**Multikey Index** (on array fields):\n```javascript\nawait db.collection(\'users\').createIndex({ hobbies: 1 });\n```\n\n**Text Index** (for full-text search):\n```javascript\nawait db.collection(\'products\').createIndex({\n  name: "text",\n  description: "text"\n});\n```\n\n**Geospatial Index**:\n```javascript\nawait db.collection(\'locations\').createIndex({\n  location: "2dsphere"\n});\n```\n\n### Index Properties\n\n**Unique Index**:\n```javascript\nawait db.collection(\'users\').createIndex(\n  { email: 1 },\n  { unique: true }\n);\n```\n\n**Sparse Index** (only indexes documents with the field):\n```javascript\nawait db.collection(\'users\').createIndex(\n  { phone: 1 },\n  { sparse: true }\n);\n```\n\n**TTL Index** (auto-delete documents after time):\n```javascript\nawait db.collection(\'sessions\').createIndex(\n  { createdAt: 1 },\n  { expireAfterSeconds: 3600 }\n);\n```\n\n### Index Direction\n- `1`: Ascending\n- `-1`: Descending\n- `2dsphere`: Geospatial\n- `"text"`: Full-text search\n\n### Practice Exercise\n1. Create single and compound indexes\n2. Create unique index for email field\n3. Create TTL index for session cleanup' },
          { id: 'l15', title: 'Query Optimization with explain()', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60, videoId: 'Www6cTUymCY', notes: '## Query Optimization with explain()\n\n### What is explain()?\nReturns information about query execution, helping optimize performance.\n\n### Basic Usage\n```javascript\nconst explanation = await db.collection(\'users\')\n  .find({ age: { $gte: 25 } })\n  .explain();\n\nconsole.log(explanation.executionStats);\n```\n\n### Key Metrics\n\n**executionTimeMillis**: Total execution time\n**totalDocsExamined**: Documents scanned\n**totalKeysExamined**: Index entries scanned\n**executionStages.stage**: Query execution plan\n\n### Analyzing Results\n\n**Good Query**:\n- `totalDocsExamined` â‰ˆ `totalKeysExamined`\n- Low `executionTimeMillis`\n\n**Poor Query**:\n- `totalDocsExamined` >> `totalKeysExamined`\n- High `executionTimeMillis`\n- `COLLSCAN` stage (collection scan)\n\n### Optimization Tips\n\n1. **Use Indexes**: Create indexes on frequently queried fields\n2. **Covered Queries**: Include all fields in index\n3. **Limit Results**: Use $limit to reduce documents\n4. **Projection**: Only return needed fields\n5. **Avoid $or**: Use $in when possible\n\n### Example Optimization\n```javascript\n// Before (slow)\nconst result = await db.collection(\'orders\')\n  .find({ userId: userId })\n  .toArray();\n\n// After (with index)\nawait db.collection(\'orders\').createIndex({ userId: 1 });\nconst result = await db.collection(\'orders\')\n  .find({ userId: userId })\n  .toArray();\n```\n\n### Practice Exercise\n1. Use explain() to analyze query performance\n2. Identify slow queries\n3. Create indexes to optimize queries' },
          { id: 'l16', title: 'Schema Design Patterns', duration: 35, type: 'reading', completed: false, difficulty: 'advanced', xp: 65, videoId: 'Www6cTUymCY', notes: '## Schema Design Patterns\n\n### Embedding vs Referencing\n\n**Embedding** (Denormalization):\n```json\n{\n  "_id": "user1",\n  "name": "Alice",\n  "address": {\n    "street": "123 Main St",\n    "city": "New York"\n  }\n}\n```\n\n**Pros**: Fast reads, atomic updates\n**Cons**: Data duplication, larger documents\n\n**Referencing** (Normalization):\n```json\n{\n  "_id": "order1",\n  "userId": "user1",\n  "items": ["item1", "item2"]\n}\n```\n\n**Pros**: Consistent data, smaller documents\n**Cons**: Requires joins, slower reads\n\n### Design Patterns\n\n**One-to-Few**: Embed\n```json\n{\n  "user": "Alice",\n  "addresses": [\n    { "street": "123 Main", "city": "NYC" },\n    { "street": "456 Oak", "city": "LA" }\n  ]\n}\n```\n\n**One-to-Many**: Reference\n```json\n{\n  "_id": "product1",\n  "name": "Laptop",\n  "reviews": ["review1", "review2"]\n}\n```\n\n**One-to-Squillions**: Reference\n```json\n{\n  "_id": "log1",\n  "userId": "user1",\n  "timestamp": ISODate("2024-01-01")\n}\n```\n\n### Tree Patterns\n\n**Materialized Path**:\n```json\n{\n  "_id": "node1",\n  "name": "Root",\n  "path": "root"\n}\n{\n  "_id": "node2",\n  "name": "Child",\n  "path": "root.child"\n}\n```\n\n### Practice Exercise\n1. Design schema for blog with comments\n2. Design schema for e-commerce system\n3. Choose embedding vs referencing appropriately' },
          { id: 'l16-quiz', title: 'Indexing & Performance Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is the purpose of indexes in MongoDB?', options: ['To store data', 'To improve query performance', 'To validate data', 'To backup data'], correctAnswer: 1, explanation: 'Indexes support efficient query execution by providing ordered access to documents.' },
            { question: 'What does explain() return?', options: ['Query results', 'Query execution plan', 'Index statistics', 'Collection schema'], correctAnswer: 1, explanation: 'explain() returns information about query execution, helping optimize performance.' },
            { question: 'What does COLLSCAN indicate in explain output?', options: ['Index was used', 'Collection scan (no index used)', 'Collision detected', 'Collection created'], correctAnswer: 1, explanation: 'COLLSCAN indicates a collection scan, meaning no index was used and all documents were examined.' },
            { question: 'Which index type is used for full-text search?', options: ['Single field', 'Compound', 'Text', 'Geospatial'], correctAnswer: 2, explanation: 'Text indexes are used for full-text search on string content.' },
            { question: 'What is a covered query?', options: ['Query that uses all indexes', 'Query where all fields are in the index', 'Query that covers all documents', 'Query with no results'], correctAnswer: 1, explanation: 'A covered query is one where all fields needed are in the index, avoiding document lookups.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'python',
    title: 'Python for Data Science & ML',
    description: 'Learn Python, NumPy, Pandas, Matplotlib, Scikit-learn, and build machine learning models from scratch.',
    instructor: 'Dr. Emily Zhang',
    instructorAvatar: 'ðŸ‘©â€ðŸ”¬',
    category: 'Data Science',
    tags: ['Python', 'ML', 'Data Science', 'NumPy', 'Pandas'],
    level: 'intermediate',
    duration: 45,
    rating: 4.7,
    totalRatings: 15600,
    totalStudents: 98200,
    thumbnail: '',
    color: 'from-yellow-500 to-orange-500',
    icon: 'ðŸ',
    xpReward: 900,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['mongodb', 'dsa', 'react'],
    learningPath: ['python', 'mongodb', 'dsa'],
    quiz: quizzes['python'],
    modules: [
      {
        id: 'm1',
        title: 'Python Basics',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Python Intro & Setup', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoId: 'rfscVS0vtbw', notes: '## Python Intro & Setup\n\n### What is Python?\nPython is a high-level, interpreted programming language known for its simplicity and readability.\n\n### Key Features\n- **Easy to Learn**: Simple syntax similar to English\n- **Versatile**: Web, Data Science, AI, Automation\n- **Large Ecosystem**: Extensive libraries and frameworks\n- **Cross-Platform**: Runs on Windows, Mac, Linux\n- **Interpreted**: No compilation step\n\n### Installation\n\n**Windows**:\n1. Download from python.org\n2. Run installer (check "Add to PATH")\n3. Verify: `python --version`\n\n**Mac**:\n```bash\nbrew install python3\n```\n\n**Linux**:\n```bash\nsudo apt install python3\n```\n\n### Setting Up Development Environment\n\n**VS Code**:\n1. Install VS Code\n2. Install Python extension\n3. Select Python interpreter\n\n**Jupyter Notebook**:\n```bash\npip install jupyter\njupyter notebook\n```\n\n### Your First Python Program\n```python\nprint("Hello, LearnLoop!")\n```\n\n### Practice Exercise\n1. Install Python on your system\n2. Set up VS Code with Python extension\n3. Write and run your first Python program' },
          { id: 'l2', title: 'Variables & Data Types', duration: 18, type: 'exercise', completed: false, difficulty: 'beginner', xp: 30, videoId: 'rfscVS0vtbw', notes: '## Variables & Data Types\n\n### Variables\nContainers for storing data values.\n\n```python\nname = "Alice"\nage = 25\nheight = 5.6\nis_student = True\n```\n\n### Data Types\n\n**Primitive Types**:\n- `int`: Integers (42, -7)\n- `float`: Decimals (3.14, -0.5)\n- `str`: Strings ("Hello")\n- `bool`: Boolean (True, False)\n- `None`: Null value\n\n**Type Checking**:\n```python\nx = 42\nprint(type(x))  # <class \'int\'>\n```\n\n**Type Conversion**:\n```python\nx = int("42")      # String to int\ny = float("3.14")  # String to float\nz = str(42)        # Int to string\n```\n\n### Naming Rules\n- Start with letter or underscore\n- Can contain letters, numbers, underscores\n- Case-sensitive\n- No reserved words\n\n### Practice Exercise\n1. Create variables with different data types\n2. Practice type conversion\n3. Use meaningful variable names' },
          { id: 'l3', title: 'Lists, Tuples, Dicts', duration: 25, type: 'exercise', completed: false, difficulty: 'beginner', xp: 40, videoId: 'rfscVS0vtbw', notes: '## Lists, Tuples, Dicts\n\n### Lists\nOrdered, mutable collections.\n\n```python\nfruits = ["apple", "banana", "cherry"]\nfruits.append("orange")  # Add element\nfruits.remove("apple")   # Remove element\nprint(fruits[0])         # Access by index\n```\n\n### Tuples\nOrdered, immutable collections.\n\n```python\ncolors = ("red", "green", "blue")\nprint(colors[0])  # Access\n# colors[0] = "yellow"  # Error: immutable\n```\n\n### Dictionaries\nKey-value pairs, unordered.\n\n```python\nperson = {\n    "name": "Alice",\n    "age": 25,\n    "city": "NYC"\n}\nprint(person["name"])  # Access by key\nperson["email"] = "alice@example.com"  # Add key\n```\n\n### Common Operations\n\n**List Methods**:\n- `append()`, `extend()`, `insert()`\n- `remove()`, `pop()`, `clear()`\n- `sort()`, `reverse()`\n\n**Dictionary Methods**:\n- `keys()`, `values()`, `items()`\n- `get()`, `pop()`, `update()`\n\n### Practice Exercise\n1. Create and manipulate lists\n2. Use tuples for immutable data\n3. Build dictionaries for key-value storage' },
          { id: 'l4', title: 'Functions & Lambdas', duration: 22, type: 'exercise', completed: false, difficulty: 'beginner', xp: 35, videoId: 'rfscVS0vtbw', notes: '## Functions & Lambdas\n\n### Functions\nReusable blocks of code.\n\n```python\ndef greet(name):\n    return f"Hello, {name}!"\n\nmessage = greet("Alice")\nprint(message)\n```\n\n### Function Parameters\n\n**Default Parameters**:\n```python\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n```\n\n**Variable Arguments**:\n```python\ndef sum_all(*args):\n    return sum(args)\n\ndef print_info(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key}: {value}")\n```\n\n### Lambda Functions\nAnonymous, single-expression functions.\n\n```python\n# Regular function\ndef square(x):\n    return x * x\n\n# Lambda equivalent\nsquare = lambda x: x * x\n\n# Common use with map/filter\nnumbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x ** 2, numbers))\n```\n\n### Higher-Order Functions\n```python\n# map: Apply function to all elements\nresult = list(map(lambda x: x * 2, [1, 2, 3]))\n\n# filter: Keep elements that match condition\neven = list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4]))\n\n# reduce: Reduce to single value\nfrom functools import reduce\ntotal = reduce(lambda x, y: x + y, [1, 2, 3, 4])\n```\n\n### Practice Exercise\n1. Create functions with different parameters\n2. Use lambda functions with map/filter\n3. Implement reduce for custom operations' },
          { id: 'l4-quiz', title: 'Python Basics Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'beginner', xp: 25, quiz: [
            { question: 'Which data type is immutable in Python?', options: ['List', 'Tuple', 'Dictionary', 'Set'], correctAnswer: 1, explanation: 'Tuples are immutable in Python, meaning they cannot be modified after creation.' },
            { question: 'How do you define a function in Python?', options: ['function myFunc():', 'def myFunc():', 'func myFunc():', 'create myFunc():'], correctAnswer: 1, explanation: 'Functions in Python are defined using the def keyword followed by the function name and parentheses.' },
            { question: 'What is a lambda function?', options: ['A regular function', 'An anonymous function', 'A class method', 'A module'], correctAnswer: 1, explanation: 'Lambda functions are anonymous, single-expression functions in Python.' },
            { question: 'Which keyword is used for default function parameters?', options: ['default', 'param', '=', 'value'], correctAnswer: 2, explanation: 'Default parameters are set using the = operator in the function definition.' },
            { question: 'What does the map() function do?', options: ['Filters elements', 'Applies function to all elements', 'Reduces to single value', 'Sorts elements'], correctAnswer: 1, explanation: 'map() applies a function to all elements in an iterable and returns a new iterable with the results.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'NumPy & Pandas',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'NumPy Arrays & Operations', duration: 30, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 55, videoId: 'rfscVS0vtbw', notes: '## NumPy Arrays & Operations\n\n### What is NumPy?\nFundamental package for scientific computing in Python. Provides support for large multi-dimensional arrays.\n\n### Installation\n```bash\npip install numpy\n```\n\n### Creating Arrays\n\n```python\nimport numpy as np\n\n# From Python list\narr = np.array([1, 2, 3, 4, 5])\n\n# Zeros array\nzeros = np.zeros((3, 3))\n\n# Ones array\nones = np.ones((2, 4))\n\n# Range\nrange_arr = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]\n\n# Linearly spaced\nlinspace = np.linspace(0, 10, 5)  # [0, 2.5, 5, 7.5, 10]\n```\n\n### Array Operations\n\n**Element-wise Operations**:\n```python\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\n\nprint(a + b)  # [5, 7, 9]\nprint(a * b)  # [4, 10, 18]\nprint(a ** 2)  # [1, 4, 9]\n```\n\n**Statistical Operations**:\n```python\narr = np.array([1, 2, 3, 4, 5])\nprint(arr.mean())   # 3.0\nprint(arr.std())    # 1.414\nprint(arr.sum())    # 15\nprint(arr.max())    # 5\n```\n\n### Indexing & Slicing\n```python\narr = np.array([[1, 2, 3], [4, 5, 6]])\nprint(arr[0, 1])      # 2\nprint(arr[:, 0])      # [1, 4]\nprint(arr[0, :])      # [1, 2, 3]\n```\n\n### Practice Exercise\n1. Create arrays with different methods\n2. Perform element-wise operations\n3. Practice array indexing and slicing' },
          { id: 'l6', title: 'Pandas DataFrames', duration: 35, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 65, videoId: 'rfscVS0vtbw', notes: '## Pandas DataFrames\n\n### What is Pandas?\nLibrary for data manipulation and analysis. Provides DataFrame structure.\n\n### Installation\n```bash\npip install pandas\n```\n\n### Creating DataFrames\n\n```python\nimport pandas as pd\n\n# From dictionary\ndf = pd.DataFrame({\n    \'Name\': [\'Alice\', \'Bob\', \'Charlie\'],\n    \'Age\': [25, 30, 28],\n    \'City\': [\'NYC\', \'LA\', \'Chicago\']\n})\n\n# From CSV\ndf = pd.read_csv(\'data.csv\')\n```\n\n### Basic Operations\n\n**Viewing Data**:\n```python\ndf.head()      # First 5 rows\ndf.tail()      # Last 5 rows\ndf.info()      # DataFrame info\ndf.describe()  # Statistical summary\n```\n\n**Selection**:\n```python\ndf[\'Name\']           # Select column\ndf[[\'Name\', \'Age\']]  # Select multiple columns\ndf.loc[0]            # Select by label\ndf.iloc[0]           # Select by position\n```\n\n**Filtering**:\n```python\n# Single condition\nyoung = df[df[\'Age\'] < 30]\n\n# Multiple conditions\nresult = df[(df[\'Age\'] > 25) & (df[\'City\'] == \'NYC\')]\n```\n\n### Data Manipulation\n\n```python\n# Add column\ndf[\'Salary\'] = [50000, 60000, 55000]\n\n# Update values\ndf.loc[0, \'Age\'] = 26\n\n# Drop column\ndf = df.drop(\'City\', axis=1)\n\n# Sort\ndf = df.sort_values(\'Age\', ascending=False)\n```\n\n### Practice Exercise\n1. Create DataFrame from various sources\n2. Practice filtering and selection\n3. Perform data manipulation operations' },
          { id: 'l7', title: 'Data Cleaning & EDA', duration: 40, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 75, videoId: 'rfscVS0vtbw', notes: '## Data Cleaning & EDA\n\n### Exploratory Data Analysis (EDA)\nProcess of analyzing datasets to summarize their main characteristics.\n\n### Handling Missing Values\n\n```python\n# Check for missing values\ndf.isnull().sum()\n\n# Drop missing values\ndf = df.dropna()\n\n# Fill missing values\ndf[\'Age\'].fillna(df[\'Age\'].mean(), inplace=True)\ndf[\'City\'].fillna(\'Unknown\', inplace=True)\n```\n\n### Removing Duplicates\n```python\n# Check duplicates\ndf.duplicated().sum()\n\n# Drop duplicates\ndf = df.drop_duplicates()\n```\n\n### Data Type Conversion\n```python\ndf[\'Age\'] = df[\'Age\'].astype(int)\ndf[\'Date\'] = pd.to_datetime(df[\'Date\'])\n```\n\n### String Operations\n```python\n# Convert to lowercase\ndf[\'Name\'] = df[\'Name\'].str.lower()\n\n# Remove whitespace\ndf[\'Name\'] = df[\'Name\'].str.strip()\n\n# Replace values\ndf[\'City\'] = df[\'City\'].str.replace(\'NYC\', \'New York\')\n```\n\n### Grouping & Aggregation\n```python\n# Group by column\ngrouped = df.groupby(\'City\')\n\n# Aggregate functions\nresult = df.groupby(\'City\').agg({\n    \'Age\': \'mean\',\n    \'Salary\': \'sum\'\n})\n```\n\n### Practice Exercise\n1. Clean a dataset with missing values\n2. Remove duplicates and convert types\n3. Perform grouping and aggregation' },
          { id: 'l7-quiz', title: 'NumPy & Pandas Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is NumPy primarily used for?', options: ['Web development', 'Scientific computing and arrays', 'Database management', 'GUI development'], correctAnswer: 1, explanation: 'NumPy is a fundamental package for scientific computing in Python, providing support for large multi-dimensional arrays.' },
            { question: 'What is a Pandas DataFrame?', options: ['A database table', 'A 2D labeled data structure', 'A NumPy array', 'A list of lists'], correctAnswer: 1, explanation: 'A Pandas DataFrame is a 2-dimensional labeled data structure with columns of potentially different types.' },
            { question: 'How do you check for missing values in Pandas?', options: ['df.missing()', 'df.isnull()', 'df.empty()', 'df.na()'], correctAnswer: 1, explanation: 'isnull() returns a boolean DataFrame indicating which values are missing (NaN).' },
            { question: 'What does dropna() do?', options: ['Drops columns', 'Drops rows with missing values', 'Drops duplicates', 'Drops index'], correctAnswer: 1, explanation: 'dropna() removes rows (or columns) containing missing values from the DataFrame.' },
            { question: 'How do you group data in Pandas?', options: ['df.group()', 'df.groupby()', 'df.aggregate()', 'df.collect()'], correctAnswer: 1, explanation: 'groupby() is used to group data based on column values for aggregation operations.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'Machine Learning',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l8', title: 'Supervised Learning', duration: 35, type: 'video', completed: false, difficulty: 'advanced', xp: 70, videoId: 'rfscVS0vtbw', notes: '## Supervised Learning\n\n### What is Supervised Learning?\nMachine learning where the model learns from labeled training data to make predictions.\n\n### Types of Supervised Learning\n\n**Classification**: Predict discrete labels\n- Spam detection (spam/not spam)\n- Image classification (cat/dog)\n- Disease diagnosis (positive/negative)\n\n**Regression**: Predict continuous values\n- House price prediction\n- Stock price forecasting\n- Temperature prediction\n\n### Key Components\n\n**Features (X)**: Input variables used for prediction\n**Labels (y)**: Target variable to predict\n**Training Data**: Labeled data to train model\n**Test Data**: Unseen data to evaluate model\n\n### Scikit-Learn Basics\n```python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import accuracy_score\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Scale features\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n```\n\n### Common Algorithms\n- Linear Regression\n- Logistic Regression\n- Decision Trees\n- Random Forest\n- Support Vector Machines (SVM)\n- Neural Networks\n\n### Practice Exercise\n1. Prepare labeled dataset\n2. Split into train/test sets\n3. Scale features appropriately' },
          { id: 'l9', title: 'Classification & Regression', duration: 40, type: 'exercise', completed: false, difficulty: 'advanced', xp: 80, videoId: 'rfscVS0vtbw', notes: '## Classification & Regression\n\n### Classification Example\nUsing Logistic Regression for binary classification.\n\n```python\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report\n\n# Train model\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\n\n# Make predictions\ny_pred = model.predict(X_test)\n\n# Evaluate\nprint(classification_report(y_test, y_pred))\nprint(f"Accuracy: {accuracy_score(y_test, y_pred)}")\n```\n\n### Regression Example\nUsing Linear Regression for continuous prediction.\n\n```python\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\n\n# Train model\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Make predictions\ny_pred = model.predict(X_test)\n\n# Evaluate\nmse = mean_squared_error(y_test, y_pred)\nr2 = r2_score(y_test, y_pred)\nprint(f"MSE: {mse}, R2: {r2}")\n```\n\n### Evaluation Metrics\n\n**Classification**:\n- Accuracy: Overall correctness\n- Precision: True positives / predicted positives\n- Recall: True positives / actual positives\n- F1-Score: Harmonic mean of precision and recall\n\n**Regression**:\n- MSE: Mean squared error\n- RMSE: Root mean squared error\n- R2: Coefficient of determination\n- MAE: Mean absolute error\n\n### Practice Exercise\n1. Implement classification model\n2. Implement regression model\n3. Compare different evaluation metrics' },
          { id: 'l10', title: 'Model Evaluation & Tuning', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 75, videoId: 'rfscVS0vtbw', notes: '## Model Evaluation & Tuning\n\n### Cross-Validation\nTechnique to assess model performance by splitting data multiple times.\n\n```python\nfrom sklearn.model_selection import cross_val_score\n\n# 5-fold cross-validation\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"CV Scores: {scores}")\nprint(f"Mean CV Score: {scores.mean()}")\n```\n\n### Hyperparameter Tuning\nFinding optimal model parameters.\n\n**Grid Search**:\n```python\nfrom sklearn.model_selection import GridSearchCV\n\nparam_grid = {\n    \'n_estimators\': [50, 100, 200],\n    \'max_depth\': [None, 10, 20]\n}\n\ngrid_search = GridSearchCV(\n    RandomForestClassifier(),\n    param_grid,\n    cv=5\n)\ngrid_search.fit(X_train, y_train)\n\nprint(f"Best params: {grid_search.best_params_}")\n```\n\n### Learning Curves\nDiagnose bias/variance problems.\n\n```python\nfrom sklearn.model_selection import learning_curve\n\ntrain_sizes, train_scores, test_scores = learning_curve(\n    model, X, y, cv=5\n)\n```\n\n### Common Issues\n\n**High Bias (Underfitting)**:\n- Model too simple\n- Solution: Add features, use complex model\n\n**High Variance (Overfitting)**:\n- Model too complex\n- Solution: More data, regularization, simpler model\n\n### Practice Exercise\n1. Implement cross-validation\n2. Perform grid search for hyperparameters\n3. Analyze learning curves' },
          { id: 'l10-quiz', title: 'Machine Learning Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is supervised learning?', options: ['Learning without labels', 'Learning from labeled data', 'Unsupervised clustering', 'Reinforcement learning'], correctAnswer: 1, explanation: 'Supervised learning is machine learning where the model learns from labeled training data to make predictions.' },
            { question: 'What is the difference between classification and regression?', options: ['No difference', 'Classification predicts labels, regression predicts values', 'Regression predicts labels, classification predicts values', 'Both use the same algorithms'], correctAnswer: 1, explanation: 'Classification predicts discrete class labels, while regression predicts continuous numerical values.' },
            { question: 'What does cross-validation do?', options: ['Tests model on same data', 'Splits data multiple times for evaluation', 'Only trains the model', 'Creates validation data'], correctAnswer: 1, explanation: 'Cross-validation splits data multiple times to assess model performance more reliably.' },
            { question: 'What is overfitting?', options: ['Model too simple', 'Model fits training data too closely', 'Model has no errors', 'Model is perfect'], correctAnswer: 1, explanation: 'Overfitting occurs when a model learns the training data too closely and performs poorly on new data.' },
            { question: 'What is the purpose of hyperparameter tuning?', options: ['To collect data', 'To find optimal model parameters', 'To clean data', 'To visualize results'], correctAnswer: 1, explanation: 'Hyperparameter tuning finds the optimal configuration of model parameters to improve performance.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'spring-boot',
    title: 'Spring Boot & Microservices',
    description: 'Build production-grade REST APIs with Spring Boot, Spring Security, JPA, Docker, and microservices architecture.',
    instructor: 'Marcus Johnson',
    instructorAvatar: 'ðŸ‘¨â€ðŸ«',
    category: 'Backend',
    tags: ['Spring Boot', 'Java', 'REST API', 'Microservices', 'Docker'],
    level: 'advanced',
    duration: 50,
    rating: 4.8,
    totalRatings: 8900,
    totalStudents: 45600,
    thumbnail: '',
    color: 'from-green-600 to-teal-600',
    icon: 'ðŸƒ',
    xpReward: 1000,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['java-basics', 'dsa'],
    relatedCourses: ['mongodb', 'dsa', 'react'],
    learningPath: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    quiz: quizzes['spring-boot'],
    modules: [
      {
        id: 'm1',
        title: 'Spring Boot Basics',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Spring Boot Architecture', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'vtPkZShrvXQ', notes: '## Spring Boot Architecture\n\n### What is Spring Boot?\nConvention-over-configuration framework for building Spring applications with minimal setup.\n\n### Key Features\n- **Auto-Configuration**: Automatically configures Spring based on dependencies\n- **Starter Dependencies**: Curated dependency sets\n- **Embedded Server**: Tomcat, Jetty, or Undertow\n- **Production Ready**: Metrics, health checks, externalized config\n- **No XML**: Annotation-based configuration\n\n### Architecture Layers\n\n**Presentation Layer**: REST controllers, handle HTTP requests\n**Business Layer**: Service classes, business logic\n**Data Access Layer**: Repository interfaces, database operations\n\n### Project Structure\n```\nsrc/main/java/com/example/demo/\nâ”œâ”€â”€ DemoApplication.java (Main class)\nâ”œâ”€â”€ controller/\nâ”‚   â””â”€â”€ UserController.java\nâ”œâ”€â”€ service/\nâ”‚   â””â”€â”€ UserService.java\nâ”œâ”€â”€ repository/\nâ”‚   â””â”€â”€ UserRepository.java\nâ””â”€â”€ model/\n    â””â”€â”€ User.java\n```\n\n### Main Application Class\n```java\n@SpringBootApplication\npublic class DemoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n    }\n}\n```\n\n### @SpringBootApplication Annotation\nCombines three annotations:\n- @Configuration: Class as configuration source\n- @EnableAutoConfiguration: Enable auto-configuration\n- @ComponentScan: Scan for Spring components\n\n### Practice Exercise\n1. Create new Spring Boot project\n2. Understand project structure\n3. Run the application' },
          { id: 'l2', title: 'Auto-Configuration', duration: 18, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoId: 'vtPkZShrvXQ', notes: '## Auto-Configuration\n\n### What is Auto-Configuration?\nSpring Boot automatically configures your application based on jar dependencies.\n\n### How It Works\n1. Spring Boot scans classpath for dependencies\n2. Matches conditions to configure beans\n3. Creates and registers beans automatically\n\n### Conditional Annotations\n\n**@ConditionalOnClass**: Configure if class exists\n**@ConditionalOnMissingBean**: Configure if bean missing\n**@ConditionalOnProperty**: Configure if property set\n**@ConditionalOnWebApplication**: Configure for web apps\n\n### Example: DataSource Auto-Configuration\n```java\n@Configuration\n@ConditionalOnClass(DataSource.class)\n@ConditionalOnMissingBean(DataSource.class)\nclass DataSourceAutoConfiguration {\n    @Bean\n    @ConditionalOnProperty(name = "spring.datasource.url")\n    DataSource dataSource() {\n        // Create DataSource\n    }\n}\n```\n\n### Disabling Auto-Configuration\n```java\n@SpringBootApplication(exclude = {\n    DataSourceAutoConfiguration.class\n})\n```\n\nOr in application.properties:\n```properties\nspring.autoconfigure.exclude=\\n  com.example.SomeAutoConfiguration\n```\n\n### Debug Auto-Configuration\n```properties\ndebug=true\n```\n\nShows report of all auto-configurations and why they were/wernt applied.\n\n### Practice Exercise\n1. Enable debug mode to see auto-configuration\n2. Disable specific auto-configurations\n3. Create custom conditional configuration' },
          { id: 'l3', title: 'Building REST APIs', duration: 35, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 65, videoId: 'vtPkZShrvXQ', notes: '## Building REST APIs\n\n### REST Controller\n```java\n@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    \n    @Autowired\n    private UserService userService;\n    \n    @GetMapping\n    public List<User> getAllUsers() {\n        return userService.getAllUsers();\n    }\n    \n    @GetMapping("/{id}")\n    public User getUserById(@PathVariable Long id) {\n        return userService.getUserById(id);\n    }\n    \n    @PostMapping\n    public User createUser(@RequestBody User user) {\n        return userService.createUser(user);\n    }\n    \n    @PutMapping("/{id}")\n    public User updateUser(@PathVariable Long id, @RequestBody User user) {\n        return userService.updateUser(id, user);\n    }\n    \n    @DeleteMapping("/{id}")\n    public void deleteUser(@PathVariable Long id) {\n        userService.deleteUser(id);\n    }\n}\n```\n\n### HTTP Methods\n- @GetMapping: Retrieve resources\n- @PostMapping: Create resources\n- @PutMapping: Update resources\n- @DeleteMapping: Delete resources\n- @PatchMapping: Partial updates\n\n### Request Mapping\n- @RequestMapping: Class-level or method-level\n- @GetMapping, @PostMapping: Shortcut methods\n- @PathVariable: URL path variables\n- @RequestParam: Query parameters\n- @RequestBody: Request body\n- @ResponseBody: Response body (implicit in @RestController)\n\n### Response Handling\n```java\n@GetMapping("/{id}")\npublic ResponseEntity<User> getUser(@PathVariable Long id) {\n    User user = userService.getUserById(id);\n    if (user != null) {\n        return ResponseEntity.ok(user);\n    } else {\n        return ResponseEntity.notFound().build();\n    }\n}\n```\n\n### Practice Exercise\n1. Create REST controller with CRUD operations\n2. Use different HTTP methods\n3. Handle responses with ResponseEntity' },
          { id: 'l4', title: 'Spring Data JPA', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60, videoId: 'vtPkZShrvXQ', notes: '## Spring Data JPA\n\n### What is Spring Data JPA?\nSimplifies database access using JPA (Java Persistence API).\n\n### Entity Class\n```java\n@Entity\n@Table(name = "users")\npublic class User {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(nullable = false, unique = true)\n    private String email;\n    \n    @Column(nullable = false)\n    private String name;\n    \n    @Column\n    private Integer age;\n    \n    // Getters and Setters\n}\n```\n\n### Repository Interface\n```java\n@Repository\npublic interface UserRepository extends JpaRepository<User, Long> {\n    \n    // Derived query methods\n    User findByEmail(String email);\n    List<User> findByAgeGreaterThan(Integer age);\n    \n    // Custom query with JPQL\n    @Query("SELECT u FROM User u WHERE u.name LIKE %:name%")\n    List<User> findByNameContaining(@Param("name") String name);\n    \n    // Native SQL query\n    @Query(value = "SELECT * FROM users WHERE age > :age", nativeQuery = true)\n    List<User> findUsersOlderThan(@Param("age") Integer age);\n}\n```\n\n### Service Layer\n```java\n@Service\n@Transactional\npublic class UserService {\n    \n    @Autowired\n    private UserRepository userRepository;\n    \n    public User createUser(User user) {\n        return userRepository.save(user);\n    }\n    \n    public User getUserById(Long id) {\n        return userRepository.findById(id)\n            .orElseThrow(() -> new RuntimeException("User not found"));\n    }\n    \n    public List<User> getAllUsers() {\n        return userRepository.findAll();\n    }\n}\n```\n\n### Configuration\n```properties\n# application.properties\nspring.datasource.url=jdbc:mysql://localhost:3306/mydb\nspring.datasource.username=root\nspring.datasource.password=password\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true\n```\n\n### Practice Exercise\n1. Create entity with JPA annotations\n2. Create repository with custom queries\n3. Implement service layer with transactions' },
          { id: 'l4-quiz', title: 'Spring Boot Basics Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What does @SpringBootApplication combine?', options: ['@Component, @Service, @Repository', '@Configuration, @EnableAutoConfiguration, @ComponentScan', '@Entity, @Table, @Column', '@Controller, @Service, @Repository'], correctAnswer: 1, explanation: '@SpringBootApplication combines @Configuration, @EnableAutoConfiguration, and @ComponentScan annotations.' },
            { question: 'What is auto-configuration in Spring Boot?', options: ['Manual configuration', 'Automatic configuration based on dependencies', 'Database configuration only', 'Security configuration only'], correctAnswer: 1, explanation: 'Auto-configuration automatically configures Spring applications based on jar dependencies present on the classpath.' },
            { question: 'Which annotation creates a REST endpoint?', options: ['@Controller', '@RestController', '@Service', '@Repository'], correctAnswer: 1, explanation: '@RestController combines @Controller and @ResponseBody to create REST endpoints that return data directly.' },
            { question: 'What does Spring Data JPA provide?', options: ['Security features', 'Database access simplification', 'REST API creation', 'Frontend templates'], correctAnswer: 1, explanation: 'Spring Data JPA simplifies database access by providing repository interfaces and automatic query generation.' },
            { question: 'What is the purpose of @RequestMapping?', options: ['Define database schema', 'Map HTTP requests to handler methods', 'Configure security', 'Create beans'], correctAnswer: 1, explanation: '@RequestMapping maps HTTP requests to handler methods in controllers, supporting various HTTP methods.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Security & Auth',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'Spring Security Basics', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 55, videoId: 'vtPkZShrvXQ', notes: '## Spring Security Basics\n\n### What is Spring Security?\nAuthentication and access-control framework for Spring applications.\n\n### Core Concepts\n\n**Authentication**: Verifying who you are\n**Authorization**: Verifying what you can do\n\n### Security Configuration\n```java\n@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    \n    @Bean\n    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {\n        http\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/api/public/**").permitAll()\n                .requestMatchers("/api/admin/**").hasRole("ADMIN")\n                .anyRequest().authenticated()\n            )\n            .httpBasic(withDefaults())\n            .formLogin(withDefaults());\n        return http.build();\n    }\n    \n    @Bean\n    public UserDetailsService userDetailsService() {\n        UserDetails user = User.withUsername("user")\n            .password(passwordEncoder().encode("password"))\n            .roles("USER")\n            .build();\n        \n        UserDetails admin = User.withUsername("admin")\n            .password(passwordEncoder().encode("admin"))\n            .roles("ADMIN")\n            .build();\n        \n        return new InMemoryUserDetailsManager(user, admin);\n    }\n    \n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder();\n    }\n}\n```\n\n### Common Annotations\n- @PreAuthorize: Check before method execution\n- @PostAuthorize: Check after method execution\n- @Secured: Role-based access\n- @RolesAllowed: JSR-250 role check\n\n### Method Security\n```java\n@PreAuthorize("hasRole(\'ADMIN\')")\npublic void deleteAccount(Long id) {\n    // Only admins can delete\n}\n\n@PreAuthorize("#userId == authentication.principal.id")\npublic User getUserProfile(Long userId) {\n    // Users can only see their own profile\n}\n```\n\n### Practice Exercise\n1. Configure basic authentication\n2. Set up role-based authorization\n3. Implement method-level security' },
          { id: 'l6', title: 'JWT Authentication', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 75, videoId: 'vtPkZShrvXQ', notes: '## JWT Authentication\n\n### What is JWT?\nJSON Web Token: Compact, URL-safe means of representing claims to be transferred between parties.\n\n### JWT Structure\n1. **Header**: Algorithm and token type\n2. **Payload**: Claims (data)\n3. **Signature**: Verification signature\n\n### JWT Utility Class\n```java\n@Component\npublic class JwtUtil {\n    \n    private String secret = "mySecretKey";\n    private long expiration = 86400000; // 24 hours\n    \n    public String generateToken(String username) {\n        return Jwts.builder()\n            .setSubject(username)\n            .setIssuedAt(new Date())\n            .setExpiration(new Date(System.currentTimeMillis() + expiration))\n            .signWith(SignatureAlgorithm.HS256, secret)\n            .compact();\n    }\n    \n    public String extractUsername(String token) {\n        return Jwts.parser()\n            .setSigningKey(secret)\n            .parseClaimsJws(token)\n            .getBody()\n            .getSubject();\n    }\n    \n    public boolean validateToken(String token) {\n        try {\n            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);\n            return true;\n        } catch (Exception e) {\n            return false;\n        }\n    }\n}\n```\n\n### JWT Filter\n```java\n@Component\npublic class JwtFilter extends OncePerRequestFilter {\n    \n    @Autowired\n    private JwtUtil jwtUtil;\n    \n    @Override\n    protected void doFilterInternal(HttpServletRequest request,\n            HttpServletResponse response, FilterChain chain)\n            throws ServletException, IOException {\n        \n        String authHeader = request.getHeader("Authorization");\n        String token = null;\n        String username = null;\n        \n        if (authHeader != null && authHeader.startsWith("Bearer ")) {\n            token = authHeader.substring(7);\n            username = jwtUtil.extractUsername(token);\n        }\n        \n        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {\n            if (jwtUtil.validateToken(token)) {\n                UsernamePasswordAuthenticationToken authToken =\n                    new UsernamePasswordAuthenticationToken(username, null, null);\n                SecurityContextHolder.getContext().setAuthentication(authToken);\n            }\n        }\n        chain.doFilter(request, response);\n    }\n}\n```\n\n### Practice Exercise\n1. Generate and validate JWT tokens\n2. Implement JWT filter for request interception\n3. Configure security to use JWT' },
          { id: 'l7', title: 'OAuth2 Integration', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70, videoId: 'vtPkZShrvXQ', notes: '## OAuth2 Integration\n\n### What is OAuth2?\nAuthorization framework for delegated access to resources.\n\n### Spring Security OAuth2\n```java\n@Configuration\n@EnableWebSecurity\npublic class OAuth2Config {\n    \n    @Bean\n    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {\n        http\n            .authorizeHttpRequests(auth -> auth\n                .anyRequest().authenticated()\n            )\n            .oauth2Login(withDefaults());\n        return http.build();\n    }\n}\n```\n\n### application.properties\n```properties\n# Google OAuth2\nspring.security.oauth2.client.registration.google.client-id=your-client-id\nspring.security.oauth2.client.registration.google.client-secret=your-client-secret\nspring.security.oauth2.client.registration.google.scope=profile,email\nspring.security.oauth2.client.registration.google.redirect-uri=http://localhost:8080/login/oauth2/code/google\n\nspring.security.oauth2.client.provider.google.authorization-uri=https://accounts.google.com/o/oauth2/v2/auth\nspring.security.oauth2.client.provider.google.token-uri=https://oauth2.googleapis.com/token\nspring.security.oauth2.client.provider.google.user-info-uri=https://www.googleapis.com/oauth2/v3/userinfo\n```\n\n### Custom User Info\n```java\n@Controller\npublic class UserController {\n    \n    @GetMapping("/user")\n    public ResponseEntity<Map<String, Object>> user(Principal principal) {\n        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) principal;\n        Map<String, Object> userInfo = new HashMap<>();\n        userInfo.put("name", token.getPrincipal().getAttribute("name"));\n        userInfo.put("email", token.getPrincipal().getAttribute("email"));\n        return ResponseEntity.ok(userInfo);\n    }\n}\n```\n\n### Practice Exercise\n1. Set up OAuth2 with Google\n2. Configure client registration\n3. Extract user information from OAuth2 token' },
          { id: 'l7-quiz', title: 'Security & Auth Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is the difference between authentication and authorization?', options: ['No difference', 'Authentication verifies identity, authorization verifies permissions', 'Authorization verifies identity, authentication verifies permissions', 'Both verify the same thing'], correctAnswer: 1, explanation: 'Authentication verifies who you are (identity), while authorization verifies what you can do (permissions).' },
            { question: 'What is JWT used for?', options: ['Database storage', 'Stateless authentication', 'Frontend rendering', 'API documentation'], correctAnswer: 1, explanation: 'JWT (JSON Web Token) is used for stateless authentication, allowing clients to carry authentication data.' },
            { question: 'What are the three parts of a JWT?', options: ['Username, password, token', 'Header, payload, signature', 'Token, secret, key', 'Request, response, error'], correctAnswer: 1, explanation: 'JWT consists of three parts: Header (algorithm), Payload (claims), and Signature (verification).' },
            { question: 'What is OAuth2 used for?', options: ['Authentication only', 'Authorization and delegated access', 'Database management', 'Frontend routing'], correctAnswer: 1, explanation: 'OAuth2 is an authorization framework for delegated access to resources without sharing credentials.' },
            { question: 'What does @PreAuthorize do?', options: ['Encrypts data', 'Checks authorization before method execution', 'Validates input', 'Caches results'], correctAnswer: 1, explanation: '@PreAuthorize checks authorization before a method executes, allowing fine-grained access control.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'react-typescript',
    title: 'React & TypeScript Masterclass',
    description: 'Build modern web apps with React 18, TypeScript, Hooks, Redux, and Next.js. Master component architecture and state management.',
    instructor: 'Jessica Williams',
    instructorAvatar: 'ðŸ‘©â€ðŸ’»',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Frontend', 'Next.js'],
    level: 'intermediate',
    duration: 35,
    rating: 4.9,
    totalRatings: 14500,
    totalStudents: 98000,
    thumbnail: '',
    color: 'from-cyan-500 to-blue-600',
    icon: 'âš›ï¸',
    xpReward: 750,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['fullstack', 'mongodb', 'spring-boot'],
    learningPath: ['react-typescript', 'fullstack', 'mongodb'],
    quiz: quizzes['react'],
    modules: [
      {
        id: 'm1',
        title: 'React Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'React & Virtual DOM', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoId: 'SqcY0GlETPk' },
          { id: 'l2', title: 'JSX & Components', duration: 18, type: 'exercise', completed: false, difficulty: 'beginner', xp: 30, videoId: 'SqcY0GlETPk', notes: '## JSX & Components\n\n### What is JSX?\nJSX is a syntax extension for JavaScript that lets you write HTML-like code in your JavaScript files.\n\n### JSX Basics\n```jsx\nconst element = <h1>Hello, LearnLoop!</h1>;\n```\n\n### JSX Rules\n1. **Single Parent Element**: Must wrap in one parent\n```jsx\n// Valid\n<div>\n  <h1>Title</h1>\n  <p>Content</p>\n</div>\n\n// Invalid (multiple parents)\n<h1>Title</h1>\n<p>Content</p>\n```\n\n2. **className instead of class**:\n```jsx\n<div className="container">Content</div>\n```\n\n3. **camelCase for attributes**:\n```jsx\n<input onClick={handleClick} readOnly={true} />\n```\n\n### Functional Components\n```jsx\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\n// Arrow function\nconst Welcome = ({ name }) => {\n  return <h1>Hello, {name}</h1>;\n};\n```\n\n### Component Best Practices\n- Use PascalCase for component names\n- Keep components small and focused\n- Use props for data passing\n- Return JSX from components\n\n### Practice Exercise\n1. Create a functional component\n2. Use JSX to render HTML elements\n3. Pass props to components\n4. Use className for styling' },
          { id: 'l3', title: 'Props & State', duration: 22, type: 'exercise', completed: false, difficulty: 'beginner', xp: 40, videoId: 'SqcY0GlETPk', notes: '## Props & State\n\n### Props (Properties)\nData passed from parent to child components. Read-only.\n\n```jsx\nfunction Welcome({ name, age }) {\n  return (\n    <div>\n      <h1>Hello, {name}</h1>\n      <p>Age: {age}</p>\n    </div>\n  );\n}\n\n// Usage\n<Welcome name="Alice" age={25} />\n```\n\n### State\nData managed within a component. Can change over time.\n\n```jsx\nimport { useState } from \'react\';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n```\n\n### Props vs State\n\n**Props**:\n- Passed from parent\n- Read-only\n- External to component\n\n**State**:\n- Managed internally\n- Can be updated\n- Private to component\n\n### State Best Practices\n- Keep state minimal\n- Group related state\n- Use appropriate state structure\n- Avoid deeply nested state\n\n### Practice Exercise\n1. Create component with props\n2. Add state with useState\n3. Update state on user interaction\n4. Pass state as props to child' },
          { id: 'l4', title: 'Event Handling', duration: 15, type: 'exercise', completed: false, difficulty: 'beginner', xp: 30, videoId: 'SqcY0GlETPk', notes: '## Event Handling\n\n### Event Handlers\nFunctions that handle user interactions.\n\n```jsx\nfunction Button() {\n  const handleClick = () => {\n    console.log(\'Button clicked!\');\n  };\n  \n  return <button onClick={handleClick}>Click me</button>;\n}\n```\n\n### Common Events\n- onClick: Click events\n- onChange: Form input changes\n- onSubmit: Form submission\n- onKeyDown/KeyUp: Keyboard events\n- onMouseOver/Out: Mouse events\n\n### Event Object\n```jsx\nfunction Input() {\n  const handleChange = (event) => {\n    console.log(event.target.value);\n  };\n  \n  return <input onChange={handleChange} />;\n}\n```\n\n### Arrow Functions in Events\n```jsx\n// Correct\n<button onClick={() => handleClick(id)}>Click</button>\n\n// Wrong (calls immediately)\n<button onClick={handleClick(id)}>Click</button>\n```\n\n### Form Handling\n```jsx\nfunction Form() {\n  const [formData, setFormData] = useState({ name: \'\' });\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log(formData);\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        value={formData.name}\n        onChange={(e) => setFormData({ ...formData, name: e.target.value })}\n      />\n      <button type="submit">Submit</button>\n    </form>\n  );\n}\n```\n\n### Practice Exercise\n1. Handle button click events\n2. Handle form input changes\n3. Prevent default form submission\n4. Pass parameters to event handlers' },
          { id: 'l4-quiz', title: 'React Fundamentals Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'beginner', xp: 25, quiz: [
            { question: 'What is JSX?', options: ['A database query language', 'A syntax extension for JavaScript', 'A CSS framework', 'A build tool'], correctAnswer: 1, explanation: 'JSX is a syntax extension for JavaScript that lets you write HTML-like code in your JavaScript files.' },
            { question: 'What is the difference between props and state?', options: ['No difference', 'Props are read-only and passed from parent, state is managed internally', 'State is read-only and passed from parent, props are managed internally', 'Both are managed internally'], correctAnswer: 1, explanation: 'Props are read-only data passed from parent components, while state is data managed within a component that can change.' },
            { question: 'How do you handle events in React?', options: ['Using HTML event attributes', 'Using camelCase event handlers with functions', 'Using jQuery', 'Using vanilla JavaScript'], correctAnswer: 1, explanation: 'React uses camelCase event handlers (onClick, onChange) with functions to handle user interactions.' },
            { question: 'What attribute is used instead of class in JSX?', options: ['class', 'className', 'styleClass', 'cssClass'], correctAnswer: 1, explanation: 'className is used instead of class in JSX because class is a reserved keyword in JavaScript.' },
            { question: 'What is the Virtual DOM?', options: ['A real DOM implementation', 'A lightweight copy of the real DOM for efficient updates', 'A database', 'A CSS framework'], correctAnswer: 1, explanation: 'The Virtual DOM is a lightweight copy of the real DOM that React uses to efficiently update the UI.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Hooks & State Management',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'useState & useEffect', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'SqcY0GlETPk' },
          { id: 'l6', title: 'useContext & useReducer', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'SqcY0GlETPk' },
          { id: 'l7', title: 'Custom Hooks', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'SqcY0GlETPk', notes: '## Custom Hooks\n\n### What are Custom Hooks?\nReusable functions that start with "use" and can use other hooks.\n\n### Creating a Custom Hook\n```jsx\nfunction useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  \n  const increment = () => setCount(count + 1);\n  const decrement = () => setCount(count - 1);\n  const reset = () => setCount(initialValue);\n  \n  return { count, increment, decrement, reset };\n}\n\n// Usage\nfunction Counter() {\n  const { count, increment, decrement, reset } = useCounter();\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>+</button>\n      <button onClick={decrement}>-</button>\n      <button onClick={reset}>Reset</button>\n    </div>\n  );\n}\n```\n\n### Custom Hook with useEffect\n```jsx\nfunction useWindowSize() {\n  const [size, setSize] = useState({ width: 0, height: 0 });\n  \n  useEffect(() => {\n    const handleResize = () => {\n      setSize({\n        width: window.innerWidth,\n        height: window.innerHeight\n      });\n    };\n    \n    window.addEventListener(\'resize\', handleResize);\n    handleResize();\n    \n    return () => window.removeEventListener(\'resize\', handleResize);\n  }, []);\n  \n  return size;\n}\n```\n\n### Custom Hook Best Practices\n- Start with "use" prefix\n- Keep hooks focused and single-purpose\n- Return consistent data structure\n- Handle cleanup in useEffect\n- Document hook usage\n\n### Practice Exercise\n1. Create a useFetch hook for API calls\n2. Create a useLocalStorage hook\n3. Create a useToggle hook\n4. Use custom hooks in components' },
          { id: 'l8', title: 'Redux Toolkit', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60, videoId: 'SqcY0GlETPk', notes: '## Redux Toolkit\n\n### What is Redux Toolkit?\nOfficial recommended way to write Redux logic. Simplifies Redux setup.\n\n### Installation\n```bash\nnpm install @reduxjs/toolkit react-redux\n```\n\n### Create Slice\n```jsx\nimport { createSlice } from \'@reduxjs/toolkit\';\n\nconst counterSlice = createSlice({\n  name: \'counter\',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => {\n      state.value += 1;\n    },\n    decrement: (state) => {\n      state.value -= 1;\n    },\n    incrementByAmount: (state, action) => {\n      state.value += action.payload;\n    },\n  },\n});\n\nexport const { increment, decrement, incrementByAmount } = counterSlice.actions;\nexport default counterSlice.reducer;\n```\n\n### Configure Store\n```jsx\nimport { configureStore } from \'@reduxjs/toolkit\';\nimport counterReducer from \'./counterSlice\';\n\nexport const store = configureStore({\n  reducer: {\n    counter: counterReducer,\n  },\n});\n```\n\n### Use in Component\n```jsx\nimport { useSelector, useDispatch } from \'react-redux\';\nimport { increment, decrement } from \'./counterSlice\';\n\nfunction Counter() {\n  const count = useSelector((state) => state.counter.value);\n  const dispatch = useDispatch();\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => dispatch(increment())}>+</button>\n      <button onClick={() => dispatch(decrement())}>-</button>\n    </div>\n  );\n}\n```\n\n### Practice Exercise\n1. Create a Redux slice for user data\n2. Configure the store\n3. Use Redux in components\n4. Implement async actions with createAsyncThunk' },
          { id: 'l8-quiz', title: 'Hooks & State Management Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is useState used for?', options: ['Managing component state', 'Handling side effects', 'Creating context', 'Managing reducers'], correctAnswer: 0, explanation: 'useState is used for managing component state that can change over time.' },
            { question: 'What is useEffect used for?', options: ['Managing state', 'Handling side effects in functional components', 'Creating custom hooks', 'Managing context'], correctAnswer: 1, explanation: 'useEffect is used for handling side effects like data fetching, subscriptions, or DOM manipulations in functional components.' },
            { question: 'What is the purpose of custom hooks?', options: ['To replace React built-in hooks', 'To reuse stateful logic between components', 'To improve performance', 'To manage global state'], correctAnswer: 1, explanation: 'Custom hooks allow you to reuse stateful logic between components without changing component hierarchy.' },
            { question: 'What is Redux Toolkit?', options: ['A CSS framework', 'A simplified way to write Redux logic', 'A testing library', 'A build tool'], correctAnswer: 1, explanation: 'Redux Toolkit is the official recommended way to write Redux logic, simplifying setup and reducing boilerplate.' },
            { question: 'What does useSelector do?', options: ['Dispatches actions', 'Selects data from the Redux store', 'Creates a store', 'Configures middleware'], correctAnswer: 1, explanation: 'useSelector is a hook to select data from the Redux store in functional components.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'TypeScript Integration',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l9', title: 'TypeScript Basics', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoId: 'SqcY0GlETPk' },
          { id: 'l10', title: 'React with TypeScript', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50, videoId: 'SqcY0GlETPk', notes: '## React with TypeScript\n\n### Setting Up TypeScript with React\n```bash\nnpx create-react-app my-app --template typescript\n```\n\n### Component with TypeScript\n```tsx\ninterface Props {\n  name: string;\n  age: number;\n}\n\nfunction Welcome({ name, age }: Props) {\n  return (\n    <div>\n      <h1>Hello, {name}</h1>\n      <p>Age: {age}</p>\n    </div>\n  );\n}\n```\n\n### useState with TypeScript\n```tsx\nconst [count, setCount] = useState<number>(0);\nconst [user, setUser] = useState<User | null>(null);\nconst [items, setItems] = useState<string[]>([]);\n```\n\n### Event Handlers\n```tsx\nconst handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {\n  console.log(event);\n};\n\nconst handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {\n  console.log(event.target.value);\n};\n```\n\n### Props with Optional Fields\n```tsx\ninterface Props {\n  name: string;\n  age?: number;  // Optional\n  role: \'admin\' | \'user\' | \'guest\';  // Union type\n}\n```\n\n### Practice Exercise\n1. Create typed component with interface\n2. Use useState with type annotations\n3. Type event handlers properly\n4. Use union types for props' },
          { id: 'l11', title: 'Type Safety in Components', duration: 22, type: 'exercise', completed: false, difficulty: 'advanced', xp: 50, videoId: 'SqcY0GlETPk', notes: '## Type Safety in Components\n\n### Generic Components\n```tsx\ninterface ListProps<T> {\n  items: T[];\n  renderItem: (item: T) => React.ReactNode;\n}\n\nfunction List<T>({ items, renderItem }: ListProps<T>) {\n  return <ul>{items.map(renderItem)}</ul>;\n}\n\n// Usage\n<List items={[1, 2, 3]} renderItem={(item) => <li>{item}</li>} />\n```\n\n### Type Guards\n```tsx\nfunction isString(value: unknown): value is string {\n  return typeof value === \'string\';\n}\n\nif (isString(data)) {\n  // TypeScript knows data is string here\n}\n```\n\n### Custom Hooks with TypeScript\n```tsx\nfunction useLocalStorage<T>(key: string, initialValue: T) {\n  const [value, setValue] = useState<T>(initialValue);\n  // ...\n}\n```\n\n### Context with TypeScript\n```tsx\ninterface ThemeContextType {\n  theme: \'light\' | \'dark\';\n  toggleTheme: () => void;\n}\n\nconst ThemeContext = createContext<ThemeContextType | null>(null);\n```\n\n### Practice Exercise\n1. Create generic component\n2. Implement type guards\n3. Type custom hooks\n4. Type context properly' },
          { id: 'l11-quiz', title: 'TypeScript Integration Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'How do you define props interface in React with TypeScript?', options: ['interface Props { name: string }', 'props: { name: string }', 'type Props = { name: string }', 'Props { name: string }'], correctAnswer: 0, explanation: 'Interfaces are used to define component props in TypeScript: interface Props { name: string }.' },
            { question: 'How do you type useState in TypeScript?', options: ['useState(0)', 'useState<number>(0)', 'useState<int>(0)', 'useState<0>'], correctAnswer: 1, explanation: 'useState uses generics for typing: useState<number>(0) specifies the state type.' },
            { question: 'What is a generic component?', options: ['A component with no types', 'A component that works with multiple data types', 'A component that only accepts strings', 'A component that cannot be reused'], correctAnswer: 1, explanation: 'Generic components use type parameters <T> to work with multiple data types while maintaining type safety.' },
            { question: 'What is a type guard in TypeScript?', options: ['A security feature', 'A function that narrows types at runtime', 'A type annotation', 'A generic type'], correctAnswer: 1, explanation: 'Type guards are functions that return a boolean and narrow the type of a value within conditional blocks.' },
            { question: 'How do you type event handlers in React?', options: ['event: Event', 'event: React.MouseEvent', 'event: React.MouseEvent<HTMLButtonElement>', 'event: any'], correctAnswer: 2, explanation: 'Event handlers are typed with specific React event types like React.MouseEvent<HTMLButtonElement> for button clicks.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Web Development',
    description: 'Master full-stack development with React, Node.js, MongoDB, and REST APIs. Build complete production-ready applications.',
    instructor: 'David Park',
    instructorAvatar: 'ðŸ‘¨â€ðŸ’»',
    category: 'Full Stack',
    tags: ['Full Stack', 'React', 'Node.js', 'MongoDB'],
    level: 'advanced',
    duration: 60,
    rating: 4.8,
    totalRatings: 11200,
    totalStudents: 76500,
    thumbnail: '',
    color: 'from-purple-500 to-pink-600',
    icon: 'ðŸ’»',
    xpReward: 1200,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['react-typescript', 'mongodb'],
    relatedCourses: ['react-typescript', 'mongodb', 'spring-boot'],
    learningPath: ['react-typescript', 'fullstack', 'mongodb'],
    quiz: quizzes['fullstack'],
    modules: [
      {
        id: 'm1',
        title: 'Frontend Architecture',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'React Project Structure', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoId: 'SqcY0GlETPk' },
          { id: 'l2', title: 'State Management Patterns', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50, videoId: 'SqcY0GlETPk', notes: '## State Management Patterns\n\n### Local State\nUse useState for component-specific state.\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n```\n\n### Lifting State Up\nMove state to nearest common parent.\n\n```jsx\nfunction Parent() {\n  const [value, setValue] = useState(\'\');\n  return (\n    <>\n      <Input value={value} onChange={setValue} />\n      <Display value={value} />\n    </>\n  );\n}\n```\n\n### Context API\nFor global state across components.\n\n```jsx\nconst ThemeContext = createContext();\n\nfunction App() {\n  const [theme, setTheme] = useState(\'light\');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <Child />\n    </ThemeContext.Provider>\n  );\n}\n```\n\n### Redux Toolkit\nFor complex state management.\n\n```jsx\n// Slice\nconst counterSlice = createSlice({\n  name: \'counter\',\n  initialState: { value: 0 },\n  reducers: { increment: (state) => state.value += 1 }\n});\n\n// Store\nconst store = configureStore({ reducer: { counter: counterSlice.reducer } });\n```\n\n### When to Use Each\n- **Local State**: Component-specific data\n- **Lifting State**: Shared between few components\n- **Context**: Global theme, user, language\n- **Redux**: Complex app state, many consumers\n\n### Practice Exercise\n1. Implement local state for form\n2. Lift state up for parent-child\n3. Use Context for theme\n4. Set up Redux for cart management' },
          { id: 'l3', title: 'API Integration', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'SqcY0GlETPk', notes: '## API Integration\n\n### Fetch API\nBuilt-in JavaScript API for HTTP requests.\n\n```jsx\nuseEffect(() => {\n  fetch(\'https://api.example.com/data\')\n    .then(response => response.json())\n    .then(data => setData(data))\n    .catch(error => setError(error.message));\n}, []);\n```\n\n### Axios\nPopular HTTP client with more features.\n\n```jsx\nimport axios from \'axios\';\n\nuseEffect(() => {\n  axios.get(\'https://api.example.com/data\')\n    .then(response => setData(response.data))\n    .catch(error => setError(error.message));\n}, []);\n```\n\n### Custom Hook for API\n```jsx\nfunction useApi(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(data => setData(data))\n      .catch(err => setError(err))\n      .finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading, error };\n}\n```\n\n### POST Request\n```jsx\nconst handleSubmit = async () => {\n  try {\n    const response = await axios.post(\'/api/users\', userData);\n    console.log(response.data);\n  } catch (error) {\n    console.error(error);\n  }\n};\n```\n\n### Error Handling\n```jsx\ntry {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(\'Network error\');\n  const data = await response.json();\n} catch (error) {\n  setError(error.message);\n}\n```\n\n### Practice Exercise\n1. Create custom useApi hook\n2. Handle loading and error states\n3. Implement GET and POST requests\n4. Add request cancellation' },
          { id: 'l3-quiz', title: 'Frontend Architecture Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is lifting state up?', options: ['Moving state down to children', 'Moving state to nearest common parent', 'Creating global state', 'Removing state'], correctAnswer: 1, explanation: 'Lifting state up means moving state to the nearest common parent component to share it between siblings.' },
            { question: 'When should you use Context API?', options: ['For all state', 'For global state like theme/user', 'Only for local state', 'Never use it'], correctAnswer: 1, explanation: 'Context API is best for global state that needs to be accessed by many components like theme, user, or language.' },
            { question: 'What is Redux Toolkit used for?', options: ['CSS styling', 'Complex state management', 'API calls', 'Routing'], correctAnswer: 1, explanation: 'Redux Toolkit is used for complex application state management with many consumers and complex state logic.' },
            { question: 'What is the difference between fetch and axios?', options: ['No difference', 'Axios has more features and better error handling', 'Fetch is better', 'Axios is built-in'], correctAnswer: 1, explanation: 'Axios provides more features like automatic JSON transformation, request/response interceptors, and better error handling compared to fetch.' },
            { question: 'What is a custom hook used for?', options: ['To replace components', 'To reuse stateful logic between components', 'To style components', 'To handle routing'], correctAnswer: 1, explanation: 'Custom hooks allow you to reuse stateful logic between components without changing component hierarchy.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Backend with Node.js',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Express.js Fundamentals', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'L72fhGm1tfE' },
          { id: 'l5', title: 'REST API Design', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60, videoId: 'L72fhGm1tfE', notes: '## REST API Design\n\n### REST Principles\n- **Stateless**: Each request contains all needed information\n- **Client-Server**: Separation of concerns\n- **Cacheable**: Responses should be cacheable\n- **Uniform Interface**: Consistent API design\n\n### HTTP Methods\n- **GET**: Retrieve resources (idempotent)\n- **POST**: Create resources\n- **PUT**: Update entire resource (idempotent)\n- **PATCH**: Partial update\n- **DELETE**: Remove resource (idempotent)\n\n### Resource Naming\n```\nGET /api/users          # List users\nGET /api/users/123      # Get specific user\nPOST /api/users         # Create user\nPUT /api/users/123      # Update user\nDELETE /api/users/123   # Delete user\n```\n\n### Status Codes\n- 200: OK\n- 201: Created\n- 204: No Content\n- 400: Bad Request\n- 401: Unauthorized\n- 403: Forbidden\n- 404: Not Found\n- 500: Server Error\n\n### Express.js Example\n```javascript\napp.get(\'/api/users\', async (req, res) => {\n  const users = await User.find();\n  res.json(users);\n});\n\napp.post(\'/api/users\', async (req, res) => {\n  const user = new User(req.body);\n  await user.save();\n  res.status(201).json(user);\n});\n```\n\n### Practice Exercise\n1. Design RESTful endpoints for blog API\n2. Implement proper HTTP methods\n3. Use appropriate status codes\n4. Add request validation' },
          { id: 'l6', title: 'Authentication & JWT', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65, videoId: 'L72fhGm1tfE', notes: '## Authentication & JWT\n\n### JWT Structure\n1. **Header**: Algorithm and token type\n2. **Payload**: Claims (data)\n3. **Signature**: Verification\n\n### Generating JWT\n```javascript\nconst jwt = require(\'jsonwebtoken\');\n\nconst token = jwt.sign(\n  { userId: user._id, email: user.email },\n  process.env.JWT_SECRET,\n  { expiresIn: \'24h\' }\n);\n```\n\n### Verifying JWT\n```javascript\nconst verifyToken = (req, res, next) => {\n  const token = req.headers.authorization?.split(\' \')[1];\n  \n  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {\n    if (err) return res.status(401).json({ error: \'Invalid token\' });\n    req.user = decoded;\n    next();\n  });\n};\n```\n\n### Protected Routes\n```javascript\napp.get(\'/api/profile\', verifyToken, async (req, res) => {\n  const user = await User.findById(req.user.userId);\n  res.json(user);\n});\n```\n\n### Login Route\n```javascript\napp.post(\'/api/login\', async (req, res) => {\n  const { email, password } = req.body;\n  const user = await User.findOne({ email });\n  \n  if (!user || !await user.comparePassword(password)) {\n    return res.status(401).json({ error: \'Invalid credentials\' });\n  }\n  \n  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);\n  res.json({ token });\n});\n```\n\n### Practice Exercise\n1. Implement JWT generation\n2. Create middleware for token verification\n3. Protect routes with authentication\n4. Handle token expiration' },
          { id: 'l6-quiz', title: 'Backend with Node.js Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is Express.js?', options: ['A database', 'A Node.js web framework', 'A frontend library', 'A testing tool'], correctAnswer: 1, explanation: 'Express.js is a minimal and flexible Node.js web application framework for building web applications and APIs.' },
            { question: 'What HTTP method is used to create a resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], correctAnswer: 1, explanation: 'POST is the HTTP method used to create new resources on the server.' },
            { question: 'What does JWT stand for?', options: ['JSON Web Token', 'JavaScript Web Tool', 'Java Web Technology', 'JSON Wrapper Type'], correctAnswer: 0, explanation: 'JWT stands for JSON Web Token, a compact URL-safe means of representing claims to be transferred between parties.' },
            { question: 'What is a RESTful API?', options: ['A database API', 'An API that follows REST architectural principles', 'A frontend API', 'A testing API'], correctAnswer: 1, explanation: 'A RESTful API is an API that follows REST (Representational State Transfer) architectural principles for building web services.' },
            { question: 'What is middleware in Express.js?', options: ['A database connector', 'Functions that have access to req, res, and next', 'A frontend component', 'A testing library'], correctAnswer: 1, explanation: 'Middleware functions in Express.js have access to the request object (req), response object (res), and the next middleware function in the application request-response cycle.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'Database Integration',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'MongoDB with Mongoose', duration: 30, type: 'video', completed: false, difficulty: 'advanced', xp: 55, videoId: '926p0JyY3bE' },
          { id: 'l8', title: 'CRUD Operations', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 75, videoId: '926p0JyY3bE', notes: '## CRUD Operations with Mongoose\n\n### Create\n```javascript\nconst user = new User({\n  name: \'Alice\',\n  email: \'alice@example.com\',\n  age: 25\n});\nawait user.save();\n\n// Or using create\nawait User.create({ name: \'Bob\', email: \'bob@example.com\' });\n```\n\n### Read\n```javascript\n// Find all\nconst users = await User.find();\n\n// Find one\nconst user = await User.findOne({ email: \'alice@example.com\' });\n\n// Find by ID\nconst user = await User.findById(userId);\n\n// With conditions\nconst adults = await User.find({ age: { $gte: 18 } });\n```\n\n### Update\n```javascript\n// Update one\nawait User.findByIdAndUpdate(userId, { age: 26 });\n\n// Update many\nawait User.updateMany({ status: \'active\' }, { lastLogin: new Date() });\n\n// Find and update\nconst user = await User.findOneAndUpdate(\n  { email: \'alice@example.com\' },\n  { age: 26 },\n  { new: true }\n);\n```\n\n### Delete\n```javascript\n// Delete one\nawait User.findByIdAndDelete(userId);\n\n// Delete many\nawait User.deleteMany({ status: \'deleted\' });\n\n// Find and delete\nconst user = await User.findOneAndDelete({ email: \'alice@example.com\' });\n```\n\n### Practice Exercise\n1. Implement full CRUD for User model\n2. Add validation to create operations\n3. Handle errors in all operations\n4. Add query filters for read operations' },
          { id: 'l9', title: 'Full Stack Project', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120, videoId: '926p0JyY3bE', notes: '## Full Stack Project: Task Management App\n\n### Project Overview\nBuild a complete task management application with React frontend and Node.js backend.\n\n### Backend Requirements\n\n**Models**:\n- User: name, email, password\n- Task: title, description, status, priority, dueDate, userId\n\n**API Endpoints**:\n- POST /api/auth/register\n- POST /api/auth/login\n- GET /api/tasks\n- POST /api/tasks\n- PUT /api/tasks/:id\n- DELETE /api/tasks/:id\n\n### Frontend Requirements\n\n**Components**:\n- Login/Register pages\n- Dashboard with task list\n- Task creation form\n- Task editing modal\n- Task filtering and sorting\n\n**Features**:\n- JWT authentication\n- Protected routes\n- Real-time updates\n- Responsive design\n\n### Implementation Steps\n\n1. **Setup**\n   - Initialize React app\n   - Setup Express server\n   - Configure MongoDB\n\n2. **Backend**\n   - Create Mongoose models\n   - Implement authentication\n   - Build CRUD endpoints\n   - Add validation\n\n3. **Frontend**\n   - Create component structure\n   - Implement routing\n   - Build forms\n   - Integrate API\n\n4. **Integration**\n   - Connect frontend to backend\n   - Handle authentication\n   - Add error handling\n   - Test all features\n\n### Bonus Features\n- Drag and drop tasks\n- Task categories\n- Team collaboration\n- Email notifications\n- Dark mode\n\n### Submission\nDeploy both frontend and backend, provide GitHub repository link.' },
          { id: 'l9-quiz', title: 'Database Integration Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is Mongoose?', options: ['A frontend library', 'An ODM for MongoDB and Node.js', 'A database', 'A testing tool'], correctAnswer: 1, explanation: 'Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation and modeling.' },
            { question: 'What does CRUD stand for?', options: ['Create, Read, Update, Delete', 'Code, Run, Use, Debug', 'Connect, Read, Upload, Download', 'Create, Run, Use, Delete'], correctAnswer: 0, explanation: 'CRUD stands for Create, Read, Update, and Delete - the four basic operations for persistent storage.' },
            { question: 'How do you create a new document in Mongoose?', options: ['new Model() and save()', 'Model.insert()', 'Model.add()', 'Model.create()'], correctAnswer: 0, explanation: 'In Mongoose, you create a new document by instantiating a model with new Model() and calling save(), or using Model.create().' },
            { question: 'What is the difference between find() and findOne()?', options: ['No difference', 'find() returns all matching documents, findOne() returns the first match', 'findOne() returns all, find() returns one', 'Both return the same'], correctAnswer: 1, explanation: 'find() returns all documents that match the query, while findOne() returns only the first matching document.' },
            { question: 'What is a schema in Mongoose?', options: ['A database table', 'A document structure definition', 'A query', 'A connection'], correctAnswer: 1, explanation: 'A schema in Mongoose defines the structure of documents within a collection, including data types and validation rules.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence Fundamentals',
    description: 'Learn AI concepts, neural networks, deep learning, TensorFlow, and build intelligent applications with modern AI tools.',
    instructor: 'Dr. Robert Chen',
    instructorAvatar: 'ðŸ‘¨â€ðŸ”¬',
    category: 'AI & ML',
    tags: ['AI', 'Neural Networks', 'TensorFlow', 'Deep Learning'],
    level: 'advanced',
    duration: 55,
    rating: 4.7,
    totalRatings: 9800,
    totalStudents: 54200,
    thumbnail: '',
    color: 'from-indigo-600 to-blue-800',
    icon: 'ðŸ§ ',
    xpReward: 1100,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['python'],
    relatedCourses: ['machine-learning', 'python', 'dsa'],
    learningPath: ['python', 'artificial-intelligence', 'machine-learning'],
    quiz: quizzes['ai'],
    modules: [
      {
        id: 'm1',
        title: 'AI Foundations',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Introduction to AI', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoId: 'aircAruvnKk' },
          { id: 'l2', title: 'Machine Learning vs Deep Learning', duration: 18, type: 'reading', completed: false, difficulty: 'intermediate', xp: 30, videoId: 'aircAruvnKk', notes: '## Machine Learning vs Deep Learning\n\n### Machine Learning\nSubset of AI that enables systems to learn from data without explicit programming.\n\n### Key Characteristics\n- **Feature Engineering**: Manual feature extraction\n- **Data Requirements**: Works with smaller datasets\n- **Interpretability**: More interpretable models\n- **Training Time**: Generally faster\n- **Hardware**: Can run on standard CPUs\n\n### Common ML Algorithms\n- Linear Regression\n- Logistic Regression\n- Decision Trees\n- Random Forest\n- Support Vector Machines\n- K-Means Clustering\n\n### Deep Learning\nSubset of ML using neural networks with multiple layers.\n\n### Key Characteristics\n- **Automatic Feature Learning**: Neural networks learn features\n- **Data Requirements**: Requires large datasets\n- **Black Box**: Less interpretable\n- **Training Time**: Computationally intensive\n- **Hardware**: Requires GPUs for efficiency\n\n### Neural Network Architecture\n- Input Layer: Receives raw data\n- Hidden Layers: Learn hierarchical features\n- Output Layer: Produces predictions\n\n### When to Use Each\n\n**Machine Learning**:\n- Small to medium datasets\n- Need interpretability\n- Limited computational resources\n- Tabular data\n\n**Deep Learning**:\n- Large datasets\n- Unstructured data (images, text, audio)\n- Complex patterns\n- Have GPU resources\n\n### Practice Exercise\n1. Compare ML and DL on same dataset\n2. Analyze computational requirements\n3. Evaluate interpretability differences' },
          { id: 'l3', title: 'Neural Network Basics', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 45, videoId: 'aircAruvnKk' },
          { id: 'l3-quiz', title: 'AI Foundations Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is the main difference between machine learning and deep learning?', options: ['No difference', 'Deep learning uses neural networks with multiple layers', 'Machine learning uses neural networks', 'Deep learning is simpler'], correctAnswer: 1, explanation: 'Deep learning uses neural networks with multiple layers to automatically learn features, while traditional machine learning requires manual feature engineering.' },
            { question: 'What is a neural network?', options: ['A database', 'A computing system inspired by biological neural networks', 'A programming language', 'A type of algorithm'], correctAnswer: 1, explanation: 'A neural network is a computing system inspired by biological neural networks in the human brain that can learn patterns from data.' },
            { question: 'What is feature engineering?', options: ['Creating features automatically', 'Manually extracting relevant features from data', 'Training neural networks', 'Data visualization'], correctAnswer: 1, explanation: 'Feature engineering is the process of manually extracting and selecting relevant features from raw data to improve model performance.' },
            { question: 'When should you use deep learning over machine learning?', options: ['Always use deep learning', 'For small datasets with limited resources', 'For large datasets with unstructured data', 'Never use deep learning'], correctAnswer: 2, explanation: 'Deep learning is preferred for large datasets with unstructured data like images, text, and audio where complex patterns need to be learned.' },
            { question: 'What is the input layer in a neural network?', options: ['Produces predictions', 'Learns hierarchical features', 'Receives raw data', 'Drops neurons'], correctAnswer: 2, explanation: 'The input layer receives raw data from the dataset and passes it to the hidden layers for processing.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Deep Learning',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'TensorFlow Fundamentals', duration: 30, type: 'video', completed: false, difficulty: 'advanced', xp: 55, videoId: '2FmcHiClwuw' },
          { id: 'l5', title: 'Building Neural Networks', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70, videoId: '2FmcHiClwuw', notes: '## Building Neural Networks with TensorFlow\n\n### Sequential Model\nSimple stack of layers.\n\n```python\nimport tensorflow as tf\nfrom tensorflow import keras\n\nmodel = keras.Sequential([\n    keras.layers.Dense(128, activation=\'relu\', input_shape=(784,)),\n    keras.layers.Dropout(0.2),\n    keras.layers.Dense(64, activation=\'relu\'),\n    keras.layers.Dense(10, activation=\'softmax\')\n])\n```\n\n### Functional API\nMore flexible for complex architectures.\n\n```python\ninputs = keras.Input(shape=(784,))\nx = keras.layers.Dense(128, activation=\'relu\')(inputs)\nx = keras.layers.Dropout(0.2)(x)\nx = keras.layers.Dense(64, activation=\'relu\')(x)\noutputs = keras.layers.Dense(10, activation=\'softmax\')(x)\n\nmodel = keras.Model(inputs=inputs, outputs=outputs)\n```\n\n### Compile Model\n```python\nmodel.compile(\n    optimizer=\'adam\',\n    loss=\'sparse_categorical_crossentropy\',\n    metrics=[\'accuracy\']\n)\n```\n\n### Train Model\n```python\nhistory = model.fit(\n    X_train, y_train,\n    epochs=10,\n    batch_size=32,\n    validation_split=0.2\n)\n```\n\n### Evaluate Model\n```python\ntest_loss, test_acc = model.evaluate(X_test, y_test)\nprint(f\'Test accuracy: {test_acc}\')\n```\n\n### Practice Exercise\n1. Build neural network for MNIST\n2. Experiment with different architectures\n3. Compare activation functions\n4. Analyze training history' },
          { id: 'l6', title: 'CNN for Image Recognition', duration: 40, type: 'exercise', completed: false, difficulty: 'advanced', xp: 80, videoId: '2FmcHiClwuw', notes: '## CNN for Image Recognition\n\n### What is CNN?\nConvolutional Neural Network designed for image processing using convolutional layers.\n\n### CNN Architecture\n```python\nmodel = keras.Sequential([\n    # Convolutional layers\n    keras.layers.Conv2D(32, (3, 3), activation=\'relu\', input_shape=(28, 28, 1)),\n    keras.layers.MaxPooling2D((2, 2)),\n    keras.layers.Conv2D(64, (3, 3), activation=\'relu\'),\n    keras.layers.MaxPooling2D((2, 2)),\n    \n    # Flatten and dense layers\n    keras.layers.Flatten(),\n    keras.layers.Dense(128, activation=\'relu\'),\n    keras.layers.Dropout(0.5),\n    keras.layers.Dense(10, activation=\'softmax\')\n])\n```\n\n### Key Components\n\n**Conv2D**: Extracts features using filters\n```python\nkeras.layers.Conv2D(filters=32, kernel_size=(3, 3), activation=\'relu\')\n```\n\n**MaxPooling2D**: Reduces spatial dimensions\n```python\nkeras.layers.MaxPooling2D(pool_size=(2, 2))\n```\n\n**Flatten**: Converts 2D to 1D\n```python\nkeras.layers.Flatten()\n```\n\n### Data Preprocessing\n```python\n# Normalize pixel values\nX_train = X_train / 255.0\nX_test = X_test / 255.0\n\n# Reshape for CNN\nX_train = X_train.reshape(-1, 28, 28, 1)\nX_test = X_test.reshape(-1, 28, 28, 1)\n```\n\n### Practice Exercise\n1. Build CNN for image classification\n2. Add data augmentation\n3. Implement transfer learning\n4. Visualize learned filters' },
          { id: 'l6-quiz', title: 'Deep Learning Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is TensorFlow?', options: ['A database', 'An open-source ML framework', 'A programming language', 'A text editor'], correctAnswer: 1, explanation: 'TensorFlow is an open-source machine learning framework developed by Google for building and training neural networks.' },
            { question: 'What is the difference between Sequential and Functional API in Keras?', options: ['No difference', 'Sequential is simpler, Functional is more flexible', 'Functional is simpler, Sequential is more flexible', 'Both are identical'], correctAnswer: 1, explanation: 'Sequential API is for simple stack of layers, while Functional API provides more flexibility for complex architectures with multiple inputs/outputs.' },
            { question: 'What is a CNN used for?', options: ['Text processing', 'Image recognition and processing', 'Time series data', 'Database management'], correctAnswer: 1, explanation: 'CNN (Convolutional Neural Network) is specifically designed for image recognition and processing using convolutional layers to extract features.' },
            { question: 'What does MaxPooling2D do?', options: ['Increases spatial dimensions', 'Reduces spatial dimensions by taking maximum values', 'Adds more layers', 'Normalizes data'], correctAnswer: 1, explanation: 'MaxPooling2D reduces spatial dimensions by taking the maximum value in each pooling window, helping to reduce computation and prevent overfitting.' },
            { question: 'What is the purpose of Dropout layers?', options: ['To add more neurons', 'To prevent overfitting by randomly dropping neurons', 'To increase model size', 'To speed up training'], correctAnswer: 1, explanation: 'Dropout layers randomly drop neurons during training to prevent overfitting by forcing the network to learn redundant representations.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'AI Applications',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Natural Language Processing', duration: 35, type: 'video', completed: false, difficulty: 'advanced', xp: 65, videoId: '8Htifnyk-7Y' },
          { id: 'l8', title: 'Computer Vision', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70, videoId: '8Htifnyk-7Y', notes: '## Computer Vision\n\n### What is Computer Vision?\nField of AI that enables computers to understand and interpret visual information.\n\n### Common Tasks\n- **Image Classification**: Categorize images\n- **Object Detection**: Locate objects in images\n- **Semantic Segmentation**: Pixel-level classification\n- **Image Generation**: Create new images\n\n### Image Classification with Pre-trained Model\n```python\nimport tensorflow as tf\nfrom tensorflow.keras.applications import ResNet50\nfrom tensorflow.keras.preprocessing import image\nimport numpy as np\n\n# Load pre-trained model\nmodel = ResNet50(weights=\'imagenet\')\n\n# Load and preprocess image\nimg = image.load_img(\'image.jpg\', target_size=(224, 224))\nx = image.img_to_array(img)\nx = np.expand_dims(x, axis=0)\nx = tf.keras.applications.resnet50.preprocess_input(x)\n\n# Predict\npredictions = model.predict(x)\nprint(tf.keras.applications.resnet50.decode_predictions(predictions, top=3)[0])\n```\n\n### Object Detection with TensorFlow Object Detection API\n```python\nimport tensorflow as tf\nimport cv2\n\n# Load model\ndetect_fn = tf.saved_model.load(\'path/to/model\')\n\n# Detect objects\nimage_np = cv2.imread(\'image.jpg\')\ninput_tensor = tf.convert_to_tensor(image_np)\ndetections = detect_fn(input_tensor)\n```\n\n### Practice Exercise\n1. Use pre-trained model for classification\n2. Implement object detection\n3. Build image similarity search\n4. Create custom image classifier' },
          { id: 'l9', title: 'AI Capstone Project', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120, videoId: '8Htifnyk-7Y', notes: '## AI Capstone Project: Intelligent Document Analyzer\n\n### Project Overview\nBuild an AI system that can analyze documents, extract information, and classify content.\n\n### Requirements\n\n**Features**:\n- Text extraction from images (OCR)\n- Document classification\n- Entity extraction (names, dates, amounts)\n- Sentiment analysis\n- Summary generation\n\n**Technologies**:\n- TensorFlow/Keras for ML\n- Tesseract for OCR\n- spaCy for NLP\n- OpenCV for image processing\n\n### Implementation Steps\n\n1. **Data Collection**\n   - Gather sample documents\n   - Create labeled dataset\n   - Preprocess images\n\n2. **OCR Integration**\n   - Implement Tesseract OCR\n   - Preprocess images for better accuracy\n   - Handle different document types\n\n3. **Classification Model**\n   - Train CNN for document type classification\n   - Implement transfer learning\n   - Evaluate model performance\n\n4. **NLP Pipeline**\n   - Extract entities using spaCy\n   - Implement sentiment analysis\n   - Generate summaries\n\n5. **API Development**\n   - Create REST API\n   - Handle file uploads\n   - Return structured results\n\n### Bonus Features\n- Multi-language support\n- Handwriting recognition\n- Document comparison\n- Real-time processing\n\n### Submission\nDeploy application with API documentation and demo.' },
          { id: 'l9-quiz', title: 'AI Applications Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is NLP used for?', options: ['Image processing', 'Understanding and generating human language', 'Database management', 'Network security'], correctAnswer: 1, explanation: 'NLP (Natural Language Processing) is used for understanding and generating human language, enabling computers to process text and speech.' },
            { question: 'What is Computer Vision?', options: ['A type of database', 'Field of AI for understanding visual information', 'A programming language', 'A web framework'], correctAnswer: 1, explanation: 'Computer Vision is a field of AI that enables computers to understand and interpret visual information from images and videos.' },
            { question: 'What is OCR used for?', options: ['Object detection', 'Extracting text from images', 'Image classification', 'Speech recognition'], correctAnswer: 1, explanation: 'OCR (Optical Character Recognition) is used to extract text from images, converting scanned documents into machine-readable text.' },
            { question: 'What is a pre-trained model?', options: ['A model trained from scratch', 'A model already trained on a large dataset that can be fine-tuned', 'A model with no training', 'A testing tool'], correctAnswer: 1, explanation: 'A pre-trained model is a model already trained on a large dataset that can be fine-tuned for specific tasks, saving time and resources.' },
            { question: 'What is semantic segmentation?', options: ['Classifying entire images', 'Pixel-level classification of images', 'Object detection', 'Image generation'], correctAnswer: 1, explanation: 'Semantic segmentation is pixel-level classification where each pixel in an image is assigned to a specific class or category.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Engineering',
    description: 'Master ML algorithms, model training, evaluation, deployment, and build production ML systems with Scikit-learn and TensorFlow.',
    instructor: 'Dr. Lisa Wang',
    instructorAvatar: 'ðŸ‘©â€ðŸ”¬',
    category: 'AI & ML',
    tags: ['ML', 'Scikit-learn', 'TensorFlow', 'Model Deployment'],
    level: 'advanced',
    duration: 50,
    rating: 4.8,
    totalRatings: 8900,
    totalStudents: 48700,
    thumbnail: '',
    color: 'from-green-500 to-teal-600',
    icon: 'ðŸ¤–',
    xpReward: 1000,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['python', 'artificial-intelligence'],
    relatedCourses: ['artificial-intelligence', 'python', 'dsa'],
    learningPath: ['python', 'artificial-intelligence', 'machine-learning'],
    quiz: quizzes['ml'],
    modules: [
      {
        id: 'm1',
        title: 'ML Algorithms',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Supervised Learning', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 45, videoId: 'ukzFI9rgwfU' },
          { id: 'l2', title: 'Unsupervised Learning', duration: 22, type: 'video', completed: false, difficulty: 'advanced', xp: 40, videoId: 'x4r8mPy7OOU' },
          { id: 'l3', title: 'Feature Engineering', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60, videoId: 'ukzFI9rgwfU', notes: '## Feature Engineering\n\n### What is Feature Engineering?\nProcess of using domain knowledge to create features that make ML algorithms work better.\n\n### Types of Features\n\n**Numerical Features**: Continuous values\n```python\n# Scaling\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler\n\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n```\n\n**Categorical Features**: Discrete values\n```python\n# One-hot encoding\nfrom sklearn.preprocessing import OneHotEncoder\n\nencoder = OneHotEncoder()\nX_encoded = encoder.fit_transform(X_categorical)\n```\n\n**Text Features**: Text data\n```python\n# TF-IDF\nfrom sklearn.feature_extraction.text import TfidfVectorizer\n\nvectorizer = TfidfVectorizer(max_features=1000)\nX_text = vectorizer.fit_transform(text_data)\n```\n\n### Feature Selection\n```python\nfrom sklearn.feature_selection import SelectKBest, f_classif\n\nselector = SelectKBest(f_classif, k=10)\nX_selected = selector.fit_transform(X, y)\n```\n\n### Feature Creation\n```python\n# Polynomial features\nfrom sklearn.preprocessing import PolynomialFeatures\n\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X)\n```\n\n### Practice Exercise\n1. Create numerical features from raw data\n2. Encode categorical variables\n3. Select important features\n4. Create polynomial features' },
          { id: 'l3-quiz', title: 'ML Algorithms Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is the difference between supervised and unsupervised learning?', options: ['No difference', 'Supervised uses labeled data, unsupervised uses unlabeled', 'Unsupervised uses labeled data, supervised uses unlabeled', 'Both use labeled data'], correctAnswer: 1, explanation: 'Supervised learning uses labeled data with known outputs, while unsupervised learning finds patterns in unlabeled data without predefined outputs.' },
            { question: 'What is feature engineering?', options: ['Creating features from raw data using domain knowledge', 'Training models', 'Testing models', 'Deploying models'], correctAnswer: 0, explanation: 'Feature engineering is the process of using domain knowledge to create features that make machine learning algorithms work better.' },
            { question: 'What is one-hot encoding used for?', options: ['Numerical features', 'Categorical features', 'Text features', 'Image features'], correctAnswer: 1, explanation: 'One-hot encoding is used to convert categorical variables into binary vectors that machine learning algorithms can process.' },
            { question: 'What is the purpose of feature selection?', options: ['To add more features', 'To select the most relevant features and reduce dimensionality', 'To create new features', 'To normalize data'], correctAnswer: 1, explanation: 'Feature selection helps identify and select the most relevant features to improve model performance and reduce overfitting.' },
            { question: 'What is TF-IDF used for?', options: ['Image processing', 'Text feature extraction', 'Numerical scaling', 'Categorical encoding'], correctAnswer: 1, explanation: 'TF-IDF (Term Frequency-Inverse Document Frequency) is used to convert text data into numerical features for machine learning.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Model Training & Evaluation',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Cross-Validation', duration: 20, type: 'exercise', completed: false, difficulty: 'advanced', xp: 45, videoId: 'x4r8mPy7OOU', notes: '## Cross-Validation\n\n### What is Cross-Validation?\nTechnique to assess model performance by splitting data multiple times.\n\n### K-Fold Cross-Validation\n```python\nfrom sklearn.model_selection import cross_val_score, KFold\nfrom sklearn.ensemble import RandomForestClassifier\n\nmodel = RandomForestClassifier()\n\n# 5-fold cross-validation\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"CV Scores: {scores}")\nprint(f"Mean CV Score: {scores.mean():.3f} (+/- {scores.std():.3f})")\n```\n\n### Stratified K-Fold\nMaintains class distribution in each fold.\n```python\nfrom sklearn.model_selection import StratifiedKFold\n\nskf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X, y, cv=skf)\n```\n\n### Leave-One-Out Cross-Validation\nEach sample is used once as test set.\n```python\nfrom sklearn.model_selection import LeaveOneOut\n\nloo = LeaveOneOut()\nscores = cross_val_score(model, X, y, cv=loo)\n```\n\n### When to Use Each\n- **K-Fold**: General purpose, balanced\n- **Stratified**: Imbalanced datasets\n- **LOO**: Small datasets, computationally expensive\n\n### Practice Exercise\n1. Implement K-fold cross-validation\n2. Compare with stratified K-fold\n3. Analyze variance in scores\n4. Choose appropriate CV strategy' },
          { id: 'l5', title: 'Hyperparameter Tuning', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65, videoId: 'x4r8mPy7OOU', notes: '## Hyperparameter Tuning\n\n### What are Hyperparameters?\nParameters set before training that control model behavior.\n\n### Grid Search\nExhaustive search over parameter grid.\n```python\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.svm import SVC\n\nparam_grid = {\n    \'C\': [0.1, 1, 10],\n    \'kernel\': [\'rbf\', \'linear\'],\n    \'gamma\': [\'scale\', \'auto\']\n}\n\ngrid_search = GridSearchCV(SVC(), param_grid, cv=5)\ngrid_search.fit(X_train, y_train)\n\nprint(f"Best params: {grid_search.best_params_}")\nprint(f"Best score: {grid_search.best_score_}")\n```\n\n### Random Search\nRandom sampling from parameter distributions.\n```python\nfrom sklearn.model_selection import RandomizedSearchCV\nfrom scipy.stats import uniform\n\nparam_dist = {\n    \'C\': uniform(0.1, 10),\n    \'kernel\': [\'rbf\', \'linear\'],\n    \'gamma\': [\'scale\', \'auto\']\n}\n\nrandom_search = RandomizedSearchCV(SVC(), param_dist, n_iter=20, cv=5)\nrandom_search.fit(X_train, y_train)\n```\n\n### Bayesian Optimization\nSmarter search using past evaluations.\n```python\nfrom skopt import BayesSearchCV\n\nopt = BayesSearchCV(\n    SVC(),\n    {\n        \'C\': (0.1, 10.0, \'log-uniform\'),\n        \'gamma\': (1e-6, 1e-1, \'log-uniform\')\n    },\n    n_iter=32,\n    cv=5\n)\nopt.fit(X_train, y_train)\n```\n\n### Practice Exercise\n1. Tune hyperparameters for Random Forest\n2. Compare grid vs random search\n3. Implement Bayesian optimization\n4. Analyze hyperparameter importance' },
          { id: 'l6', title: 'Model Evaluation Metrics', duration: 25, type: 'exercise', completed: false, difficulty: 'advanced', xp: 55, videoId: 'x4r8mPy7OOU', notes: '## Model Evaluation Metrics\n\n### Classification Metrics\n\n**Accuracy**: Overall correctness\n```python\nfrom sklearn.metrics import accuracy_score\naccuracy = accuracy_score(y_test, y_pred)\n```\n\n**Precision**: True positives / predicted positives\n```python\nfrom sklearn.metrics import precision_score\nprecision = precision_score(y_test, y_pred)\n```\n\n**Recall**: True positives / actual positives\n```python\nfrom sklearn.metrics import recall_score\nrecall = recall_score(y_test, y_pred)\n```\n\n**F1-Score**: Harmonic mean of precision and recall\n```python\nfrom sklearn.metrics import f1_score\nf1 = f1_score(y_test, y_pred)\n```\n\n**Confusion Matrix**\n```python\nfrom sklearn.metrics import confusion_matrix\nimport seaborn as sns\n\ncm = confusion_matrix(y_test, y_pred)\nsns.heatmap(cm, annot=True)\n```\n\n### Regression Metrics\n\n**MSE**: Mean squared error\n```python\nfrom sklearn.metrics import mean_squared_error\nmse = mean_squared_error(y_test, y_pred)\n```\n\n**RMSE**: Root mean squared error\n```python\nrmse = np.sqrt(mse)\n```\n\n**R2**: Coefficient of determination\n```python\nfrom sklearn.metrics import r2_score\nr2 = r2_score(y_test, y_pred)\n```\n\n### Practice Exercise\n1. Calculate classification metrics\n2. Analyze confusion matrix\n3. Compute regression metrics\n4. Choose appropriate metric for problem' },
          { id: 'l6-quiz', title: 'Model Training Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is the purpose of cross-validation?', options: ['To train the model', 'To assess model performance by splitting data multiple times', 'To create new features', 'To deploy the model'], correctAnswer: 1, explanation: 'Cross-validation assesses model performance by splitting data multiple times to get a more reliable estimate of how the model will perform on unseen data.' },
            { question: 'What is the difference between K-fold and stratified K-fold?', options: ['No difference', 'Stratified maintains class distribution in each fold', 'K-fold is faster', 'Stratified is for regression only'], correctAnswer: 1, explanation: 'Stratified K-fold maintains the class distribution in each fold, which is important for imbalanced datasets.' },
            { question: 'What is hyperparameter tuning?', options: ['Training the model', 'Optimizing parameters set before training', 'Testing the model', 'Deploying the model'], correctAnswer: 1, explanation: 'Hyperparameter tuning is the process of optimizing parameters that are set before training to control model behavior and improve performance.' },
            { question: 'What is the F1-score?', options: ['Accuracy metric', 'Harmonic mean of precision and recall', 'Regression metric', 'Training speed metric'], correctAnswer: 1, explanation: 'F1-score is the harmonic mean of precision and recall, providing a balanced measure for classification performance.' },
            { question: 'What is the purpose of Grid Search?', options: ['To create features', 'Exhaustive search over parameter grid to find best hyperparameters', 'To test the model', 'To deploy the model'], correctAnswer: 1, explanation: 'Grid Search performs an exhaustive search over a specified parameter grid to find the best combination of hyperparameters.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'ML Deployment',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Model Serialization', duration: 20, type: 'video', completed: false, difficulty: 'advanced', xp: 40, videoId: '7B4qXoYpMzI' },
          { id: 'l8', title: 'API Deployment', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65, videoId: '7B4qXoYpMzI', notes: '## API Deployment\n\n### Flask API for ML Model\n```python\nfrom flask import Flask, request, jsonify\nimport joblib\nimport numpy as np\n\napp = Flask(__name__)\n\n# Load model\nmodel = joblib.load(\'model.pkl\')\n\n@app.route(\'/predict\', methods=[\'POST\'])\ndef predict():\n    data = request.json\n    features = np.array(data[\'features\']).reshape(1, -1)\n    prediction = model.predict(features)\n    return jsonify({\'prediction\': int(prediction[0])})\n\nif __name__ == \'__main__\':\n    app.run(host=\'0.0.0.0\', port=5000)\n```\n\n### FastAPI (Modern Alternative)\n```python\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\nimport joblib\nimport numpy as np\n\napp = FastAPI()\nmodel = joblib.load(\'model.pkl\')\n\nclass PredictionRequest(BaseModel):\n    features: list\n\n@app.post(\'/predict\')\ndef predict(request: PredictionRequest):\n    features = np.array(request.features).reshape(1, -1)\n    prediction = model.predict(features)\n    return {\'prediction\': int(prediction[0])}\n```\n\n### Docker Containerization\n```dockerfile\nFROM python:3.9-slim\n\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\n\nCOPY model.pkl .\nCOPY app.py .\n\nEXPOSE 5000\nCMD ["python", "app.py"]\n```\n\n### Practice Exercise\n1. Create Flask API for model\n2. Test API with Postman\n3. Dockerize the application\n4. Deploy to cloud platform' },
          { id: 'l9', title: 'ML Pipeline Project', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120, videoId: '7B4qXoYpMzI', notes: '## ML Pipeline Project: End-to-End ML System\n\n### Project Overview\nBuild a complete ML pipeline from data collection to deployment.\n\n### Pipeline Components\n\n1. **Data Ingestion**\n   - Automated data collection\n   - Data validation\n   - Storage in database\n\n2. **Data Processing**\n   - Cleaning and preprocessing\n   - Feature engineering\n   - Train/test split\n\n3. **Model Training**\n   - Automated training\n   - Hyperparameter tuning\n   - Model evaluation\n\n4. **Model Serving**\n   - REST API deployment\n   - Batch prediction\n   - Real-time inference\n\n5. **Monitoring**\n   - Model performance tracking\n   - Data drift detection\n   - Alerting\n\n### Implementation Steps\n\n**Step 1**: Setup project structure\n```\nml-pipeline/\nâ”œâ”€â”€ data/\nâ”œâ”€â”€ src/\nâ”‚   â”œâ”€â”€ ingestion.py\nâ”‚   â”œâ”€â”€ preprocessing.py\nâ”‚   â”œâ”€â”€ training.py\nâ”‚   â””â”€â”€ serving.py\nâ”œâ”€â”€ models/\nâ”œâ”€â”€ tests/\nâ””â”€â”€ requirements.txt\n```\n\n**Step 2**: Implement data pipeline\n- Automated data collection\n- Data validation checks\n- Feature engineering pipeline\n\n**Step 3**: Build training pipeline\n- Automated model training\n- Hyperparameter optimization\n- Model selection\n\n**Step 4**: Deploy model\n- Create API endpoint\n- Docker container\n- Cloud deployment\n\n**Step 5**: Add monitoring\n- Log predictions\n- Track performance\n- Set up alerts\n\n### Bonus Features\n- A/B testing for models\n- Automated retraining\n- Feature importance tracking\n- Model versioning\n\n### Submission\nDeploy complete pipeline with documentation.' },
          { id: 'l9-quiz', title: 'ML Deployment Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is model serialization?', options: ['Training the model', 'Saving trained model to disk for later use', 'Testing the model', 'Creating features'], correctAnswer: 1, explanation: 'Model serialization is the process of saving a trained model to disk so it can be loaded later for making predictions without retraining.' },
            { question: 'What is Flask used for in ML deployment?', options: ['Training models', 'Creating web APIs to serve ML models', 'Data visualization', 'Feature engineering'], correctAnswer: 1, explanation: 'Flask is used to create web APIs that can serve ML models by exposing endpoints for making predictions.' },
            { question: 'What is the purpose of Docker in ML deployment?', options: ['To train models', 'To containerize applications for consistent deployment', 'To visualize data', 'To create features'], correctAnswer: 1, explanation: 'Docker is used to containerize ML applications, ensuring they run consistently across different environments and simplifying deployment.' },
            { question: 'What is model monitoring?', options: ['Training the model', 'Tracking model performance and data drift in production', 'Testing the model', 'Creating features'], correctAnswer: 1, explanation: 'Model monitoring involves tracking model performance and detecting data drift in production to ensure the model continues to perform well.' },
            { question: 'What is an ML pipeline?', options: ['A single model', 'An automated end-to-end system for ML workflows', 'A database', 'A visualization tool'], correctAnswer: 1, explanation: 'An ML pipeline is an automated end-to-end system that handles data ingestion, processing, model training, and deployment.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing with AWS',
    description: 'Master AWS services, EC2, S3, Lambda, Docker, Kubernetes, and build scalable cloud infrastructure.',
    instructor: 'Michael Thompson',
    instructorAvatar: 'ðŸ‘¨â€ðŸ«',
    category: 'Cloud',
    tags: ['AWS', 'Cloud', 'Docker', 'Kubernetes'],
    level: 'intermediate',
    duration: 45,
    rating: 4.7,
    totalRatings: 7800,
    totalStudents: 42300,
    thumbnail: '',
    color: 'from-cyan-400 to-blue-500',
    icon: 'â˜ï¸',
    xpReward: 900,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['devops', 'fullstack', 'spring-boot'],
    learningPath: ['cloud-computing', 'devops', 'fullstack'],
    quiz: quizzes['cloud'],
    modules: [
      {
        id: 'm1',
        title: 'AWS Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Cloud Computing Basics', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoId: '3fwVx9k-70c' },
          { id: 'l2', title: 'AWS Console & IAM', duration: 22, type: 'exercise', completed: false, difficulty: 'beginner', xp: 40, videoId: '3fwVx9k-70c', notes: '## AWS Console & IAM\n\n### AWS Management Console\nWeb-based interface for managing AWS services.\n\n### Navigation\n- **Services Menu**: Access all AWS services\n- **Region Selector**: Choose AWS region\n- **Account Menu**: Account settings and billing\n\n### IAM (Identity and Access Management)\nService for securely controlling access to AWS resources.\n\n### IAM Users\n```json\n{\n  "UserName": "developer",\n  "PermissionsBoundary": "arn:aws:iam::aws:policy/PowerUserAccess"\n}\n```\n\n### IAM Roles\n- Temporary security credentials\n- Assumed by services (EC2, Lambda)\n- No long-term credentials\n\n### IAM Policies\nJSON documents that define permissions.\n\n```json\n{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": "s3:*",\n      "Resource": "*"\n    }\n  ]\n}\n```\n\n### Best Practices\n- Use IAM roles instead of access keys\n- Apply least privilege principle\n- Enable MFA for root account\n- Regularly rotate credentials\n- Use IAM groups for user management\n\n### Practice Exercise\n1. Create IAM user with programmatic access\n2. Create custom IAM policy\n3. Attach policy to user\n4. Enable MFA for account' },
          { id: 'l3', title: 'EC2 Instances', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: '3fwVx9k-70c', notes: '## EC2 Instances\n\n### What is EC2?\nElastic Compute Cloud - virtual servers in the cloud.\n\n### Launching an Instance\n\n1. **Choose AMI** (Amazon Machine Image)\n   - Amazon Linux 2\n   - Ubuntu\n   - Windows Server\n\n2. **Select Instance Type**\n   - t2.micro: Free tier eligible\n   - t3.medium: General purpose\n   - m5.large: Memory optimized\n\n3. **Configure Instance**\n   - Network settings\n   - Storage (EBS volumes)\n   - Security groups\n\n4. **Launch** with key pair\n\n### Connecting to EC2\n\n**SSH (Linux/Mac)**:\n```bash\nssh -i my-key-pair.pem ec2-user@public-ip\n```\n\n**SSH (Windows)**:\n- Use PuTTY\n- Convert .pem to .ppk\n\n### Security Groups\nVirtual firewall for instances.\n\n```json\n{\n  "InboundRules": [\n    {\n      "IpProtocol": "tcp",\n      "FromPort": 22,\n      "ToPort": 22,\n      "IpRanges": ["0.0.0.0/0"]\n    }\n  ]\n}\n```\n\n### Practice Exercise\n1. Launch EC2 instance\n2. Configure security group\n3. Connect via SSH\n4. Install web server on instance' },
          { id: 'l3-quiz', title: 'AWS Fundamentals Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is IAM used for in AWS?', options: ['Storage', 'Identity and Access Management', 'Compute', 'Networking'], correctAnswer: 1, explanation: 'IAM (Identity and Access Management) is used for securely controlling access to AWS resources and managing user permissions.' },
            { question: 'What is EC2?', options: ['Storage service', 'Elastic Compute Cloud - virtual servers', 'Database service', 'Serverless compute'], correctAnswer: 1, explanation: 'EC2 (Elastic Compute Cloud) provides virtual servers in the cloud that you can launch and manage.' },
            { question: 'What is a security group in AWS?', options: ['A user group', 'A virtual firewall for EC2 instances', 'A storage bucket', 'A database'], correctAnswer: 1, explanation: 'A security group acts as a virtual firewall for EC2 instances, controlling inbound and outbound traffic.' },
            { question: 'What is the purpose of an IAM role?', options: ['Long-term credentials', 'Temporary security credentials for services', 'User authentication', 'Storage management'], correctAnswer: 1, explanation: 'IAM roles provide temporary security credentials that can be assumed by AWS services like EC2 and Lambda.' },
            { question: 'What is an AMI in EC2?', options: ['Access Management Interface', 'Amazon Machine Image - template for instances', 'Application Management Interface', 'Auto Scaling Instance'], correctAnswer: 1, explanation: 'AMI (Amazon Machine Image) is a template that contains the software configuration required to launch an EC2 instance.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Storage & Databases',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'S3 Storage', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoId: 'gAOnWNCT7X0' },
          { id: 'l5', title: 'RDS & DynamoDB', duration: 28, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 55, videoId: 'gAOnWNCT7X0', notes: '## RDS & DynamoDB\n\n### Amazon RDS\nRelational Database Service for managed relational databases.\n\n### Supported Engines\n- MySQL\n- PostgreSQL\n- Oracle\n- SQL Server\n- Aurora\n\n### Creating RDS Instance\n1. Choose engine (MySQL, PostgreSQL, etc.)\n2. Select instance class\n3. Configure storage\n4. Set master username/password\n5. Configure VPC and security groups\n6. Launch instance\n\n### Connecting to RDS\n```python\nimport pymysql\n\nconnection = pymysql.connect(\n    host=\'rds-endpoint.amazonaws.com\',\n    user=\'admin\',\n    password=\'password\',\n    database=\'mydb\'\n)\n```\n\n### Amazon DynamoDB\nNoSQL database service for single-digit millisecond performance.\n\n### DynamoDB Tables\n- **Partition Key**: Primary key\n- **Sort Key**: Optional secondary key\n- **Items**: Data records\n\n### Creating Table\n```python\nimport boto3\n\ndynamodb = boto3.resource(\'dynamodb\')\ntable = dynamodb.create_table(\n    TableName=\'Users\',\n    KeySchema=[\n        {\'AttributeName\': \'userId\', \'KeyType\': \'HASH\'}\n    ],\n    AttributeDefinitions=[\n        {\'AttributeName\': \'userId\', \'AttributeType\': \'S\'}\n    ],\n    ProvisionedThroughput={\n        \'ReadCapacityUnits\': 5,\n        \'WriteCapacityUnits\': 5\n    }\n)\n```\n\n### Practice Exercise\n1. Create RDS MySQL instance\n2. Connect and create database\n3. Create DynamoDB table\n4. Insert and query items' },
          { id: 'l6', title: 'VPC & Networking', duration: 25, type: 'exercise', completed: false, difficulty: 'advanced', xp: 50, videoId: 'gAOnWNCT7X0', notes: '## VPC & Networking\n\n### What is VPC?\nVirtual Private Cloud - isolated network in AWS cloud.\n\n### VPC Components\n\n**Subnets**: Network segments within VPC\n- Public subnets: Internet accessible\n- Private subnets: No direct internet access\n\n**Route Tables**: Control network routing\n- Main route table\n- Custom route tables\n\n**Internet Gateway**: Enable internet access\n- Attached to VPC\n- Routes traffic to internet\n\n**NAT Gateway**: Enable internet for private subnets\n- Managed service\n- Highly available\n\n### Creating VPC\n```python\nimport boto3\n\nec2 = boto3.resource(\'ec2\')\n\n# Create VPC\nvpc = ec2.create_vpc(CidrBlock=\'10.0.0.0/16\')\n\n# Create subnet\nsubnet = vpc.create_subnet(CidrBlock=\'10.0.1.0/24\')\n\n# Create internet gateway\nigw = ec2.create_internet_gateway()\nvpc.attach_internet_gateway(InternetGatewayId=igw.id)\n\n# Create route table\nroute_table = vpc.create_route_table()\nroute_table.create_route(\n    DestinationCidrBlock=\'0.0.0.0/0\',\n    GatewayId=igw.id\n)\n```\n\n### Security Best Practices\n- Use private subnets for databases\n- Implement network ACLs\n- Use security groups as firewall\n- Enable VPC flow logs\n\n### Practice Exercise\n1. Create VPC with public/private subnets\n2. Configure internet gateway\n3. Set up NAT gateway\n4. Launch instances in subnets' },
          { id: 'l6-quiz', title: 'Storage & Databases Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is S3 used for in AWS?', options: ['Compute', 'Object storage service', 'Database service', 'Networking'], correctAnswer: 1, explanation: 'S3 (Simple Storage Service) is an object storage service that offers industry-leading scalability, data availability, security, and performance.' },
            { question: 'What is RDS?', options: ['Storage service', 'Relational Database Service for managed databases', 'Compute service', 'Serverless compute'], correctAnswer: 1, explanation: 'RDS (Relational Database Service) is a managed relational database service that supports multiple database engines.' },
            { question: 'What is DynamoDB?', options: ['Relational database', 'NoSQL database service', 'Storage service', 'Compute service'], correctAnswer: 1, explanation: 'DynamoDB is a NoSQL database service that provides single-digit millisecond performance at any scale.' },
            { question: 'What is a VPC?', options: ['Virtual Private Cloud - isolated network', 'Storage bucket', 'Database', 'Compute instance'], correctAnswer: 0, explanation: 'VPC (Virtual Private Cloud) is an isolated network in the AWS cloud where you can launch AWS resources.' },
            { question: 'What is a subnet in AWS?', options: ['A storage bucket', 'A network segment within a VPC', 'A database', 'A compute instance'], correctAnswer: 1, explanation: 'A subnet is a network segment within a VPC that allows you to partition your network into smaller, isolated sections.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'Serverless & Containers',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'AWS Lambda', duration: 22, type: 'video', completed: false, difficulty: 'advanced', xp: 40, videoId: 'eBmGI8-2vYQ' },
          { id: 'l8', title: 'Docker Basics', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'eBmGI8-2vYQ', notes: '## Docker Basics\n\n### What is Docker?\nPlatform for developing, shipping, and running applications in containers.\n\n### Dockerfile\nText document with instructions to build an image.\n\n```dockerfile\nFROM python:3.9-slim\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\n\nCOPY . .\n\nEXPOSE 5000\nCMD ["python", "app.py"]\n```\n\n### Building an Image\n```bash\ndocker build -t myapp:1.0 .\n```\n\n### Running a Container\n```bash\ndocker run -p 5000:5000 myapp:1.0\n```\n\n### Docker Commands\n\n**List containers**:\n```bash\ndocker ps -a\n```\n\n**Stop container**:\n```bash\ndocker stop <container-id>\n```\n\n**Remove container**:\n```bash\ndocker rm <container-id>\n```\n\n**Remove image**:\n```bash\ndocker rmi <image-id>\n```\n\n### Docker Compose\nDefine and run multi-container applications.\n\n```yaml\nversion: \'3.8\'\nservices:\n  web:\n    build: .\n    ports:\n      - "5000:5000"\n  db:\n    image: postgres:13\n    environment:\n      POSTGRES_PASSWORD: password\n```\n\n### Practice Exercise\n1. Create Dockerfile for Node.js app\n2. Build and run container\n3. Use Docker Compose for multi-app\n4. Push image to Docker Hub' },
          { id: 'l9', title: 'Kubernetes Introduction', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60, videoId: 'eBmGI8-2vYQ', notes: '## Kubernetes Introduction\n\n### What is Kubernetes?\nContainer orchestration platform for automating deployment, scaling, and management.\n\n### Key Concepts\n\n**Pod**: Smallest deployable unit\n- One or more containers\n- Shared storage/network\n\n**Deployment**: Manages pods\n- Replica management\n- Rolling updates\n- Rollbacks\n\n**Service**: Exposes pods\n- Stable network endpoint\n- Load balancing\n\n### Deployment YAML\n```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: webapp\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: webapp\n  template:\n    metadata:\n      labels:\n        app: webapp\n    spec:\n      containers:\n      - name: webapp\n        image: myapp:1.0\n        ports:\n        - containerPort: 5000\n```\n\n### Service YAML\n```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: webapp-service\nspec:\n  selector:\n    app: webapp\n  ports:\n  - protocol: TCP\n    port: 80\n    targetPort: 5000\n  type: LoadBalancer\n```\n\n### kubectl Commands\n```bash\n# Apply configuration\nkubectl apply -f deployment.yaml\n\n# Get pods\nkubectl get pods\n\n# Get services\nkubectl get services\n\n# View logs\nkubectl logs <pod-name>\n\n# Scale deployment\nkubectl scale deployment webapp --replicas=5\n```\n\n### Practice Exercise\n1. Create deployment YAML\n2. Create service YAML\n3. Deploy to Kubernetes cluster\n4. Scale application' },
          { id: 'l9-quiz', title: 'Serverless & Containers Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is AWS Lambda?', options: ['Storage service', 'Serverless compute service', 'Database service', 'Networking service'], correctAnswer: 1, explanation: 'AWS Lambda is a serverless compute service that runs code in response to events and automatically manages the compute resources.' },
            { question: 'What is Docker used for?', options: ['Storage', 'Containerizing applications', 'Database management', 'Networking'], correctAnswer: 1, explanation: 'Docker is used for containerizing applications, allowing them to run consistently across different environments.' },
            { question: 'What is a Dockerfile?', options: ['A container', 'A text document with instructions to build an image', 'A database', 'A network configuration'], correctAnswer: 1, explanation: 'A Dockerfile is a text document that contains instructions for building a Docker image.' },
            { question: 'What is Kubernetes?', options: ['A database', 'Container orchestration platform', 'Storage service', 'Serverless compute'], correctAnswer: 1, explanation: 'Kubernetes is a container orchestration platform for automating deployment, scaling, and management of containerized applications.' },
            { question: 'What is a Pod in Kubernetes?', options: ['A storage bucket', 'The smallest deployable unit containing one or more containers', 'A database', 'A network'], correctAnswer: 1, explanation: 'A Pod is the smallest deployable unit in Kubernetes, containing one or more containers that share storage and network.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security & Ethical Hacking',
    description: 'Learn network security, penetration testing, ethical hacking, cryptography, and protect systems from cyber threats.',
    instructor: 'Alex Rivera',
    instructorAvatar: 'ðŸ‘¨â€ðŸ’»',
    category: 'Security',
    tags: ['Cyber Security', 'Ethical Hacking', 'Network Security', 'Cryptography'],
    level: 'advanced',
    duration: 50,
    rating: 4.8,
    totalRatings: 9200,
    totalStudents: 51800,
    thumbnail: '',
    color: 'from-red-500 to-purple-600',
    icon: 'ðŸ›¡ï¸',
    xpReward: 1100,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['cloud-computing', 'dsa', 'fullstack'],
    learningPath: ['cyber-security', 'cloud-computing', 'dsa'],
    quiz: quizzes['security'],
    modules: [
      {
        id: 'm1',
        title: 'Security Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Introduction to Cyber Security', duration: 20, type: 'video', completed: false, difficulty: 'beginner', xp: 35, videoId: 'inWWhr5tnEA' },
          { id: 'l2', title: 'Network Security Basics', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'inWWhr5tnEA' },
          { id: 'l3', title: 'Cryptography Fundamentals', duration: 22, type: 'reading', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'inWWhr5tnEA', notes: '## Cryptography Fundamentals\n\n### What is Cryptography?\nScience of encoding and decoding information to protect it from unauthorized access.\n\n### Key Concepts\n\n**Encryption**: Converting plaintext to ciphertext\n**Decryption**: Converting ciphertext back to plaintext\n**Key**: Secret used for encryption/decryption\n\n### Types of Encryption\n\n**Symmetric Encryption**: Same key for encryption and decryption\n- AES (Advanced Encryption Standard)\n- DES (Data Encryption Standard)\n- Faster, requires secure key exchange\n\n**Asymmetric Encryption**: Public/private key pair\n- RSA\n- ECC (Elliptic Curve Cryptography)\n- Slower, no key exchange needed\n\n### Hash Functions\nOne-way functions that produce fixed-size output.\n\n**Common Hash Algorithms**:\n- SHA-256\n- MD5 (deprecated, not secure)\n- bcrypt (for passwords)\n\n### Digital Signatures\nVerify authenticity and integrity of messages.\n\n**Process**:\n1. Create hash of message\n2. Encrypt hash with private key\n3. Recipient decrypts with public key\n4. Compare hashes\n\n### Best Practices\n- Use strong encryption algorithms (AES-256)\n- Never roll your own crypto\n- Use established libraries\n- Protect keys properly\n- Use HTTPS for all communications\n\n### Practice Exercise\n1. Encrypt/decrypt with AES\n2. Generate and verify digital signatures\n3. Hash passwords with bcrypt\n4. Compare symmetric vs asymmetric encryption' },
          { id: 'l3-quiz', title: 'Security Fundamentals Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is cryptography?', options: ['Database management', 'Science of encoding and decoding information', 'Network configuration', 'Web development'], correctAnswer: 1, explanation: 'Cryptography is the science of encoding and decoding information to protect it from unauthorized access.' },
            { question: 'What is the difference between symmetric and asymmetric encryption?', options: ['No difference', 'Symmetric uses same key, asymmetric uses public/private pair', 'Asymmetric uses same key, symmetric uses public/private pair', 'Both use same key'], correctAnswer: 1, explanation: 'Symmetric encryption uses the same key for encryption and decryption, while asymmetric encryption uses a public/private key pair.' },
            { question: 'What is a hash function?', options: ['Encryption method', 'One-way function that produces fixed-size output', 'Database query', 'Network protocol'], correctAnswer: 1, explanation: 'A hash function is a one-way function that produces a fixed-size output from variable-size input, commonly used for data integrity.' },
            { question: 'What is AES used for?', options: ['Hashing', 'Symmetric encryption', 'Asymmetric encryption', 'Digital signatures'], correctAnswer: 1, explanation: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for secure data encryption.' },
            { question: 'What is a digital signature used for?', options: ['Encryption', 'Verifying authenticity and integrity of messages', 'Hashing passwords', 'Network routing'], correctAnswer: 1, explanation: 'Digital signatures are used to verify the authenticity and integrity of messages by encrypting a hash with a private key.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Ethical Hacking',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Reconnaissance', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 45, videoId: '3Kq1MIfTWCE' },
          { id: 'l5', title: 'Vulnerability Scanning', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65, videoId: '3Kq1MIfTWCE', notes: '## Vulnerability Scanning\n\n### What is Vulnerability Scanning?\nProcess of identifying security weaknesses in systems and applications.\n\n### Types of Scans\n\n**Network Scanning**: Discover hosts and open ports\n```bash\nnmap -sV -p- 192.168.1.1\n```\n\n**Vulnerability Scanning**: Identify known vulnerabilities\n- Nessus\n- OpenVAS\n- Qualys\n\n### Common Vulnerabilities\n\n**SQL Injection**:\n```sql\n\' OR \'1\'=\'1\' --\n```\n\n**Cross-Site Scripting (XSS)**:\n```html\n<script>alert(\'XSS\')</script>\n```\n\n**Broken Authentication**:\n- Weak passwords\n- Session fixation\n- Missing authentication\n\n### Using Nmap\n```bash\n# Basic scan\nnmap target.com\n\n# Service detection\nnmap -sV target.com\n\n# OS detection\nnmap -O target.com\n\n# Aggressive scan\nnmap -A target.com\n```\n\n### Using Nikto for Web Scanning\n```bash\nnikto -h http://target.com\n```\n\n### Practice Exercise\n1. Scan network with Nmap\n2. Identify open ports and services\n3. Use Nikto for web vulnerability scan\n4. Analyze and document findings' },
          { id: 'l6', title: 'Penetration Testing', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 75, videoId: '3Kq1MIfTWCE', notes: '## Penetration Testing\n\n### What is Penetration Testing?\nAuthorized simulated cyberattack on system to evaluate security.\n\n### Penetration Testing Phases\n\n1. **Reconnaissance**: Gather information about target\n2. **Scanning**: Identify vulnerabilities\n3. **Exploitation**: Attempt to exploit vulnerabilities\n4. **Post-Exploitation**: Maintain access\n5. **Reporting**: Document findings\n\n### Common Tools\n\n**Metasploit**: Exploitation framework\n```bash\nmsfconsole\nsearch exploit\nuse exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS target_ip\nexploit\n```\n\n**Burp Suite**: Web application security testing\n- Proxy for intercepting requests\n- Scanner for vulnerabilities\n- Intruder for automated attacks\n\n**Hydra**: Password cracking\n```bash\nhydra -l user -P wordlist.txt ssh target.com\n```\n\n### Ethical Guidelines\n- Get written permission\n- Define scope clearly\n- Report all findings\n- Don\'t cause damage\n- Maintain confidentiality\n\n### Practice Exercise\n1. Perform authorized penetration test on lab\n2. Use Metasploit for exploitation\n3. Test web app with Burp Suite\n4. Document findings in report' },
          { id: 'l6-quiz', title: 'Ethical Hacking Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is reconnaissance in ethical hacking?', options: ['Exploiting vulnerabilities', 'Gathering information about the target', 'Reporting findings', 'Fixing vulnerabilities'], correctAnswer: 1, explanation: 'Reconnaissance is the process of gathering information about the target system to identify potential vulnerabilities.' },
            { question: 'What is Nmap used for?', options: ['Password cracking', 'Network scanning and discovery', 'Web application testing', 'Log analysis'], correctAnswer: 1, explanation: 'Nmap is a network scanning tool used to discover hosts and open ports on a network.' },
            { question: 'What is SQL injection?', options: ['A type of encryption', 'A vulnerability that allows SQL code execution', 'A network protocol', 'A hashing algorithm'], correctAnswer: 1, explanation: 'SQL injection is a vulnerability that allows attackers to execute malicious SQL queries through input fields.' },
            { question: 'What is Metasploit used for?', options: ['Network monitoring', 'Exploitation framework for penetration testing', 'Web development', 'Database management'], correctAnswer: 1, explanation: 'Metasploit is a framework for developing and executing exploit code against remote target machines.' },
            { question: 'What is the purpose of penetration testing?', options: ['To cause damage', 'To evaluate security by simulating attacks', 'To steal data', 'To disrupt services'], correctAnswer: 1, explanation: 'Penetration testing is an authorized simulated cyberattack to evaluate the security of a system.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'Security Operations',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Incident Response', duration: 22, type: 'video', completed: false, difficulty: 'advanced', xp: 40, videoId: '7zG8vq8g5gU' },
          { id: 'l8', title: 'Security Monitoring', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60, videoId: '7zG8vq8g5gU', notes: '## Security Monitoring\n\n### What is Security Monitoring?\nContinuous observation of systems to detect and respond to security threats.\n\n### Monitoring Components\n\n**Log Management**: Collect and analyze logs\n- System logs\n- Application logs\n- Security logs\n\n**SIEM (Security Information and Event Management)**:\n- Splunk\n- ELK Stack\n- QRadar\n\n### Key Metrics to Monitor\n- Failed login attempts\n- Unusual network traffic\n- File system changes\n- Process execution\n- Privilege escalation\n\n### Using ELK Stack\n```bash\n# Elasticsearch\nsudo systemctl start elasticsearch\n\n# Logstash\nsudo systemctl start logstash\n\n# Kibana\nsudo systemctl start kibana\n```\n\n### Log Analysis with Kibana\n- Create dashboards\n- Set up alerts\n- Visualize data\n- Investigate incidents\n\n### Automated Alerts\n```yaml\n# Alert rule\nalert:\n  type: frequency\n  index: logstash-*\n  num_events: 5\n  timeframe:\n    minutes: 5\n  filter:\n  - term:\n      status: "failed"\n```\n\n### Practice Exercise\n1. Set up ELK stack\n2. Configure log collection\n3. Create security dashboard\n4. Set up automated alerts' },
          { id: 'l9', title: 'Security Capstone', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120, videoId: '7zG8vq8g5gU', notes: '## Security Capstone: Secure Web Application\n\n### Project Overview\nBuild and secure a web application from scratch, implementing comprehensive security measures.\n\n### Requirements\n\n**Application Features**:\n- User authentication\n- Data encryption\n- Secure communication\n- Input validation\n- Session management\n\n**Security Implementation**:\n- HTTPS/TLS\n- Password hashing (bcrypt)\n- CSRF protection\n- XSS prevention\n- SQL injection prevention\n- Rate limiting\n- Security headers\n\n### Implementation Steps\n\n1. **Secure Authentication**\n   - Implement bcrypt password hashing\n   - Use JWT for sessions\n   - Add MFA support\n   - Implement secure password reset\n\n2. **Secure Communication**\n   - Configure HTTPS\n   - Implement HSTS\n   - Use secure cookies\n   - Add CSP headers\n\n3. **Input Validation**\n   - Sanitize all inputs\n   - Use parameterized queries\n   - Implement rate limiting\n   - Add CSRF tokens\n\n4. **Monitoring & Logging**\n   - Log security events\n   - Set up intrusion detection\n   - Monitor for anomalies\n   - Implement alerting\n\n5. **Testing**\n   - Perform penetration testing\n   - Run vulnerability scans\n   - Test authentication flows\n   - Validate encryption\n\n### Bonus Features\n- Implement Web Application Firewall\n- Add DDoS protection\n- Set up honeypot\n- Implement security analytics\n\n### Submission\nDeploy secured application with security documentation and test results.' },
          { id: 'l9-quiz', title: 'Security Operations Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is incident response?', options: ['Creating security policies', 'Process of handling and managing security incidents', 'Monitoring systems', 'Writing code'], correctAnswer: 1, explanation: 'Incident response is the process of handling and managing security incidents to minimize damage and recover quickly.' },
            { question: 'What is SIEM?', options: ['Security Information and Event Management', 'Software Installation and Execution Manager', 'System Integration and Error Management', 'Secure Internet and Email Management'], correctAnswer: 0, explanation: 'SIEM (Security Information and Event Management) is a system that collects and analyzes security-related data from across the organization.' },
            { question: 'What is the ELK Stack used for?', options: ['Web development', 'Log management and security monitoring', 'Database management', 'Network configuration'], correctAnswer: 1, explanation: 'The ELK Stack (Elasticsearch, Logstash, Kibana) is used for log management, security monitoring, and data visualization.' },
            { question: 'What is the purpose of security monitoring?', options: ['To create backups', 'Continuous observation of systems to detect threats', 'To write code', 'To manage users'], correctAnswer: 1, explanation: 'Security monitoring involves continuous observation of systems to detect and respond to security threats in real-time.' },
            { question: 'What is a security capstone project?', options: ['A simple exercise', 'A comprehensive project implementing security measures', 'A video tutorial', 'A documentation task'], correctAnswer: 1, explanation: 'A security capstone project is a comprehensive project that requires implementing multiple security measures in a real-world scenario.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Masterclass',
    description: 'Master user interface and experience design with Figma, design systems, prototyping, and create stunning digital products.',
    instructor: 'Emma Collins',
    instructorAvatar: 'ðŸ‘©â€ðŸŽ¨',
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping'],
    level: 'beginner',
    duration: 40,
    rating: 4.9,
    totalRatings: 13500,
    totalStudents: 89500,
    thumbnail: '',
    color: 'from-pink-500 to-purple-600',
    icon: 'ðŸŽ¨',
    xpReward: 800,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['react-typescript', 'fullstack'],
    learningPath: ['ui-ux-design', 'react-typescript', 'fullstack'],
    quiz: quizzes['design'],
    modules: [
      {
        id: 'm1',
        title: 'Design Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Introduction to UI/UX', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoId: 'mk9XO8iHqIw' },
          { id: 'l2', title: 'Design Principles', duration: 22, type: 'exercise', completed: false, difficulty: 'beginner', xp: 40, videoId: 'mk9XO8iHqIw', notes: '## Design Principles\n\n### Core Design Principles\n\n**Hierarchy**: Visual arrangement showing importance\n- Size: Larger = more important\n- Color: Bright/bold = more important\n- Position: Top/left = more important\n\n**Contrast**: Difference between elements\n- Light vs dark\n- Color vs neutral\n- Large vs small\n\n**Alignment**: Organized visual connection\n- Left alignment for text\n- Center for headlines\n- Grid for layouts\n\n**Proximity**: Related elements grouped together\n- Group related items\n- Use whitespace effectively\n- Create visual relationships\n\n**Repetition**: Consistent design elements\n- Consistent colors\n- Repeated patterns\n- Unified style\n\n**Balance**: Visual weight distribution\n- Symmetrical: Mirror image\n- Asymmetrical: Different but balanced\n\n### Practice Exercise\n1. Create hierarchy in a design\n2. Use contrast effectively\n3. Align elements properly\n4. Group related items with proximity' },
          { id: 'l3', title: 'Color Theory & Typography', duration: 25, type: 'exercise', completed: false, difficulty: 'beginner', xp: 45, videoId: 'mk9XO8iHqIw', notes: '## Color Theory & Typography\n\n### Color Theory\n\n**Color Wheel**:\n- Primary: Red, Blue, Yellow\n- Secondary: Green, Orange, Purple\n- Tertiary: Mix of primary and secondary\n\n**Color Harmonies**:\n- **Complementary**: Opposite colors (red/green)\n- **Analogous**: Adjacent colors (blue/purple)\n- **Triadic**: Three evenly spaced colors\n- **Monochromatic**: Variations of one color\n\n**Color Psychology**:\n- Red: Energy, urgency\n- Blue: Trust, calm\n- Green: Growth, nature\n- Yellow: Optimism, caution\n\n### Typography\n\n**Font Classifications**:\n- **Serif**: Traditional, formal (Times New Roman)\n- **Sans-serif**: Modern, clean (Arial, Roboto)\n- **Display**: Decorative, headlines\n- **Monospace**: Code, technical (Courier)\n\n**Typography Rules**:\n- Limit to 2-3 fonts per design\n- Use hierarchy with size/weight\n- Ensure readability (contrast)\n- Maintain consistent line spacing\n\n**Font Pairing**:\n- Serif heading + Sans-serif body\n- Bold heading + Light body\n- Similar characteristics\n\n### Practice Exercise\n1. Create color palette for app\n2. Apply color harmony principles\n3. Choose font pairings\n4. Test typography readability' },
          { id: 'l3-quiz', title: 'Design Fundamentals Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'beginner', xp: 25, quiz: [
            { question: 'What is visual hierarchy?', options: ['Random arrangement', 'Visual arrangement showing importance', 'Color selection', 'Font choice'], correctAnswer: 1, explanation: 'Visual hierarchy is the arrangement of elements to show their relative importance through size, color, and position.' },
            { question: 'What is contrast in design?', options: ['Similar colors', 'Difference between elements to create visual interest', 'Font size', 'Layout'], correctAnswer: 1, explanation: 'Contrast is the difference between visual elements that helps create visual interest and separation.' },
            { question: 'What are complementary colors?', options: ['Similar colors', 'Opposite colors on the color wheel', 'Same color family', 'Neutral colors'], correctAnswer: 1, explanation: 'Complementary colors are opposite each other on the color wheel, creating high contrast and visual impact.' },
            { question: 'What is the difference between serif and sans-serif fonts?', options: ['No difference', 'Serif has decorative strokes, sans-serif is clean', 'Serif is modern, sans-serif is traditional', 'Both are the same'], correctAnswer: 1, explanation: 'Serif fonts have decorative strokes at the end of characters (traditional), while sans-serif fonts are clean and modern without strokes.' },
            { question: 'What is proximity in design?', options: ['Random placement', 'Grouping related elements together', 'Color selection', 'Font choice'], correctAnswer: 1, explanation: 'Proximity is the principle of grouping related elements together to create visual relationships and organization.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Figma Mastery',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Figma Basics', duration: 20, type: 'video', completed: false, difficulty: 'beginner', xp: 35, videoId: 'FTFaQWZBqQ8' },
          { id: 'l5', title: 'Components & Variants', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'FTFaQWZBqQ8', notes: '## Components & Variants\n\n### Components in Figma\nReusable elements that maintain consistency across designs.\n\n### Creating Components\n1. Select elements\n2. Right-click > Create Component\n3. Name the component\n\n### Component Properties\n- **Main Component**: Source component\n- **Instance**: Copy of component\n- **Overrides**: Changes to instances\n\n### Variants\nDifferent states or versions of a component.\n\n### Creating Variants\n1. Select component\n2. Add variant property\n3. Create variants (hover, active, disabled)\n\n### Common Component Variants\n- **Buttons**: Default, hover, active, disabled\n- **Inputs**: Default, focus, error\n- **Cards**: Default, hover, selected\n\n### Auto Layout\nResponsive layout system for components.\n\n**Settings**:\n- Direction: Horizontal/Vertical\n- Padding: Space around content\n- Gap: Space between items\n- Alignment: How items align\n\n### Practice Exercise\n1. Create button component\n2. Add variants for states\n3. Use auto layout\n4. Create component library' },
          { id: 'l6', title: 'Auto Layout & Constraints', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40, videoId: 'FTFaQWZBqQ8', notes: '## Auto Layout & Constraints\n\n### Auto Layout\nFlexible layout system that adapts to content.\n\n### Auto Layout Properties\n\n**Direction**: Horizontal or Vertical\n```figma\nDirection: Horizontal\n```\n\n**Padding**: Space around content\n- All sides\n- Individual sides\n\n**Gap**: Space between items\n- Horizontal gap\n- Vertical gap\n\n**Alignment**: Item positioning\n- Start, center, end\n- Space between\n\n**Canvas Stacking**: How items overlap\n- First on top\n- Last on top\n\n### Constraints\nHow elements respond to frame resizing.\n\n**Constraint Modes**:\n- **Scale**: Scales proportionally\n- **Fill**: Fills available space\n- **Left/Right/Top/Bottom**: Anchored to edge\n\n### Responsive Design\n```figma\n// Mobile to Desktop\n- Use auto layout for containers\n- Set constraints for elements\n- Use variants for breakpoints\n```\n\n### Practice Exercise\n1. Create responsive card with auto layout\n2. Set constraints for elements\n3. Test resizing behavior\n4. Create responsive layout system' },
          { id: 'l6-quiz', title: 'Figma Mastery Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is a component in Figma?', options: ['A color palette', 'Reusable element that maintains consistency', 'A font style', 'A layout guide'], correctAnswer: 1, explanation: 'A component in Figma is a reusable element that maintains consistency across designs and allows for easy updates.' },
            { question: 'What are variants in Figma?', options: ['Different colors', 'Different states or versions of a component', 'Different fonts', 'Different layouts'], correctAnswer: 1, explanation: 'Variants are different states or versions of a component, such as hover, active, or disabled states.' },
            { question: 'What is auto layout in Figma?', options: ['A color scheme', 'Flexible layout system that adapts to content', 'A font pairing', 'An image format'], correctAnswer: 1, explanation: 'Auto layout is a flexible layout system in Figma that automatically adapts to content changes.' },
            { question: 'What are constraints in Figma?', options: ['Design limitations', 'How elements respond to frame resizing', 'Color restrictions', 'Font rules'], correctAnswer: 1, explanation: 'Constraints determine how elements respond when their parent frame is resized, enabling responsive design.' },
            { question: 'What is the purpose of a component library?', options: ['To store images', 'To maintain design consistency with reusable components', 'To write code', 'To create animations'], correctAnswer: 1, explanation: 'A component library maintains design consistency by providing a collection of reusable components that can be used across designs.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'Prototyping & Design Systems',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Interactive Prototypes', duration: 28, type: 'video', completed: false, difficulty: 'intermediate', xp: 50, videoId: 'aF3E2y5pN9I' },
          { id: 'l8', title: 'Design Systems', duration: 30, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 55, videoId: 'aF3E2y5pN9I', notes: '## Design Systems\n\n### What is a Design System?\nCollection of reusable components, guidelines, and standards for design consistency.\n\n### Design System Components\n\n**Style Guide**:\n- Colors (primary, secondary, neutral)\n- Typography (fonts, sizes, weights)\n- Spacing (scale, margins, padding)\n- Icons (set, usage guidelines)\n\n**Component Library**:\n- Buttons (variants, states)\n- Inputs (types, validation states)\n- Cards (layouts, variants)\n- Navigation (menus, breadcrumbs)\n\n**Pattern Library**:\n- Common layouts\n- User flows\n- Best practices\n\n### Creating a Design System\n\n1. **Audit Existing Design**\n   - Identify patterns\n   - Document inconsistencies\n   - Establish foundation\n\n2. **Define Tokens**\n   ```css\n   /* Colors */\n   --color-primary: #3B82F6;\n   --color-secondary: #10B981;\n   \n   /* Spacing */\n   --spacing-xs: 4px;\n   --spacing-sm: 8px;\n   --spacing-md: 16px;\n   \n   /* Typography */\n   --font-sans: Inter, sans-serif;\n   --text-sm: 14px;\n   --text-md: 16px;\n   ```\n\n3. **Build Components**\n   - Create base components\n- Add variants\n- Document usage\n\n4. **Document Guidelines**\n   - Usage examples\n- Dos and don\'ts\n- Accessibility guidelines\n\n### Practice Exercise\n1. Create color palette\n2. Define typography scale\n3. Build component library\n4. Document design guidelines' },
          { id: 'l9', title: 'Final Design Project', duration: 50, type: 'exercise', completed: false, difficulty: 'advanced', xp: 100, videoId: 'aF3E2y5pN9I', notes: '## Final Design Project: Mobile App Design\n\n### Project Overview\nDesign a complete mobile application from concept to high-fidelity prototype.\n\n### Project Requirements\n\n**Choose One**:\n- E-commerce app\n- Social media app\n- Productivity app\n- Health/fitness app\n\n### Deliverables\n\n1. **Research & Discovery**\n   - User personas\n   - User journey maps\n   - Competitive analysis\n   - Mood board\n\n2. **Wireframes**\n   - Low-fidelity sketches\n   - User flow diagrams\n   - Information architecture\n\n3. **Visual Design**\n   - Color palette\n   - Typography system\n   - Icon set\n   - Style guide\n\n4. **High-Fidelity Mockups**\n   - All key screens\n   - Component library\n   - Design system documentation\n\n5. **Interactive Prototype**\n   - Clickable prototype\n   - User flows\n   - Micro-interactions\n\n6. **Presentation**\n   - Design rationale\n   - User testing results\n   - Iterations and improvements\n\n### Evaluation Criteria\n- Visual consistency\n- User experience quality\n- Design system completeness\n- Innovation and creativity\n- Presentation quality\n\n### Submission\nSubmit Figma file with all screens, prototype link, and design documentation.' },
          { id: 'l9-quiz', title: 'Prototyping & Design Systems Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is a design system?', options: ['A single component', 'Collection of reusable components and guidelines', 'A color palette', 'A font library'], correctAnswer: 1, explanation: 'A design system is a collection of reusable components, guidelines, and standards that ensure design consistency across products.' },
            { question: 'What is an interactive prototype?', options: ['A static image', 'A clickable simulation of the design', 'A document', 'A color scheme'], correctAnswer: 1, explanation: 'An interactive prototype is a clickable simulation of the design that allows users to experience the user flow and interactions.' },
            { question: 'What are design tokens?', options: ['Currency for design', 'Named variables for design values like colors and spacing', 'Design components', 'User personas'], correctAnswer: 1, explanation: 'Design tokens are named variables that store design values like colors, spacing, and typography, enabling consistency across platforms.' },
            { question: 'What is a component library?', options: ['A book about components', 'A collection of reusable UI components', 'A style guide only', 'A prototype'], correctAnswer: 1, explanation: 'A component library is a collection of reusable UI components that can be used across different screens and projects.' },
            { question: 'What is the purpose of user testing in design?', options: ['To waste time', 'To validate design decisions with real users', 'To create animations', 'To choose colors'], correctAnswer: 1, explanation: 'User testing validates design decisions by observing how real users interact with the design, identifying usability issues and improvement opportunities.' }
          ] },
        ]
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD Pipeline',
    description: 'Master DevOps practices, CI/CD pipelines, Docker, Kubernetes, Jenkins, GitLab, and automate software delivery.',
    instructor: 'James Wilson',
    instructorAvatar: 'ðŸ‘¨â€ðŸ”§',
    category: 'DevOps',
    tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Jenkins'],
    level: 'advanced',
    duration: 55,
    rating: 4.8,
    totalRatings: 8700,
    totalStudents: 46200,
    thumbnail: '',
    color: 'from-orange-500 to-blue-600',
    icon: 'â™¾ï¸',
    xpReward: 1100,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['cloud-computing', 'fullstack'],
    relatedCourses: ['cloud-computing', 'fullstack', 'spring-boot'],
    learningPath: ['cloud-computing', 'devops', 'fullstack'],
    quiz: quizzes['devops'],
    modules: [
      {
        id: 'm1',
        title: 'DevOps Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Introduction to DevOps', duration: 18, type: 'video', completed: false, difficulty: 'intermediate', xp: 30, videoId: 'x8z9x7F5W3k' },
          { id: 'l2', title: 'Git & Version Control', duration: 22, type: 'exercise', completed: false, difficulty: 'beginner', xp: 40, videoId: 'x8z9x7F5W3k' },
          { id: 'l3', title: 'CI/CD Concepts', duration: 25, type: 'reading', completed: false, difficulty: 'intermediate', xp: 45, videoId: 'x8z9x7F5W3k', notes: '## CI/CD Concepts\n\n### What is CI/CD?\nContinuous Integration and Continuous Deployment/Delivery practices for automating software delivery.\n\n### Continuous Integration (CI)\nPractice of merging code changes frequently to a shared repository.\n\n**Key Principles**:\n- Automate builds\n- Run automated tests\n- Merge frequently (daily)\n- Fix build failures immediately\n\n**CI Pipeline Stages**:\n1. Code commit\n2. Build compilation\n3. Unit tests\n4. Code quality checks\n5. Integration tests\n\n### Continuous Deployment (CD)\nAutomatically deploying code changes to production.\n\n**CD Pipeline Stages**:\n1. Staging deployment\n2. Integration tests\n3. Production deployment\n4. Smoke tests\n5. Monitoring\n\n### CI/CD Benefits\n- Faster time to market\n- Reduced errors\n- Better code quality\n- Faster bug fixes\n- Improved collaboration\n\n### CI/CD Tools\n- **Jenkins**: Open-source, highly customizable\n- **GitHub Actions**: Integrated with GitHub\n- **GitLab CI**: Built into GitLab\n- **CircleCI**: Cloud-based, easy setup\n- **Travis CI**: Simple configuration\n\n### Best Practices\n- Keep pipelines fast\n- Use caching for dependencies\n- Parallelize tests\n- Monitor pipeline performance\n- Implement rollback strategies\n\n### Practice Exercise\n1. Design CI/CD pipeline for web app\n2. Compare different CI/CD tools\n3. Implement automated testing\n4. Set up monitoring and alerts' },
          { id: 'l3-quiz', title: 'DevOps Fundamentals Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'intermediate', xp: 25, quiz: [
            { question: 'What is CI/CD?', options: ['Code review process', 'Continuous Integration and Continuous Deployment/Delivery', 'Database management', 'Network configuration'], correctAnswer: 1, explanation: 'CI/CD stands for Continuous Integration and Continuous Deployment/Delivery, practices for automating software delivery.' },
            { question: 'What is the purpose of Continuous Integration?', options: ['To write code slower', 'To merge code changes frequently and automate builds/tests', 'To deploy manually', 'To skip testing'], correctAnswer: 1, explanation: 'Continuous Integration is the practice of merging code changes frequently to a shared repository and automating builds and tests.' },
            { question: 'What is Git used for?', options: ['Database management', 'Version control system for tracking code changes', 'Web server', 'Containerization'], correctAnswer: 1, explanation: 'Git is a distributed version control system used for tracking code changes and collaboration.' },
            { question: 'What is a CI pipeline?', options: ['A water pipe', 'Automated process for building and testing code', 'A database query', 'A network protocol'], correctAnswer: 1, explanation: 'A CI pipeline is an automated process that builds, tests, and validates code changes.' },
            { question: 'What is the main benefit of CI/CD?', options: ['Slower development', 'Faster time to market and reduced errors', 'More manual work', 'Less collaboration'], correctAnswer: 1, explanation: 'The main benefits of CI/CD are faster time to market, reduced errors, better code quality, and improved collaboration.' }
          ] },
        ]
      },
      {
        id: 'm2',
        title: 'Containerization',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Docker Deep Dive', duration: 30, type: 'video', completed: false, difficulty: 'advanced', xp: 55, videoId: '3c-iBn71dQE' },
          { id: 'l5', title: 'Docker Compose', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45, videoId: '3c-iBn71dQE', notes: '## Docker Compose\n\n### What is Docker Compose?\nTool for defining and running multi-container Docker applications.\n\n### docker-compose.yml Structure\n```yaml\nversion: \'3.8\'\nservices:\n  web:\n    build: .\n    ports:\n      - "5000:5000"\n    environment:\n      - DATABASE_URL=postgres://db:5432/mydb\n    depends_on:\n      - db\n  db:\n    image: postgres:13\n    environment:\n      - POSTGRES_PASSWORD=password\n    volumes:\n      - db_data:/var/lib/postgresql/data\nvolumes:\n  db_data:\n```\n\n### Common Commands\n\n**Start services**:\n```bash\ndocker-compose up -d\n```\n\n**Stop services**:\n```bash\ndocker-compose down\n```\n\n**View logs**:\n```bash\ndocker-compose logs -f\n```\n\n**Rebuild services**:\n```bash\ndocker-compose up -d --build\n```\n\n### Service Configuration\n\n**Build**: Build from Dockerfile\n**Image**: Use existing image\n**Ports**: Port mapping\n**Volumes**: Data persistence\n**Networks**: Service communication\n**Environment**: Environment variables\n\n### Practice Exercise\n1. Create docker-compose.yml for web app\n2. Add database service\n3. Configure volumes for persistence\n4. Test multi-container setup' },
          { id: 'l6', title: 'Container Orchestration', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 55, videoId: '3c-iBn71dQE', notes: '## Container Orchestration\n\n### What is Orchestration?\nAutomated deployment, scaling, and management of containerized applications.\n\n### Orchestration Challenges\n- Service discovery\n- Load balancing\n- Scaling\n- Self-healing\n- Rolling updates\n\n### Kubernetes vs Docker Swarm\n\n**Kubernetes**:\n- More complex\n- More features\n- Industry standard\n- Steeper learning curve\n\n**Docker Swarm**:\n- Simpler\n- Docker native\n- Fewer features\n- Easier to learn\n\n### Kubernetes Architecture\n\n**Control Plane**:\n- API Server\n- etcd (key-value store)\n- Scheduler\n- Controller Manager\n\n**Worker Nodes**:\n- Kubelet\n- Kube-proxy\n- Container runtime\n\n### Key Kubernetes Resources\n\n**Pod**: Smallest deployable unit\n**Deployment**: Manages pods\n**Service**: Exposes pods\n**ConfigMap**: Configuration data\n**Secret**: Sensitive data\n\n### Practice Exercise\n1. Compare Kubernetes vs Swarm\n2. Deploy simple app to Kubernetes\n3. Configure service discovery\n4. Implement auto-scaling' },
          { id: 'l6-quiz', title: 'Containerization Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is Docker used for?', options: ['Database management', 'Containerizing applications for consistent deployment', 'Web server', 'Version control'], correctAnswer: 1, explanation: 'Docker is used for containerizing applications, allowing them to run consistently across different environments.' },
            { question: 'What is Docker Compose?', options: ['A database', 'Tool for defining and running multi-container Docker applications', 'A web server', 'A version control system'], correctAnswer: 1, explanation: 'Docker Compose is a tool for defining and running multi-container Docker applications using YAML configuration.' },
            { question: 'What is container orchestration?', options: ['Managing containers manually', 'Automated deployment, scaling, and management of containerized applications', 'Creating databases', 'Writing code'], correctAnswer: 1, explanation: 'Container orchestration is the automated deployment, scaling, and management of containerized applications.' },
            { question: 'What is Kubernetes?', options: ['A database', 'Container orchestration platform for automating deployment and scaling', 'A web server', 'A version control system'], correctAnswer: 1, explanation: 'Kubernetes is a container orchestration platform for automating deployment, scaling, and management of containerized applications.' },
            { question: 'What is a Pod in Kubernetes?', options: ['A storage bucket', 'The smallest deployable unit containing one or more containers', 'A database', 'A network'], correctAnswer: 1, explanation: 'A Pod is the smallest deployable unit in Kubernetes, containing one or more containers that share storage and network.' }
          ] },
        ]
      },
      {
        id: 'm3',
        title: 'CI/CD Pipelines',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Jenkins Pipeline', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 45, videoId: 'M9n8k1fMxXg' },
          { id: 'l8', title: 'GitHub Actions', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 55, videoId: 'M9n8k1fMxXg', notes: '## GitHub Actions\n\n### What is GitHub Actions?\nCI/CD platform integrated with GitHub for automating workflows.\n\n### Workflow File Structure\n```yaml\nname: CI/CD Pipeline\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Set up Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: \'18\'\n      - name: Install dependencies\n        run: npm install\n      - name: Run tests\n        run: npm test\n      - name: Build\n        run: npm run build\n```\n\n### Key Components\n\n**Triggers**: When workflows run\n- push, pull_request, schedule, manual\n\n**Jobs**: Tasks to run\n- Can run in parallel\n- Can depend on other jobs\n\n**Steps**: Individual actions\n- Run commands\n- Use actions\n- Set environment variables\n\n### Common Actions\n- actions/checkout: Clone repository\n- actions/setup-node: Setup Node.js\n- actions/setup-python: Setup Python\n- docker/build-push-action: Build and push Docker images\n\n### Secrets Management\n```yaml\n- name: Deploy\n  env:\n    API_KEY: ${{ secrets.API_KEY }}\n  run: deploy.sh\n```\n\n### Practice Exercise\n1. Create CI workflow for Node.js app\n2. Add automated testing\n3. Implement deployment to production\n4. Use secrets for sensitive data' },
          { id: 'l9', title: 'Kubernetes Deployment', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70, videoId: 'M9n8k1fMxXg', notes: '## Kubernetes Deployment\n\n### Deployment Strategy\nRolling updates with zero downtime.\n\n### Deployment YAML\n```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: webapp\nspec:\n  replicas: 3\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  selector:\n    matchLabels:\n      app: webapp\n  template:\n    metadata:\n      labels:\n        app: webapp\n    spec:\n      containers:\n      - name: webapp\n        image: myapp:1.0\n        ports:\n        - containerPort: 5000\n        livenessProbe:\n          httpGet:\n            path: /health\n            port: 5000\n        readinessProbe:\n          httpGet:\n            path: /ready\n            port: 5000\n```\n\n### Service YAML\n```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: webapp-service\nspec:\n  selector:\n    app: webapp\n  ports:\n  - protocol: TCP\n    port: 80\n    targetPort: 5000\n  type: LoadBalancer\n```\n\n### ConfigMap for Configuration\n```yaml\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: webapp-config\ndata:\n  DATABASE_URL: postgres://db:5432/mydb\n  DEBUG: \"false\"\n```\n\n### Deployment Commands\n```bash\n# Apply deployment\nkubectl apply -f deployment.yaml\n\n# Check status\nkubectl rollout status deployment/webapp\n\n# Update image\nkubectl set image deployment/webapp webapp=myapp:2.0\n\n# Rollback\nkubectl rollout undo deployment/webapp\n```\n\n### Practice Exercise\n1. Create deployment with health checks\n2. Implement rolling update strategy\n3. Use ConfigMap for configuration\n4. Test deployment and rollback' },
          { id: 'l10', title: 'DevOps Capstone', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120, videoId: 'M9n8k1fMxXg', notes: '## DevOps Capstone: Complete CI/CD Pipeline\n\n### Project Overview\nBuild a complete CI/CD pipeline from development to production deployment.\n\n### Requirements\n\n**Application**:\n- Web application (Node.js/Python/Java)\n- Database integration\n- Automated tests\n\n**Infrastructure**:\n- Docker containerization\n- Kubernetes deployment\n- Cloud deployment (AWS/GCP/Azure)\n\n**CI/CD Pipeline**:\n- Automated builds\n- Automated testing\n- Automated deployment\n- Rollback capability\n\n### Implementation Steps\n\n1. **Application Setup**\n   - Create web application\n   - Add automated tests\n   - Dockerize application\n   - Test locally\n\n2. **CI Pipeline**\n   - Set up GitHub Actions\n   - Configure build stage\n   - Add test stage\n   - Add code quality checks\n\n3. **CD Pipeline**\n   - Configure staging deployment\n   - Add integration tests\n   - Configure production deployment\n   - Implement rollback\n\n4. **Infrastructure**\n   - Set up Kubernetes cluster\n   - Create deployment manifests\n   - Configure services\n   - Set up ingress\n\n5. **Monitoring**\n   - Add logging\n   - Set up monitoring\n   - Configure alerts\n   - Create dashboards\n\n### Bonus Features\n- Blue-green deployment\n- Canary deployment\n- Automated scaling\n- Security scanning\n- Performance testing\n\n### Submission\nDeploy complete pipeline with documentation and demo.' },
          { id: 'l10-quiz', title: 'CI/CD Pipelines Quiz', duration: 15, type: 'quiz', completed: false, difficulty: 'advanced', xp: 25, quiz: [
            { question: 'What is Jenkins used for?', options: ['Database management', 'CI/CD server for automating build and deployment', 'Web server', 'Version control'], correctAnswer: 1, explanation: 'Jenkins is an open-source CI/CD server used for automating the build, test, and deployment process.' },
            { question: 'What is GitHub Actions?', options: ['A database', 'CI/CD platform integrated with GitHub for automating workflows', 'A web server', 'A version control system'], correctAnswer: 1, explanation: 'GitHub Actions is a CI/CD platform integrated with GitHub that allows you to automate workflows directly in your repository.' },
            { question: 'What is a rolling update in Kubernetes?', options: ['Stopping all pods at once', 'Gradually replacing old pods with new ones with zero downtime', 'Creating new pods', 'Deleting pods'], correctAnswer: 1, explanation: 'A rolling update gradually replaces old pods with new ones to achieve zero downtime deployments.' },
            { question: 'What is a ConfigMap in Kubernetes?', options: ['A storage volume', 'Configuration data for applications', 'A network policy', 'A security rule'], correctAnswer: 1, explanation: 'A ConfigMap is a Kubernetes resource used to store configuration data that can be consumed by applications.' },
            { question: 'What is the purpose of health checks in Kubernetes?', options: ['To slow down deployment', 'To ensure containers are running and ready to serve traffic', 'To increase resource usage', 'To delete pods'], correctAnswer: 1, explanation: 'Health checks (liveness and readiness probes) ensure containers are running and ready to serve traffic, enabling self-healing.' }
          ] },
        ]
      }
    ]
  }
];

export const learningPaths = [
  {
    id: 'backend-java',
    title: 'Backend Developer with Java',
    description: 'Master Java backend development from basics to microservices',
    icon: 'â˜•',
    color: 'from-orange-500 to-red-500',
    duration: '6 months',
    courses: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    difficulty: 'intermediate' as const,
  },
  {
    id: 'fullstack-web',
    title: 'Full Stack Web Developer',
    description: 'Build complete web applications from frontend to backend',
    icon: 'ðŸŒ',
    color: 'from-blue-500 to-purple-600',
    duration: '8 months',
    courses: ['java-basics', 'react', 'mongodb', 'spring-boot'],
    difficulty: 'advanced' as const,
  },
  {
    id: 'data-science',
    title: 'Data Science & ML Engineer',
    description: 'Analyze data and build machine learning models',
    icon: 'ðŸ“Š',
    color: 'from-yellow-500 to-green-500',
    duration: '9 months',
    courses: ['python', 'mongodb', 'dsa'],
    difficulty: 'advanced' as const,
  }
];







