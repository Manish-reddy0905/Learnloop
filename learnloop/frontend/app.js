// ── Config ────────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:5000/api";

// ── Auth Helpers ──────────────────────────────────────────────────────────────
function getToken() {
  return localStorage.getItem("ll_token");
}

function getUser() {
  const u = localStorage.getItem("ll_user");
  return u ? JSON.parse(u) : null;
}

function saveAuth(token, user) {
  localStorage.setItem("ll_token", token);
  localStorage.setItem("ll_user", JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem("ll_token");
  localStorage.removeItem("ll_user");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// Initialize navbar based on auth state
function initAuth() {
  const user = getUser();
  const authButtons = document.getElementById("authButtons");
  const userMenu = document.getElementById("userMenu");
  const userGreeting = document.getElementById("userGreeting");

  if (user && getToken()) {
    if (authButtons) authButtons.style.display = "none";
    if (userMenu) userMenu.style.display = "flex";
    if (userGreeting) userGreeting.textContent = `Hi, ${user.name.split(" ")[0]}`;
  } else {
    if (authButtons) authButtons.style.display = "flex";
    if (userMenu) userMenu.style.display = "none";
  }
}

async function logout() {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: authHeaders(),
    });
  } catch (e) {}
  clearAuth();
  window.location.href = "index.html";
}

function requireAuth() {
  if (!getToken()) {
    window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
    return false;
  }
  return true;
}

// ── API Helper ────────────────────────────────────────────────────────────────
async function apiCall(path, method = "GET", body = null, auth = false) {
  const headers = auth
    ? authHeaders()
    : { "Content-Type": "application/json" };

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);
  const data = await res.json();

  if (!res.ok) {
    const message =
      data.errors
        ? data.errors.map((e) => e.message).join(", ")
        : data.message || "Something went wrong";
    throw new Error(message);
  }

  return data;
}

// ── Category Icons ────────────────────────────────────────────────────────────
const categoryIcons = {
  "Web Development": "🌐",
  "Data Science": "📊",
  "Mobile Development": "📱",
  "DevOps": "⚙️",
  "Design": "🎨",
  "Business": "💼",
  "Marketing": "📣",
  "Other": "📚",
};

// ── Course Card Renderer ───────────────────────────────────────────────────────
function renderCourseCard(course) {
  const icon = categoryIcons[course.category] || "📚";
  const price = course.price === 0 ? "Free" : `₹${course.price}`;
  const instructor = course.instructor?.name || "Unknown Instructor";
  return `
    <a href="course.html?id=${course._id}" class="course-card">
      <div class="course-thumb">${icon}</div>
      <div class="course-body">
        <div class="course-meta">
          <span class="badge badge-category">${course.category}</span>
          <span class="badge badge-level">${course.level}</span>
        </div>
        <div class="course-title">${course.title}</div>
        <div class="course-instructor">by ${instructor}</div>
        <div class="course-footer">
          <span class="course-price">${price}</span>
          <span class="course-rating">★ ${course.rating?.toFixed(1) || "N/A"} (${course.totalRatings || 0})</span>
        </div>
      </div>
    </a>
  `;
}

// ── Form Validation Helpers ────────────────────────────────────────────────────
function showAlert(id, message, type = "error") {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `alert alert-${type} show`;
  el.textContent = message;
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideAlert(id) {
  const el = document.getElementById(id);
  if (el) el.className = "alert";
}

function setFieldError(inputEl, message) {
  inputEl.classList.add("error");
  const existing = inputEl.parentNode.querySelector(".field-error");
  if (existing) existing.remove();
  if (message) {
    const err = document.createElement("div");
    err.className = "field-error";
    err.textContent = message;
    inputEl.parentNode.appendChild(err);
  }
}

function clearFieldErrors() {
  document.querySelectorAll(".form-input.error, .form-select.error").forEach((el) => {
    el.classList.remove("error");
  });
  document.querySelectorAll(".field-error").forEach((el) => el.remove());
}

// ── Navbar Toggle ─────────────────────────────────────────────────────────────
function toggleNav() {
  document.getElementById("navLinks")?.classList.toggle("open");
}
