import { useStore } from '../store/useStore';
import { BookOpen } from 'lucide-react';
import { SignIn, useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function StudentLogin() {
  const { navigate, theme, setUser } = useStore();
  const { isSignedIn, user } = useUser();
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const checkStudentAuth = async () => {
      if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
        setIsChecking(true);
        
        try {
          // Load user data from backend
          const userData = await api.getUser(user.id);
          if (userData) {
            // Set user in store
            const userToSet = {
              clerkId: userData.clerkId || user.id,
              name: userData.name,
              email: userData.email,
              avatar: userData.avatar,
              joinDate: userData.joinDate,
              totalXP: userData.totalXP,
              level: userData.level,
              coins: userData.coins || 0,
              gems: userData.gems || 0,
              currentStreak: userData.currentStreak || 0,
              longestStreak: userData.longestStreak || 0,
              streakFreezes: userData.streakFreezes || 0,
              streakBadges: userData.streakBadges || [],
              badges: userData.badges || [],
              achievements: userData.achievements || [],
              dailyChallenges: userData.dailyChallenges || [],
              weeklyActivity: userData.weeklyActivity || [],
              enrolledCourses: userData.enrolledCourses || [],
              completedCourses: userData.completedCourses || [],
              wishlist: userData.wishlist || [],
              role: userData.role || 'student',
              friends: userData.friends || [],
              teams: userData.teams || [],
              joinedCompetitions: userData.joinedCompetitions || [],
              competitionHistory: userData.competitionHistory || [],
              notes: userData.notes || [],
            };
            setUser(userToSet);
            
            // Navigate to dashboard
            navigate('dashboard');
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setIsChecking(false);
          setHasChecked(true);
        }
      } else {
        setHasChecked(true);
      }
    };

    const timer = setTimeout(() => {
      checkStudentAuth();
    }, 500);

    return () => clearTimeout(timer);
  }, [isSignedIn, user, navigate, setUser]);

  return (
    <div className={`flex-1 flex items-center justify-center min-h-screen px-6 ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            Student Portal
          </h1>
          <p className="text-gray-400 text-sm">Learn, grow, and achieve your goals</p>
        </div>

        {/* Clerk Sign In */}
        <div className="p-8 bg-white/3 border border-white/10 rounded-3xl">
          {isChecking && (
            <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-purple-400">Loading your profile...</span>
            </div>
          )}
          
          {hasChecked && !isChecking && (
            <SignIn />
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('landing')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300">
              <p className="font-semibold text-purple-400 mb-1">Start Learning Today</p>
              <p>Access thousands of courses, track your progress, and compete with other learners worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
