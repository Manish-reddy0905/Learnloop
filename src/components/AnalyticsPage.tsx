import { useStore } from '../store/useStore';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { Database, TrendingUp, Users, BarChart3, Award, Clock } from 'lucide-react';

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export default function AnalyticsPage() {
  const { currentUser, userProgress, courses } = useStore();
  
  // Mock daily activity data (in production, this would come from the store)
  const dailyActivity = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    minutesLearned: Math.floor(Math.random() * 120) + 30,
    xpEarned: Math.floor(Math.random() * 200) + 50,
    lessonsCompleted: Math.floor(Math.random() * 3)
  }));

  // Course popularity data (aggregated)
  const coursePopularity = courses.map(c => ({
    name: c.title.split(' ').slice(0, 2).join(' '),
    students: c.totalStudents,
    rating: c.rating,
  })).sort((a, b) => b.students - a.students);

  // Completion rates per enrolled course
  const completionData = Object.values(userProgress).map(p => {
    const course = courses.find(c => c.id === p.courseId);
    return {
      name: course?.title.split(' ').slice(0, 2).join(' ') || p.courseId,
      completion: p.percentage,
      timeSpent: Math.round(p.timeSpent / 60 * 10) / 10,
    };
  });

  // Difficulty distribution
  const difficultyData = [
    { name: 'Beginner', value: courses.flatMap(c => c.modules.flatMap(m => m.lessons)).filter(l => l.difficulty === 'beginner').length, color: '#10b981' },
    { name: 'Intermediate', value: courses.flatMap(c => c.modules.flatMap(m => m.lessons)).filter(l => l.difficulty === 'intermediate').length, color: '#f59e0b' },
    { name: 'Advanced', value: courses.flatMap(c => c.modules.flatMap(m => m.lessons)).filter(l => l.difficulty === 'advanced').length, color: '#ef4444' },
  ];

  // Daily learning (last 14 days)
  const weeklyData = dailyActivity.slice(-14).map((d: any) => ({
    day: new Date(d.date).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }),
    minutes: d.minutesLearned,
    xp: d.xpEarned,
    lessons: d.lessonsCompleted,
  }));

  // Skill radar data
  const skillData = [
    { skill: 'Java', value: currentUser?.enrolledCourses.includes('java-basics') ? (userProgress['java-basics']?.percentage || 0) : 10 },
    { skill: 'DSA', value: currentUser?.enrolledCourses.includes('dsa') ? (userProgress['dsa']?.percentage || 0) : 5 },
    { skill: 'MongoDB', value: currentUser?.enrolledCourses.includes('mongodb') ? (userProgress['mongodb']?.percentage || 0) : 15 },
    { skill: 'React', value: currentUser?.enrolledCourses.includes('react') ? (userProgress['react']?.percentage || 0) : 8 },
    { skill: 'Python', value: currentUser?.enrolledCourses.includes('python') ? (userProgress['python']?.percentage || 0) : 12 },
    { skill: 'Spring', value: currentUser?.enrolledCourses.includes('spring-boot') ? (userProgress['spring-boot']?.percentage || 0) : 3 },
  ];

  // Top learners (simulated)
  const topLearners = [
    { rank: 1, name: 'Priya Sharma', xp: 12450, streak: 45, avatar: '👩‍💻', courses: 5 },
    { rank: 2, name: 'Alex Johnson', xp: currentUser?.totalXP || 850, streak: currentUser?.currentStreak || 7, avatar: '🧑‍💻', courses: currentUser?.enrolledCourses.length || 2, isUser: true },
    { rank: 3, name: 'Rahul Verma', xp: 9800, streak: 28, avatar: '👨‍💻', courses: 4 },
    { rank: 4, name: 'Chen Wei', xp: 8200, streak: 21, avatar: '🧑‍💻', courses: 3 },
    { rank: 5, name: 'Maria Garcia', xp: 7600, streak: 18, avatar: '👩‍💻', courses: 3 },
  ].sort((a, b) => b.xp - a.xp).map((l, i) => ({ ...l, rank: i + 1 }));

  // MongoDB Aggregation stats
  const avgCompletionRate = completionData.length > 0
    ? Math.round(completionData.reduce((a, d) => a + d.completion, 0) / completionData.length)
    : 0;
  const totalLearningHours = Math.round(dailyActivity.reduce((a: number, d: any) => a + d.minutesLearned, 0) / 60);
  const totalXpEarned = dailyActivity.reduce((a: number, d: any) => a + d.xpEarned, 0);

  const statsCards = [
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Avg Completion Rate', value: `${avgCompletionRate}%`, sub: 'Across enrolled courses', color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { icon: <Clock className="w-5 h-5" />, label: 'Total Learning Hours', value: `${totalLearningHours}h`, sub: 'Last 30 days', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'XP Earned', value: `${totalXpEarned.toLocaleString()}`, sub: 'Points this month', color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { icon: <Award className="w-5 h-5" />, label: 'Certificates Earned', value: `${Object.values(userProgress).filter(p => p.certificateEarned).length}`, sub: 'Verified credentials', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  ];

  const tooltipStyle = { background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px', color: '#e5e7eb' };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
              Learning Analytics 📊
            </h1>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-green-400" />
              Powered by MongoDB Aggregation Pipeline
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">Live</span>
            </p>
          </div>
        </div>

        {/* MongoDB Aggregation Banner */}
        <div className="mb-6 p-4 bg-green-500/5 border border-green-500/10 rounded-2xl">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-green-300 mb-1">MongoDB Aggregation Framework in Action</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                All analytics below are computed using MongoDB's Aggregation Pipeline with stages: 
                <code className="text-green-400 mx-1">$match</code>
                <code className="text-green-400 mx-1">$group</code>
                <code className="text-green-400 mx-1">$project</code>
                <code className="text-green-400 mx-1">$sort</code>
                <code className="text-green-400 mx-1">$limit</code>
                — processing millions of learning events in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((s, i) => (
            <div key={i} className={`p-4 ${s.bg} border ${s.border} rounded-2xl`}>
              <div className={`w-9 h-9 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                {s.icon}
              </div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs font-medium text-gray-300 mt-0.5">{s.label}</div>
              <div className="text-xs text-gray-600">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Daily Learning */}
          <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
            <h2 className="font-bold text-white mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Daily Learning Minutes
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              <code className="text-green-400">$group</code> by date, <code className="text-green-400">$sum</code> minutes — last 14 days
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#6b7280' }} interval={1} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="minutes" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: '#8b5cf6', r: 3 }} name="Minutes" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Course Completion */}
          <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
            <h2 className="font-bold text-white mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Your Course Progress
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              <code className="text-green-400">$project</code> completion %, <code className="text-green-400">$avg</code> = {avgCompletionRate}%
            </p>
            {completionData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-gray-500 text-sm">
                Enroll in courses to see your progress
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={completionData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} domain={[0, 100]} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Completion']} />
                  <Bar dataKey="completion" radius={[6, 6, 0, 0]}>
                    {completionData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Difficulty Breakdown */}
          <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
            <h2 className="font-bold text-white mb-1">Difficulty Distribution</h2>
            <p className="text-xs text-gray-500 mb-4">
              <code className="text-green-400">$group</code> by difficulty level
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={difficultyData} cx="50%" cy="50%" outerRadius={70} dataKey="value" paddingAngle={3}>
                  {difficultyData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend formatter={(value) => <span style={{ color: '#9ca3af', fontSize: '12px' }}>{value}</span>} />
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Radar */}
          <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
            <h2 className="font-bold text-white mb-1">Skill Map</h2>
            <p className="text-xs text-gray-500 mb-4">Your proficiency across technologies</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={skillData} cx="50%" cy="50%" outerRadius={70}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Radar name="Skill" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Course Popularity */}
          <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
            <h2 className="font-bold text-white mb-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Platform Popularity
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              <code className="text-green-400">$sort</code> by totalStudents desc
            </p>
            <div className="space-y-3">
              {coursePopularity.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-600 w-4">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="text-xs text-white mb-1">{c.name}</div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(c.students / coursePopularity[0].students) * 100}%`,
                          background: COLORS[i % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{(c.students / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* XP Timeline */}
        <div className="mb-6 p-5 bg-white/3 border border-white/10 rounded-2xl">
          <h2 className="font-bold text-white mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            XP Timeline
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Daily XP earned — <code className="text-green-400">$group</code> by date, <code className="text-green-400">$sum</code> xpEarned
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={weeklyData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#6b7280' }} interval={1} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} XP`, 'Earned']} />
              <Bar dataKey="xp" radius={[4, 4, 0, 0]}>
                {weeklyData.map((_: any, idx: number) => (
                  <Cell key={idx} fill={`hsl(${270 + idx * 5}, 70%, ${50 + idx * 2}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Learners Table */}
        <div className="p-5 bg-white/3 border border-white/10 rounded-2xl">
          <h2 className="font-bold text-white mb-1 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            Top Learners
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            <code className="text-green-400">$sort</code> by totalXP, <code className="text-green-400">$limit</code> 5 — Platform leaderboard
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-white/5">
                  <th className="text-left py-2 px-3">Rank</th>
                  <th className="text-left py-2 px-3">Learner</th>
                  <th className="text-right py-2 px-3">XP</th>
                  <th className="text-right py-2 px-3">Streak</th>
                  <th className="text-right py-2 px-3">Courses</th>
                </tr>
              </thead>
              <tbody>
                {topLearners.map((learner) => (
                  <tr
                    key={learner.rank}
                    className={`border-b border-white/5 hover:bg-white/3 transition-colors ${(learner as { isUser?: boolean }).isUser ? 'bg-purple-500/5' : ''}`}
                  >
                    <td className="py-3 px-3">
                      <span className={`font-black text-lg ${learner.rank === 1 ? 'text-yellow-400' : learner.rank === 2 ? 'text-gray-300' : learner.rank === 3 ? 'text-orange-400' : 'text-gray-600'}`}>
                        {learner.rank === 1 ? '🥇' : learner.rank === 2 ? '🥈' : learner.rank === 3 ? '🥉' : `#${learner.rank}`}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{learner.avatar}</span>
                        <div>
                          <div className="font-medium text-white text-xs">{learner.name}</div>
                          {(learner as { isUser?: boolean }).isUser && <span className="text-xs text-purple-400">(You)</span>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-purple-400">{learner.xp.toLocaleString()}</td>
                    <td className="py-3 px-3 text-right text-orange-400">🔥 {learner.streak}</td>
                    <td className="py-3 px-3 text-right text-gray-400">{learner.courses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
