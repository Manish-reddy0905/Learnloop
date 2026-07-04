import { useStore } from '../store/useStore';
import { Trophy, Flame, Zap, BookOpen, TrendingUp } from 'lucide-react';

const allLearners = [
  { id: '1', name: 'Priya Sharma', xp: 12450, streak: 45, avatar: '👩‍💻', level: 25, courses: 5, badges: 8, country: '🇮🇳' },
  { id: '2', name: 'Rahul Verma', xp: 9800, streak: 28, avatar: '👨‍💻', level: 20, courses: 4, badges: 6, country: '🇮🇳' },
  { id: '3', name: 'Chen Wei', xp: 8200, streak: 21, avatar: '🧑‍💻', level: 17, courses: 3, badges: 5, country: '🇨🇳' },
  { id: '4', name: 'Maria Garcia', xp: 7600, streak: 18, avatar: '👩‍💻', level: 16, courses: 3, badges: 4, country: '🇪🇸' },
  { id: '5', name: 'James Wilson', xp: 6900, streak: 14, avatar: '👨‍💻', level: 14, courses: 3, badges: 4, country: '🇺🇸' },
  { id: '6', name: 'Aisha Patel', xp: 5800, streak: 12, avatar: '👩‍💻', level: 12, courses: 2, badges: 3, country: '🇮🇳' },
  { id: '7', name: 'Yuki Tanaka', xp: 4900, streak: 9, avatar: '🧑‍💻', level: 10, courses: 2, badges: 3, country: '🇯🇵' },
  { id: '8', name: 'Omar Hassan', xp: 3500, streak: 7, avatar: '👨‍💻', level: 8, courses: 2, badges: 2, country: '🇸🇦' },
  { id: '9', name: 'Sofia Rossi', xp: 2800, streak: 5, avatar: '👩‍💻', level: 6, courses: 1, badges: 2, country: '🇮🇹' },
  { id: '10', name: 'Lucas Brown', xp: 1900, streak: 3, avatar: '👨‍💻', level: 4, courses: 1, badges: 1, country: '🇧🇷' },
];

export default function LeaderboardPage() {
  const { currentUser } = useStore();

  const learners = [...allLearners];
  if (currentUser) {
    const userInList = learners.find(l => l.name === currentUser.name);
    if (!userInList) {
      learners.push({
        id: currentUser.id,
        name: currentUser.name,
        xp: currentUser.totalXP,
        streak: currentUser.currentStreak,
        avatar: '👤',
        level: currentUser.level,
        courses: currentUser.enrolledCourses.length,
        badges: currentUser.badges.length,
        country: '🌍',
      });
    }
  }
  const sorted = learners.sort((a, b) => b.xp - a.xp).map((l, i) => ({ ...l, rank: i + 1 }));
  const userRank = sorted.find(l => l.name === currentUser?.name);

  const tabs = ['Global', 'Weekly', 'Monthly'];

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            🏆 Global Leaderboard
          </h1>
          <p className="text-gray-400 text-sm">Compete with learners worldwide. Earn XP, maintain streaks, climb the ranks.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === 'Global' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Your Rank Banner */}
        {userRank && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-black text-purple-400">#{userRank.rank}</div>
              <div>
                <div className="text-sm font-semibold text-white">Your Current Rank</div>
                <div className="text-xs text-gray-400">{userRank.xp.toLocaleString()} XP · Level {userRank.level}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-orange-400">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-bold">{userRank.streak} day streak</span>
            </div>
          </div>
        )}

        {/* Podium - Top 3 */}
        <div className="mb-8 grid grid-cols-3 gap-4 items-end">
          {/* 2nd Place */}
          {top3[1] && (
            <div className="text-center">
              <div className="text-4xl mb-2">{top3[1].avatar}</div>
              <div className="text-sm font-bold text-white mb-1">{top3[1].name}</div>
              <div className="text-xs text-gray-400 mb-2">{top3[1].xp.toLocaleString()} XP</div>
              <div className="h-24 bg-gradient-to-t from-gray-400/20 to-gray-300/10 border border-gray-400/20 rounded-t-xl flex items-center justify-center">
                <span className="text-3xl">🥈</span>
              </div>
            </div>
          )}
          {/* 1st Place */}
          {top3[0] && (
            <div className="text-center">
              <div className="text-5xl mb-2">{top3[0].avatar}</div>
              <div className="text-sm font-bold text-white mb-1">{top3[0].name}</div>
              <div className="text-xs text-yellow-400 mb-2">{top3[0].xp.toLocaleString()} XP</div>
              <div className="h-36 bg-gradient-to-t from-yellow-500/20 to-yellow-400/10 border border-yellow-500/30 rounded-t-xl flex items-center justify-center">
                <span className="text-4xl">🥇</span>
              </div>
            </div>
          )}
          {/* 3rd Place */}
          {top3[2] && (
            <div className="text-center">
              <div className="text-4xl mb-2">{top3[2].avatar}</div>
              <div className="text-sm font-bold text-white mb-1">{top3[2].name}</div>
              <div className="text-xs text-gray-400 mb-2">{top3[2].xp.toLocaleString()} XP</div>
              <div className="h-16 bg-gradient-to-t from-orange-500/20 to-orange-400/10 border border-orange-500/20 rounded-t-xl flex items-center justify-center">
                <span className="text-2xl">🥉</span>
              </div>
            </div>
          )}
        </div>

        {/* Rest of Leaderboard */}
        <div className="space-y-2">
          {rest.map(learner => {
            const isCurrentUser = learner.name === currentUser?.name;
            return (
              <div
                key={learner.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  isCurrentUser
                    ? 'bg-purple-500/10 border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'bg-white/3 border-white/5 hover:bg-white/6 hover:border-white/10'
                }`}
              >
                <div className="w-8 text-center font-black text-gray-500 text-sm">#{learner.rank}</div>
                <div className="text-2xl">{learner.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{learner.name}</span>
                    <span className="text-sm">{learner.country}</span>
                    {isCurrentUser && <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">You</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {learner.courses} courses</span>
                    <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {learner.badges} badges</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-3 h-3" />
                    <span className="text-xs font-bold">{learner.streak}</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <Zap className="w-3 h-3" />
                    <span className="text-xs font-bold">{learner.xp.toLocaleString()}</span>
                  </div>
                  <div className="hidden md:flex items-center gap-1 text-blue-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">Lvl {learner.level}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How to Earn More */}
        <div className="mt-8 p-5 bg-white/3 border border-white/10 rounded-2xl">
          <h3 className="font-bold text-white mb-4">⚡ How to Climb the Leaderboard</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '📚', title: 'Complete Lessons', desc: 'Each lesson earns you 15-100 XP based on difficulty' },
              { icon: '🔥', title: 'Maintain Streaks', desc: 'Log in daily to build your streak and earn bonus XP' },
              { icon: '🏆', title: 'Pass Quizzes', desc: 'Score 70%+ on course quizzes for certificates & XP' },
            ].map((tip, i) => (
              <div key={i} className="p-3 bg-white/3 rounded-xl text-center">
                <div className="text-2xl mb-2">{tip.icon}</div>
                <div className="text-xs font-semibold text-white mb-1">{tip.title}</div>
                <div className="text-xs text-gray-500">{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
