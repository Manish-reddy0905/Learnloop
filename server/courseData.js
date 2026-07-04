export const quizzes = {
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
        question: 'What is the correct way to create an array in Java?',
        options: ['int arr[] = new int[5]', 'int arr = [5]', 'array int[5]', 'int[] arr = new array(5)'],
        correctAnswer: 0,
        explanation: 'Arrays in Java are created using: int[] arr = new int[size];'
      },
      {
        id: 'q7',
        question: 'Which access modifier makes a variable accessible only within its class?',
        options: ['public', 'private', 'protected', 'default'],
        correctAnswer: 1,
        explanation: 'private restricts access to only within the same class.'
      },
      {
        id: 'q8',
        question: 'What is inheritance in Java?',
        options: ['Creating objects', 'Acquiring properties from parent class', 'Creating methods', 'Data hiding'],
        correctAnswer: 1,
        explanation: 'Inheritance allows a class to acquire properties and methods from another class.'
      },
      {
        id: 'q9',
        question: 'Which keyword is used to inherit a class in Java?',
        options: ['inherits', 'extends', 'implements', 'super'],
        correctAnswer: 1,
        explanation: 'The extends keyword is used for class inheritance in Java.'
      },
      {
        id: 'q10',
        question: 'What is polymorphism in Java?',
        options: ['Multiple classes', 'Same method with different implementations', 'Data protection', 'Memory management'],
        correctAnswer: 1,
        explanation: 'Polymorphism allows methods with the same name to have different implementations.'
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
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
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
        options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 2,
        explanation: 'QuickSort worst case is O(n²) when pivot is always the smallest or largest element.'
      },
      {
        id: 'q4',
        question: 'Which data structure uses FIFO (First In, First Out)?',
        options: ['Stack', 'Queue', 'Array', 'Tree'],
        correctAnswer: 1,
        explanation: 'Queue uses FIFO - the first element added is the first one removed.'
      },
      {
        id: 'q5',
        question: 'What is a linked list?',
        options: ['Fixed-size array', 'Linear data structure with nodes', 'Binary tree', 'Hash table'],
        correctAnswer: 1,
        explanation: 'A linked list is a linear data structure where elements are stored in nodes with pointers.'
      },
      {
        id: 'q6',
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Array access by index is O(1) - constant time.'
      },
      {
        id: 'q7',
        question: 'What is a hash table?',
        options: ['Sorted array', 'Key-value store with hash function', 'Binary tree', 'Linked list'],
        correctAnswer: 1,
        explanation: 'Hash tables store key-value pairs using a hash function for fast lookups.'
      },
      {
        id: 'q8',
        question: 'What is recursion?',
        options: ['Loop iteration', 'Function calling itself', 'Array indexing', 'Sorting algorithm'],
        correctAnswer: 1,
        explanation: 'Recursion is when a function calls itself to solve smaller instances of the problem.'
      },
      {
        id: 'q9',
        question: 'What is a binary tree?',
        options: ['Tree with 2 children max per node', 'Tree with unlimited children', 'Linear structure', 'Graph with cycles'],
        correctAnswer: 0,
        explanation: 'A binary tree is a tree data structure where each node has at most two children.'
      },
      {
        id: 'q10',
        question: 'What is dynamic programming?',
        options: ['Runtime typing', 'Optimization by storing subproblem results', 'Dynamic memory allocation', 'Object-oriented programming'],
        correctAnswer: 1,
        explanation: 'Dynamic programming solves complex problems by breaking them into simpler subproblems and storing results.'
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
      },
      {
        id: 'q4',
        question: 'What is JSX in React?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extended'],
        correctAnswer: 0,
        explanation: 'JSX is a syntax extension for JavaScript that allows writing HTML-like code in JavaScript.'
      },
      {
        id: 'q5',
        question: 'Which hook is used for managing component state?',
        options: ['useEffect', 'useState', 'useContext', 'useMemo'],
        correctAnswer: 1,
        explanation: 'useState is used to manage local component state in React.'
      },
      {
        id: 'q6',
        question: 'What is a React component?',
        options: ['A CSS file', 'A reusable piece of UI', 'A database table', 'A server endpoint'],
        correctAnswer: 1,
        explanation: 'A React component is a reusable piece of UI that can accept props and return JSX.'
      },
      {
        id: 'q7',
        question: 'What is props in React?',
        options: ['Internal state', 'Properties passed to components', 'CSS properties', 'Server requests'],
        correctAnswer: 1,
        explanation: 'Props (properties) are data passed from parent to child components.'
      },
      {
        id: 'q8',
        question: 'What is the purpose of React Router?',
        options: ['Database routing', 'Navigation in React apps', 'CSS routing', 'Server routing'],
        correctAnswer: 1,
        explanation: 'React Router enables navigation between different components/views in a React application.'
      },
      {
        id: 'q9',
        question: 'What is a TypeScript interface?',
        options: ['A CSS class', 'A structure to define object shape', 'A database schema', 'A server endpoint'],
        correctAnswer: 1,
        explanation: 'TypeScript interfaces define the shape of objects and enforce type checking.'
      },
      {
        id: 'q10',
        question: 'What is the purpose of useContext hook?',
        options: ['Manage local state', 'Access context values', 'Handle side effects', 'Memoize values'],
        correctAnswer: 1,
        explanation: 'useContext allows components to consume context values without prop drilling.'
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
        question: 'What is BSON in MongoDB?',
        options: ['Binary JSON', 'Basic SQL Object Notation', 'Binary Storage Object Node', 'Basic Object Storage Network'],
        correctAnswer: 0,
        explanation: 'BSON is Binary JSON, the binary-encoded serialization format used by MongoDB.'
      },
      {
        id: 'q5',
        question: 'Which operator is used to match documents in MongoDB aggregation?',
        options: ['$filter', '$match', '$find', '$search'],
        correctAnswer: 1,
        explanation: '$match filters the documents to pass only the documents that match the specified condition.'
      },
      {
        id: 'q6',
        question: 'What is a collection in MongoDB?',
        options: ['A single document', 'A group of documents', 'A database connection', 'A table schema'],
        correctAnswer: 1,
        explanation: 'A collection is a grouping of MongoDB documents, similar to a table in relational databases.'
      },
      {
        id: 'q7',
        question: 'Which method is used to update a document in MongoDB?',
        options: ['updateOne()', 'modify()', 'change()', 'edit()'],
        correctAnswer: 0,
        explanation: 'updateOne() updates a single document that matches the filter.'
      },
      {
        id: 'q8',
        question: 'What is an index in MongoDB?',
        options: ['A document ID', 'A data structure for efficient queries', 'A database name', 'A collection type'],
        correctAnswer: 1,
        explanation: 'Indexes support efficient query execution by storing data in a structured format.'
      },
      {
        id: 'q9',
        question: 'What is the purpose of $lookup in MongoDB?',
        options: ['To search documents', 'To perform joins', 'To delete documents', 'To create indexes'],
        correctAnswer: 1,
        explanation: '$lookup performs a left outer join to another collection in the same database.'
      },
      {
        id: 'q10',
        question: 'What is sharding in MongoDB?',
        options: ['Data backup', 'Horizontal scaling', 'Vertical scaling', 'Data encryption'],
        correctAnswer: 1,
        explanation: 'Sharding distributes data across multiple machines to support large datasets.'
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
        question: 'What is a dictionary in Python?',
        options: ['Ordered list', 'Key-value pairs', 'Set of unique items', 'Number sequence'],
        correctAnswer: 1,
        explanation: 'Dictionaries store data in key-value pairs, similar to objects in JavaScript.'
      },
      {
        id: 'q5',
        question: 'How do you create a comment in Python?',
        options: ['// comment', '/* comment */', '# comment', '-- comment'],
        correctAnswer: 2,
        explanation: 'Python uses the # symbol for single-line comments.'
      },
      {
        id: 'q6',
        question: 'What is the purpose of the "self" parameter in Python class methods?',
        options: ['To reference the class', 'To reference the instance', 'To reference the module', 'To reference the function'],
        correctAnswer: 1,
        explanation: 'self refers to the instance of the class and allows access to its attributes and methods.'
      },
      {
        id: 'q7',
        question: 'What is a list comprehension in Python?',
        options: ['A way to explain lists', 'A concise way to create lists', 'A list of explanations', 'A documentation format'],
        correctAnswer: 1,
        explanation: 'List comprehensions provide a concise way to create lists based on existing lists.'
      },
      {
        id: 'q8',
        question: 'Which keyword is used for inheritance in Python?',
        options: ['inherits', 'extends', 'class(Parent)', 'super'],
        correctAnswer: 2,
        explanation: 'Python uses class Child(Parent) syntax for inheritance.'
      },
      {
        id: 'q9',
        question: 'What is the difference between == and is in Python?',
        options: ['No difference', '== compares values, is compares identity', 'is compares values, == compares identity', 'Both compare types'],
        correctAnswer: 1,
        explanation: '== compares values, while is checks if two variables point to the same object in memory.'
      },
      {
        id: 'q10',
        question: 'What is a lambda function in Python?',
        options: ['A regular function', 'An anonymous function', 'A class method', 'A module'],
        correctAnswer: 1,
        explanation: 'Lambda functions are anonymous functions defined using the lambda keyword.'
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
      },
      {
        id: 'q4',
        question: 'What is the purpose of Express.js?',
        options: ['Database management', 'Node.js web framework', 'CSS framework', 'Testing tool'],
        correctAnswer: 1,
        explanation: 'Express.js is a web application framework for Node.js to build web applications and APIs.'
      },
      {
        id: 'q5',
        question: 'What is middleware in Express.js?',
        options: ['Database layer', 'Functions that process requests', 'UI components', 'CSS files'],
        correctAnswer: 1,
        explanation: 'Middleware functions have access to request and response objects and can modify them.'
      },
      {
        id: 'q6',
        question: 'What is CRUD in web development?',
        options: ['Create, Read, Update, Delete', 'Code, Run, Upload, Download', 'Client, Router, User, Database', 'Connect, Retrieve, Use, Display'],
        correctAnswer: 0,
        explanation: 'CRUD represents the basic operations of persistent storage: Create, Read, Update, Delete.'
      },
      {
        id: 'q7',
        question: 'What is the purpose of CORS?',
        options: ['Database optimization', 'Cross-origin resource sharing', 'CSS styling', 'Code organization'],
        correctAnswer: 1,
        explanation: 'CORS allows web applications to access resources from different domains.'
      },
      {
        id: 'q8',
        question: 'What is an API endpoint?',
        options: ['A database table', 'A specific URL where API requests are sent', 'A CSS class', 'A JavaScript function'],
        correctAnswer: 1,
        explanation: 'An API endpoint is a specific URL where clients can access resources or perform actions.'
      },
      {
        id: 'q9',
        question: 'What is the difference between SQL and NoSQL databases?',
        options: ['No difference', 'SQL is relational, NoSQL is non-relational', 'SQL is faster, NoSQL is slower', 'SQL is for frontend, NoSQL for backend'],
        correctAnswer: 1,
        explanation: 'SQL databases are relational with fixed schemas, while NoSQL databases are non-relational with flexible schemas.'
      },
      {
        id: 'q10',
        question: 'What is environment variable in Node.js?',
        options: ['A global variable', 'Configuration data stored outside code', 'A JavaScript object', 'A CSS variable'],
        correctAnswer: 1,
        explanation: 'Environment variables store configuration data like API keys, database URLs, etc., outside the code.'
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
      },
      {
        id: 'q4',
        question: 'What is a perceptron?',
        options: ['A type of database', 'The simplest neural network unit', 'A programming language', 'A web server'],
        correctAnswer: 1,
        explanation: 'A perceptron is the basic building block of neural networks, a single-layer neural network.'
      },
      {
        id: 'q5',
        question: 'What is supervised learning?',
        options: ['Learning without labels', 'Learning with labeled data', 'Learning from images', 'Learning from text'],
        correctAnswer: 1,
        explanation: 'Supervised learning uses labeled data to train models to predict outcomes.'
      },
      {
        id: 'q6',
        question: 'What is the purpose of activation functions?',
        options: ['To store data', 'To introduce non-linearity', 'To format output', 'To connect layers'],
        correctAnswer: 1,
        explanation: 'Activation functions introduce non-linearity, allowing neural networks to learn complex patterns.'
      },
      {
        id: 'q7',
        question: 'What is backpropagation?',
        options: ['Forward pass', 'Algorithm to train neural networks', 'Data preprocessing', 'Model deployment'],
        correctAnswer: 1,
        explanation: 'Backpropagation is the algorithm used to train neural networks by calculating gradients.'
      },
      {
        id: 'q8',
        question: 'What is a loss function?',
        options: ['Data storage', 'Measures model error', 'Activates neurons', 'Formats data'],
        correctAnswer: 1,
        explanation: 'The loss function measures how well the model predictions match the actual values.'
      },
      {
        id: 'q9',
        question: 'What is overfitting in AI?',
        options: ['Perfect model', 'Model too complex, memorizes training data', 'Model too simple', 'No training needed'],
        correctAnswer: 1,
        explanation: 'Overfitting occurs when a model learns the training data too well and fails to generalize.'
      },
      {
        id: 'q10',
        question: 'What is NLP in AI?',
        options: ['Natural Language Processing', 'Neural Network Programming', 'New Learning Protocol', 'Network Layer Processing'],
        correctAnswer: 0,
        explanation: 'NLP (Natural Language Processing) enables computers to understand and process human language.'
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
      },
      {
        id: 'q4',
        question: 'What is unsupervised learning?',
        options: ['Learning with labels', 'Learning without labels', 'Learning from images', 'Learning from text'],
        correctAnswer: 1,
        explanation: 'Unsupervised learning finds patterns in unlabeled data without predefined outcomes.'
      },
      {
        id: 'q5',
        question: 'What is a feature in machine learning?',
        options: ['A bug', 'An input variable used for prediction', 'A model output', 'A database table'],
        correctAnswer: 1,
        explanation: 'Features are input variables used by models to make predictions.'
      },
      {
        id: 'q6',
        question: 'What is the purpose of training data?',
        options: ['To test the model', 'To teach the model', 'To store data', 'To format output'],
        correctAnswer: 1,
        explanation: 'Training data is used to teach the model patterns and relationships.'
      },
      {
        id: 'q7',
        question: 'What is a confusion matrix?',
        options: ['A database table', 'A table showing prediction performance', 'A neural network layer', 'A data preprocessing tool'],
        correctAnswer: 1,
        explanation: 'A confusion matrix shows the performance of a classification model by comparing predictions to actual values.'
      },
      {
        id: 'q8',
        question: 'What is precision in ML?',
        options: ['Speed of training', 'Ratio of correct positive predictions', 'Total accuracy', 'Data size'],
        correctAnswer: 1,
        explanation: 'Precision measures the ratio of correctly predicted positive observations to total predicted positives.'
      },
      {
        id: 'q9',
        question: 'What is recall in ML?',
        options: ['Memory usage', 'Ratio of actual positives correctly identified', 'Training speed', 'Model size'],
        correctAnswer: 1,
        explanation: 'Recall measures the ratio of correctly predicted positive observations to all actual positives.'
      },
      {
        id: 'q10',
        question: 'What is Scikit-learn?',
        options: ['A database', 'Python ML library', 'A web framework', 'A CSS library'],
        correctAnswer: 1,
        explanation: 'Scikit-learn is a popular Python library for machine learning.'
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
      },
      {
        id: 'q4',
        question: 'What is IaaS in cloud computing?',
        options: ['Infrastructure as a Service', 'Internet as a Service', 'Integration as a Service', 'Information as a Service'],
        correctAnswer: 0,
        explanation: 'IaaS provides virtualized computing resources over the internet.'
      },
      {
        id: 'q5',
        question: 'What is the purpose of AWS Lambda?',
        options: ['Storage', 'Serverless compute', 'Database', 'Networking'],
        correctAnswer: 1,
        explanation: 'AWS Lambda is a serverless compute service that runs code in response to events.'
      },
      {
        id: 'q6',
        question: 'What is a container in cloud computing?',
        options: ['A physical server', 'A lightweight, standalone package', 'A database', 'A network'],
        correctAnswer: 1,
        explanation: 'Containers are lightweight, standalone packages that include everything needed to run an application.'
      },
      {
        id: 'q7',
        question: 'What is Kubernetes?',
        options: ['A database', 'Container orchestration platform', 'A programming language', 'A cloud provider'],
        correctAnswer: 1,
        explanation: 'Kubernetes is an open-source container orchestration platform.'
      },
      {
        id: 'q8',
        question: 'What is auto-scaling in cloud?',
        options: ['Manual scaling', 'Automatic resource adjustment based on demand', 'Fixed resources', 'Database scaling'],
        correctAnswer: 1,
        explanation: 'Auto-scaling automatically adjusts resources based on application demand.'
      },
      {
        id: 'q9',
        question: 'What is a load balancer?',
        options: ['A database', 'Distributes traffic across multiple servers', 'A storage system', 'A programming tool'],
        correctAnswer: 1,
        explanation: 'Load balancers distribute incoming network traffic across multiple servers.'
      },
      {
        id: 'q10',
        question: 'What is cloud storage?',
        options: ['Local hard drive', 'Storing data on remote servers accessed via internet', 'RAM storage', 'CPU cache'],
        correctAnswer: 1,
        explanation: 'Cloud storage stores data on remote servers accessible over the internet.'
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
      },
      {
        id: 'q4',
        question: 'What is phishing?',
        options: ['Fishing for data', 'Fraudulent attempts to obtain sensitive information', 'Network protocol', 'Database query'],
        correctAnswer: 1,
        explanation: 'Phishing is a fraudulent attempt to obtain sensitive information by disguising as trustworthy entities.'
      },
      {
        id: 'q5',
        question: 'What is a VPN?',
        options: ['Virtual Private Network', 'Very Public Network', 'Visual Programming Network', 'Virtual Protocol Node'],
        correctAnswer: 0,
        explanation: 'VPN (Virtual Private Network) creates a secure, encrypted connection over a public network.'
      },
      {
        id: 'q6',
        question: 'What is malware?',
        options: ['Hardware', 'Malicious software', 'Network device', 'Database'],
        correctAnswer: 1,
        explanation: 'Malware is malicious software designed to damage or disrupt computer systems.'
      },
      {
        id: 'q7',
        question: 'What is two-factor authentication?',
        options: ['Two passwords', 'Two forms of verification', 'Two users', 'Two devices'],
        correctAnswer: 1,
        explanation: '2FA requires two different forms of verification to access an account.'
      },
      {
        id: 'q8',
        question: 'What is a DDoS attack?',
        options: ['Data deletion', 'Distributed Denial of Service', 'Database deletion', 'Direct data access'],
        correctAnswer: 1,
        explanation: 'DDoS attacks overwhelm a target with traffic from multiple sources.'
      },
      {
        id: 'q9',
        question: 'What is social engineering?',
        options: ['Building social networks', 'Manipulating people to divulge information', 'Engineering social apps', 'Network engineering'],
        correctAnswer: 1,
        explanation: 'Social engineering manipulates people into divulging confidential information.'
      },
      {
        id: 'q10',
        question: 'What is a penetration test?',
        options: ['Testing software performance', 'Simulated cyberattack to find vulnerabilities', 'Testing network speed', 'Testing database performance'],
        correctAnswer: 1,
        explanation: 'Penetration testing simulates cyberattacks to identify security vulnerabilities.'
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
      },
      {
        id: 'q4',
        question: 'What is the difference between UI and UX?',
        options: ['No difference', 'UI is visual, UX is experience', 'UI is backend, UX is frontend', 'UI is code, UX is design'],
        correctAnswer: 1,
        explanation: 'UI (User Interface) focuses on visual elements, while UX (User Experience) focuses on overall user journey.'
      },
      {
        id: 'q5',
        question: 'What is wireframing in design?',
        options: ['Adding colors', 'Creating low-fidelity layout sketches', 'Final design', 'Coding'],
        correctAnswer: 1,
        explanation: 'Wireframing creates low-fidelity sketches to establish layout and structure.'
      },
      {
        id: 'q6',
        question: 'What is prototyping?',
        options: ['Final product', 'Interactive mockup for testing', 'Database design', 'Code compilation'],
        correctAnswer: 1,
        explanation: 'Prototyping creates interactive mockups to test and validate design concepts.'
      },
      {
        id: 'q7',
        question: 'What is user research?',
        options: ['Researching competitors', 'Understanding user needs and behaviors', 'Researching technology', 'Researching colors'],
        correctAnswer: 1,
        explanation: 'User research involves understanding user needs, behaviors, and pain points.'
      },
      {
        id: 'q8',
        question: 'What is accessibility in design?',
        options: ['Making designs pretty', 'Making designs usable for people with disabilities', 'Making designs fast', 'Making designs cheap'],
        correctAnswer: 1,
        explanation: 'Accessibility ensures designs are usable by people with disabilities.'
      },
      {
        id: 'q9',
        question: 'What is a user persona?',
        options: ['A real user', 'A fictional representation of target users', 'A design tool', 'A color scheme'],
        correctAnswer: 1,
        explanation: 'User personas are fictional representations of target users based on research.'
      },
      {
        id: 'q10',
        question: 'What is responsive design?',
        options: ['Design that responds to user input', 'Design that adapts to different screen sizes', 'Design that changes colors', 'Design that loads faster'],
        correctAnswer: 1,
        explanation: 'Responsive design adapts layouts to different screen sizes and devices.'
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
      },
      {
        id: 'q4',
        question: 'What is Git?',
        options: ['A database', 'Version control system', 'A programming language', 'A cloud service'],
        correctAnswer: 1,
        explanation: 'Git is a distributed version control system for tracking changes in code.'
      },
      {
        id: 'q5',
        question: 'What is a pipeline in DevOps?',
        options: ['A water pipe', 'Automated workflow for software delivery', 'A database connection', 'A network cable'],
        correctAnswer: 1,
        explanation: 'A pipeline is an automated workflow that moves code through build, test, and deployment stages.'
      },
      {
        id: 'q6',
        question: 'What is Jenkins?',
        options: ['A database', 'CI/CD automation server', 'A programming language', 'A cloud provider'],
        correctAnswer: 1,
        explanation: 'Jenkins is an open-source automation server for CI/CD pipelines.'
      },
      {
        id: 'q7',
        question: 'What is infrastructure as code?',
        options: ['Writing code for infrastructure', 'Manual infrastructure setup', 'Database code', 'UI code'],
        correctAnswer: 0,
        explanation: 'Infrastructure as Code (IaC) manages and provisions infrastructure through code.'
      },
      {
        id: 'q8',
        question: 'What is monitoring in DevOps?',
        options: ['Watching employees', 'Tracking system performance and health', 'Writing code', 'Testing software'],
        correctAnswer: 1,
        explanation: 'Monitoring tracks system performance, availability, and health in real-time.'
      },
      {
        id: 'q9',
        question: 'What is a pull request?',
        options: ['Pulling data from database', 'Requesting code review before merging', 'Deleting code', 'Creating branches'],
        correctAnswer: 1,
        explanation: 'A pull request is a request to merge code changes after review.'
      },
      {
        id: 'q10',
        question: 'What is blue-green deployment?',
        options: ['Color scheme', 'Deployment strategy with two identical environments', 'Database backup', 'Code testing'],
        correctAnswer: 1,
        explanation: 'Blue-green deployment maintains two identical production environments to reduce downtime.'
      }
    ]
  }
};

