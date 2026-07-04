import { useEffect, lazy, Suspense } from 'react';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-react';
import { useStore } from './store/useStore';
import { api } from './lib/api';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail';
import ProfilePage from './components/ProfilePage';
import QuizPage from './components/QuizPage';
import CertificatePage from './components/CertificatePage';
import AIChat from './components/AIChat';
import VideoPlayer from './components/VideoPlayer';
import InstructorLogin from './components/InstructorLogin';
import StudentLogin from './components/StudentLogin';
import InstructorDashboard from './components/InstructorDashboard';
import InstructorCourses from './components/InstructorCourses';
import InstructorCreateCourse from './components/InstructorCreateCourse';
import InstructorCourseDetails from './components/InstructorCourseDetails';
import InstructorStudentProgress from './components/InstructorStudentProgress';
import Leaderboard from './components/Leaderboard';
import Certificates from './components/Certificates';
import LessonPage from './components/LessonPage';
import Wishlist from './components/Wishlist';
import AchievementsPage from './components/AchievementsPage';
import DailyChallengesPage from './components/DailyChallengesPage';
import CompetitionsPage from './components/CompetitionsPage';
import DiscussionForum from './components/DiscussionForum';
import ToastContainer from './components/ToastContainer';

// Lazy load less frequently used components for better performance
const InstructorCreateCourseLazy = lazy(() => import('./components/InstructorCreateCourse').then(m => ({ default: m.default })));
const InstructorCourseDetailsLazy = lazy(() => import('./components/InstructorCourseDetails').then(m => ({ default: m.default })));
const InstructorStudentProgressLazy = lazy(() => import('./components/InstructorStudentProgress').then(m => ({ default: m.default })));
const CertificatesLazy = lazy(() => import('./components/Certificates').then(m => ({ default: m.default })));
const WishlistLazy = lazy(() => import('./components/Wishlist').then(m => ({ default: m.default })));
const AchievementsPageLazy = lazy(() => import('./components/AchievementsPage').then(m => ({ default: m.default })));
const DailyChallengesPageLazy = lazy(() => import('./components/DailyChallengesPage').then(m => ({ default: m.default })));
const CompetitionsPageLazy = lazy(() => import('./components/CompetitionsPage').then(m => ({ default: m.default })));
const DiscussionForumLazy = lazy(() => import('./components/DiscussionForum').then(m => ({ default: m.default })));
const LessonPageLazy = lazy(() => import('./components/LessonPage').then(m => ({ default: m.default })));
const QuizPageLazy = lazy(() => import('./components/QuizPage').then(m => ({ default: m.default })));
const CertificatePageLazy = lazy(() => import('./components/CertificatePage').then(m => ({ default: m.default })));
const VideoPlayerLazy = lazy(() => import('./components/VideoPlayer').then(m => ({ default: m.default })));
const LeaderboardLazy = lazy(() => import('./components/Leaderboard').then(m => ({ default: m.default })));
const InstructorCoursesLazy = lazy(() => import('./components/InstructorCourses').then(m => ({ default: m.default })));
const InstructorDashboardLazy = lazy(() => import('./components/InstructorDashboard').then(m => ({ default: m.default })));

const clerkPubKey = 'pk_test_Y29zbWljLW1ha28tOTAuY2xlcmsuYWNjb3VudHMuZGV2JA';

