import { useStore } from '../store/useStore';
import { BookOpen, Trophy, TrendingUp, Star, ArrowRight, CheckCircle, Zap, Clock, Users, BarChart3, Target, Flame, Calendar } from 'lucide-react';
import { api } from '../lib/api';
import { getActiveCompetitions } from '../data/competitions';

export default function Dashboard() {
  const { currentUser, userProgress, navigate, enrollCourse, courses, theme } = useStore();

  const enrolledCourseData = courses.filter(c => currentUser?.enrolledCourses.includes(c.id));
  const recommendedCourses = courses
    .filter(c => !currentUser?.enrolledCourses.includes(c.id))
    .slice(0, 3);

  // Get joined competitions with details
  const activeCompetitions = getActiveCompetitions();
  const joinedCompetitionsData = activeCompetitions.filter(comp => {
    const joinedComp = currentUser?.joinedCompetitions?.find((jc: any) => {
      const id = typeof jc === 'string' ? jc : jc.competitionId;
      return id === comp.id;
    });
    return !!joinedComp;
  }).map(comp => {
    const joinedComp = currentUser?.joinedCompetitions?.find((jc: any) => {
      const id = typeof jc === 'string' ? jc : jc.competitionId;
      return id === comp.id;
    });
    return {
      ...comp,
      joinedAt: joinedComp?.joinedAt || new Date().toISOString()
    };
  });

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening';

  const getRecommendations = () => {
    const completedIds = currentUser?.completedCourses || [];
    const enrolledIds = currentUser?.enrolledCourses || [];
    const allRelated = new Set<string>();
    [...completedIds, ...enrolledIds].forEach(id => {
      const course = courses.find(c => c.id === id);
      course?.relatedCourses.forEach(r => allRelated.add(r));
    });
    return courses.filter(c => allRelated.has(c.id) && !enrolledIds.includes(c.id) && !completedIds.includes(c.id)).slice(0, 4);
  };

  const recommendations = getRecommendations().length > 0 ? getRecommendations() : recommendedCourses;

  const statsCards = [
    { icon: <Zap className="w-5 h-5" />, label: 'Current Streak', value: `${currentUser?.currentStreak || 0}`, unit: 'days', color: 'from-orange-500 to-red-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Longest Streak', value: `${currentUser?.longestStreak || 0}`, unit: 'days', color: 'from-yellow-500 to-amber-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Courses Enrolled', value: `${enrolledCourseData.length}`, unit: 'total', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Total XP', value: `${currentUser?.totalXP || 0}`, unit: 'points', color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  ];

  const handleUseStreakFreeze = async () => {
    if (!currentUser?.clerkId) return;
    try {
      const result = await api.useStreakFreeze(currentUser.clerkId);
      const { setUser } = useStore.getState();
      setUser(result.user);
      alert('❄️ Streak freeze activated! Your streak is protected for 1 day.');
    } catch (error) {
      console.error('Error using streak freeze:', error);
      alert('Failed to use streak freeze. Please try again.');
    }
  };

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Space Grotesk' }}>
                {greeting}, {currentUser?.name?.split(' ')[0]}! 👋
              </h1>
              <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Continue your learning journey today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-xl ${theme === 'dark' ? '' : 'bg-purple-100 border-purple-300'}`}>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Level</div>
                <div className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentUser?.level || 1}</div>
              </div>
              {(currentUser?.streakFreezes || 0) > 0 && (
                <button
                  onClick={handleUseStreakFreeze}
                  className={`px-4 py-2 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-xl ${theme === 'dark' ? '' : 'bg-cyan-100 border-cyan-300'}`}
                  title="Use streak freeze to protect your streak"
                >
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>❄️ Freezes</div>
                  <div className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentUser?.streakFreezes || 0}</div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, i) => (
            <div key={i} className={`p-4 ${stat.bg} border ${stat.border} rounded-2xl`}>
              <div className={`w-9 h-9 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
              <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Advanced Analytics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Learning Progress Chart */}
          <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <BarChart3 className="w-4 h-4 text-purple-400" />
                Weekly Learning Progress
              </h2>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Last 7 days</span>
            </div>
            <div className="flex items-end justify-between gap-2 h-32">
              {(() => {
                const weeklyActivity = currentUser?.weeklyActivity || [];
                const data = [];
                for (let i = 6; i >= 0; i--) {
                  const date = new Date();
                  date.setDate(date.getDate() - i);
                  const dateString = date.toISOString().split('T')[0];
                  const dayActivity = weeklyActivity.find((a: any) => a.date === dateString);
                  const xpEarned = dayActivity?.xpEarned || 0;
                  const progress = Math.min((xpEarned / 500) * 100, 100);
                  data.push({
                    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    progress: progress === 0 ? 5 : progress,
                    xp: xpEarned
                  });
                }
                return data.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg transition-all hover:from-purple-500 hover:to-indigo-400 relative shadow-lg shadow-purple-500/20"
                      style={{ height: `${d.progress}%`, minHeight: '8px' }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/20">
                        {d.xp} XP
                      </div>
                    </div>
                    <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{d.day}</div>
                  </div>
                ));
              })()}
            </div>
            <div className={`mt-3 flex items-center justify-between text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              <span>Total: {(currentUser?.weeklyActivity || []).reduce((sum: number, a: any) => sum + (a.xpEarned || 0), 0)} XP</span>
              <span>Avg: {Math.round((currentUser?.weeklyActivity || []).reduce((sum: number, a: any) => sum + (a.xpEarned || 0), 0) / 7)} XP/day</span>
            </div>
          </div>

          {/* Skill Development */}
          <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Target className="w-4 h-4 text-green-400" />
                Skill Development
              </h2>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Based on courses</span>
            </div>
            <div className="space-y-3">
              {(() => {
                const skills = new Map<string, number>();
                enrolledCourseData.forEach(course => {
                  course.skillsLearned?.forEach(skill => {
                    skills.set(skill, (skills.get(skill) || 0) + (userProgress[course.id]?.percentage || 0) / 100);
                  });
                });
                const topSkills = Array.from(skills.entries())
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4);
                if (topSkills.length === 0) {
                  return <div className={`text-center py-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm">Complete courses to track skills</p>
                  </div>;
                }
                return topSkills.map(([skill, progress], i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{skill}</span>
                      <span className="text-green-400 font-bold">{Math.round(progress * 100)}%</span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* Learning Time & Streak */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-blue-400" />
              <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Total Learning Time</h3>
            </div>
            <div className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {Math.round(Object.values(userProgress).reduce((sum, p) => sum + p.timeSpent, 0) / 60)}h
            </div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              {Object.values(userProgress).reduce((sum, p) => sum + p.timeSpent, 0)} minutes total
            </div>
          </div>
          <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-400" />
              <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Current Streak</h3>
            </div>
            <div className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {currentUser?.currentStreak || 0} days
            </div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              Best: {currentUser?.longestStreak || 0} days
            </div>
          </div>
          <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-purple-400" />
              <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Learning Consistency</h3>
            </div>
            <div className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {(currentUser?.weeklyActivity || []).filter((a: any) => a.lessonsCompleted > 0).length}/7
            </div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              Days active this week
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <BookOpen className="w-4 h-4 text-indigo-400" />
              My Courses ({enrolledCourseData.length})
            </h2>
            <button onClick={() => navigate('courses')} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
              Browse all <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {enrolledCourseData.length === 0 ? (
            <div className={`p-8 rounded-2xl text-center ${theme === 'dark' ? 'bg-white/3 border border-white/10' : 'bg-white border border-gray-200'}`}>
              <div className="text-4xl mb-3">📚</div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No courses yet!</h3>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Explore our course catalog and start learning today</p>
              <button onClick={() => navigate('courses')} className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all">
                Explore Courses
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourseData.map(course => {
                const progress = userProgress[course.id];
                const pct = progress?.percentage || 0;
                return (
                  <div
                    key={course.id}
                    onClick={() => { navigate('course-detail', course.id); }}
                    className={`group p-4 rounded-2xl hover:border-purple-500/30 transition-all cursor-pointer ${theme === 'dark' ? 'bg-white/3 border border-white/10 hover:bg-white/6' : 'bg-white border border-gray-200 hover:border-purple-300'}`}
                  >
                    <div className={`h-24 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform shadow-lg`}>
                      {course.icon}
                    </div>
                    <h3 className={`font-bold text-sm mb-1 line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{course.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{course.rating} · {course.instructor}</span>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                        <span className={`font-bold ${pct === 100 ? 'text-green-400' : 'text-purple-400'}`}>{pct}%</span>
                      </div>
                      <div className={`h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-200'}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      {pct === 100 && (
                        <div className="flex items-center gap-1 mt-1.5 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Completed! Take the quiz.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* My Competitions */}
        {joinedCompetitionsData.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Trophy className="w-4 h-4 text-yellow-400" />
                My Competitions ({joinedCompetitionsData.length})
              </h2>
              <button
                onClick={() => navigate('competitions')}
                className={`text-xs ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} font-medium`}
              >
                View All →
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {joinedCompetitionsData.map(comp => (
                <div
                  key={comp.id}
                  className={`p-4 rounded-2xl border-2 transition-all bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{comp.title}</h3>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{comp.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-lg bg-green-500/20 text-green-400">
                      ACTIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Joined: {new Date(comp.joinedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>{comp.participants}/{comp.maxParticipants}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Star className="w-4 h-4 text-yellow-400" />
              Recommended For You
              <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">AI Powered</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.map(course => (
              <div
                key={course.id}
                onClick={() => { navigate('course-detail', course.id); }}
                className={`group cursor-pointer p-4 rounded-2xl hover:border-purple-500/30 transition-all ${theme === 'dark' ? 'bg-white/3 border border-white/10' : 'bg-white border border-gray-200'}`}
              >
                <div className={`h-20 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center text-3xl mb-3 group-hover:scale-105 transition-transform`}>
                  {course.icon}
                </div>
                <h3 className={`font-semibold text-xs mb-1 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{course.title}</h3>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{course.totalStudents.toLocaleString()} students</span>
                  <button
                    onClick={e => { e.stopPropagation(); enrollCourse(course.id); navigate('course-detail', course.id); }}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Enroll →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        {currentUser?.badges && currentUser.badges.length > 0 && (
          <div className="mt-8">
            <h2 className={`font-bold flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Trophy className="w-4 h-4 text-yellow-400" />
              My Badges & Achievements
            </h2>
            <div className="flex flex-wrap gap-3">
              {currentUser.badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-yellow-300">{badge.name}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
