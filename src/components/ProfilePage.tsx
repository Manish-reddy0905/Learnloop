import { useStore } from '../store/useStore';
import { Flame, Zap, BookOpen, Award, Calendar, TrendingUp, Target, Edit2, Save, X, Activity, Camera, MapPin, Globe, User } from 'lucide-react';
import { useState } from 'react';
import { api } from '../lib/api';

export default function ProfilePage() {
  const { currentUser, userProgress, navigate, courses, theme, setUser, addToast } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editLocation, setEditLocation] = useState(currentUser?.location || '');
  const [editWebsite, setEditWebsite] = useState(currentUser?.website || '');
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  if (!currentUser) return null;

  const enrolledCourseData = courses.filter(c => currentUser.enrolledCourses.includes(c.id));
  const completedCourses = courses.filter(c => currentUser.completedCourses.includes(c.id));
  const totalLessons = Object.values(userProgress).reduce((a, p) => a + p.completedLessons.length, 0);
  const totalTime = Object.values(userProgress).reduce((a, p) => a + p.timeSpent, 0);

  const joinDate = new Date(currentUser.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Generate activity data for the last 7 days from real data
  const generateActivityData = () => {
    const data = [];
    const weeklyActivity = currentUser.weeklyActivity || [];
    
    console.log('Weekly Activity Data:', weeklyActivity);
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayActivity = weeklyActivity.find((a: any) => a.date === dateString);
      
      // Use XP earned for better visualization (max 500 XP = 100%)
      const xpEarned = dayActivity?.xpEarned || 0;
      const progress = Math.min((xpEarned / 500) * 100, 100);
      
      // Ensure minimum height for visibility
      const displayProgress = progress === 0 ? 5 : progress;
      
      data.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        progress: displayProgress,
        xp: xpEarned,
        lessons: dayActivity?.lessonsCompleted || 0
      });
    }
    console.log('Generated Activity Data:', data);
    return data;
  };

  const activityData = generateActivityData();

  const handleSave = async () => {
    if (!editName.trim()) return;
    
    setIsSaving(true);
    try {
      const userId = currentUser.clerkId || (currentUser as any)._id;
      
      if (!userId) {
        console.error('User ID is missing in profile save');
        addToast({ type: 'error', message: 'User ID is missing. Please logout and login again.' });
        setIsSaving(false);
        return;
      }
      
      console.log('Updating user profile:', userId);
      await api.updateUser(userId, { 
        name: editName,
        bio: editBio,
        location: editLocation,
        website: editWebsite,
        avatar: editAvatar
      });
      setUser({ 
        ...currentUser, 
        name: editName,
        bio: editBio,
        location: editLocation,
        website: editWebsite,
        avatar: editAvatar
      });
      setIsEditing(false);
      addToast({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Failed to update profile:', error);
      addToast({ type: 'error', message: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditName(currentUser.name);
    setEditBio(currentUser.bio || '');
    setEditLocation(currentUser.location || '');
    setEditWebsite(currentUser.website || '');
    setEditAvatar(currentUser.avatar || '');
    setIsEditing(false);
  };

  const handleAvatarUpload = (emoji: string) => {
    setEditAvatar(emoji);
    setShowAvatarUpload(false);
  };

  // Update edit fields when currentUser changes
  if (currentUser && !isEditing) {
    if (editName !== currentUser.name) setEditName(currentUser.name);
    if (editBio !== (currentUser.bio || '')) setEditBio(currentUser.bio || '');
    if (editLocation !== (currentUser.location || '')) setEditLocation(currentUser.location || '');
    if (editWebsite !== (currentUser.website || '')) setEditWebsite(currentUser.website || '');
    if (editAvatar !== currentUser.avatar) setEditAvatar(currentUser.avatar);
  }

  const skillBadges = [
    { name: 'First Step', icon: '👣', earned: currentUser.enrolledCourses.length > 0, desc: 'Enrolled in first course' },
    { name: 'Completionist', icon: '✅', earned: currentUser.completedCourses.length > 0, desc: 'Completed a course' },
    { name: 'Quiz Master', icon: '🎯', earned: Object.values(userProgress).some(p => (p.quizScore || 0) >= 90), desc: 'Scored 90%+ on a quiz' },
    { name: 'Certify Me', icon: '🎓', earned: currentUser.badges.length > 0, desc: 'Earned a certificate' },
    { name: 'XP Hunter', icon: '⚡', earned: currentUser.totalXP >= 500, desc: 'Earned 500 XP' },
  ];

  const streakBadges = (currentUser.streakBadges as any) || [];

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto p-6">
        {/* Profile Header */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-purple-500/30">
                {currentUser.avatar}
              </div>
              {isEditing && (
                <button
                  onClick={() => setShowAvatarUpload(!showAvatarUpload)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-purple-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
              {showAvatarUpload && (
                <div className="absolute top-0 left-0 w-32 bg-[#1a1a2e] border border-white/20 rounded-xl p-2 shadow-xl z-10">
                  <div className="grid grid-cols-4 gap-1">
                    {['👤', '👨‍💻', '👩‍💻', '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🧑‍🔬', '👨‍🔬', '👩‍🔬', '🧑‍🚀', '👨‍🚀', '👩‍🚀', '🦊', '🐱', '🐶', '🦁'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => handleAvatarUpload(emoji)}
                        className="text-2xl hover:bg-white/10 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Your name"
                      className={`flex-1 px-3 py-2 rounded-lg text-lg font-bold ${theme === 'dark' ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-gray-900 border border-gray-300'}`}
                      disabled={isSaving}
                    />
                    <button
                      onClick={handleSave}
                      disabled={isSaving || !editName.trim()}
                      className="p-2 bg-green-500 rounded-lg text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={2}
                    className={`w-full px-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-gray-900 border border-gray-300'} resize-none`}
                    disabled={isSaving}
                  />
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        placeholder="Location"
                        className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-gray-900 border border-gray-300'}`}
                        disabled={isSaving}
                      />
                    </div>
                    <div className="flex-1 relative">
                      <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        value={editWebsite}
                        onChange={(e) => setEditWebsite(e.target.value)}
                        placeholder="Website"
                        className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-gray-900 border border-gray-300'}`}
                        disabled={isSaving}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>{currentUser.name}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">{currentUser.email}</p>
                  {currentUser.bio && <p className="text-gray-300 text-sm mt-2">{currentUser.bio}</p>}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    {currentUser.location && (
                      <span className="flex items-center gap-1.5 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" /> {currentUser.location}
                      </span>
                    )}
                    {currentUser.website && (
                      <a href={currentUser.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300">
                        <Globe className="w-4 h-4" /> {currentUser.website}
                      </a>
                    )}
                    <span className="flex items-center gap-1.5 text-sm text-orange-400">
                      <Flame className="w-4 h-4" /> {currentUser.currentStreak} day streak
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-yellow-400">
                      <Award className="w-4 h-4" /> Best: {currentUser.longestStreak} days
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-purple-400">
                      <Zap className="w-4 h-4" /> {currentUser.totalXP.toLocaleString()} XP
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" /> Joined {joinDate}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: <BookOpen className="w-4 h-4" />, label: 'Courses Enrolled', value: enrolledCourseData.length, color: 'text-blue-400' },
            { icon: <Award className="w-4 h-4" />, label: 'Completed', value: completedCourses.length, color: 'text-green-400' },
            { icon: <TrendingUp className="w-4 h-4" />, label: 'Lessons Done', value: totalLessons, color: 'text-purple-400' },
            { icon: <Target className="w-4 h-4" />, label: 'Hours Learned', value: Math.round(totalTime / 60), color: 'text-orange-400' },
          ].map((s, i) => (
            <div key={i} className="p-4 bg-white/3 border border-white/10 rounded-2xl text-center">
              <div className={`${s.color} flex justify-center mb-2`}>{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Activity Chart */}
          <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              Weekly Activity (XP)
            </h2>
            <div className="flex items-end justify-between gap-2 h-32">
              {activityData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg transition-all hover:from-purple-500 hover:to-indigo-400 relative shadow-lg shadow-purple-500/20"
                    style={{ 
                      height: `${Math.max(data.progress, 5)}%`,
                      minHeight: '8px'
                    }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none border border-white/20">
                      <div className="font-bold">{data.xp} XP</div>
                      <div className="text-gray-300">{data.lessons} lessons</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">{data.day}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Last 7 days</span>
              <span>Total: {activityData.reduce((sum, d) => sum + d.xp, 0)} XP</span>
            </div>
          </div>

          {/* Current Streak */}
          <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              Streak Status
            </h2>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-5xl mb-1">🔥</div>
                <div className="text-4xl font-black text-orange-400">{currentUser.currentStreak}</div>
                <div className="text-xs text-gray-500">Current Streak</div>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div>🏆 Best: {currentUser.longestStreak} days</div>
                <div>📅 Joined: {joinDate}</div>
                <div className={`flex items-center gap-1 ${currentUser.currentStreak >= 7 ? 'text-orange-400' : 'text-gray-600'}`}>
                  {currentUser.currentStreak >= 7 ? '🔥 Week Warrior!' : `${7 - currentUser.currentStreak} days to Week Warrior`}
                </div>
              </div>
            </div>
          </div>

          {/* Streak Badges */}
          <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              Streak Badges
            </h2>
            {streakBadges.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                <p>Login daily to earn streak badges!</p>
                <p className="mt-2">🥉 10 days · 🥈 25 days · 🥇 50 days · 💎 100 days</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {streakBadges.map((badge: any) => (
                  <div key={badge.id} className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-semibold text-white">{badge.name}</div>
                    <div className="text-xs text-gray-500">{badge.requiredDays} days</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Course Progress Detail */}
        <div className="mb-6">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Course Progress
          </h2>
          {enrolledCourseData.length === 0 ? (
            <div className="p-8 bg-white/3 border border-white/10 rounded-2xl text-center">
              <p className="text-gray-400 text-sm">No courses enrolled yet.</p>
              <button onClick={() => navigate('courses')} className="mt-3 px-5 py-2 bg-purple-600 rounded-xl text-sm text-white hover:opacity-90">Browse Courses</button>
            </div>
          ) : (
            <div className="space-y-3">
              {enrolledCourseData.map(course => {
                const progress = userProgress[course.id];
                const pct = progress?.percentage || 0;
                const isCompleted = pct === 100;

                return (
                  <div key={course.id} className="p-4 bg-white/3 border border-white/10 rounded-2xl hover:border-purple-500/20 transition-all cursor-pointer" onClick={() => navigate('course-detail', course.id)}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm text-white">{course.title}</h3>
                          <span className={`text-sm font-bold ${isCompleted ? 'text-green-400' : 'text-purple-400'}`}>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${isCompleted ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1.5 text-xs text-gray-600">
                          <span>{progress?.completedLessons.length || 0} lessons completed</span>
                          <span>{Math.round((progress?.timeSpent || 0) / 60)}h spent</span>
                          {progress?.quizScore !== undefined && (
                            <span className="text-blue-400">Quiz: {progress.quizScore}%</span>
                          )}
                        </div>
                      </div>
                      {isCompleted && course.quiz && !progress?.certificateEarned && (
                        <button
                          onClick={e => { e.stopPropagation(); navigate('quiz', course.id); }}
                          className="px-3 py-1.5 bg-green-500/20 border border-green-500/20 rounded-lg text-xs text-green-400 hover:bg-green-500/30 transition-all flex-shrink-0"
                        >
                          Take Quiz
                        </button>
                      )}
                      {progress?.certificateEarned && (
                        <button
                          onClick={e => { e.stopPropagation(); navigate('certificate', course.id); }}
                          className="px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/20 rounded-lg text-xs text-yellow-400 hover:bg-yellow-500/30 transition-all flex-shrink-0"
                        >
                          🎓 Cert
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Achievements */}
        <div>
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            Achievements & Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skillBadges.map((badge, i) => (
              <div key={i} className={`p-4 rounded-2xl border text-center transition-all ${
                badge.earned
                  ? 'bg-yellow-500/10 border-yellow-500/20'
                  : 'bg-white/3 border-white/5 opacity-40 grayscale'
              }`}>
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-xs font-semibold text-white mb-0.5">{badge.name}</div>
                <div className="text-xs text-gray-500">{badge.desc}</div>
                {badge.earned && <div className="text-xs text-yellow-400 mt-1">✓ Earned</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
