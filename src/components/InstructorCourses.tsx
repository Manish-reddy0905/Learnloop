import { useStore } from '../store/useStore';
import { ArrowLeft, Edit, Users, DollarSign, Star, Plus, Trash2, Eye, TrendingUp, Award, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function InstructorCourses() {
  const { navigate, currentUser } = useStore();
  const [courses, setCourses] = useState<any[]>([]);
  const [courseStats, setCourseStats] = useState<Record<string, { students: number; xp: number; completionRate: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/courses');
        const allCourses = await response.json();
        
        // Filter courses by instructor
        const instructorCourses = allCourses.filter(
          (course: any) => course.instructorId === currentUser?.clerkId
        );
        
        setCourses(instructorCourses);

        // Fetch real-time stats for each course
        const statsPromises = instructorCourses.map(async (course: any) => {
          try {
            const statsResponse = await fetch(`http://localhost:4000/api/instructor-analytics/${currentUser?.clerkId}/course/${course.id}/students`);
            if (statsResponse.ok) {
              const enrollments = await statsResponse.json();
              const studentCount = new Set(enrollments.map((e: any) => e.studentId)).size;
              const totalXP = enrollments.reduce((sum: number, e: any) => sum + (e.xpEarned || 0), 0);
              const completedCount = enrollments.filter((e: any) => e.progress === 100).length;
              const completionRate = enrollments.length > 0 ? (completedCount / enrollments.length) * 100 : 0;
              
              return {
                [course.id]: {
                  students: studentCount,
                  xp: totalXP,
                  completionRate: Math.round(completionRate)
                }
              };
            }
          } catch (error) {
            console.error(`Error fetching stats for course ${course.id}:`, error);
          }
          return { [course.id]: { students: 0, xp: 0, completionRate: 0 } };
        });

        const statsResults = await Promise.all(statsPromises);
        const combinedStats = statsResults.reduce((acc, stat) => ({ ...acc, ...stat }), {});
        setCourseStats(combinedStats);
        
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentUser?.clerkId]);

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`http://localhost:4000/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter(c => c.id !== courseId));
        alert('Course deleted successfully');
      } else {
        alert('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const handleTogglePublish = async (courseId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`http://localhost:4000/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (response.ok) {
        setCourses(courses.map(c => 
          c.id === courseId ? { ...c, published: !currentStatus } : c
        ));
        alert(`Course ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      } else {
        alert('Failed to update course status');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course status');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('instructor-dashboard')}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
                My Courses
              </h1>
              <p className="text-gray-400 text-sm">Manage your course content</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('instructor-create-course')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Course
          </motion.button>
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading courses...</div>
          </div>
        ) : courses.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">No courses yet</div>
            <button
              onClick={() => navigate('instructor-create-course')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
            >
              Create Your First Course
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white/3 border border-white/10 rounded-2xl hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-lg ${course.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {course.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigate('instructor-create-course')}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Edit Course"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTogglePublish(course.id, course.published)}
                      className={`p-2 ${course.published ? 'text-yellow-400 hover:bg-yellow-500/10' : 'text-green-400 hover:bg-green-500/10'} rounded-lg transition-colors`}
                      title={course.published ? 'Unpublish' : 'Publish'}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Students
                    </span>
                    <span className="text-white font-medium">{courseStats[course.id]?.students || 0}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price
                    </span>
                    <span className="text-white font-medium">{course.isFree ? 'Free' : `$${course.price}`}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      Rating
                    </span>
                    <span className="text-white font-medium">{course.rating || 0} ({course.totalRatings || 0})</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Modules
                    </span>
                    <span className="text-white font-medium">{course.modules?.length || 0}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      XP Generated
                    </span>
                    <span className="text-white font-medium">{courseStats[course.id]?.xp || 0}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Completion Rate
                    </span>
                    <span className="text-white font-medium">{courseStats[course.id]?.completionRate || 0}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('instructor-course-details', course.id)}
                    className="py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {/* TODO: Navigate to analytics */}}
                    className="py-2 bg-purple-600/20 border border-purple-500/30 rounded-xl text-sm font-medium text-purple-300 hover:bg-purple-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Analytics
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