export const courses = [
  {
    id: 'java-basics',
    title: 'Java Programming Fundamentals',
    description: 'Master Java from scratch. Learn OOP, data types, control flow, and build real-world applications with industry best practices.',
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: '👩‍💻',
    category: 'Programming',
    tags: ['Java', 'OOP', 'Backend', 'Beginner'],
    level: 'beginner',
    duration: 24,
    rating: 4.8,
    totalRatings: 12450,
    totalStudents: 89320,
    thumbnail: '',
    color: 'from-orange-500 to-red-600',
    icon: '☕',
    xpReward: 500,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['dsa', 'spring-boot', 'python'],
    learningPath: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Java',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'What is Java & JVM?', duration: 12, type: 'video', completed: false, difficulty: 'beginner', xp: 20, videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34?si=T0grluWeKv70gQcN' },
          { id: 'l2', title: 'Setting Up Development Environment', duration: 15, type: 'exercise', completed: false, difficulty: 'beginner', xp: 25 },
          { id: 'l3', title: 'Your First Java Program', duration: 10, type: 'exercise', completed: false, difficulty: 'beginner', xp: 30 },
          { id: 'l4', title: 'Java Syntax & Structure', duration: 8, type: 'reading', completed: false, difficulty: 'beginner', xp: 15 },
        ]
      },
      {
        id: 'm2',
        title: 'Data Types & Variables',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'Primitive Data Types', duration: 14, type: 'video', completed: false, difficulty: 'beginner', xp: 20, videoUrl: 'https://www.youtube.com/embed/TQO3dGtXSAw' },
          { id: 'l6', title: 'Type Casting & Conversion', duration: 12, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoUrl: 'https://www.youtube.com/embed/KUO0XGtYQwY' },
          { id: 'l7', title: 'String Manipulation', duration: 18, type: 'exercise', completed: false, difficulty: 'beginner', xp: 35 },
          { id: 'l8', title: 'Variables Practice', duration: 20, type: 'quiz', completed: false, difficulty: 'beginner', xp: 40 },
        ]
      },
      {
        id: 'm3',
        title: 'Control Flow',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l9', title: 'If-Else Statements', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 20, videoUrl: 'https://www.youtube.com/embed/WQ4BjY5L5Jg' },
          { id: 'l10', title: 'Switch Statements', duration: 12, type: 'video', completed: false, difficulty: 'beginner', xp: 20, videoUrl: 'https://www.youtube.com/embed/jJqVjXk0Q8Y' },
          { id: 'l11', title: 'For Loops', duration: 18, type: 'exercise', completed: false, difficulty: 'beginner', xp: 30 },
          { id: 'l12', title: 'While & Do-While Loops', duration: 15, type: 'exercise', completed: false, difficulty: 'beginner', xp: 30 },
          { id: 'l13', title: 'Break & Continue', duration: 10, type: 'video', completed: false, difficulty: 'beginner', xp: 15, videoUrl: 'https://www.youtube.com/embed/8k2V8qC2M8g' },
        ]
      },
      {
        id: 'm4',
        title: 'Arrays & Collections',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l14', title: 'Arrays Fundamentals', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoUrl: 'https://www.youtube.com/embed/r1IwcVxk8yY' },
          { id: 'l15', title: 'Multidimensional Arrays', duration: 18, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
          { id: 'l16', title: 'ArrayList & LinkedList', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoUrl: 'https://www.youtube.com/embed/8j0xjE0X5k0' },
          { id: 'l17', title: 'Collections Practice', duration: 30, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
        ]
      },
      {
        id: 'm5',
        title: 'Object-Oriented Programming',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l18', title: 'Classes & Objects', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8' },
          { id: 'l19', title: 'Inheritance', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoUrl: 'https://www.youtube.com/embed/DQXvtF8d5e0' },
          { id: 'l20', title: 'Polymorphism', duration: 18, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoUrl: 'https://www.youtube.com/embed/5j8LQr8j5b8' },
          { id: 'l21', title: 'Encapsulation & Abstraction', duration: 15, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/8j0xjE0X5k0' },
          { id: 'l22', title: 'Interfaces', duration: 20, type: 'exercise', completed: false, difficulty: 'advanced', xp: 50 },
          { id: 'l23', title: 'OOP Final Project', duration: 45, type: 'exercise', completed: false, difficulty: 'advanced', xp: 100 },
        ]
      }
    ]
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master DSA with Java. Learn arrays, linked lists, trees, graphs, sorting algorithms, and crack coding interviews.',
    instructor: 'Prof. Alex Kumar',
    instructorAvatar: '👨‍🏫',
    category: 'Computer Science',
    tags: ['DSA', 'Algorithms', 'Java', 'Interview Prep'],
    level: 'intermediate',
    duration: 40,
    rating: 4.9,
    totalRatings: 18200,
    totalStudents: 124500,
    thumbnail: '',
    color: 'from-blue-500 to-indigo-600',
    icon: '🌳',
    xpReward: 800,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['java-basics'],
    relatedCourses: ['java-basics', 'spring-boot', 'python'],
    learningPath: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    modules: [
      {
        id: 'm1',
        title: 'Arrays & Strings',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Array Operations & Complexity', duration: 20, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/8j0xjE0X5k0' },
          { id: 'l2', title: 'Two Pointer Technique', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
          { id: 'l3', title: 'Sliding Window', duration: 28, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
          { id: 'l4', title: 'String Problems', duration: 30, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 55 },
        ]
      },
      {
        id: 'm2',
        title: 'Linked Lists',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'Singly Linked List', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/F8pO9b9L5vQ' },
          { id: 'l6', title: 'Doubly Linked List', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/YQs6IC-vgRg' },
          { id: 'l7', title: 'Cycle Detection (Floyd\'s)', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60 },
          { id: 'l8', title: 'Reverse a Linked List', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
        ]
      },
      {
        id: 'm3',
        title: 'Stacks & Queues',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l9', title: 'Stack Implementation', duration: 18, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoUrl: 'https://www.youtube.com/embed/zW3I5uwV2zE' },
          { id: 'l10', title: 'Queue & Deque', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoUrl: 'https://www.youtube.com/embed/enh9M0u5iHg' },
          { id: 'l11', title: 'Monotonic Stack Problems', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70 },
        ]
      },
      {
        id: 'm4',
        title: 'Trees & Graphs',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l12', title: 'Binary Trees & BST', duration: 30, type: 'video', completed: false, difficulty: 'intermediate', xp: 50, videoUrl: 'https://www.youtube.com/embed/q6ejAqtB5pY' },
          { id: 'l13', title: 'Tree Traversals', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
          { id: 'l14', title: 'Graph Representation', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/gXgEDyusO6U' },
          { id: 'l15', title: 'BFS & DFS', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70 },
          { id: 'l16', title: 'Dijkstra\'s Algorithm', duration: 40, type: 'exercise', completed: false, difficulty: 'advanced', xp: 80 },
        ]
      },
      {
        id: 'm5',
        title: 'Sorting & Searching',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l17', title: 'Bubble, Selection, Insertion Sort', duration: 25, type: 'video', completed: false, difficulty: 'beginner', xp: 40, videoUrl: 'https://www.youtube.com/embed/g-PGLbMth_g' },
          { id: 'l18', title: 'Merge Sort & Quick Sort', duration: 35, type: 'video', completed: false, difficulty: 'intermediate', xp: 60, videoUrl: 'https://www.youtube.com/embed/4VqmGXhpL_8' },
          { id: 'l19', title: 'Binary Search & Variants', duration: 30, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 55 },
          { id: 'l20', title: 'Dynamic Programming Intro', duration: 45, type: 'exercise', completed: false, difficulty: 'advanced', xp: 90 },
        ]
      }
    ]
  },
  {
    id: 'mongodb',
    title: 'MongoDB — The Complete Guide',
    description: 'Master MongoDB from basics to advanced. Learn CRUD, Aggregation Pipeline, Atlas, Compass, Mongoose, and build scalable apps.',
    instructor: 'Dr. Maria Rodriguez',
    instructorAvatar: '👩‍🔬',
    category: 'Database',
    tags: ['MongoDB', 'NoSQL', 'Database', 'Backend', 'Atlas'],
    level: 'intermediate',
    duration: 30,
    rating: 4.9,
    totalRatings: 9800,
    totalStudents: 67400,
    thumbnail: '',
    color: 'from-green-500 to-emerald-600',
    icon: '🍃',
    xpReward: 750,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['java-basics'],
    relatedCourses: ['spring-boot', 'dsa', 'react'],
    learningPath: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    modules: [
      {
        id: 'm1',
        title: 'MongoDB Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'What is MongoDB & NoSQL?', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoUrl: 'https://www.youtube.com/embed/pWbMrp5qVzk' },
          { id: 'l2', title: 'Documents & Collections', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/E-1l4L2W-xA' },
          { id: 'l3', title: 'MongoDB Atlas Setup', duration: 20, type: 'exercise', completed: false, difficulty: 'beginner', xp: 35 },
          { id: 'l4', title: 'MongoDB Compass', duration: 15, type: 'exercise', completed: false, difficulty: 'beginner', xp: 25 },
        ]
      },
      {
        id: 'm2',
        title: 'CRUD Operations',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'insertOne & insertMany', duration: 20, type: 'exercise', completed: false, difficulty: 'beginner', xp: 35 },
          { id: 'l6', title: 'find & findOne with Filters', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
          { id: 'l7', title: 'updateOne, updateMany, $set', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
          { id: 'l8', title: 'deleteOne & deleteMany', duration: 15, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 30 },
        ]
      },
      {
        id: 'm3',
        title: 'Aggregation Pipeline',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l9', title: '$match, $project, $group', duration: 35, type: 'video', completed: false, difficulty: 'intermediate', xp: 60, videoUrl: 'https://www.youtube.com/embed/Vw1NfqXZTrI' },
          { id: 'l10', title: '$sort, $limit, $skip', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
          { id: 'l11', title: '$lookup (Joins)', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65 },
          { id: 'l12', title: '$unwind & Array Operators', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65 },
          { id: 'l13', title: 'Real Analytics Pipeline', duration: 45, type: 'exercise', completed: false, difficulty: 'advanced', xp: 90 },
        ]
      },
      {
        id: 'm4',
        title: 'Indexing & Performance',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l14', title: 'Index Types & Creation', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 55, videoUrl: 'https://www.youtube.com/embed/NXdbqjQJ5xk' },
          { id: 'l15', title: 'Query Optimization with explain()', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60 },
          { id: 'l16', title: 'Schema Design Patterns', duration: 35, type: 'reading', completed: false, difficulty: 'advanced', xp: 65 },
        ]
      }
    ]
  },
  {
    id: 'python',
    title: 'Python for Data Science & ML',
    description: 'Learn Python, NumPy, Pandas, Matplotlib, Scikit-learn, and build machine learning models from scratch.',
    instructor: 'Dr. Emily Zhang',
    instructorAvatar: '👩‍🔬',
    category: 'Data Science',
    tags: ['Python', 'ML', 'Data Science', 'NumPy', 'Pandas'],
    level: 'intermediate',
    duration: 45,
    rating: 4.7,
    totalRatings: 15600,
    totalStudents: 98200,
    thumbnail: '',
    color: 'from-yellow-500 to-orange-500',
    icon: '🐍',
    xpReward: 900,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['machine-learning', 'artificial-intelligence', 'dsa'],
    learningPath: ['python', 'machine-learning', 'artificial-intelligence'],
    modules: [
      {
        id: 'm1',
        title: 'Python Basics',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Python Setup & Syntax', duration: 15, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw' },
          { id: 'l2', title: 'Variables & Data Types', duration: 20, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/cQT33yu9pY8' },
          { id: 'l3', title: 'Control Flow', duration: 25, type: 'exercise', completed: false, difficulty: 'beginner', xp: 35 },
        ]
      },
      {
        id: 'm2',
        title: 'Data Structures',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Lists & Tuples', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/ohCDWZgNIU0' },
          { id: 'l5', title: 'Dictionaries & Sets', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
          { id: 'l6', title: 'Comprehensions', duration: 18, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 35 },
        ]
      },
      {
        id: 'm3',
        title: 'Functions & Modules',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Functions & Lambdas', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoUrl: 'https://www.youtube.com/embed/9Os0o3wzS_I' },
          { id: 'l8', title: 'Modules & Packages', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
        ]
      }
    ]
  },
  {
    id: 'spring-boot',
    title: 'Spring Boot with Java',
    description: 'Build REST APIs, microservices, and enterprise applications with Spring Boot, Spring Security, and Spring Data JPA.',
    instructor: 'Prof. James Wilson',
    instructorAvatar: '👨‍🏫',
    category: 'Backend',
    tags: ['Spring Boot', 'Java', 'REST API', 'Microservices', 'Docker'],
    level: 'advanced',
    duration: 50,
    rating: 4.8,
    totalRatings: 8900,
    totalStudents: 56200,
    thumbnail: '',
    color: 'from-green-600 to-teal-600',
    icon: '🍃',
    xpReward: 1000,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['java-basics', 'dsa'],
    relatedCourses: ['mongodb', 'java-basics', 'fullstack'],
    learningPath: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
    modules: [
      {
        id: 'm1',
        title: 'Spring Boot Basics',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Spring Boot Architecture', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/9SGDpmyoVbQ' },
          { id: 'l2', title: 'Auto-Configuration', duration: 18, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoUrl: 'https://www.youtube.com/embed/8jkqf5VYn6k' },
          { id: 'l3', title: 'Building REST APIs', duration: 35, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 65 },
          { id: 'l4', title: 'Spring Data JPA', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60 },
        ]
      },
      {
        id: 'm2',
        title: 'Spring Security',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'Spring Security Basics', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 55, videoUrl: 'https://www.youtube.com/embed/kiK1X5-7n9E' },
          { id: 'l6', title: 'JWT Authentication', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 75 },
          { id: 'l7', title: 'OAuth2 Integration', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70 },
        ]
      }
    ]
  },
  {
    id: 'react-typescript',
    title: 'React & TypeScript Masterclass',
    description: 'Build modern web apps with React 18, TypeScript, Hooks, Redux, and Next.js. Master component architecture and state management.',
    instructor: 'Jessica Williams',
    instructorAvatar: '👩‍💻',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Frontend', 'Next.js'],
    level: 'intermediate',
    duration: 35,
    rating: 4.9,
    totalRatings: 14500,
    totalStudents: 98000,
    thumbnail: '',
    color: 'from-cyan-500 to-blue-600',
    icon: '⚛️',
    xpReward: 750,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['fullstack', 'mongodb', 'spring-boot'],
    learningPath: ['react-typescript', 'fullstack', 'mongodb'],
    modules: [
      {
        id: 'm1',
        title: 'React Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'React Setup & JSX', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
          { id: 'l2', title: 'Components & Props', duration: 22, type: 'video', completed: false, difficulty: 'beginner', xp: 35, videoUrl: 'https://www.youtube.com/embed/IgDqfdI5L1Q' },
          { id: 'l3', title: 'State & Lifecycle', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
          { id: 'l4', title: 'Event Handling', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
        ]
      },
      {
        id: 'm2',
        title: 'React Hooks',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l5', title: 'useState & useEffect', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoUrl: 'https://www.youtube.com/embed/TNha0A7G3iI' },
          { id: 'l6', title: 'useContext & useReducer', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/5JdwIsW3W0E' },
          { id: 'l7', title: 'Custom Hooks', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
          { id: 'l8', title: 'Redux Toolkit', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60 },
        ]
      },
      {
        id: 'm3',
        title: 'TypeScript Integration',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l9', title: 'TypeScript Basics', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoUrl: 'https://www.youtube.com/embed/BwuLxPH8IMs' },
          { id: 'l10', title: 'TypeScript with React', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 55 },
          { id: 'l11', title: 'Type-safe Components', duration: 25, type: 'exercise', completed: false, difficulty: 'advanced', xp: 50 },
        ]
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Web Development',
    description: 'Master full-stack development with React, Node.js, Express, MongoDB, and build production-ready applications.',
    instructor: 'David Lee',
    instructorAvatar: '👨‍💻',
    category: 'Full Stack',
    tags: ['Full Stack', 'React', 'Node.js', 'Express', 'MongoDB'],
    level: 'intermediate',
    duration: 60,
    rating: 4.8,
    totalRatings: 11200,
    totalStudents: 78500,
    thumbnail: '',
    color: 'from-purple-500 to-pink-600',
    icon: '💻',
    xpReward: 1200,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['react-typescript'],
    relatedCourses: ['react-typescript', 'mongodb', 'spring-boot'],
    learningPath: ['react-typescript', 'fullstack', 'mongodb'],
    modules: [
      {
        id: 'm1',
        title: 'Frontend with React',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'React Review', duration: 20, type: 'video', completed: false, difficulty: 'intermediate', xp: 35, videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8' },
          { id: 'l2', title: 'React Router', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
          { id: 'l3', title: 'State Management', duration: 30, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
        ]
      },
      {
        id: 'm2',
        title: 'Backend with Node.js',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Node.js Fundamentals', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE' },
          { id: 'l5', title: 'Express.js Setup', duration: 28, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
          { id: 'l6', title: 'REST API Design', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65 },
        ]
      },
      {
        id: 'm3',
        title: 'Database Integration',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'MongoDB with Mongoose', duration: 30, type: 'video', completed: false, difficulty: 'advanced', xp: 55, videoUrl: 'https://www.youtube.com/embed/926p0JyY3bE' },
          { id: 'l8', title: 'CRUD Operations', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 75 },
          { id: 'l9', title: 'Full Stack Project', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120 },
        ]
      }
    ]
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence Fundamentals',
    description: 'Learn AI fundamentals, neural networks, TensorFlow, computer vision, NLP, and build intelligent applications.',
    instructor: 'Dr. Sophia Martinez',
    instructorAvatar: '👩‍🔬',
    category: 'AI',
    tags: ['AI', 'Neural Networks', 'TensorFlow', 'Deep Learning'],
    level: 'intermediate',
    duration: 50,
    rating: 4.8,
    totalRatings: 9500,
    totalStudents: 62300,
    thumbnail: '',
    color: 'from-blue-600 to-purple-600',
    icon: '🤖',
    xpReward: 1000,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['python'],
    relatedCourses: ['machine-learning', 'python', 'dsa'],
    learningPath: ['python', 'artificial-intelligence', 'machine-learning'],
    modules: [
      {
        id: 'm1',
        title: 'AI Introduction',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'What is AI?', duration: 20, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/2ePf9rue1Ao' },
          { id: 'l2', title: 'Types of AI', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 25, videoUrl: 'https://www.youtube.com/embed/aircAruvnKk' },
          { id: 'l3', title: 'AI Applications', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
        ]
      },
      {
        id: 'm2',
        title: 'Neural Networks',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Perceptrons', duration: 22, type: 'video', completed: false, difficulty: 'intermediate', xp: 40, videoUrl: 'https://www.youtube.com/embed/PyMqV8QqZPw' },
          { id: 'l5', title: 'Multi-layer Networks', duration: 28, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
          { id: 'l6', title: 'Backpropagation', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60 },
        ]
      },
      {
        id: 'm3',
        title: 'Deep Learning',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Natural Language Processing', duration: 35, type: 'video', completed: false, difficulty: 'advanced', xp: 65, videoUrl: 'https://www.youtube.com/embed/8Htifnyk-7Y' },
          { id: 'l8', title: 'Computer Vision', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70 },
          { id: 'l9', title: 'AI Capstone Project', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120 },
        ]
      }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning with Python',
    description: 'Master ML algorithms, supervised/unsupervised learning, model evaluation, Scikit-learn, and build predictive models.',
    instructor: 'Dr. Robert Chen',
    instructorAvatar: '👨‍🔬',
    category: 'Data Science',
    tags: ['ML', 'Python', 'Scikit-learn', 'Data Science'],
    level: 'intermediate',
    duration: 45,
    rating: 4.7,
    totalRatings: 8700,
    totalStudents: 54100,
    thumbnail: '',
    color: 'from-green-500 to-cyan-600',
    icon: '🧠',
    xpReward: 900,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['python', 'artificial-intelligence'],
    relatedCourses: ['artificial-intelligence', 'python', 'dsa'],
    learningPath: ['python', 'artificial-intelligence', 'machine-learning'],
    modules: [
      {
        id: 'm1',
        title: 'ML Algorithms',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Supervised Learning', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 45, videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU' },
          { id: 'l2', title: 'Unsupervised Learning', duration: 22, type: 'video', completed: false, difficulty: 'advanced', xp: 40, videoUrl: 'https://www.youtube.com/embed/x4r8mPy7OOU' },
          { id: 'l3', title: 'Feature Engineering', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60 },
        ]
      },
      {
        id: 'm2',
        title: 'Model Training & Evaluation',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Cross-Validation', duration: 20, type: 'exercise', completed: false, difficulty: 'advanced', xp: 45 },
          { id: 'l5', title: 'Hyperparameter Tuning', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65 },
          { id: 'l6', title: 'Model Evaluation Metrics', duration: 25, type: 'exercise', completed: false, difficulty: 'advanced', xp: 55 },
        ]
      },
      {
        id: 'm3',
        title: 'ML Deployment',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Model Serialization', duration: 20, type: 'video', completed: false, difficulty: 'advanced', xp: 40, videoUrl: 'https://www.youtube.com/embed/7B4qXoYpMzI' },
          { id: 'l8', title: 'API Deployment', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 65 },
          { id: 'l9', title: 'ML Pipeline Project', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120 },
        ]
      }
    ]
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing with AWS',
    description: 'Master AWS services, EC2, S3, Lambda, Docker, Kubernetes, and build scalable cloud infrastructure.',
    instructor: 'Michael Thompson',
    instructorAvatar: '👨‍🏫',
    category: 'Cloud',
    tags: ['AWS', 'Cloud', 'Docker', 'Kubernetes'],
    level: 'intermediate',
    duration: 45,
    rating: 4.7,
    totalRatings: 7800,
    totalStudents: 48900,
    thumbnail: '',
    color: 'from-cyan-500 to-blue-500',
    icon: '☁️',
    xpReward: 900,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['devops', 'fullstack', 'spring-boot'],
    learningPath: ['cloud-computing', 'devops', 'fullstack'],
    modules: [
      {
        id: 'm1',
        title: 'AWS Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'AWS Overview', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/tfx9YpTfSdE' },
          { id: 'l2', title: 'AWS Account Setup', duration: 15, type: 'exercise', completed: false, difficulty: 'beginner', xp: 25 },
          { id: 'l3', title: 'IAM & Security', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
        ]
      },
      {
        id: 'm2',
        title: 'Core AWS Services',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'EC2 Instances', duration: 30, type: 'video', completed: false, difficulty: 'intermediate', xp: 50, videoUrl: 'https://www.youtube.com/embed/8jS4a4qKH8E' },
          { id: 'l5', title: 'S3 Storage', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
          { id: 'l6', title: 'RDS Databases', duration: 28, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
        ]
      },
      {
        id: 'm3',
        title: 'Advanced AWS',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'AWS Lambda', duration: 22, type: 'video', completed: false, difficulty: 'advanced', xp: 40, videoUrl: 'https://www.youtube.com/embed/eBmGI8-2vYQ' },
          { id: 'l8', title: 'Docker Basics', duration: 25, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 45 },
          { id: 'l9', title: 'Kubernetes Introduction', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60 },
        ]
      }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security Essentials',
    description: 'Learn ethical hacking, network security, encryption, penetration testing, and protect systems from cyber threats.',
    instructor: 'Alex Turner',
    instructorAvatar: '👨‍💻',
    category: 'Security',
    tags: ['Cyber Security', 'Ethical Hacking', 'Network Security'],
    level: 'intermediate',
    duration: 40,
    rating: 4.8,
    totalRatings: 6500,
    totalStudents: 38700,
    thumbnail: '',
    color: 'from-red-500 to-purple-600',
    icon: '🔒',
    xpReward: 800,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['cloud-computing', 'dsa', 'fullstack'],
    learningPath: ['cloud-computing', 'cyber-security', 'fullstack'],
    modules: [
      {
        id: 'm1',
        title: 'Security Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'Introduction to Security', duration: 20, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/inWWhrPEtno' },
          { id: 'l2', title: 'Threats & Vulnerabilities', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
          { id: 'l3', title: 'Security Policies', duration: 18, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 35 },
        ]
      },
      {
        id: 'm2',
        title: 'Network Security',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Firewalls & IDS', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoUrl: 'https://www.youtube.com/embed/3Kq1MIfTWCE' },
          { id: 'l5', title: 'Encryption Basics', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
          { id: 'l6', title: 'VPN & Secure Communication', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 55 },
        ]
      },
      {
        id: 'm3',
        title: 'Security Operations',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Incident Response', duration: 22, type: 'video', completed: false, difficulty: 'advanced', xp: 40, videoUrl: 'https://www.youtube.com/embed/7zG8vq8g5gU' },
          { id: 'l8', title: 'Security Monitoring', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 60 },
          { id: 'l9', title: 'Security Capstone', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120 },
        ]
      }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Masterclass',
    description: 'Master user interface and experience design with Figma, design systems, prototyping, and create stunning digital products.',
    instructor: 'Emma Collins',
    instructorAvatar: '👩‍🎨',
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping'],
    level: 'intermediate',
    duration: 35,
    rating: 4.8,
    totalRatings: 7200,
    totalStudents: 45600,
    thumbnail: '',
    color: 'from-pink-500 to-purple-500',
    icon: '🎨',
    xpReward: 700,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: [],
    relatedCourses: ['react-typescript', 'fullstack'],
    learningPath: ['ui-ux-design', 'react-typescript', 'fullstack'],
    modules: [
      {
        id: 'm1',
        title: 'Design Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'UI vs UX', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/Y9B6r0bD6kU' },
          { id: 'l2', title: 'Design Principles', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
          { id: 'l3', title: 'Color Theory', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 35 },
        ]
      },
      {
        id: 'm2',
        title: 'Figma Mastery',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Figma Basics', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8' },
          { id: 'l5', title: 'Components & Variants', duration: 28, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
          { id: 'l6', title: 'Auto Layout', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
        ]
      },
      {
        id: 'm3',
        title: 'Prototyping',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Interactive Prototypes', duration: 28, type: 'video', completed: false, difficulty: 'intermediate', xp: 50, videoUrl: 'https://www.youtube.com/embed/aF3E2y5pN9I' },
          { id: 'l8', title: 'Design Systems', duration: 30, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 55 },
          { id: 'l9', title: 'Final Design Project', duration: 50, type: 'exercise', completed: false, difficulty: 'advanced', xp: 100 },
        ]
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD Pipeline',
    description: 'Master DevOps practices, CI/CD pipelines, Docker, Kubernetes, Jenkins, GitLab, and automate software delivery.',
    instructor: 'James Wilson',
    instructorAvatar: '👨‍🔧',
    category: 'DevOps',
    tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Jenkins'],
    level: 'advanced',
    duration: 55,
    rating: 4.8,
    totalRatings: 8700,
    totalStudents: 46200,
    thumbnail: '',
    color: 'from-orange-500 to-blue-600',
    icon: '♾️',
    xpReward: 1100,
    certificateAvailable: true,
    price: 0,
    isFree: true,
    prerequisites: ['cloud-computing', 'fullstack'],
    relatedCourses: ['cloud-computing', 'fullstack', 'spring-boot'],
    learningPath: ['cloud-computing', 'devops', 'fullstack'],
    modules: [
      {
        id: 'm1',
        title: 'DevOps Fundamentals',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l1', title: 'What is DevOps?', duration: 18, type: 'video', completed: false, difficulty: 'beginner', xp: 30, videoUrl: 'https://www.youtube.com/embed/TP2Jw0kYJcM' },
          { id: 'l2', title: 'DevOps Culture', duration: 20, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 35 },
          { id: 'l3', title: 'Agile & Scrum', duration: 22, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 40 },
        ]
      },
      {
        id: 'm2',
        title: 'CI/CD Pipeline',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l4', title: 'Version Control with Git', duration: 25, type: 'video', completed: false, difficulty: 'intermediate', xp: 45, videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk' },
          { id: 'l5', title: 'Continuous Integration', duration: 28, type: 'exercise', completed: false, difficulty: 'intermediate', xp: 50 },
          { id: 'l6', title: 'Continuous Deployment', duration: 30, type: 'exercise', completed: false, difficulty: 'advanced', xp: 55 },
        ]
      },
      {
        id: 'm3',
        title: 'Container Orchestration',
        completed: false,
        locked: false,
        lessons: [
          { id: 'l7', title: 'Jenkins Pipeline', duration: 25, type: 'video', completed: false, difficulty: 'advanced', xp: 45, videoUrl: 'https://www.youtube.com/embed/M9n8k1fMxXg' },
          { id: 'l8', title: 'GitHub Actions', duration: 28, type: 'exercise', completed: false, difficulty: 'advanced', xp: 55 },
          { id: 'l9', title: 'Kubernetes Deployment', duration: 35, type: 'exercise', completed: false, difficulty: 'advanced', xp: 70 },
          { id: 'l10', title: 'DevOps Capstone', duration: 60, type: 'exercise', completed: false, difficulty: 'advanced', xp: 120 },
        ]
      }
    ]
  }
];
