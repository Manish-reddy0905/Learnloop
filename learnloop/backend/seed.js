/**
 * LearnLoop — Database Seed Script
 * Run: node seed.js
 * Inserts sample users, courses, and enrollments for testing.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");
const Course = require("./models/Course");
const Enrollment = require("./models/Enrollment");

const connectDB = require("./config/db");

const seed = async () => {
  await connectDB();

  console.log("🌱 Seeding database...");

  // Clear existing data
  await User.deleteMany({});
  await Course.deleteMany({});
  await Enrollment.deleteMany({});
  console.log("🗑️  Cleared existing collections");

  // ── Create Users ────────────────────────────────────────────────────────────
  const users = await User.create([
    {
      name: "Alice Sharma",
      email: "alice@learnloop.com",
      password: "password123",
      role: "instructor",
    },
    {
      name: "Bob Patel",
      email: "bob@learnloop.com",
      password: "password123",
      role: "instructor",
    },
    {
      name: "Carol Reddy",
      email: "carol@learnloop.com",
      password: "password123",
      role: "student",
    },
    {
      name: "David Kumar",
      email: "david@learnloop.com",
      password: "password123",
      role: "student",
    },
    {
      name: "Admin User",
      email: "admin@learnloop.com",
      password: "admin123",
      role: "admin",
    },
  ]);

  console.log(`✅ Created ${users.length} users`);
  const [alice, bob, carol, david] = users;

  // ── Create Courses ───────────────────────────────────────────────────────────
  const courses = await Course.create([
    {
      title: "Complete React & Node.js Bootcamp",
      description:
        "Master full-stack web development from scratch. Build real-world apps using React, Node.js, Express, and MongoDB. Learn REST APIs, authentication, deployment, and more.",
      instructor: alice._id,
      category: "Web Development",
      level: "Beginner",
      price: 999,
      isPublished: true,
      tags: ["react", "nodejs", "javascript", "fullstack"],
      rating: 4.8,
      totalRatings: 120,
      lessons: [
        { title: "Introduction to React", content: "What is React?", duration: 15, order: 1 },
        { title: "Components & Props", content: "Building reusable components", duration: 25, order: 2 },
        { title: "State & Hooks", content: "useState, useEffect explained", duration: 30, order: 3 },
        { title: "Node.js Basics", content: "Server-side JavaScript", duration: 20, order: 4 },
        { title: "Building REST APIs", content: "Express routes and middleware", duration: 35, order: 5 },
      ],
    },
    {
      title: "Python for Data Science",
      description:
        "A hands-on introduction to data science using Python. Cover pandas, numpy, matplotlib, scikit-learn, and build your first machine learning models from real datasets.",
      instructor: bob._id,
      category: "Data Science",
      level: "Intermediate",
      price: 1299,
      isPublished: true,
      tags: ["python", "data science", "machine learning", "pandas"],
      rating: 4.6,
      totalRatings: 85,
      lessons: [
        { title: "Python Refresher", content: "Core Python concepts", duration: 20, order: 1 },
        { title: "NumPy Fundamentals", content: "Arrays and operations", duration: 30, order: 2 },
        { title: "Pandas Deep Dive", content: "DataFrames and data wrangling", duration: 45, order: 3 },
        { title: "Data Visualization", content: "Matplotlib and Seaborn", duration: 35, order: 4 },
        { title: "Intro to ML", content: "Scikit-learn basics", duration: 50, order: 5 },
      ],
    },
    {
      title: "UI/UX Design Fundamentals",
      description:
        "Learn the principles of user interface and user experience design. Master Figma, wireframing, prototyping, design systems, and how to conduct usability testing.",
      instructor: alice._id,
      category: "Design",
      level: "Beginner",
      price: 799,
      isPublished: true,
      tags: ["figma", "ui design", "ux", "wireframing"],
      rating: 4.9,
      totalRatings: 200,
      lessons: [
        { title: "Design Thinking", content: "Empathize, define, ideate", duration: 25, order: 1 },
        { title: "Color Theory", content: "Using colors effectively", duration: 20, order: 2 },
        { title: "Typography Basics", content: "Fonts and readability", duration: 15, order: 3 },
        { title: "Figma Crash Course", content: "Frames, components, auto layout", duration: 60, order: 4 },
        { title: "Prototyping & Testing", content: "Interactive mockups", duration: 40, order: 5 },
      ],
    },
    {
      title: "DevOps with Docker & Kubernetes",
      description:
        "Learn containerization and orchestration. This course covers Docker fundamentals, writing Dockerfiles, Kubernetes deployments, CI/CD pipelines, and cloud deployment strategies.",
      instructor: bob._id,
      category: "DevOps",
      level: "Advanced",
      price: 1499,
      isPublished: true,
      tags: ["docker", "kubernetes", "devops", "cicd"],
      rating: 4.7,
      totalRatings: 60,
      lessons: [
        { title: "Docker Basics", content: "Containers vs VMs", duration: 30, order: 1 },
        { title: "Writing Dockerfiles", content: "Building images", duration: 25, order: 2 },
        { title: "Docker Compose", content: "Multi-container apps", duration: 35, order: 3 },
        { title: "Kubernetes Intro", content: "Pods, services, deployments", duration: 50, order: 4 },
        { title: "CI/CD Pipelines", content: "GitHub Actions", duration: 45, order: 5 },
      ],
    },
    {
      title: "Flutter Mobile App Development",
      description:
        "Build beautiful cross-platform mobile apps for iOS and Android using Flutter and Dart. Learn widgets, state management, navigation, APIs, and publish your app to stores.",
      instructor: alice._id,
      category: "Mobile Development",
      level: "Intermediate",
      price: 1099,
      isPublished: true,
      tags: ["flutter", "dart", "mobile", "ios", "android"],
      rating: 4.5,
      totalRatings: 45,
      lessons: [
        { title: "Dart Language Basics", content: "Variables, functions, classes", duration: 30, order: 1 },
        { title: "Flutter Widgets", content: "Stateless & stateful widgets", duration: 35, order: 2 },
        { title: "Navigation & Routing", content: "Multi-screen apps", duration: 25, order: 3 },
        { title: "State Management", content: "Provider & Riverpod", duration: 40, order: 4 },
        { title: "REST API Integration", content: "http package & JSON parsing", duration: 30, order: 5 },
      ],
    },
  ]);

  console.log(`✅ Created ${courses.length} courses`);

  // ── Create Enrollments ────────────────────────────────────────────────────────
  const enrollments = await Enrollment.create([
    { student: carol._id, course: courses[0]._id, progress: 60 },
    { student: carol._id, course: courses[2]._id, progress: 100, isCompleted: true },
    { student: david._id, course: courses[1]._id, progress: 30 },
    { student: david._id, course: courses[3]._id, progress: 10 },
  ]);

  // Update user enrolledCourses arrays
  await User.findByIdAndUpdate(carol._id, {
    enrolledCourses: [courses[0]._id, courses[2]._id],
  });
  await User.findByIdAndUpdate(david._id, {
    enrolledCourses: [courses[1]._id, courses[3]._id],
  });

  // Update course enrolledStudents arrays
  await Course.findByIdAndUpdate(courses[0]._id, { $push: { enrolledStudents: carol._id } });
  await Course.findByIdAndUpdate(courses[2]._id, { $push: { enrolledStudents: carol._id } });
  await Course.findByIdAndUpdate(courses[1]._id, { $push: { enrolledStudents: david._id } });
  await Course.findByIdAndUpdate(courses[3]._id, { $push: { enrolledStudents: david._id } });

  console.log(`✅ Created ${enrollments.length} enrollments`);

  // ── Test Queries (Querying Concept) ───────────────────────────────────────────
  console.log("\n📊 Testing MongoDB Queries...");

  // find() — get all published courses
  const publishedCourses = await Course.find({ isPublished: true });
  console.log(`  find({ isPublished: true }) → ${publishedCourses.length} courses`);

  // findOne() — get a specific user
  const foundUser = await User.findOne({ email: "carol@learnloop.com" });
  console.log(`  findOne({ email }) → Found: ${foundUser.name}`);

  // find() with filter + sort — beginner courses sorted by rating
  const beginnerCourses = await Course.find({ level: "Beginner" }).sort({ rating: -1 });
  console.log(`  find({ level: 'Beginner' }).sort() → ${beginnerCourses.length} courses`);

  // Text search
  const searchResults = await Course.find({ $text: { $search: "python" } });
  console.log(`  Text search 'python' → ${searchResults.length} result(s)`);

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Test Accounts:");
  console.log("  Student  → carol@learnloop.com / password123");
  console.log("  Student  → david@learnloop.com / password123");
  console.log("  Instructor → alice@learnloop.com / password123");
  console.log("  Admin    → admin@learnloop.com / admin123");

  process.exit(0);
};

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
