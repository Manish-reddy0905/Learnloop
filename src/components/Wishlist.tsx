import { useStore } from '../store/useStore';
import { Heart, Star, Users, Clock, BookOpen, ChevronRight, Trash2 } from 'lucide-react';

export default function Wishlist() {
  const { currentUser, courses, navigate, enrollCourse, userProgress, toggleWishlist } = useStore();

  console.log('Wishlist component - currentUser:', currentUser);
  console.log('Wishlist component - currentUser.wishlist:', currentUser?.wishlist);
  console.log('Wishlist component - courses:', courses);

  const wishlistCourses = courses.filter(c => currentUser?.wishlist.includes(c.id) || false);

  console.log('Wishlist component - wishlistCourses:', wishlistCourses);

  const levelColor = (level: string) => {
    if (level === 'beginner') return 'text-green-400 bg-green-400/10';
    if (level === 'intermediate') return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  if (!currentUser) {
    return (
      <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen flex items-center justify-center">
        <div className="text-white">Please login to view favorites</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-2 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk' }}>
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            My Favorites
          </h1>
          <p className="text-gray-400">Save courses you want to explore later. {wishlistCourses.length} courses saved.</p>
        </div>

        {wishlistCourses.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Your favorites list is empty</h3>
            <p className="text-gray-500 mb-6">Start exploring courses and save your favorites!</p>
            <button
              onClick={() => navigate('courses')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlistCourses.map((course) => {
              const progress = userProgress[course.id];
              const isEnrolled = currentUser?.enrolledCourses.includes(course.id);
              const isCompleted = currentUser?.completedCourses.includes(course.id);
              const pct = progress?.percentage || 0;

              return (
                <div
                  key={course.id}
                  className="group bg-white/3 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/5 transition-all"
                >
                  {/* Thumbnail */}
                  <div className={`h-44 bg-gradient-to-br ${course.color} flex items-center justify-center text-6xl relative group-hover:opacity-90 transition-opacity`}>
                    <span className="drop-shadow-lg">{course.icon}</span>
                    <button
                      onClick={() => toggleWishlist(course.id)}
                      className="absolute top-3 right-3 bg-black/50 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isCompleted && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" /> Completed
                      </div>
                    )}
                    {isEnrolled && !isCompleted && (
                      <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-lg font-medium">
                        In Progress
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 flex-1">{course.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-lg font-medium flex-shrink-0 ${levelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-xs text-gray-500">{course.instructor}</span>
                    </div>

                    <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {course.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.totalStudents.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}h
                      </span>
                    </div>

                    {/* Progress bar if enrolled */}
                    {isEnrolled && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-purple-400 font-bold">{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (!isEnrolled) enrollCourse(course.id);
                        navigate('course-detail', course.id);
                      }}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                        isCompleted
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : isEnrolled
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-purple-500/20'
                          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {isCompleted ? 'Review Course' : isEnrolled ? 'Continue Learning' : 'Enroll Free'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