function AppContent() {
  const { currentView, isAuthenticated, chatOpen, setUser, setUserProgress, fetchCourses, fetchQuizzes, updateStreak, theme } = useStore();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // Check if we're on instructor views
  const isInstructorView = currentView === 'instructor-login' || 
                          currentView === 'instructor-dashboard' || 
                          currentView === 'instructor-courses' || 
                          currentView === 'instructor-create-course' || 
                          currentView === 'instructor-course-details' ||
                          currentView === 'instructor-student-progress';

  // Apply theme to document
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    // Skip Clerk user sync when on instructor views (they use custom auth)
    if (isInstructorView) return;

    const syncUser = async () => {
      if (isSignedIn && user) {
        const clerkId = user.id;
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim() || user.username || 'User';
        const email = user.emailAddresses[0]?.emailAddress || '';

        try {
          // Try to get existing user
          let userData = await api.getUser(clerkId);

          if (!userData) {
            // Create new user
            userData = await api.createUser({
              clerkId,
              name: fullName,
              email,
            });
          }

          // Set user in store
          console.log('Setting user in store from userData:', userData);
          console.log('userData.joinedCompetitions:', userData.joinedCompetitions);
          const userToSet = {
            clerkId: userData.clerkId || clerkId,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
            joinDate: userData.joinDate,
            totalXP: userData.totalXP,
            level: userData.level,
            coins: userData.coins || 0,
            gems: userData.gems || 0,
            badges: userData.badges,
            enrolledCourses: userData.enrolledCourses,
            completedCourses: userData.completedCourses,
            wishlist: userData.wishlist || [],
            weeklyActivity: userData.weeklyActivity || [],
            currentStreak: userData.currentStreak || 0,
            longestStreak: userData.longestStreak || 0,
            streakFreezes: userData.streakFreezes || 0,
            streakBadges: userData.streakBadges || [],
            achievements: userData.achievements || [],
            dailyChallenges: userData.dailyChallenges || [],
            role: userData.role || 'student',
            friends: userData.friends || [],
            teams: userData.teams || [],
            joinedCompetitions: userData.joinedCompetitions || [],
            competitionHistory: userData.competitionHistory || [],
            notes: userData.notes || [],
          };
          console.log('User object to set in store:', userToSet);
          setUser(userToSet);

          // Update streak on login
          await updateStreak();

          // Load user progress
          const progress = await api.getUserProgress(clerkId);
          console.log('Loaded user progress from backend:', progress);
          setUserProgress(progress);
          
          // Also refresh user data to get latest completedCourses
          const refreshedUserData = await api.getUser(clerkId);
          if (refreshedUserData) {
            console.log('Refreshed user data, completedCourses:', refreshedUserData.completedCourses);
            const updatedUser = {
              ...userToSet,
              completedCourses: refreshedUserData.completedCourses || [],
            };
            setUser(updatedUser);
          }
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      } else {
        setUser(null);
      }
    };

    syncUser();
  }, [isSignedIn, user, setUser, setUserProgress, isInstructorView]);

  // Fetch courses and quizzes on mount
  useEffect(() => {
    fetchCourses();
    fetchQuizzes();
  }, [fetchCourses, fetchQuizzes]);

  // Public views
  if (currentView === 'landing') return <LandingPage />;

  // Instructor views (separate from student auth - must come before auth check)
  if (isInstructorView) {
    // Instructor views should not have Sidebar - they have their own layout
    switch (currentView) {
      case 'instructor-login': return <InstructorLogin />;
      case 'instructor-dashboard': return <InstructorDashboard />;
      case 'instructor-courses': return <InstructorCourses />;
      case 'instructor-create-course': return <InstructorCreateCourse />;
      case 'instructor-course-details': return <InstructorCourseDetails />;
      case 'instructor-student-progress': return <InstructorStudentProgress />;
      default: return <InstructorDashboard />;
    }
  }

  // Student login page - separate from instructor flow
  if (currentView === 'student-login') return <StudentLogin />;

  // Protected student views - require authentication
  if (!isAuthenticated) return <LandingPage />;

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'courses': return <CourseCatalog />;
      case 'course-detail': return <CourseDetail />;
      case 'learn': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><LessonPageLazy /></Suspense>;
      case 'video-player': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><VideoPlayerLazy /></Suspense>;
      case 'profile': return <ProfilePage />;
      case 'quiz': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><QuizPageLazy /></Suspense>;
      case 'certificate': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><CertificatePageLazy /></Suspense>;
      case 'leaderboard': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><LeaderboardLazy /></Suspense>;
      case 'certificates': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><CertificatesLazy /></Suspense>;
      case 'wishlist': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><WishlistLazy /></Suspense>;
      case 'achievements': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><AchievementsPageLazy /></Suspense>;
      case 'daily-challenges': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><DailyChallengesPageLazy /></Suspense>;
      case 'competitions': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><CompetitionsPageLazy /></Suspense>;
      case 'discussion': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><DiscussionForumLazy /></Suspense>;
      case 'instructor-dashboard': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><InstructorDashboardLazy /></Suspense>;
      case 'instructor-courses': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><InstructorCoursesLazy /></Suspense>;
      case 'instructor-create-course': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><InstructorCreateCourseLazy /></Suspense>;
      case 'instructor-course-details': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><InstructorCourseDetailsLazy /></Suspense>;
      case 'instructor-student-progress': return <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white">Loading...</div>}><InstructorStudentProgressLazy /></Suspense>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ 
      fontFamily: 'Inter, sans-serif',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1a1a2e 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%, #ffffff 100%)'
    }}>
      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-3" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        {renderContent()}
      </main>
      {chatOpen && <AIChat />}
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AppContent />
    </ClerkProvider>
  );
}

export default App;
