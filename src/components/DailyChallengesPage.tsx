import { useStore } from '../store/useStore';
import { Target, CheckCircle, Clock, Star, Flame, Gift } from 'lucide-react';
import { generateDailyChallenges, getWeeklyChallenges } from '../data/dailyChallenges';
import { api } from '../lib/api';
import { useEffect, useState } from 'react';

export default function DailyChallengesPage() {
  const { currentUser, theme, claimDailyChallengeReward, checkAndCompleteDailyChallenges, courses } = useStore();
  const [dailyChallenges, setDailyChallenges] = useState<any[]>([]);
  const [weeklyChallenges, setWeeklyChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenges = async () => {
      if (!currentUser?.clerkId) {
        console.log('No user logged in, loading default challenges');
        setDailyChallenges(generateDailyChallenges(courses));
        setWeeklyChallenges(getWeeklyChallenges());
        setLoading(false);
        return;
      }

      setLoading(true);
      
      console.log('Loading challenges for user:', currentUser.clerkId);
      console.log('User dailyChallenges:', currentUser.dailyChallenges);
      console.log('User weeklyActivity:', currentUser.weeklyActivity);
      
      // Get today's challenges from user data
      const today = new Date().toISOString().split('T')[0];
      const todayEntry = currentUser?.dailyChallenges?.find((dc: any) => dc.date === today);
      
      console.log('Today entry:', todayEntry);
      
      if (todayEntry && todayEntry.challenges && todayEntry.challenges.length > 0) {
        console.log('Using existing challenges:', todayEntry.challenges);
        setDailyChallenges(todayEntry.challenges);
      } else {
        // Generate new daily challenges based on available courses
        console.log('Generating new challenges based on courses');
        const newChallenges = generateDailyChallenges(courses);
        setDailyChallenges(newChallenges);
        
        // Save to backend
        try {
          await api.updateDailyChallenges(currentUser.clerkId, newChallenges);
          console.log('New challenges saved to backend');
        } catch (error) {
          console.error('Failed to save daily challenges:', error);
        }
      }

      setWeeklyChallenges(getWeeklyChallenges());
      setLoading(false);
    };

    loadChallenges();
    
    // Also trigger challenge check when component loads
    if (currentUser?.clerkId) {
      const { checkAndCompleteDailyChallenges } = useStore.getState();
      checkAndCompleteDailyChallenges();
    }
  }, [currentUser]);

  const handleClaimReward = async (challengeId: string) => {
    console.log('Claiming reward for challenge:', challengeId);
    try {
      await claimDailyChallengeReward(challengeId);
      
      // Reload user data from backend to get latest state
      if (currentUser?.clerkId) {
        const updatedUser = await api.getUser(currentUser.clerkId);
        if (updatedUser) {
          const { setUser } = useStore.getState();
          setUser(updatedUser);
          
          // Reload challenges from updated user data
          const today = new Date().toISOString().split('T')[0];
          const todayEntry = updatedUser.dailyChallenges?.find((dc: any) => dc.date === today);
          if (todayEntry) {
            setDailyChallenges(todayEntry.challenges);
          }
        }
      }
    } catch (error) {
      console.error('Error claiming reward:', error);
    }
  };

  const dailyProgress = dailyChallenges.filter(c => c.completed).length;
  const dailyTotal = dailyChallenges.length;
  const dailyProgressPercent = dailyTotal > 0 ? Math.round((dailyProgress / dailyTotal) * 100) : 0;

  console.log('Daily challenges state:', { dailyChallenges, dailyProgress, dailyTotal, loading });

  if (loading) {
    return (
      <div className={`flex-1 flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              🎯 Daily Challenges
            </h1>
            <p className="text-gray-400">Complete challenges to earn XP</p>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="mb-8 p-6 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">{dailyProgress}/{dailyTotal}</div>
                <div className="text-sm text-gray-400">Daily Challenges Completed</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{dailyProgressPercent}%</div>
              <div className="text-sm text-gray-400">Progress</div>
            </div>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${dailyProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Daily Challenges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-400" />
            Today's Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  challenge.completed
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-white/5 border-white/10 hover:border-purple-500/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-3xl ${challenge.completed ? '' : ''}`}>
                    {challenge.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold ${challenge.completed ? 'text-green-400' : 'text-white'}`}>
                        {challenge.title}
                      </h3>
                      {challenge.completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-3 h-3" />
                        <span>{challenge.xpReward} XP</span>
                      </div>
                    </div>
                    {!challenge.completed && (
                      <div className="mt-2 text-xs text-gray-500">
                        Progress: {challenge.current}/{challenge.target}
                      </div>
                    )}
                    {challenge.completed && !challenge.rewardClaimed && (
                      <button
                        onClick={() => handleClaimReward(challenge.id)}
                        className="mt-3 w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-sm font-bold text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
                      >
                        <Gift className="w-4 h-4" />
                        Claim Reward (+{challenge.xpReward} XP)
                      </button>
                    )}
                    {challenge.completed && challenge.rewardClaimed && (
                      <div className="mt-3 text-xs text-green-400 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Reward Claimed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Challenges */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-400" />
            Weekly Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weeklyChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-5 rounded-2xl bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{challenge.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-3 h-3" />
                        <span>{challenge.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
