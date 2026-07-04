const API_URL = 'http://localhost:4000/api';

// Security utilities
const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    // Remove potentially dangerous characters
    return input
      .replace(/[<>]/g, '')
      .trim()
      .substring(0, 1000); // Limit length
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitized[key] = sanitizeInput(input[key]);
      }
    }
    return sanitized;
  }
  return input;
};

const validateClerkId = (clerkId: string): boolean => {
  // Basic validation for clerk ID format
  return typeof clerkId === 'string' && clerkId.length > 0 && clerkId.length < 256;
};

export const api = {
  // User endpoints
  getUser: async (clerkId: string) => {
    if (!validateClerkId(clerkId)) {
      throw new Error('Invalid clerk ID');
    }
    const response = await fetch(`${API_URL}/users/${encodeURIComponent(clerkId)}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch user');
    const data = await response.json();
    console.log('API getUser response:', data);
    return data;
  },

  createUser: async (userData: any) => {
    const sanitizedData = sanitizeInput(userData);
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    const data = await response.json();
    console.log('API createUser response:', data);
    return data;
  },

  updateUser: async (clerkId: string, updates: any) => {
    if (!validateClerkId(clerkId)) {
      throw new Error('Invalid clerk ID');
    }
    const sanitizedUpdates = sanitizeInput(updates);
    const response = await fetch(`${API_URL}/users/${encodeURIComponent(clerkId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedUpdates),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  updateStreak: async (clerkId: string) => {
    if (!validateClerkId(clerkId)) {
      throw new Error('Invalid clerk ID');
    }
    const response = await fetch(`${API_URL}/users/${encodeURIComponent(clerkId)}/streak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to update streak');
    return response.json();
  },

  // Progress endpoints
  getUserProgress: async (clerkId: string) => {
    if (!validateClerkId(clerkId)) {
      throw new Error('Invalid clerk ID');
    }
    const response = await fetch(`${API_URL}/progress/user/${encodeURIComponent(clerkId)}`);
    if (!response.ok) throw new Error('Failed to fetch progress');
    return response.json();
  },

  getCourseProgress: async (clerkId: string, courseId: string) => {
    if (!validateClerkId(clerkId)) {
      throw new Error('Invalid clerk ID');
    }
    const response = await fetch(`${API_URL}/progress/user/${encodeURIComponent(clerkId)}/course/${encodeURIComponent(courseId)}`);
    if (!response.ok) throw new Error('Failed to fetch course progress');
    return response.json();
  },

  updateProgress: async (progressData: any) => {
    const sanitizedData = sanitizeInput(progressData);
    const response = await fetch(`${API_URL}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedData),
    });
    if (!response.ok) throw new Error('Failed to update progress');
    return response.json();
  },

  completeLesson: async (clerkId: string, courseId: string, lessonId: string, xp: number) => {
    if (!validateClerkId(clerkId)) {
      throw new Error('Invalid clerk ID');
    }
    const response = await fetch(`${API_URL}/progress/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizeInput({ clerkId, courseId, lessonId, xp })),
    });
    if (!response.ok) throw new Error('Failed to complete lesson');
    return response.json();
  },

  // Course endpoints
  getCourses: async () => {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  },

  getCourse: async (courseId: string) => {
    const response = await fetch(`${API_URL}/courses/${courseId}`);
    if (!response.ok) throw new Error('Failed to fetch course');
    return response.json();
  },

  getCourseLessons: async (courseId: string) => {
    const response = await fetch(`${API_URL}/courses/${courseId}/lessons`);
    if (!response.ok) throw new Error('Failed to fetch lessons');
    return response.json();
  },

  getLesson: async (courseId: string, lessonId: string) => {
    const response = await fetch(`${API_URL}/courses/${courseId}/lessons/${lessonId}`);
    if (!response.ok) throw new Error('Failed to fetch lesson');
    return response.json();
  },

  submitQuiz: async (clerkId: string, courseId: string, lessonId: string, answers: any[], score: number) => {
    const response = await fetch(`${API_URL}/progress/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clerkId, courseId, lessonId, answers, score }),
    });
    if (!response.ok) throw new Error('Failed to submit quiz');
    return response.json();
  },

  // Quiz endpoints
  getQuizzes: async () => {
    const response = await fetch(`${API_URL}/quizzes`);
    if (!response.ok) throw new Error('Failed to fetch quizzes');
    return response.json();
  },

  getQuiz: async (quizId: string) => {
    const response = await fetch(`${API_URL}/quizzes/${quizId}`);
    if (!response.ok) throw new Error('Failed to fetch quiz');
    return response.json();
  },

  getQuizByCourse: async (courseId: string) => {
    const response = await fetch(`${API_URL}/quizzes/course/${courseId}`);
    if (!response.ok) throw new Error('Failed to fetch quiz for course');
    return response.json();
  },

  // Search and filter courses
  searchCourses: async (params: { search?: string; category?: string; level?: string; minRating?: number; tags?: string[] }) => {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.category) queryParams.append('category', params.category);
    if (params.level) queryParams.append('level', params.level);
    if (params.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params.tags) queryParams.append('tags', params.tags.join(','));

    const response = await fetch(`${API_URL}/courses?${queryParams}`);
    if (!response.ok) throw new Error('Failed to search courses');
    return response.json();
  },

  // Course reviews
  addReview: async (courseId: string, clerkId: string, userName: string, rating: number, comment: string) => {
    const sanitizedData = sanitizeInput({ clerkId, userName, rating, comment });
    if (sanitizedData.rating < 1 || sanitizedData.rating > 5) {
      throw new Error('Invalid rating');
    }
    const response = await fetch(`${API_URL}/courses/${encodeURIComponent(courseId)}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedData),
    });
    if (!response.ok) throw new Error('Failed to add review');
    return response.json();
  },

  getReviews: async (courseId: string) => {
    const response = await fetch(`${API_URL}/courses/${encodeURIComponent(courseId)}/reviews`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },

  // Wishlist
  getWishlist: async (clerkId: string) => {
    const response = await fetch(`${API_URL}/wishlist/${clerkId}`);
    if (!response.ok) throw new Error('Failed to fetch wishlist');
    return response.json();
  },

  addToWishlist: async (clerkId: string, courseId: string) => {
    const response = await fetch(`${API_URL}/wishlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clerkId, courseId }),
    });
    if (!response.ok) throw new Error('Failed to add to wishlist');
    return response.json();
  },

  removeFromWishlist: async (clerkId: string, courseId: string) => {
    const response = await fetch(`${API_URL}/wishlist/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clerkId, courseId }),
    });
    if (!response.ok) throw new Error('Failed to remove from wishlist');
    return response.json();
  },

  // Leaderboard
  getLeaderboard: async () => {
    const response = await fetch(`${API_URL}/users/leaderboard/all`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return response.json();
  },

  // Certificate email
  sendCertificateEmail: async (userId: string, courseId: string, userName: string, userEmail: string, courseTitle: string) => {
    const response = await fetch(`${API_URL}/users/certificate-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId, userName, userEmail, courseTitle }),
    });
    if (!response.ok) throw new Error('Failed to send certificate email');
    return response.json();
  },

  // Instructor authorization check
  checkInstructorAuth: async (email: string) => {
    const response = await fetch(`${API_URL}/instructors/check/${email}`);
    if (!response.ok) throw new Error('Failed to check instructor authorization');
    return response.json();
  },

  // Update user role (admin use)
  updateUserRole: async (clerkId: string, role: 'student' | 'instructor') => {
    const response = await fetch(`${API_URL}/users/${clerkId}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    if (!response.ok) throw new Error('Failed to update user role');
    return response.json();
  },

  // Achievement endpoints
  unlockAchievement: async (clerkId: string, achievementId: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/achievements/${achievementId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to unlock achievement');
    return response.json();
  },

  checkAchievements: async (clerkId: string, stats: any) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/achievements-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Achievement check failed:', errorText);
      throw new Error('Failed to check achievements');
    }
    return response.json();
  },

  // Daily challenges endpoints
  updateDailyChallenges: async (clerkId: string, challenges: any[]) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/daily-challenges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challenges }),
    });
    if (!response.ok) throw new Error('Failed to update daily challenges');
    return response.json();
  },

  completeDailyChallenge: async (clerkId: string, challengeId: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/daily-challenges/${challengeId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to complete daily challenge');
    return response.json();
  },

  updateDailyChallengeProgress: async (clerkId: string, challengeId: string, progress: number) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/daily-challenges/${challengeId}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress }),
    });
    if (!response.ok) throw new Error('Failed to update challenge progress');
    return response.json();
  },

  claimDailyChallengeReward: async (clerkId: string, challengeId: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/daily-challenges/${challengeId}/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to claim reward');
    return response.json();
  },

  // Social features endpoints
  addFriend: async (clerkId: string, friendId: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/friends/${friendId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to add friend');
    return response.json();
  },

  removeFriend: async (clerkId: string, friendId: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/friends/${friendId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to remove friend');
    return response.json();
  },

  getFriends: async (clerkId: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/friends`);
    if (!response.ok) throw new Error('Failed to get friends');
    return response.json();
  },

  createTeam: async (clerkId: string, name: string, description: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    if (!response.ok) throw new Error('Failed to create team');
    return response.json();
  },

  joinTeam: async (clerkId: string, teamId: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/teams/${teamId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to join team');
    return response.json();
  },

  // Currency endpoints
  awardCoins: async (clerkId: string, amount: number, reason: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/coins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, reason }),
    });
    if (!response.ok) throw new Error('Failed to award coins');
    return response.json();
  },

  spendCoins: async (clerkId: string, amount: number, item: string, reason: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/coins/spend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, item, reason }),
    });
    if (!response.ok) throw new Error('Failed to spend coins');
    return response.json();
  },

  awardGems: async (clerkId: string, amount: number, reason: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/gems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, reason }),
    });
    if (!response.ok) throw new Error('Failed to award gems');
    return response.json();
  },

  useStreakFreeze: async (clerkId: string) => {
    const response = await fetch(`${API_URL}/users/${clerkId}/streak-freeze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to use streak freeze');
    return response.json();
  },
};
