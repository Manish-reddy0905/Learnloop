import { useStore } from '../store/useStore';
import { ArrowLeft, CheckCircle, Play, Clock, Zap, AlertCircle } from 'lucide-react';

export default function VideoPlayer() {
  const { selectedCourseId, selectedLessonId, courses, userProgress, navigate, completeLesson, setSelectedLessonId, theme } = useStore();

  const getYouTubeEmbedUrl = (videoId: string) => {
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    return '';
  };

  const course = courses.find(c => c.id === selectedCourseId);
  if (!course) return null;

  // Find the lesson by searching through all modules
  let currentLesson = null;
  let lessonIndex = 0;
  let moduleIndex = 0;

  for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
    const module = course.modules[mIdx];
    const lIdx = module.lessons.findIndex(l => l.id === selectedLessonId);
    if (lIdx !== -1) {
      currentLesson = module.lessons[lIdx];
      lessonIndex = lIdx;
      moduleIndex = mIdx;
      break;
    }
  }

  if (!currentLesson) return null;

  const completedLessons = userProgress[course.id]?.completedLessons || [];
  const isLessonCompleted = completedLessons.includes(currentLesson.id);

  // Find next lesson
  const findNextLesson = () => {
    for (let mIdx = moduleIndex; mIdx < course.modules.length; mIdx++) {
      const module = course.modules[mIdx];
      const startIdx = mIdx === moduleIndex ? lessonIndex + 1 : 0;
      for (let lIdx = startIdx; lIdx < module.lessons.length; lIdx++) {
        if (module.lessons[lIdx].type === 'video' && module.lessons[lIdx].videoId) {
          return module.lessons[lIdx];
        }
      }
    }
    return null;
  };

  const nextLesson = findNextLesson();

  const handleCompleteLesson = async () => {
    if (!isLessonCompleted) {
      await completeLesson(course.id, currentLesson.id, currentLesson.xp);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      setSelectedLessonId(nextLesson.id);
      navigate('video-player', course.id);
    } else {
      navigate('course-detail', course.id);
    }
  };

  return (
    <div className={`flex-1 flex flex-col min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`px-6 py-4 flex items-center justify-between ${theme === 'dark' ? 'bg-white/5 border-b border-white/10' : 'bg-white border-b border-gray-200'}`}>
        <button
          onClick={() => navigate('course-detail', course.id)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Course
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{course.icon} {course.title}</span>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Video Container */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-6 shadow-2xl">
              {currentLesson.videoId ? (
                <iframe
                  src={getYouTubeEmbedUrl(currentLesson.videoId)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={currentLesson.title}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                  <AlertCircle className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg">Video unavailable</p>
                  <p className="text-gray-500 text-sm mt-2">This lesson does not have a video</p>
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg">
                  Module {moduleIndex + 1} · Lesson {lessonIndex + 1}
                </span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-lg">
                  {currentLesson.difficulty}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{currentLesson.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {currentLesson.duration} minutes
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" /> +{currentLesson.xp} XP
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {!isLessonCompleted ? (
                <button
                  onClick={handleCompleteLesson}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Complete (+{currentLesson.xp} XP)
                </button>
              ) : (
                <div className="flex-1 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-sm font-bold text-green-400 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Lesson Completed!
                </div>
              )}

              {nextLesson && (
                <button
                  onClick={handleNextLesson}
                  className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-white hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  Next Lesson
                  <Play className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Course Progress */}
        <div className={`w-80 p-6 overflow-y-auto ${theme === 'dark' ? 'bg-white/3 border-l border-white/10' : 'bg-white border-l border-gray-200'}`}>
          <h3 className="font-bold text-white mb-4">Course Progress</h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Overall Progress</span>
              <span className="text-sm font-bold text-purple-400">
                {userProgress[course.id]?.percentage || 0}%
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${userProgress[course.id]?.percentage || 0}%` }}
              />
            </div>
          </div>

          <h4 className="font-semibold text-white text-sm mb-3">All Lessons</h4>
          <div className="space-y-2">
            {course.modules.map((module) => (
              <div key={module.id}>
                <div className="text-xs text-gray-500 mb-2 mt-4">{module.title}</div>
                {module.lessons.map((lesson, lIdx) => {
                  const isDone = completedLessons.includes(lesson.id);
                  const isCurrent = lesson.id === currentLesson.id;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        if (lesson.type === 'video' && lesson.videoId) {
                          setSelectedLessonId(lesson.id);
                        }
                      }}
                      disabled={!lesson.videoId || lesson.type !== 'video'}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                        isCurrent ? 'bg-purple-500/20 border border-purple-500/30' : 'hover:bg-white/5'
                      } ${!lesson.videoId || lesson.type !== 'video' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDone ? 'bg-green-500' : 'bg-white/5 border border-white/10'
                      }`}>
                        {isDone ? <CheckCircle className="w-3 h-3 text-white" /> : <span className="text-xs text-gray-500">{lIdx + 1}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs truncate ${isDone ? 'text-gray-400 line-through' : 'text-white'}`}>
                          {lesson.title}
                        </div>
                      </div>
                      {lesson.type === 'video' && lesson.videoId && (
                        <Play className="w-3 h-3 text-purple-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
