const express = require("express");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");

// ─── Validation Rules ────────────────────────────────────────────────────────

const courseValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),
  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),
  body("category")
    .notEmpty().withMessage("Category is required")
    .isIn(["Web Development","Data Science","Mobile Development","DevOps","Design","Business","Marketing","Other"])
    .withMessage("Invalid category"),
  body("price")
    .isNumeric().withMessage("Price must be a number")
    .custom((v) => v >= 0).withMessage("Price cannot be negative"),
  body("level")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced"]).withMessage("Invalid level"),
];

// ─── @GET /api/courses ────────────────────────────────────────────────────────
// Querying: find() with filters, sorting, pagination

router.get("/", async (req, res) => {
  try {
    const { category, level, search, sort, page = 1, limit = 10 } = req.query;

    // Build query object
    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (level) filter.level = level;

    // Text search using MongoDB text index
    if (search) {
      filter.$text = { $search: search };
    }

    // Sort options
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      "price-low": { price: 1 },
      "price-high": { price: -1 },
      rating: { rating: -1 },
    };
    const sortBy = sortOptions[sort] || { createdAt: -1 };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with find()
    const courses = await Course.find(filter)
      .populate("instructor", "name avatar")
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Course.countDocuments(filter);

    res.json({
      courses,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ─── @GET /api/courses/:id ────────────────────────────────────────────────────

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name avatar email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ─── @POST /api/courses ───────────────────────────────────────────────────────

router.post(
  "/",
  protect,
  authorize("instructor", "admin"),
  courseValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    try {
      const course = await Course.create({
        ...req.body,
        instructor: req.user._id,
      });

      res.status(201).json({ message: "Course created", course });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ─── @PUT /api/courses/:id ────────────────────────────────────────────────────

router.put(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  async (req, res) => {
    try {
      let course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Only the course owner or admin can update
      if (
        course.instructor.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({ message: "Not authorized to update this course" });
      }

      course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.json({ message: "Course updated", course });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ─── @DELETE /api/courses/:id ─────────────────────────────────────────────────

router.delete(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (
        course.instructor.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({ message: "Not authorized to delete this course" });
      }

      await Course.findByIdAndDelete(req.params.id);
      await Enrollment.deleteMany({ course: req.params.id });

      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ─── @POST /api/courses/:id/enroll ───────────────────────────────────────────

router.post("/:id/enroll", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.id,
    });

    if (existingEnrollment) {
      return res.status(409).json({ message: "Already enrolled in this course" });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: req.params.id,
    });

    // Update course's enrolled students array
    await Course.findByIdAndUpdate(req.params.id, {
      $push: { enrolledStudents: req.user._id },
    });

    // Update user's enrolled courses
    await User.findByIdAndUpdate(req.user._id, {
      $push: { enrolledCourses: req.params.id },
    });

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ─── @GET /api/courses/my/enrolled ───────────────────────────────────────────

router.get("/my/enrolled", protect, async (req, res) => {
  try {
    // findMany equivalent: find all enrollments for this student
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({
        path: "course",
        select: "title thumbnail category level instructor",
        populate: { path: "instructor", select: "name" },
      })
      .sort({ enrolledAt: -1 });

    res.json({ enrollments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
