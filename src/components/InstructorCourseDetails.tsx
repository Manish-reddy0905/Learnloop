import { useStore } from '../store/useStore';
import { ArrowLeft, Edit, Users, DollarSign, Star, BookOpen, Award } from 'lucide-react';

export default function InstructorCourseDetails() {
  const { navigate, selectedCourseId } = useStore();

  const course = {
    id: selectedCourseId || '1',
    title: 'Java Programming Fundamentals',
    description: 'Learn Java from scratch with hands-on projects and real-world examples.',
    instructor: 'John Smith',
    students: 456,
    revenue: 4560,
    rating: 4.8,
    reviews: 89,
    status: 'published',
    modules: 12,
    lessons: 48,
    duration: 24,
    price: 9.99,
    category: 'Programming',
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-01-15'
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('instructor-courses')}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Course Details
            </h1>
            <p className="text-gray-400 text-sm">View and manage your course</p>
          </div>
        </div>

        {/* Course Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 p-6 bg-white/3 border border-white/10 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">{course.title}</h2>
                <p className="text-gray-400 text-sm">{course.description}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Edit className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg">{course.category}</span>
              <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg">{course.level}</span>
              <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-lg">{course.status}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Users className="w-4 h-4" />
                  Students
                </div>
                <div className="text-xl font-bold text-white">{course.students}</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <DollarSign className="w-4 h-4" />
                  Revenue
                </div>
                <div className="text-xl font-bold text-white">${course.revenue.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Rating
                </div>
                <div className="text-xl font-bold text-white">{course.rating}</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Award className="w-4 h-4" />
                  Reviews
                </div>
                <div className="text-xl font-bold text-white">{course.reviews}</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/3 border border-white/10 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Course Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Price</span>
                <span className="text-white font-medium">${course.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Modules</span>
                <span className="text-white font-medium">{course.modules}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Lessons</span>
                <span className="text-white font-medium">{course.lessons}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Duration</span>
                <span className="text-white font-medium">{course.duration}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Language</span>
                <span className="text-white font-medium">{course.language}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Last Updated</span>
                <span className="text-white font-medium">{course.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6 bg-white/3 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            Course Content
          </h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((module) => (
              <div key={module} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-bold">
                      {module}
                    </div>
                    <div>
                      <div className="text-white font-medium">Module {module}</div>
                      <div className="text-gray-500 text-sm">12 lessons · 2 hours</div>
                    </div>
                  </div>
                  <button className="text-purple-400 text-sm hover:text-purple-300">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
