import { useStore } from '../store/useStore';
import { ArrowLeft, Search, TrendingUp, Award, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StudentProgress {
  studentId: string;
  studentName: string;
  studentAvatar: string;
  courseId: string;
  courseTitle: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  quizScores: number[];
  xpEarned: number;
  completionStatus: 'Not Started' | 'In Progress' | 'Completed';
  lastActivity: string;
}

export default function InstructorStudentProgress() {
  const { navigate, currentUser } = useStore();
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!currentUser?.clerkId) return;

      try {
        const response = await fetch(`http://localhost:4000/api/instructor-analytics/${currentUser.clerkId}/students`);
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [currentUser?.clerkId]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.courseId === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  // Get unique courses for filter dropdown
  const uniqueCourses = Array.from(new Set(students.map(s => ({ id: s.courseId, title: s.courseTitle }))));

  // Calculate stats based on unique students
  const uniqueStudents = Array.from(new Set(students.map(s => s.studentId)));
  const uniqueStudentData = uniqueStudents.map(studentId => {
    const studentEnrollments = students.filter(s => s.studentId === studentId);
    const totalProgress = studentEnrollments.reduce((acc, s) => acc + s.progress, 0);
    const avgProgress = Math.round(totalProgress / studentEnrollments.length);
    const totalXP = studentEnrollments.reduce((acc, s) => acc + s.xpEarned, 0);
    const hasCompleted = studentEnrollments.some(s => s.completionStatus === 'Completed');
    
    return {
      studentId,
      avgProgress,
      totalXP,
      hasCompleted
    };
  });

  const totalUniqueStudents = uniqueStudents.length;
  const completedStudents = uniqueStudentData.filter(s => s.hasCompleted).length;
  const avgProgress = Math.round(uniqueStudentData.reduce((acc, s) => acc + s.avgProgress, 0) / uniqueStudentData.length) || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400';
      case 'Not Started': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const averageQuizScore = (scores: number[]) => {
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
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
                Student Progress
              </h1>
              <p className="text-gray-400 text-sm">Track your students' learning journey</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students or courses..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="all">All Courses</option>
            {uniqueCourses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="p-4 bg-white/3 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalUniqueStudents}</div>
                <div className="text-xs text-gray-400">Total Students</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/3 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{completedStudents}</div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/3 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{avgProgress}%</div>
                <div className="text-xs text-gray-400">Avg Progress</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Lessons</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quiz Score</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">XP Earned</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      Loading student data...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, idx) => (
                    <motion.tr
                      key={student.studentId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {student.studentAvatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{student.studentName}</div>
                            <div className="text-xs text-gray-500">ID: {student.studentId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white">{student.courseTitle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-white">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white">
                          {student.completedLessons}/{student.totalLessons}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">
                          {averageQuizScore(student.quizScores)}%
                          <span className="text-xs text-gray-500 ml-1">
                            ({student.quizScores.length} quizzes)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-white">{student.xpEarned.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.completionStatus)}`}>
                          {student.completionStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          {student.lastActivity}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
