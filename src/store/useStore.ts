import { create } from 'zustand';
import { User, UserProgress, ChatMessage, AppView, Course, Quiz } from '../types';
import { api } from '../lib/api';
import { Toast as ToastType } from '../components/Toast';

interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;

  // Navigation
  currentView: AppView;
  selectedCourseId: string | null;
  selectedLessonId: string | null;

  // Data
  courses: Course[];
  quizzes: Record<string, Quiz>;

  // Progress
  userProgress: Record<string, UserProgress>;

  // Chat
  chatMessages: ChatMessage[];
  chatOpen: boolean;

  // Theme
  theme: 'dark' | 'light';

  // Toasts
  toasts: ToastType[];

  // Actions
  setUser: (user: User | null) => void;
  setUserProgress: (progress: Record<string, UserProgress>) => void;
  logout: () => void;
  navigate: (view: AppView, courseId?: string) => void;
  setSelectedLessonId: (lessonId: string | null) => void;
  enrollCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string, xp: number) => void;
  addChatMessage: (message: ChatMessage) => void;
  setChatOpen: (open: boolean) => void;
  setQuizScore: (courseId: string, score: number) => void;
  earnCertificate: (courseId: string) => void;
  resetProgress: (courseId: string) => void;
  fetchCourses: () => Promise<void>;
  fetchQuizzes: () => Promise<void>;
  updateStreak: () => Promise<void>;
  toggleTheme: () => void;
  toggleWishlist: (courseId: string) => void;
  checkAchievements: () => Promise<void>;
  checkAndCompleteDailyChallenges: () => Promise<void>;
  updateDailyChallenge: (challengeId: string, progress: number) => Promise<void>;
  claimDailyChallengeReward: (challengeId: string) => Promise<void>;
  showLevelUp: (newLevel: number, rewards: any) => void;
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useStore = create<AppState>()(
  (set, get) => ({
    currentUser: null,
    isAuthenticated: false,
    currentView: 'landing',
    selectedCourseId: null,
    selectedLessonId: null,
    courses: [],
    quizzes: {},
    userProgress: {},
    chatMessages: [],
    chatOpen: false,
    theme: 'dark',
    toasts: [],

    setUser: (user) => {
      const { currentView } = get();
      const isInstructorView = currentView === 'instructor-login' || 
                              currentView === 'instructor-dashboard' || 
                              currentView === 'instructor-courses' || 
                              currentView === 'instructor-create-course' || 
                              currentView === 'instructor-course-details';
      
      set({
        currentUser: user,
        isAuthenticated: !!user,
        // Don't auto-navigate to dashboard if on instructor views
        currentView: isInstructorView ? currentView : (user ? 'dashboard' : 'landing'),
      });
    },

    setUserProgress: (progress) => {
      set({ userProgress: progress });
    },

    logout: () => {
      set({
        currentUser: null,
        isAuthenticated: false,
        currentView: 'landing',
        // Don't clear userProgress - it should persist
        chatMessages: [],
      });
    },

      navigate: (view, courseId) => {
        set({ currentView: view, selectedCourseId: courseId || get().selectedCourseId });
      },

      setSelectedLessonId: (lessonId) => {
        set({ selectedLessonId: lessonId });
      },

      enrollCourse: async (courseId) => {
        const { currentUser, userProgress } = get();
        if (!currentUser) return;
        
        if (!currentUser.enrolledCourses.includes(courseId)) {
          const updatedUser = {
            ...currentUser,
            enrolledCourses: [...currentUser.enrolledCourses, courseId],
          };
          const newProgress: UserProgress = {
            courseId,
            completedLessons: [],
            percentage: 0,
            startDate: new Date().toISOString(),
            lastAccessed: new Date().toISOString(),
            timeSpent: 0,
            certificateEarned: false,
          };
          
          // Update local state
          set({
            currentUser: updatedUser,
            userProgress: { ...userProgress, [courseId]: newProgress },
          });
          
          // Persist to backend
          try {
            await api.updateUser(currentUser.clerkId, { enrolledCourses: updatedUser.enrolledCourses });
            await api.updateProgress({ clerkId: currentUser.clerkId, ...newProgress });
          } catch (error) {
            console.error('Error enrolling course:', error);
          }
        }
      },

      completeLesson: async (courseId, lessonId, xp) => {
        const { currentUser, userProgress, courses } = get();
        if (!currentUser) return;

        console.log('=== COMPLETE LESSON START ===');
        console.log('courseId:', courseId);
        console.log('lessonId:', lessonId);
        console.log('xp:', xp);
        console.log('currentUser.clerkId:', currentUser.clerkId);

        const progress = userProgress[courseId] || {
          courseId,
          completedLessons: [],
          percentage: 0,
          startDate: new Date().toISOString(),
          lastAccessed: new Date().toISOString(),
          timeSpent: 0,
          certificateEarned: false,
        };

        // Don't proceed if lesson is already completed
        if (progress.completedLessons.includes(lessonId)) {
          console.log('Lesson already completed, skipping');
          return;
        }

        const course = courses.find((c: Course) => c.id === courseId);
        if (!course) return;

        const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
        const newCompleted = [...progress.completedLessons, lessonId];
        const percentage = Math.round((newCompleted.length / totalLessons) * 100);

        // Preserve existing progress data
        const updatedProgress = {
          ...progress,
          completedLessons: newCompleted,
          percentage,
          lastAccessed: new Date().toISOString(),
          timeSpent: progress.timeSpent + 15,
          // Preserve quiz score and certificate status if they exist
          quizScore: progress.quizScore,
          certificateEarned: progress.certificateEarned,
        };

        // Only award XP if lesson wasn't already completed (prevent repeated rewards)
        const newXP = currentUser.totalXP + xp;
        const newLevel = Math.floor(newXP / 500) + 1;

        const isCompleted = percentage === 100;
        const updatedUser = {
          ...currentUser,
          totalXP: newXP,
          level: newLevel,
          completedCourses: isCompleted && !currentUser.completedCourses.includes(courseId)
            ? [...currentUser.completedCourses, courseId]
            : currentUser.completedCourses,
        };

        // Update local state
        set({
          currentUser: updatedUser,
          userProgress: { ...userProgress, [courseId]: updatedProgress },
        });
        
        // Update weekly activity
        const today = new Date().toISOString().split('T')[0];
        const weeklyActivity = currentUser.weeklyActivity || [];
        const todayActivity = weeklyActivity.find((a: any) => a.date === today);
        
        if (todayActivity) {
          todayActivity.lessonsCompleted += 1;
          todayActivity.xpEarned += xp;
          todayActivity.timeSpent += 15;
        } else {
          weeklyActivity.push({
            date: today,
            lessonsCompleted: 1,
            xpEarned: xp,
            timeSpent: 15
          });
        }
        
        // Keep only last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const filteredActivity = weeklyActivity.filter((a: any) => new Date(a.date) >= sevenDaysAgo);
        
        updatedUser.weeklyActivity = filteredActivity;
        
        // Persist to backend
        try {
          console.log('Calling api.completeLesson...');
          await api.completeLesson(currentUser.clerkId, courseId, lessonId, xp);
          console.log('api.completeLesson completed');
          
          console.log('Calling api.updateUser...');
          await api.updateUser(currentUser.clerkId, { 
            totalXP: newXP, 
            level: newLevel, 
            completedCourses: updatedUser.completedCourses,
            weeklyActivity: filteredActivity
          });
          console.log('api.updateUser completed');
          
          console.log('Calling api.updateProgress...');
          await api.updateProgress({ clerkId: currentUser.clerkId, ...updatedProgress });
          console.log('api.updateProgress completed');
          
          // Refresh progress from backend to ensure sync
          console.log('Refreshing progress from backend...');
          const refreshedProgress = await api.getUserProgress(currentUser.clerkId);
          console.log('Refreshed progress:', refreshedProgress);
          set({ userProgress: refreshedProgress });
          console.log('Progress refreshed in store');
          
          // Check and complete daily challenges AFTER backend is updated
          console.log('Calling checkAndCompleteDailyChallenges...');
          await get().checkAndCompleteDailyChallenges();
          console.log('checkAndCompleteDailyChallenges completed');
          
          // Award certificate if course is complete and quiz score is passing
          if (isCompleted && progress.quizScore && progress.quizScore >= 70 && !progress.certificateEarned) {
            await get().earnCertificate(courseId);
          }
        } catch (error) {
          console.error('Error completing lesson:', error);
        }
      },

      setQuizScore: (courseId, score) => {
        const { userProgress } = get();
        const progress = userProgress[courseId];
        if (!progress) {
          // If no progress exists, create a minimal one
          set({
            userProgress: {
              ...userProgress,
              [courseId]: {
                courseId,
                completedLessons: [],
                percentage: 0,
                startDate: new Date().toISOString(),
                lastAccessed: new Date().toISOString(),
                timeSpent: 0,
                quizScore: score,
                certificateEarned: false,
              }
            }
          });
        } else {
          // Preserve all existing data, only update quiz score
          set({
            userProgress: {
              ...userProgress,
              [courseId]: { ...progress, quizScore: score },
            }
          });
        }
      },

      earnCertificate: async (courseId) => {
        const { userProgress, currentUser, courses } = get();
        const progress = userProgress[courseId];
        if (!progress || !currentUser) return;

        const newBadge = {
          id: `cert-${courseId}`,
          name: `${courses.find((c: Course) => c.id === courseId)?.title || courseId} Certificate`,
          icon: '🎓',
          description: 'Completed course with passing quiz score',
          earnedDate: new Date().toISOString(),
        };

        const updatedProgress = {
          ...progress,
          certificateEarned: true,
        };

        const updatedUser = {
          ...currentUser,
          badges: [...currentUser.badges.filter(b => b.id !== newBadge.id), newBadge],
        };

        // Update local state
        set({
          userProgress: {
            ...userProgress,
            [courseId]: updatedProgress,
          },
          currentUser: updatedUser,
        });

        // Persist to backend
        try {
          await api.updateUser(currentUser.clerkId, { badges: updatedUser.badges });
          await api.updateProgress({ clerkId: currentUser.clerkId, ...updatedProgress });
        } catch (error) {
          console.error('Error earning certificate:', error);
        }
      },

      addChatMessage: (message) => {
        set(state => ({ chatMessages: [...state.chatMessages, message] }));
      },

      setChatOpen: (open) => set({ chatOpen: open }),

      resetProgress: (courseId) => {
        const { userProgress } = get();
        set({
          userProgress: {
            ...userProgress,
            [courseId]: {
              courseId,
              completedLessons: [],
              percentage: 0,
              startDate: new Date().toISOString(),
              lastAccessed: new Date().toISOString(),
              timeSpent: 0,
              certificateEarned: false,
            }
          }
        });
      },

      fetchCourses: async () => {
        try {
          const coursesData = await api.getCourses();
          set({ courses: coursesData });
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      },

      fetchQuizzes: async () => {
        try {
          const quizzesData = await api.getQuizzes();
          const quizzesMap: Record<string, Quiz> = {};
          quizzesData.forEach((quiz: Quiz) => {
            quizzesMap[quiz.id] = quiz;
          });
          set({ quizzes: quizzesMap });
        } catch (error) {
          console.error('Error fetching quizzes:', error);
        }
      },

      updateStreak: async () => {
        try {
          const { currentUser } = get();
          if (!currentUser?.clerkId) return;
          const updatedUser = await api.updateStreak(currentUser.clerkId);
          set({ currentUser: updatedUser });
        } catch (error) {
          console.error('Error updating streak:', error);
        }
      },

      toggleTheme: () => {
        const { theme } = get();
        set({ theme: theme === 'dark' ? 'light' : 'dark' });
      },

      toggleWishlist: async (courseId) => {
        const { currentUser } = get();
        if (!currentUser) {
          console.log('toggleWishlist: No current user');
          alert('Please login to add courses to favorites');
          return;
        }

        console.log('=== TOGGLE WISHLIST START ===');
        console.log('Course ID:', courseId);
        console.log('User object:', currentUser);
        console.log('User clerkId:', currentUser.clerkId);
        console.log('Current wishlist:', currentUser.wishlist);

        // Ensure we have a valid user ID - try multiple possible fields
        const userId = currentUser.clerkId;
        console.log('Resolved user ID:', userId);
        
        if (!userId) {
          console.error('User ID is undefined! Available fields:', Object.keys(currentUser));
          alert('User ID is missing. Please logout and login again.');
          return;
        }

        // Ensure wishlist is an array
        const currentWishlist = Array.isArray(currentUser.wishlist) ? currentUser.wishlist : [];
        console.log('Validated wishlist array:', currentWishlist);
        
        const isInWishlist = currentWishlist.includes(courseId);
        console.log('Is already in wishlist:', isInWishlist);
        
        const updatedWishlist = isInWishlist
          ? currentWishlist.filter(id => id !== courseId)
          : [...currentWishlist, courseId];

        console.log('Updated wishlist:', updatedWishlist);

        const updatedUser = {
          ...currentUser,
          wishlist: updatedWishlist,
        };

        // Update local state immediately
        set({ currentUser: updatedUser });
        console.log('Local state updated');

        // Persist to backend using the api helper
        try {
          console.log('Calling API: PUT /api/users/' + userId);
          console.log('Request body:', { wishlist: updatedWishlist });
          
          const result = await api.updateUser(userId, { wishlist: updatedWishlist });
          console.log('API update successful:', result);
          
          // Update local state with the server response
          set({ currentUser: { ...updatedUser, ...result } });
          console.log('=== TOGGLE WISHLIST SUCCESS ===');
          
        } catch (error) {
          console.error('=== TOGGLE WISHLIST ERROR ===');
          console.error('Error details:', error);
          alert('Failed to update favorites. Please try again.');
          // Revert on error
          set({ currentUser });
        }
      },

      checkAchievements: async () => {
        const { currentUser, userProgress } = get();
        if (!currentUser?.clerkId) return;

        try {
          const stats = {
            lessonsCompleted: Object.values(userProgress).reduce((sum, p) => sum + p.completedLessons.length, 0),
            coursesCompleted: Object.values(userProgress).filter(p => p.percentage === 100).length,
            streakDays: currentUser.currentStreak,
            totalXP: currentUser.totalXP,
            enrolledCourses: currentUser.enrolledCourses?.length || 0
          };

          const result = await api.checkAchievements(currentUser.clerkId, stats);
          set({ currentUser: result.user });

          if (result.unlockedAchievements && result.unlockedAchievements.length > 0) {
            alert(`🎉 Achievement Unlocked: ${result.unlockedAchievements[0].title}`);
          }
        } catch (error) {
          console.error('Error checking achievements:', error);
        }
      },

      checkAndCompleteDailyChallenges: async () => {
        const { currentUser, userProgress } = get();
        if (!currentUser?.clerkId) {
          console.log('checkAndCompleteDailyChallenges: No user found');
          return;
        }

        try {
          console.log('=== CHECKING DAILY CHALLENGES ===');
          
          // Reload user data from backend to get latest weeklyActivity
          const refreshedUser = await api.getUser(currentUser.clerkId);
          if (refreshedUser) {
            set({ currentUser: refreshedUser });
          }
          
          const today = new Date().toISOString().split('T')[0];
          const todayEntry = refreshedUser?.dailyChallenges?.find((dc: any) => dc.date === today);
          
          if (!todayEntry) {
            console.log('No daily challenges found for today');
            return;
          }

          console.log('Today challenges:', todayEntry.challenges);

          // Calculate today's stats based on weeklyActivity from refreshed user data
          const todayActivity = refreshedUser?.weeklyActivity?.find((a: any) => a.date === today);
          const lessonsCompletedToday = todayActivity?.lessonsCompleted || 0;
          const xpEarnedToday = todayActivity?.xpEarned || 0;
          const timeSpentToday = todayActivity?.timeSpent || 0;
          
          // Count courses completed (overall, not just today - as this is harder to track daily)
          const coursesCompleted = Object.values(userProgress).filter(p => p.percentage >= 99).length;
          
          // Check if any quiz was taken today (based on XP from quizzes)
          const quizzesTakenToday = xpEarnedToday > 0 ? 1 : 0;
          const currentStreak = refreshedUser?.currentStreak || 0;

          console.log('Today stats:', {
            lessonsCompletedToday,
            xpEarnedToday,
            coursesCompleted,
            quizzesTakenToday,
            currentStreak,
            timeSpentToday
          });

          // Check each challenge
          for (const challenge of todayEntry.challenges) {
            if (challenge.completed) {
              console.log(`Challenge ${challenge.id} already completed, skipping`);
              continue;
            }

            let shouldComplete = false;
            let currentProgress = challenge.current;

            // Handle course-specific challenges
            if (challenge.courseId) {
              const courseProgress = userProgress[challenge.courseId];
              const lessonsInCourse = courseProgress?.completedLessons?.length || 0;
              
              if (challenge.category === 'lessons') {
                currentProgress = lessonsInCourse;
                shouldComplete = currentProgress >= challenge.target;
              } else if (challenge.category === 'quizzes') {
                // Check if quiz was taken for this specific course
                const quizTaken = courseProgress?.quizScore && courseProgress.quizScore > 0;
                currentProgress = quizTaken ? 1 : 0;
                shouldComplete = currentProgress >= challenge.target;
              }
            } else {
              // Handle generic challenges
              switch (challenge.category) {
                case 'lessons':
                  currentProgress = lessonsCompletedToday;
                  shouldComplete = currentProgress >= challenge.target;
                  break;
                case 'quizzes':
                  currentProgress = quizzesTakenToday;
                  shouldComplete = currentProgress >= challenge.target;
                  break;
                case 'xp':
                  currentProgress = xpEarnedToday;
                  shouldComplete = currentProgress >= challenge.target;
                  break;
                case 'courses':
                  currentProgress = coursesCompleted;
                  shouldComplete = currentProgress >= challenge.target;
                  break;
                case 'streak':
                  currentProgress = currentStreak;
                  shouldComplete = currentProgress >= challenge.target;
                  break;
              }
            }

            console.log(`Challenge ${challenge.id}: category=${challenge.category}, current=${currentProgress}, target=${challenge.target}, shouldComplete=${shouldComplete}`);

            // Update challenge progress in backend
            try {
              await api.updateDailyChallengeProgress(refreshedUser.clerkId, challenge.id, currentProgress);
            } catch (error) {
              console.error('Failed to update challenge progress:', error);
            }

            // Update local challenge progress
            challenge.current = currentProgress;

            // Complete challenge if target reached
            if (shouldComplete && !challenge.completed) {
              console.log(`Completing challenge: ${challenge.id}`);
              const result = await api.completeDailyChallenge(refreshedUser.clerkId, challenge.id);
              console.log('Challenge completion result:', result);
              
              // Reload user data from backend to get latest state
              const finalUser = await api.getUser(refreshedUser.clerkId);
              if (finalUser) {
                set({ currentUser: finalUser });
              }
              
              // Show notification (but don't award XP yet - user needs to claim)
              alert(`🎯 Daily Challenge Completed: ${challenge.title} - Click "Claim Reward" to get your XP!`);
            }
          }
        } catch (error) {
          console.error('Error checking daily challenges:', error);
        }
      },

      updateDailyChallenge: async (challengeId, progress) => {
        const { currentUser } = get();
        if (!currentUser?.clerkId) return;

        try {
          const today = new Date().toISOString().split('T')[0];
          const todayEntry = currentUser.dailyChallenges?.find((dc: any) => dc.date === today);
          
          if (todayEntry) {
            const challenge = todayEntry.challenges.find((c: any) => c.id === challengeId);
            if (challenge) {
              challenge.current = progress;
              
              if (progress >= challenge.target && !challenge.completed) {
                const result = await api.completeDailyChallenge(currentUser.clerkId, challengeId);
                set({ currentUser: result.user });
                alert(`🎯 Challenge Completed: ${challenge.title}`);
              }
            }
          }
        } catch (error) {
          console.error('Error updating daily challenge:', error);
        }
      },

      claimDailyChallengeReward: async (challengeId) => {
        const { currentUser } = get();
        if (!currentUser?.clerkId) return;

        try {
          const result = await api.claimDailyChallengeReward(currentUser.clerkId, challengeId);
          
          // Reload user data from backend to get latest state
          const refreshedUser = await api.getUser(currentUser.clerkId);
          if (refreshedUser) {
            set({ currentUser: refreshedUser });
          }
          
          alert(`🎉 Reward Claimed: +${result.challenge.xpReward} XP`);
        } catch (error) {
          console.error('Error claiming reward:', error);
          alert('Failed to claim reward. Please try again.');
        }
      },

      showLevelUp: (newLevel, rewards) => {
        // This would trigger a level up modal
        console.log('Level up!', newLevel, rewards);
        alert(`🎉 Level Up! You are now level ${newLevel}`);
      },

      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        set(state => ({ toasts: [...state.toasts, { ...toast, id }] }));
      },

      removeToast: (id) => {
        set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
      },
  })
);
