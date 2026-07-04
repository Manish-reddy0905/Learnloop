import { useStore } from '../store/useStore';
import { GraduationCap, AlertCircle, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function InstructorLogin() {
  const { navigate, theme, currentUser, setUser } = useStore();
  const [authError, setAuthError] = useState('');
  const [hasChecked, setHasChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    if (currentUser?.role === 'instructor') {
      navigate('instructor-dashboard');
    }
    
    // Also check localStorage for persisted session
    const persistedUser = localStorage.getItem('instructorUser');
    if (persistedUser) {
      try {
        const user = JSON.parse(persistedUser);
        if (user.role === 'instructor') {
          setUser(user);
          navigate('instructor-dashboard');
          return;
        }
      } catch (error) {
        console.error('Error parsing persisted user:', error);
        localStorage.removeItem('instructorUser');
      }
    }
    
    setHasChecked(true);
  }, [currentUser, navigate, setUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError('Please enter email and password');
      return;
    }

    setIsLoggingIn(true);
    setAuthError('');

    try {
      console.log('Attempting instructor login to:', 'http://localhost:4000/api/instructors/login');
      
      // Login via backend
      const response = await fetch('http://localhost:4000/api/instructors/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const text = await response.text();
      console.log('Response text:', text);

      if (!response.ok) {
        throw new Error(text || 'Login failed');
      }

      const data = JSON.parse(text);
      console.log('Parsed data:', data);

      // Set user in store
      const userToSet = {
        clerkId: data.clerkId,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        role: data.role || 'instructor',
        totalXP: data.totalXP || 0,
        level: data.level || 1,
        joinDate: data.joinDate || new Date().toISOString(),
        coins: data.coins || 0,
        gems: data.gems || 0,
        currentStreak: data.currentStreak || 0,
        longestStreak: data.longestStreak || 0,
        streakFreezes: data.streakFreezes || 0,
        streakBadges: data.streakBadges || [],
        badges: data.badges || [],
        achievements: data.achievements || [],
        dailyChallenges: data.dailyChallenges || [],
        weeklyActivity: data.weeklyActivity || [],
        enrolledCourses: data.enrolledCourses || [],
        completedCourses: data.completedCourses || [],
        wishlist: data.wishlist || [],
        friends: data.friends || [],
        teams: data.teams || [],
        joinedCompetitions: data.joinedCompetitions || [],
        competitionHistory: data.competitionHistory || [],
        notes: data.notes || [],
      };
      setUser(userToSet);
      
      // Persist session to localStorage
      localStorage.setItem('instructorUser', JSON.stringify(userToSet));

      // Navigate to instructor dashboard
      navigate('instructor-dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthError(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setAuthError('Please fill in all fields');
      return;
    }

    setIsSigningUp(true);
    setAuthError('');

    try {
      console.log('Attempting instructor signup to:', 'http://localhost:4000/api/instructors');
      
      // Signup via backend
      const response = await fetch('http://localhost:4000/api/instructors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      console.log('Response status:', response.status);

      const text = await response.text();
      console.log('Response text:', text);

      if (!response.ok) {
        throw new Error(text || 'Signup failed');
      }

      const data = JSON.parse(text);
      console.log('Signup successful:', data);

      // Automatically login after signup
      setAuthError('');
      setIsLoginMode(true);
      
      // Clear form
      setEmail('');
      setPassword('');
      setName('');
      
      alert('Account created successfully! Please login with your credentials.');
    } catch (error: any) {
      console.error('Signup error:', error);
      setAuthError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className={`flex-1 flex items-center justify-center min-h-screen px-6 ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            Instructor Portal
          </h1>
          <p className="text-gray-400 text-sm">Create and manage your courses</p>
        </div>

        {/* Login Form */}
        <div className="p-8 bg-white/3 border border-white/10 rounded-3xl">
          {authError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-sm text-red-400">{authError}</span>
            </div>
          )}

          {/* Toggle between Login and Signup */}
          <div className="flex mb-6 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                isLoginMode
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                !isLoginMode
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {hasChecked && (
            <>
              {isLoginMode ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                        } focus:outline-none transition-colors`}
                        placeholder="instructor@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                        } focus:outline-none transition-colors`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoggingIn ? 'Logging in...' : (
                      <>
                        Login
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                        } focus:outline-none transition-colors`}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                        } focus:outline-none transition-colors`}
                        placeholder="instructor@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                        } focus:outline-none transition-colors`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSigningUp ? 'Creating Account...' : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('landing')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Student Learning
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300">
              <p className="font-semibold text-blue-400 mb-1">Become an Instructor</p>
              <p>Share your expertise by creating courses. Set your own prices and reach thousands of students worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
