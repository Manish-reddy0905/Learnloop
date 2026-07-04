import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { api } from '../lib/api';
import { Lesson } from '../types';
import { Play, CheckCircle, ArrowRight, BookOpen, Code, Target, Zap } from 'lucide-react';
import LessonNotes from './LessonNotes';

export default function LessonPage() {
  const { courses, navigate, completeLesson, userProgress, theme } = useStore();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [showLessonInfo, setShowLessonInfo] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  // Get courseId and lessonId from URL or store
  const courseId = useStore(state => state.selectedCourseId);
  const lessonId = useStore(state => state.selectedLessonId);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!courseId || !lessonId) {
        setLoading(false);
        return;
      }

      try {
        const lessonData = await api.getLesson(courseId, lessonId);
        setLesson(lessonData);
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
        // Fallback to local lesson data if API fails
        const course = courses.find(c => c.id === courseId);
        if (course) {
          for (const module of course.modules) {
            const foundLesson = module.lessons.find(l => l.id === lessonId);
            if (foundLesson) {
              setLesson(foundLesson);
              break;
            }
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, lessonId, courses]);

  // Check if lesson is already completed on mount
  useEffect(() => {
    if (courseId && lessonId && userProgress[courseId]) {
      const completedLessons = userProgress[courseId].completedLessons || [];
      console.log('Checking lesson completion:', { courseId, lessonId, completedLessons, lessonIdInArray: completedLessons.includes(lessonId) });
      if (completedLessons.includes(lessonId)) {
        setLessonCompleted(true);
        setVideoCompleted(true);
      } else {
        // Explicitly set to false for lessons not completed
        setLessonCompleted(false);
        setVideoCompleted(false);
      }
    } else {
      // No progress exists for this course, lesson is not completed
      setLessonCompleted(false);
      setVideoCompleted(false);
    }
  }, [courseId, lessonId, userProgress]);

  const handleVideoComplete = async () => {
    if (!lesson || !courseId || !lessonId) return;
    
    setVideoCompleted(true);
    
    // Always complete the lesson immediately without showing quiz
    const finalXP = lesson.xp;
    setXpGained(finalXP);
    setShowXPAnimation(true);
    setTimeout(() => setShowXPAnimation(false), 2000);
    
    await completeLesson(courseId, lessonId, finalXP);
    setLessonCompleted(true);
  };

  const handleStartOver = () => {
    setVideoCompleted(false);
    setXpGained(0);
    setLessonCompleted(false);
  };

  const handleNextLesson = () => {
    if (!courseId) return;

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    let currentLessonIndex = -1;
    let currentModuleIndex = -1;

    for (let i = 0; i < course.modules.length; i++) {
      const lessonIndex = course.modules[i].lessons.findIndex(l => l.id === lessonId);
      if (lessonIndex !== -1) {
        currentModuleIndex = i;
        currentLessonIndex = lessonIndex;
        break;
      }
    }

    // Try next lesson in current module
    if (currentModuleIndex !== -1 && currentLessonIndex !== -1) {
      const currentModule = course.modules[currentModuleIndex];
      if (currentLessonIndex < currentModule.lessons.length - 1) {
        const nextLesson = currentModule.lessons[currentLessonIndex + 1];
        navigate('learn', courseId);
        // Update selected lesson ID
        useStore.setState({ selectedLessonId: nextLesson.id });
        return;
      }

      // Try first lesson of next module
      if (currentModuleIndex < course.modules.length - 1) {
        const nextModule = course.modules[currentModuleIndex + 1];
        if (nextModule.lessons.length > 0) {
          const nextLesson = nextModule.lessons[0];
          navigate('learn', courseId);
          useStore.setState({ selectedLessonId: nextLesson.id });
          return;
        }
      }
    }

    // Course completed
    navigate('courses');
  };

  const getYouTubeEmbedUrl = (videoId: string) => {
    // Directly construct embed URL from videoId
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    return '';
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
        <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-100'}`}>
        <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Lesson not found</div>
      </div>
    );
  }

  const progress = userProgress[courseId || '']?.percentage || 0;

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-50'}`}>
      {/* XP Animation */}
      {showXPAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="text-6xl font-black text-yellow-400 xp-float">+{xpGained} XP</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('courses')}
            className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            ← Back to Courses
          </button>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-purple-400 mb-2">{lesson.courseTitle}</div>
              <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                {lesson.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {lesson.moduleTitle}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {lesson.xp} XP
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {lesson.difficulty}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">Course Progress</div>
              <div className="text-2xl font-black text-white">{progress}%</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {lesson.videoId ? (
              <div 
                className={`rounded-2xl overflow-hidden border relative ${theme === 'dark' ? 'bg-[#0d1117] border-white/10' : 'bg-white border-gray-200'}`}
                onMouseEnter={() => setShowLessonInfo(true)}
                onMouseLeave={() => setShowLessonInfo(false)}
              >
                {/* Hover Lesson Info */}
                {showLessonInfo && (
                  <div className="absolute top-4 right-4 z-10 p-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-xl w-64">
                    <h3 className="font-bold text-white mb-3 text-sm">Lesson Info</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration</span>
                        <span className="text-white">{lesson.duration} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Difficulty</span>
                        <span className="text-white capitalize">{lesson.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">XP Reward</span>
                        <span className="text-white">{lesson.xp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type</span>
                        <span className="text-white capitalize">{lesson.type}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(lesson.videoId)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={lesson.title}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    {lessonCompleted ? (
                      <button
                        onClick={handleStartOver}
                        className="flex-1 py-3 rounded-xl font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Play className="w-5 h-5" />
                          Start Again
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={handleVideoComplete}
                        disabled={videoCompleted}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                          videoCompleted
                            ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {videoCompleted ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Video Completed
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Play className="w-5 h-5" />
                            Mark as Complete
                          </span>
                        )}
                      </button>
                    )}
                    
                    {lessonCompleted && (
                      <button
                        onClick={handleNextLesson}
                        className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white hover:opacity-90 transition-all flex items-center gap-2"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Next Lesson
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
                    {lesson.type === 'reading' ? '📖' : lesson.type === 'exercise' ? '💪' : lesson.type === 'quiz' ? '❓' : '📚'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{lesson.title}</h2>
                    <p className="text-gray-400 text-sm capitalize">{lesson.type} Lesson</p>
                  </div>
                </div>
                
                {lesson.notes && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      Lesson Notes
                    </h3>
                    <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#0d1117] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="prose prose-invert max-w-none">
                        {lesson.notes.split('\n').map((line, idx) => {
                          if (line.startsWith('### ')) {
                            return <h3 key={idx} className="text-lg font-bold text-purple-400 mt-4 mb-2">{line.replace('### ', '')}</h3>;
                          } else if (line.startsWith('## ')) {
                            return <h2 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('## ', '')}</h2>;
                          } else if (line.startsWith('- ')) {
                            return <li key={idx} className="text-gray-300 ml-4">{line.replace('- ', '')}</li>;
                          } else if (line.startsWith('**')) {
                            return <strong key={idx} className="text-white">{line.replace(/\*\*/g, '')}</strong>;
                          } else if (line.trim() === '') {
                            return <br key={idx} />;
                          } else {
                            return <p key={idx} className="text-gray-300 leading-relaxed mb-2">{line}</p>;
                          }
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {lesson.content && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      Lesson Content
                    </h3>
                    <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#0d1117] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="prose prose-invert max-w-none">
                        {lesson.content.split('\n').map((line, idx) => {
                          if (line.startsWith('### ')) {
                            return <h3 key={idx} className="text-lg font-bold text-purple-400 mt-4 mb-2">{line.replace('### ', '')}</h3>;
                          } else if (line.startsWith('## ')) {
                            return <h2 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('## ', '')}</h2>;
                          } else if (line.startsWith('- ')) {
                            return <li key={idx} className="text-gray-300 ml-4">{line.replace('- ', '')}</li>;
                          } else if (line.startsWith('**')) {
                            return <strong key={idx} className="text-white">{line.replace(/\*\*/g, '')}</strong>;
                          } else if (line.trim() === '') {
                            return <br key={idx} />;
                          } else {
                            return <p key={idx} className="text-gray-300 leading-relaxed mb-2">{line}</p>;
                          }
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {lesson.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
                  </div>
                )}

                {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">What You'll Learn</h3>
                    <ul className="space-y-2">
                      {lesson.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lesson.notes && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Lesson Content</h3>
                    <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{lesson.notes}</div>
                  </div>
                )}

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl mb-6">
                  <p className="text-purple-300 text-sm">
                    <strong>Tip:</strong> This lesson focuses on {lesson.type === 'reading' ? 'reading and understanding concepts' : lesson.type === 'exercise' ? 'practical exercises and hands-on practice' : 'interactive learning activities'}. Take your time to understand the material before proceeding.
                  </p>
                </div>

                <div className="flex gap-4">
                  {lessonCompleted ? (
                    <button
                      onClick={handleStartOver}
                      className="flex-1 py-3 rounded-xl font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Play className="w-5 h-5" />
                        Start Again
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handleVideoComplete}
                      disabled={videoCompleted}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        videoCompleted
                          ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {videoCompleted ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Play className="w-5 h-5" />
                          Mark as Complete
                        </span>
                      )}
                    </button>
                  )}
                  
                  {lessonCompleted && (
                    <button
                      onClick={handleNextLesson}
                      className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white hover:opacity-90 transition-all flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Next Lesson
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Learning Objectives */}
            {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Learning Objectives
                </h2>
                <ul className="space-y-2">
                  {lesson.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            {lesson.description && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Lesson Description
                </h2>
                <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
              </div>
            )}

            {/* Notes */}
            {lesson.notes && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Lesson Notes
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{lesson.notes}</div>
              </div>
            )}

            {/* Code Examples */}
            {lesson.codeExamples && lesson.codeExamples.length > 0 && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  Code Examples
                </h2>
                <div className="space-y-4">
                  {lesson.codeExamples.map((example, index) => (
                    <div key={index}>
                      <h3 className="text-sm font-semibold text-purple-400 mb-2">{example.title}</h3>
                      <pre className={`p-4 rounded-xl overflow-x-auto text-sm border ${theme === 'dark' ? 'bg-[#0d1117] text-gray-300 border-white/10' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Objectives */}
            {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Learning Objectives
                </h2>
                <ul className="space-y-2">
                  {lesson.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            {lesson.description && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Lesson Description
                </h2>
                <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
              </div>
            )}

            {/* Notes */}
            {lesson.notes && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Lesson Notes
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{lesson.notes}</div>
              </div>
            )}

            {/* Code Examples */}
            {lesson.codeExamples && lesson.codeExamples.length > 0 && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  Code Examples
                </h2>
                <div className="space-y-4">
                  {lesson.codeExamples.map((example, index) => (
                    <div key={index}>
                      <h3 className="text-sm font-semibold text-purple-400 mb-2">{example.title}</h3>
                      <pre className={`p-4 rounded-xl overflow-x-auto text-sm border ${theme === 'dark' ? 'bg-[#0d1117] text-gray-300 border-white/10' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="font-bold text-white mb-4">Your Progress</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Completion</span>
                  <span className="text-white">{progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Notes */}
      {courseId && lessonId && (
        <LessonNotes courseId={courseId} lessonId={lessonId} />
      )}
    </div>
  );
}
