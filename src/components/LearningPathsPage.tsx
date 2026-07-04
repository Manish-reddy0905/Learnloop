import { useStore } from '../store/useStore';
import { MapPin, Clock, TrendingUp, Award, Lock, CheckCircle, Play } from 'lucide-react';
import { learningPaths, getRecommendedPaths, getPathProgress, getNextCourseInPath } from '../data/learningPaths';
import { useState } from 'react';

export default function LearningPathsPage() {
  const { currentUser, navigate, theme } = useStore();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const completedCourses = currentUser?.completedCourses || [];
  const currentLevel = currentUser?.level || 1;
  const recommendedPaths = getRecommendedPaths(completedCourses, currentLevel);

  const handleStartPath = (pathId: string) => {
    const nextCourse = getNextCourseInPath(pathId, completedCourses);
    if (nextCourse) {
      navigate('course-detail', nextCourse);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-500';
      case 'intermediate': return 'from-blue-500 to-cyan-500';
      case 'advanced': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🌱 Beginner';
      case 'intermediate': return '🚀 Intermediate';
      case 'advanced': return '🔥 Advanced';
      default: return '📚 General';
    }
  };

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            🗺️ Learning Paths
          </h1>
          <p className="text-gray-400">Structured learning journeys to master new skills</p>
        </div>

        {/* Recommended Paths */}
        {recommendedPaths.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Recommended for You
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendedPaths.slice(0, 2).map(path => {
                const progress = getPathProgress(path.id, completedCourses);
                return (
                  <div
                    key={path.id}
                    className="p-6 bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/20 rounded-2xl cursor-pointer hover:border-green-500/40 transition-all"
                    onClick={() => setSelectedPath(path.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white mb-1">{path.name}</h3>
                        <p className="text-sm text-gray-400">{path.description}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-lg">
                        {getDifficultyBadge(path.difficulty)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{path.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>{path.xpReward} XP</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1 text-gray-400">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartPath(path.id);
                      }}
                      className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium text-white transition-colors"
                    >
                      {progress === 0 ? 'Start Path' : 'Continue'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Learning Paths */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-purple-400" />
            All Learning Paths
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningPaths.map(path => {
              const progress = getPathProgress(path.id, completedCourses);
              const prerequisitesMet = path.prerequisites.every(prereq => 
                completedCourses.includes(prereq)
              );
              
              return (
                <div
                  key={path.id}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedPath === path.id
                      ? 'bg-purple-900/40 border-purple-500/30'
                      : 'bg-white/5 border-white/10 hover:border-purple-500/20'
                  } ${!prerequisitesMet ? 'opacity-50' : 'cursor-pointer'}`}
                  onClick={() => prerequisitesMet && setSelectedPath(path.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white mb-1">{path.name}</h3>
                      <p className="text-sm text-gray-400">{path.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg ${
                      !prerequisitesMet 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-gradient-to-r ' + getDifficultyColor(path.difficulty) + ' text-white'
                    }`}>
                      {!prerequisitesMet ? <Lock className="w-3 h-3 inline" /> : getDifficultyBadge(path.difficulty)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{path.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>{path.xpReward} XP</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {path.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded">
                        {skill}
                      </span>
                    ))}
                    {path.skills.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded">
                        +{path.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Prerequisites */}
                  {path.prerequisites.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Prerequisites:</div>
                      <div className="flex flex-wrap gap-1">
                        {path.prerequisites.map(prereq => {
                          const completed = completedCourses.includes(prereq);
                          return (
                            <span
                              key={prereq}
                              className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                                completed 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {completed ? <CheckCircle className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                              {prereq}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Progress */}
                  {progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1 text-gray-400">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {prerequisitesMet && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartPath(path.id);
                      }}
                      className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-sm font-medium text-white transition-all"
                    >
                      {progress === 0 ? <><Play className="w-4 h-4 inline mr-1" /> Start Path</> : 'Continue'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
