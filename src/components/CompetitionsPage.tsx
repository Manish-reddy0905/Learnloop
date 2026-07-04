import { useStore } from '../store/useStore';
import { Trophy, Clock, Users, Award, Zap, Lock, Play, X, BookOpen } from 'lucide-react';
import { getActiveCompetitions, getUpcomingCompetitions, getCompletedCompetitions, canJoinCompetition } from '../data/competitions';
import { useState } from 'react';
import { api } from '../lib/api';
import CompetitionQuizPage from './CompetitionQuizPage';
import { getDailyQuiz, getWeeklyQuiz, getCompetitionQuiz } from '../data/competitionQuizzes';

export default function CompetitionsPage() {
  const { currentUser, theme, setUser } = useStore();
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);

  const userLevel = currentUser?.level || 1;
  const completedCourses = currentUser?.completedCourses?.length || 0;

  // Get joined competition IDs directly from user data
  const joinedCompetitions = new Set(
    (currentUser?.joinedCompetitions || []).map((jc: any) => 
      typeof jc === 'string' ? jc : jc.competitionId
    ).filter(Boolean)
  );

  const activeCompetitions = getActiveCompetitions();
  const upcomingCompetitions = getUpcomingCompetitions();
  const completedCompetitionsList = getCompletedCompetitions();

  console.log('Active competitions:', activeCompetitions);
  console.log('Upcoming competitions:', upcomingCompetitions);
  console.log('Completed competitions:', completedCompetitionsList);

  const competitionsToShow = activeTab === 'active' ? activeCompetitions 
    : activeTab === 'upcoming' ? upcomingCompetitions 
    : completedCompetitionsList;

  const handleJoinCompetition = async (competitionId: string, competitionTitle: string) => {
    if (!currentUser) {
      console.error('No current user found');
      alert('Please log in to join competitions');
      return;
    }
    
    try {
      console.log('Joining competition:', competitionId);
      console.log('Current user ID:', currentUser.clerkId);
      console.log('Current joinedCompetitions:', currentUser.joinedCompetitions);
      
      // Check if already joined in user data
      const existingJoinedCompetitions = (currentUser?.joinedCompetitions || []);
      const alreadyJoined = existingJoinedCompetitions.some((jc: any) => {
        const id = typeof jc === 'string' ? jc : jc.competitionId;
        return id === competitionId;
      });
      
      if (alreadyJoined) {
        console.log('Already joined');
        alert(`You have already joined: ${competitionTitle}!`);
        return;
      }
      
      // Filter out any existing entries for this competition to prevent duplicates
      const filteredJoinedCompetitions = existingJoinedCompetitions.filter((jc: any) => {
        const id = typeof jc === 'string' ? jc : jc.competitionId;
        return id !== competitionId;
      });
      
      // Add new entry with timestamp
      const updatedJoinedCompetitions = [
        ...filteredJoinedCompetitions,
        { competitionId, joinedAt: new Date().toISOString() }
      ];
      console.log('Sending to backend:', updatedJoinedCompetitions);
      
      const updatedUser = await api.updateUser(currentUser.clerkId, { joinedCompetitions: updatedJoinedCompetitions });
      console.log('Backend response:', updatedUser);
      
      // Update user in store with the returned user from backend
      setUser(updatedUser);
      
      alert(`Successfully joined: ${competitionTitle}!`);
    } catch (error: any) {
      console.error('Error joining competition:', error);
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
      alert(`Failed to join competition: ${error.message || 'Please try again.'}`);
    }
  };

  const handleLeaveCompetition = async (competitionId: string, competitionTitle: string) => {
    if (!currentUser) {
      console.error('No current user found');
      alert('Please log in to leave competitions');
      return;
    }
    
    if (!confirm(`Are you sure you want to leave "${competitionTitle}"?`)) {
      return;
    }
    
    try {
      console.log('Leaving competition:', competitionId);
      console.log('Current user ID:', currentUser.clerkId);
      console.log('Current joinedCompetitions:', currentUser.joinedCompetitions);
      
      // Update backend
      const updatedJoinedCompetitions = (currentUser?.joinedCompetitions || []).filter((jc) => {
        const id = typeof jc === 'string' ? jc : jc.competitionId;
        return id !== competitionId;
      });
      console.log('Sending to backend:', updatedJoinedCompetitions);
      
      const result = await api.updateUser(currentUser.clerkId, { joinedCompetitions: updatedJoinedCompetitions });
      console.log('Backend response:', result);
      
      // Update user in store
      setUser(result);
      
      alert(`Successfully left: ${competitionTitle}`);
    } catch (error: any) {
      console.error('Error leaving competition:', error);
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
      alert(`Failed to leave competition: ${error.message || 'Please try again.'}`);
    }
  };

  const handleStartDailyQuiz = () => {
    const quiz = getDailyQuiz();
    const now = new Date();
    const scheduledTime = new Date(quiz.scheduledTime || '');
    
    // Calculate end time: 9am + 1 hour = 10am
    const endTime = new Date(scheduledTime);
    endTime.setHours(endTime.getHours() + 1);
    
    if (now < scheduledTime) {
      alert(`Daily quiz is scheduled for ${scheduledTime.toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}`);
      return;
    }
    
    if (now > endTime) {
      alert('Daily quiz is only available from 9am to 10am. It has ended for today.');
      return;
    }
    
    setCurrentQuiz(quiz);
  };

  const handleStartWeeklyQuiz = () => {
    const quiz = getWeeklyQuiz();
    const now = new Date();
    const scheduledTime = new Date(quiz.scheduledTime || '');
    
    // Calculate end time: 9am + 3 hours = 12pm
    const endTime = new Date(scheduledTime);
    endTime.setHours(endTime.getHours() + 3);
    
    if (now < scheduledTime) {
      alert(`Weekly quiz is scheduled for ${scheduledTime.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`);
      return;
    }
    
    if (now > endTime) {
      alert('Weekly quiz is only available from 9am to 12pm. It has ended for this week.');
      return;
    }
    
    setCurrentQuiz(quiz);
  };

  const formatScheduledTime = (scheduledTime: string | undefined) => {
    if (!scheduledTime) return '';
    const date = new Date(scheduledTime);
    const isDaily = date.getHours() === 9 && date.getMinutes() === 0;
    
    if (isDaily) {
      return date.toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const isQuizAvailable = (scheduledTime: string | undefined, isDaily: boolean) => {
    if (!scheduledTime) return true;
    const now = new Date();
    const startTime = new Date(scheduledTime);
    
    if (isDaily) {
      // Daily quiz: 9am to 10am (1 hour window)
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);
      return now >= startTime && now <= endTime;
    } else {
      // Weekly quiz: 9am to 12pm (3 hour window)
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 3);
      return now >= startTime && now <= endTime;
    }
  };

  const handleStartCompetitionQuiz = (competitionId: string, competitionTitle: string) => {
    setCurrentQuiz(getCompetitionQuiz(competitionId));
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    setCurrentQuiz(null);
  };

  const handleQuizCancel = () => {
    if (confirm('Are you sure you want to cancel the quiz? Your progress will be lost.')) {
      setCurrentQuiz(null);
    }
  };

  const formatTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const formatTimeUntilStart = (startDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const diff = start.getTime() - now.getTime();
    
    if (diff <= 0) return 'Starting now';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `Starts in ${days}d ${hours}h`;
    if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
    return `Starts in ${minutes}m`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCompetitionTypeIcon = (type: string) => {
    switch (type) {
      case 'tournament': return <Trophy className="w-5 h-5" />;
      case 'quiz_battle': return <Award className="w-5 h-5" />;
      case 'speed_challenge': return <Zap className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'from-green-500 to-emerald-500';
      case 'upcoming': return 'from-blue-500 to-cyan-500';
      case 'completed': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
      {currentQuiz ? (
        <CompetitionQuizPage 
          quiz={currentQuiz} 
          onComplete={handleQuizComplete} 
          onCancel={handleQuizCancel} 
        />
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              🏆 Competitions
            </h1>
            <p className="text-gray-400">Compete with other learners and win amazing prizes</p>
          </div>

          {/* Daily & Weekly Quiz Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className={`p-6 rounded-2xl text-left transition-all ${
              theme === 'dark' ? 'bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30' : 'bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-300'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500'}`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">Daily Quiz</h3>
                  <p className="text-sm text-gray-400">20 questions • 15 minutes</p>
                </div>
              </div>
              <p className="text-xs text-purple-400 mb-4">
                {isQuizAvailable(getDailyQuiz().scheduledTime, true) ? 'Available now (9am-10am)' : formatScheduledTime(getDailyQuiz().scheduledTime)}
              </p>
              <button
                onClick={handleStartDailyQuiz}
                disabled={!isQuizAvailable(getDailyQuiz().scheduledTime, true)}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  !isQuizAvailable(getDailyQuiz().scheduledTime, true)
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                }`}
              >
                {isQuizAvailable(getDailyQuiz().scheduledTime, true) ? (
                  <>
                    <Play className="w-5 h-5" />
                    Start Quiz
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    Scheduled
                  </>
                )}
              </button>
            </div>

            <div className={`p-6 rounded-2xl text-left transition-all ${
              theme === 'dark' ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30' : 'bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-300'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">Weekly Quiz</h3>
                  <p className="text-sm text-gray-400">50 questions • 45 minutes</p>
                </div>
              </div>
              <p className="text-xs text-blue-400 mb-4">
                {isQuizAvailable(getWeeklyQuiz().scheduledTime, false) ? 'Available now (9am-12pm)' : formatScheduledTime(getWeeklyQuiz().scheduledTime)}
              </p>
              <button
                onClick={handleStartWeeklyQuiz}
                disabled={!isQuizAvailable(getWeeklyQuiz().scheduledTime, false)}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  !isQuizAvailable(getWeeklyQuiz().scheduledTime, false)
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                }`}
              >
                {isQuizAvailable(getWeeklyQuiz().scheduledTime, false) ? (
                  <>
                    <Play className="w-5 h-5" />
                    Start Quiz
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    Scheduled
                  </>
                )}
              </button>
            </div>
          </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'active'
                ? 'bg-green-600 text-white'
                : theme === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Active ({activeCompetitions.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'upcoming'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Upcoming ({upcomingCompetitions.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'completed'
                ? 'bg-gray-600 text-white'
                : theme === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed ({completedCompetitionsList.length})
          </button>
        </div>

        {/* Competitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitionsToShow.map(competition => {
            const canJoin = canJoinCompetition(competition, userLevel, completedCourses);
            const isFull = competition.participants >= competition.maxParticipants;
            
            return (
              <div
                key={competition.id}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  competition.status === 'active'
                    ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20'
                    : competition.status === 'upcoming'
                      ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/20'
                      : 'bg-white/5 border-white/10 opacity-60'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(competition.status)} rounded-xl flex items-center justify-center text-white`}>
                    {getCompetitionTypeIcon(competition.type)}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${
                    competition.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : competition.status === 'upcoming'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {competition.status.toUpperCase()}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-white mb-2">{competition.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{competition.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{competition.participants}/{competition.maxParticipants}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>
                      {competition.status === 'active' 
                        ? formatTimeRemaining(competition.endDate)
                        : competition.status === 'upcoming'
                          ? formatTimeUntilStart(competition.startDate)
                          : formatDateTime(competition.endDate)
                      }
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4 p-3 bg-white/5 rounded-xl">
                  <div className="text-xs text-gray-500 mb-2">Requirements:</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={userLevel >= competition.requirements.minLevel ? 'text-green-400' : 'text-red-400'}>
                      Level {competition.requirements.minLevel}+
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className={completedCourses >= competition.requirements.minCourses ? 'text-green-400' : 'text-red-400'}>
                      {competition.requirements.minCourses}+ courses
                    </span>
                  </div>
                </div>

                {/* Prize */}
                <div className="mb-4 p-3 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/20 rounded-xl">
                  <div className="text-xs text-yellow-400 mb-2">🎁 Prize Pool</div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">💰</span>
                      <span className="text-white font-bold">{competition.prize.coins}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-purple-400">💎</span>
                      <span className="text-white font-bold">{competition.prize.gems}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-blue-400">⭐</span>
                      <span className="text-white font-bold">{competition.prize.xp} XP</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {competition.status === 'active' && (
                  (() => {
                    const isJoined = joinedCompetitions.has(competition.id);
                    console.log(`Competition ${competition.id}- ${competition.title} - isJoined: ${isJoined}`);
                    return isJoined ? (
                    <button
                      onClick={() => {
                        console.log('Leave button clicked for:', competition.id);
                        handleLeaveCompetition(competition.id, competition.title);
                      }}
                      className="w-full py-2 rounded-lg text-sm font-medium transition-all bg-red-600 hover:bg-red-700 text-white"
                    >
                      <><X className="w-4 h-4 inline mr-1" /> Leave Competition</>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        console.log('Join button clicked for:', competition.id);
                        handleJoinCompetition(competition.id, competition.title);
                      }}
                      disabled={!canJoin || isFull}
                      className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
                        canJoin && !isFull
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isFull ? 'Full' : !canJoin ? <><Lock className="w-4 h-4 inline mr-1" /> Requirements not met</> : <><Play className="w-4 h-4 inline mr-1" /> Join Competition</>}
                    </button>
                  );
                  })()
                )}

                {competition.status === 'upcoming' && (
                  joinedCompetitions.has(competition.id) ? (
                    <button
                      onClick={() => handleLeaveCompetition(competition.id, competition.title)}
                      className="w-full py-2 rounded-lg text-sm font-medium transition-all bg-red-600 hover:bg-red-700 text-white"
                    >
                      <><X className="w-4 h-4 inline mr-1" /> Cancel Registration</>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinCompetition(competition.id, competition.title)}
                      disabled={!canJoin}
                      className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
                        canJoin
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {canJoin ? 'Register' : <><Lock className="w-4 h-4 inline mr-1" /> Requirements not met</>}
                    </button>
                  )
                )}

                {competition.status === 'completed' && (
                  <button
                    disabled
                    className="w-full py-2 rounded-lg text-sm font-medium bg-gray-600 text-gray-400 cursor-not-allowed"
                  >
                    Competition Ended
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {competitionsToShow.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No competitions available</p>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
