import { useStore } from '../store/useStore';
import { Trophy, Lock, Star, Zap } from 'lucide-react';
import { achievements, getRarityColor, getRarityBorder } from '../data/achievements';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function AchievementsPage() {
  const { currentUser, theme, setUser } = useStore();
  const [isChecking, setIsChecking] = useState(false);
  
  const userAchievements = currentUser?.achievements || [];
  const unlockedIds = new Set(userAchievements.map(a => a.id));
  
  const rarityOrder = ['legendary', 'epic', 'rare', 'common'];
  const sortedAchievements = [...achievements].sort((a, b) => {
    const rarityDiff = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    if (rarityDiff !== 0) return rarityDiff;
    return a.title.localeCompare(b.title);
  });

  const unlockedCount = userAchievements.length;
  const totalCount = achievements.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  // Check achievements on page load
  useEffect(() => {
    const checkAchievements = async () => {
      if (!currentUser?.clerkId) return;
      
      setIsChecking(true);
      try {
        // Calculate current stats from user progress
        const userProgress = useStore.getState().userProgress;
        let totalLessonsCompleted = 0;
        
        Object.values(userProgress).forEach((progress: any) => {
          totalLessonsCompleted += progress.completedLessons?.length || 0;
        });

        const stats = {
          lessonsCompleted: totalLessonsCompleted,
          coursesCompleted: currentUser?.completedCourses?.length || 0,
          streakDays: currentUser?.currentStreak || 0,
          quizScore: 0,
          totalXP: currentUser?.totalXP || 0,
          enrolledCourses: currentUser?.enrolledCourses?.length || 0
        };

        console.log('=== ACHIEVEMENT CHECK DEBUG ===');
        console.log('Current streak:', currentUser?.currentStreak);
        console.log('Stats being sent:', stats);
        console.log('Already unlocked achievements:', userAchievements.map(a => a.id));

        const response = await api.checkAchievements(currentUser.clerkId, stats);
        console.log('Achievement check response:', response);
        
        if (response.user) {
          setUser(response.user);
          console.log('User updated with new achievements');
        }
      } catch (error) {
        console.error('Error checking achievements:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAchievements();
  }, [currentUser?.clerkId, currentUser?.totalXP, currentUser?.completedCourses?.length, currentUser?.enrolledCourses?.length, currentUser?.currentStreak, setUser]);

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            🏆 Achievements
          </h1>
          <p className="text-gray-400">Unlock achievements by completing learning milestones</p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 p-6 bg-white/3 border border-white/10 rounded-2xl">
          {isChecking && (
            <div className="mb-4 flex items-center gap-2 text-purple-400 text-sm">
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span>Checking for new achievements...</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">{unlockedCount}/{totalCount}</div>
                <div className="text-sm text-gray-400">Achievements Unlocked</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{progress}%</div>
              <div className="text-sm text-gray-400">Completion</div>
            </div>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAchievements.map((achievement) => {
            const isUnlocked = unlockedIds.has(achievement.id);
            const userAchievement = userAchievements.find(a => a.id === achievement.id);
            
            return (
              <div
                key={achievement.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  isUnlocked 
                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} bg-opacity-20 ${getRarityBorder(achievement.rarity)}` 
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-4xl ${isUnlocked ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.title}
                      </h3>
                      {!isUnlocked && <Lock className="w-4 h-4 text-gray-500" />}
                    </div>
                    <p className={`text-sm mb-3 ${isUnlocked ? 'text-gray-200' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className={`flex items-center gap-1 ${isUnlocked ? 'text-yellow-400' : 'text-gray-500'}`}>
                        <Star className="w-3 h-3" />
                        <span>{achievement.xpReward} XP</span>
                      </div>
                      <div className={`flex items-center gap-1 ${isUnlocked ? 'text-green-400' : 'text-gray-500'}`}>
                        <Zap className="w-3 h-3" />
                        <span>{achievement.coinReward} Coins</span>
                      </div>
                    </div>
                    {isUnlocked && userAchievement && (
                      <div className="mt-2 text-xs text-gray-400">
                        Unlocked: {new Date(userAchievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
