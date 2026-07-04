import { useStore } from '../store/useStore';
import { api } from '../lib/api';
import { ArrowRight, CheckCircle, Lock, Users, ChevronRight, Zap, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LearningPaths() {
  const { currentUser, userProgress, navigate, enrollCourse, courses } = useStore();
  const [learningPaths, setLearningPaths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        const data = await api.getLearningPaths();
        setLearningPaths(data);
      } catch (error) {
        console.error('Failed to fetch learning paths:', error);
        // Fallback to hardcoded paths if API fails
        setLearningPaths([
          {
            id: 'backend-java',
            title: 'Java Backend Developer',
            description: 'Master Java, DSA, Spring Boot, and MongoDB to become a backend engineer',
            icon: '☕',
            color: 'from-orange-500 to-red-600',
            courseIds: ['java-basics', 'dsa', 'spring-boot', 'mongodb'],
            totalXP: 1500,
            enrolledStudents: 2450,
            difficulty: 'intermediate',
            duration: 40,
            career: 'Backend Developer'
          },
          {
            id: 'fullstack-web',
            title: 'Full Stack Web Developer',
            description: 'Build complete web applications with React, Node.js, and MongoDB',
            icon: '💻',
            color: 'from-purple-500 to-pink-600',
            courseIds: ['react-typescript', 'fullstack', 'mongodb'],
            totalXP: 1200,
            enrolledStudents: 3200,
            difficulty: 'intermediate',
            duration: 35,
            career: 'Full Stack Developer'
          },
          {
            id: 'data-science',
            title: 'Data Science & ML',
            description: 'Learn Python, ML, and AI to become a data scientist',
            icon: '🧠',
            color: 'from-green-500 to-cyan-600',
            courseIds: ['python', 'machine-learning', 'artificial-intelligence'],
            totalXP: 1800,
            enrolledStudents: 1800,
            difficulty: 'advanced',
            duration: 50,
            career: 'Data Scientist'
          },
          {
            id: 'cloud-devops',
            title: 'Cloud & DevOps Engineer',
            description: 'Master AWS, Docker, Kubernetes, and CI/CD pipelines',
            icon: '☁️',
            color: 'from-cyan-500 to-blue-500',
            courseIds: ['cloud-computing', 'devops'],
            totalXP: 1000,
            enrolledStudents: 1500,
            difficulty: 'intermediate',
            duration: 30,
            career: 'DevOps Engineer'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPaths();
  }, []);

  const getPathProgress = (pathCourseIds: string[]) => {
    const completed = pathCourseIds.filter(id => userProgress[id]?.percentage === 100).length;
    return Math.round((completed / pathCourseIds.length) * 100);
  };

  const handleEnrollPath = async (pathId: string, pathCourseIds: string[]) => {
    if (!currentUser) return;

    try {
      await api.enrollInLearningPath(currentUser.id, pathId);
      pathCourseIds.forEach(id => {
        if (!currentUser?.enrolledCourses.includes(id)) {
          enrollCourse(id);
        }
      });
      navigate('course-detail', pathCourseIds[0]);
    } catch (error) {
      console.error('Failed to enroll in learning path:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen flex items-center justify-center">
        <div className="text-white">Loading learning paths...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            Learning Paths 🗺️
          </h1>
          <p className="text-gray-400 text-sm">
            Structured learning journeys designed by industry experts. Choose your path, 
            follow the curriculum, and become job-ready.
          </p>
        </div>

        {/* How Paths Work */}
        <div className="mb-8 p-5 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/10 rounded-2xl">
          <h2 className="font-bold text-white mb-3">⚡ How Adaptive Paths Work</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '🎯', title: 'Choose Your Goal', desc: 'Pick the career path that aligns with your ambitions' },
              { icon: '🤖', title: 'AI Adapts', desc: 'Our AI adjusts difficulty based on your learning speed' },
              { icon: '🏆', title: 'Earn & Graduate', desc: 'Complete all courses, pass quizzes, earn certificates' },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{s.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional vs Alternative */}
        <div className="mb-8 p-5 bg-white/3 border border-white/10 rounded-2xl">
          <h2 className="font-bold text-white mb-4">📊 Path Comparison</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-green-400 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Traditional Path
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {['Java ☕', 'DSA 🌳', 'Spring Boot 🍃', 'MongoDB 🍃'].map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-300 font-medium">{step}</span>
                    {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600" />}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Best for: Backend development, enterprise applications</p>
            </div>
            <div>
              <div className="text-sm font-medium text-blue-400 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Alternative Path
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {['Java ☕', 'React ⚛️', 'MongoDB 🍃', 'Fullstack 🌐'].map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300 font-medium">{step}</span>
                    {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600" />}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Best for: Full stack web development, startups</p>
            </div>
          </div>
        </div>

        {/* Learning Path Cards */}
        <div className="space-y-6">
          {learningPaths.map((path: any) => {
            const pathCourses = path.courseIds.map((id: string) => courses.find(c => c.id === id)!).filter(Boolean);
            const progress = getPathProgress(path.courseIds);
            const isStarted = path.courseIds.some((id: string) => currentUser?.enrolledCourses.includes(id));

            return (
              <div key={path.id} className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/20 transition-all">
                {/* Path Header */}
                <div className={`p-6 bg-gradient-to-r ${path.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl drop-shadow-lg">{path.icon}</div>
                      <div>
                        <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
                          {path.title}
                        </h2>
                        <p className="text-white/70 text-sm mt-1">{path.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-white/60">
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {pathCourses.length} courses</span>
                          <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> {path.totalXP} XP</span>
                          <span className="flex items-center gap-1"><Award className="w-4 h-4" /> {path.career}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEnrollPath(path.id, path.courseIds)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all shadow-lg"
                    >
                      {isStarted ? 'Continue' : 'Start Path'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  {isStarted && (
                    <div className="relative mt-4">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Path Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Courses in Path */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">Course Sequence</h3>
                  <div className="space-y-3">
                    {pathCourses.map((course: any, idx: number) => {
                      const courseProgress = userProgress[course.id];
                      const isEnrolled = currentUser?.enrolledCourses.includes(course.id);
                      const isCompleted = courseProgress?.percentage === 100;
                      const isLocked = idx > 0 && !isEnrolled && !currentUser?.completedCourses.includes(pathCourses[idx - 1].id);
                      const pct = courseProgress?.percentage || 0;

                      return (
                        <div key={course.id} className="flex items-center gap-4">
                          {/* Connector Line */}
                          <div className="flex flex-col items-center self-stretch">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                              isCompleted ? 'bg-green-500 text-white' :
                              isEnrolled ? 'bg-purple-600 text-white' :
                              'bg-white/10 text-gray-500'
                            }`}>
                              {isCompleted ? <CheckCircle className="w-4 h-4" /> : isLocked ? <Lock className="w-3 h-3" /> : idx + 1}
                            </div>
                            {idx < pathCourses.length - 1 && (
                              <div className={`w-0.5 h-6 mt-1 ${isCompleted ? 'bg-green-500/50' : 'bg-white/10'}`} />
                            )}
                          </div>

                          {/* Course Card */}
                          <div
                            onClick={() => !isLocked && navigate('course-detail', course.id)}
                            className={`flex-1 p-4 rounded-xl border transition-all ${
                              isLocked ? 'opacity-50 cursor-not-allowed' :
                              isCompleted ? 'bg-green-500/5 border-green-500/20 cursor-pointer hover:bg-green-500/10' :
                              isEnrolled ? 'bg-purple-500/5 border-purple-500/20 cursor-pointer hover:bg-purple-500/10' :
                              'bg-white/3 border-white/10 cursor-pointer hover:bg-white/6'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 bg-gradient-to-br ${course.color} rounded-lg flex items-center justify-center text-lg`}>
                                  {course.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white">{course.title}</div>
                                  <div className="text-xs text-gray-500">{course.duration}h · {course.level}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {isCompleted && <span className="text-xs text-green-400 font-medium">✓ Done</span>}
                                {isEnrolled && !isCompleted && <span className="text-xs text-purple-400">{pct}%</span>}
                                {!isLocked && <ArrowRight className="w-4 h-4 text-gray-600" />}
                              </div>
                            </div>
                            {isEnrolled && !isCompleted && (
                              <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Path */}
        <div className="mt-6 p-5 bg-white/3 border border-white/10 border-dashed rounded-2xl text-center hover:bg-white/5 transition-all cursor-pointer" onClick={() => navigate('courses')}>
          <div className="text-3xl mb-3">✨</div>
          <h3 className="font-bold text-white mb-1">Build Your Own Path</h3>
          <p className="text-gray-400 text-sm mb-3">Not sure which path to take? Browse individual courses and create your own learning journey.</p>
          <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all">
            Browse All Courses
          </button>
        </div>
      </div>
    </div>
  );
}
