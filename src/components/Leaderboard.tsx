import { Trophy, Medal, Award, TrendingUp, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { api } from '../lib/api';

export default function Leaderboard() {
  const { currentUser } = useStore();
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await api.getLeaderboard();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const yourRank = currentUser ? leaderboardData.findIndex(u => u.name === currentUser.name) + 1 : 0;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-400">{rank}</span>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
    return 'bg-white/3 border-white/10';
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Student Leaderboard
            </h1>
          </div>
          <p className="text-gray-400 text-sm">Top performers based on XP, courses completed, and learning streaks</p>
        </div>

        {/* Stats Cards */}
        {currentUser && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl text-center">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-white mb-1">{yourRank > 0 ? `#${yourRank}` : 'N/A'}</div>
              <div className="text-sm text-gray-400">Your Rank</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl text-center">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-white mb-1">{currentUser.totalXP.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Your XP</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-2xl text-center">
              <Award className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-white mb-1">{currentUser.currentStreak || 0}</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="p-6 bg-white/3 border border-white/10 rounded-2xl">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Loading leaderboard...</div>
          ) : (
            <div className="space-y-3">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${getRankStyle(user.rank)}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      {getRankIcon(user.rank)}
                    </div>

                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-xs text-gray-400">Level {user.level} · {user.courses} courses</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{user.xp.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">XP</div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-semibold text-orange-400">{user.streak} 🔥</div>
                      <div className="text-xs text-gray-400">Streak</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Your Position */}
        {currentUser && yourRank > 0 && yourRank <= 10 ? null : currentUser && (
          <div className="mt-6 p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold text-white">
                {yourRank > 0 ? yourRank : '-'}
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-lg font-bold text-white">
                  {currentUser.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{currentUser.name}</div>
                  <div className="text-xs text-gray-400">Level {currentUser.level} · {currentUser.completedCourses?.length || 0} courses</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{currentUser.totalXP.toLocaleString()}</div>
                <div className="text-xs text-gray-400">XP</div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-orange-400">{currentUser.currentStreak || 0} 🔥</div>
                <div className="text-xs text-gray-400">Streak</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
