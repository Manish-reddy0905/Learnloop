const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");

// ─── @GET /api/users ──────────────────────────────────────────────────────────
// Admin only: get all users (findMany equivalent)

router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.role = role;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({ users, total });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ─── @GET /api/users/:id ──────────────────────────────────────────────────────

router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("enrolledCourses", "title thumbnail");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ─── @PUT /api/users/:id ──────────────────────────────────────────────────────

router.put(
  "/:id",
  protect,
  [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email")
      .optional()
      .isEmail().withMessage("Must be a valid email"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    // Users can only update their own profile (admins can update anyone)
    if (
      req.params.id !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    try {
      const { name, email, avatar } = req.body;
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (avatar) updateData.avatar = avatar;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).select("-password");

      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({ message: "Profile updated", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ─── @DELETE /api/users/:id ───────────────────────────────────────────────────

router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
