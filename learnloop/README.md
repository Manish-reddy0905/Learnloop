# ⟳ LearnLoop

A full-stack e-learning platform built with **MongoDB Atlas**, **Express.js**, and **Vanilla JS**.

---

## 📁 Project Structure

```
learnloop/
├── backend/              # Express.js API
│   ├── config/db.js      # MongoDB Atlas connection
│   ├── models/           # Mongoose schemas (User, Course, Enrollment)
│   ├── routes/           # CRUD API routes
│   ├── middleware/auth.js # JWT authentication
│   ├── seed.js           # Sample data population
│   └── server.js         # Entry point
│
└── frontend/             # Vanilla HTML/CSS/JS
    ├── index.html        # Landing page
    ├── courses.html      # Course listing with filters
    ├── course.html       # Course detail + enroll
    ├── dashboard.html    # Student dashboard
    ├── create-course.html# Instructor: create course form
    ├── register.html     # Registration form
    ├── login.html        # Login form
    ├── app.js            # Shared JS utilities
    └── style.css         # All styles
```

---

## 🚀 Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **free cluster** (M0)
3. Under **Database Access**, create a user with Read/Write permissions
4. Under **Network Access**, add your IP (or `0.0.0.0/0` for dev)
5. Click **Connect → Drivers** and copy the connection string

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env from the template
cp .env.example .env
# Edit .env and paste your MongoDB Atlas URI
```

Edit `.env`:
```
MONGO_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/learnloop?retryWrites=true&w=majority
JWT_SECRET=any_long_random_string_here
PORT=5000
```

### 3. Seed the Database

```bash
cd backend
node seed.js
```

This inserts 5 users, 5 courses, and 4 enrollments, and tests all queries.

### 4. Start the Backend

```bash
npm start
# or with auto-reload:
npm run dev
```

Server runs on `http://localhost:5000`

### 5. Start the Frontend

Open `frontend/index.html` in a browser, or use Live Server in VS Code.

---

## 🔐 Test Accounts

| Role       | Email                    | Password     |
|------------|--------------------------|--------------|
| Student    | carol@learnloop.com      | password123  |
| Student    | david@learnloop.com      | password123  |
| Instructor | alice@learnloop.com      | password123  |
| Admin      | admin@learnloop.com      | admin123     |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint            | Description     | Auth |
|--------|---------------------|-----------------|------|
| POST   | /api/auth/register  | Register user   | No   |
| POST   | /api/auth/login     | Login           | No   |
| POST   | /api/auth/logout    | Logout          | Yes  |
| GET    | /api/auth/me        | Get profile     | Yes  |

### Courses (CRUD)
| Method | Endpoint                    | Description              | Auth        |
|--------|-----------------------------|--------------------------|-------------|
| GET    | /api/courses                | Get all courses (filters)| No          |
| GET    | /api/courses/:id            | Get course by ID         | No          |
| POST   | /api/courses                | Create course            | Instructor+ |
| PUT    | /api/courses/:id            | Update course            | Instructor+ |
| DELETE | /api/courses/:id            | Delete course            | Instructor+ |
| POST   | /api/courses/:id/enroll     | Enroll in course         | Student     |
| GET    | /api/courses/my/enrolled    | My enrollments           | Yes         |

### Users
| Method | Endpoint       | Description      | Auth  |
|--------|----------------|------------------|-------|
| GET    | /api/users     | All users        | Admin |
| GET    | /api/users/:id | Get user         | Yes   |
| PUT    | /api/users/:id | Update profile   | Yes   |
| DELETE | /api/users/:id | Delete user      | Admin |

---

## 🗄️ MongoDB Concepts Applied

### 1. CRUD Operations
- **Create**: `User.create()`, `Course.create()`, `Enrollment.create()`
- **Read**: `Course.find()`, `User.findOne()`, `Enrollment.findById()`
- **Update**: `Course.findByIdAndUpdate()`, `User.findByIdAndUpdate()`
- **Delete**: `Course.findByIdAndDelete()`, `Enrollment.deleteMany()`

### 2. Indexing
```js
// User model
userSchema.index({ email: 1 });         // Fast login lookup
userSchema.index({ role: 1 });

// Course model
courseSchema.index({ category: 1 });    // Filter by category
courseSchema.index({ instructor: 1 });  // Instructor's courses
courseSchema.index({ price: 1 });       // Sort by price
courseSchema.index({ title: "text", description: "text", tags: "text" }); // Full-text search

// Enrollment model
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true }); // Compound + unique
```

### 3. Data Validation
Schema-level validation rejects invalid documents:
```js
// This will be rejected — empty name and bad email:
{ "name": "", "email": "abc" }  →  400 Validation failed
```
Validation layers:
- Mongoose schema validators (required, minlength, match, enum)
- Express-validator middleware on each route
- Client-side validation in forms (mirrors backend rules)

### 4. Querying
```js
// find() with filter + sort + pagination
Course.find({ isPublished: true, category: "Web Development" })
  .sort({ rating: -1 })
  .skip(0).limit(10)

// Text search using MongoDB text index
Course.find({ $text: { $search: "python data science" } })

// findOne
User.findOne({ email: "carol@learnloop.com" })

// Populate references (JOIN equivalent)
Enrollment.find({ student: userId })
  .populate({ path: "course", populate: { path: "instructor" } })

// findByIdAndUpdate
Course.findByIdAndUpdate(id, { isPublished: true }, { new: true, runValidators: true })
```
