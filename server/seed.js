import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Quiz from './models/Quiz.js';
import { courses, quizzes } from './courseData.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://varalamanishreddy_db_user:iMa4upOAlgDdLR7d@cluster0.uuggl5b.mongodb.net/';
const MONGODB_DB = process.env.MONGODB_DB || 'learnloop';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Quiz.deleteMany({});
    console.log('Cleared existing data');

    // Insert courses
    const courseDocs = courses.map(course => new Course(course));
    await Course.insertMany(courseDocs);
    console.log(`Inserted ${courseDocs.length} courses`);

    // Insert quizzes
    const quizDocs = Object.values(quizzes).map(quiz => new Quiz(quiz));
    await Quiz.insertMany(quizDocs);
    console.log(`Inserted ${quizDocs.length} quizzes`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
