import { useStore } from '../store/useStore';
import { BookOpen, Users, Plus, LogOut, Award, Target, Star, MessageSquare, Reply, Send, Search } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function InstructorDashboard() {
  const { navigate, currentUser, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
    completionRate: 0,
    totalXPGenerated: 0,
    certificatesIssued: 0,
    quizAttempts: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [studentQuestions, setStudentQuestions] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Move all useMemo hooks to top before early returns
  const stats = useMemo(() => [
    { label: 'Total Courses', value: analytics.totalCourses, icon: BookOpen, color: 'from-purple-500 to-indigo-500' },
    { label: 'Total Students', value: analytics.totalStudents.toLocaleString(), icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Avg Rating', value: analytics.averageRating.toFixed(1), icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Completion Rate', value: `${analytics.completionRate}%`, icon: Target, color: 'from-pink-500 to-rose-500' },
    { label: 'Certificates Issued', value: analytics.certificatesIssued, icon: Award, color: 'from-teal-500 to-cyan-500' },
    { label: 'Quiz Attempts', value: analytics.quizAttempts.toLocaleString(), icon: Star, color: 'from-violet-500 to-purple-500' },
  ], [analytics]);

  useEffect(() => {
    const checkInstructorAccess = () => {
      const persistedUser = localStorage.getItem('instructorUser');
      
      if (persistedUser) {
        try {
          const user = JSON.parse(persistedUser);
          if (user.role === 'instructor') {
            setUser(user);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error parsing persisted user:', error);
          localStorage.removeItem('instructorUser');
        }
      }
      
      setIsLoading(false);
      
      if (!currentUser || currentUser.role !== 'instructor') {
        alert('Access denied. Please login as an instructor.');
        navigate('instructor-login');
      }
    };

    checkInstructorAccess();
  }, [currentUser, navigate, setUser]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!currentUser?.clerkId) return;

      try {
        const response = await fetch(`http://localhost:4000/api/instructor-analytics/${currentUser.clerkId}`);
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [currentUser?.clerkId]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!currentUser?.clerkId) return;

      try {
        const response = await fetch(`http://localhost:4000/api/instructor-analytics/${currentUser.clerkId}/recent-activity`);
        if (response.ok) {
          const data = await response.json();
          setRecentActivity(data);
        }
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };

    fetchRecentActivity();
  }, [currentUser?.clerkId]);

  useEffect(() => {
    const fetchStudentQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/discussions');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched student questions:', data);
          console.log('First question:', data[0]);
          console.log('First question _id:', data[0]?._id);
          console.log('First question id:', data[0]?.id);
          setStudentQuestions(data);
        }
      } catch (error) {
        console.error('Error fetching student questions:', error);
      }
    };

    fetchStudentQuestions();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('instructorUser');
    setUser(null);
    navigate('instructor-login');
  };

  const handleReply = async (questionId: string) => {
    if (!replyContent.trim()) return;

    const replyData = {
      author: currentUser?.name || 'Instructor',
      authorId: currentUser?.clerkId || '',
      authorAvatar: currentUser?.avatar || '👩‍🏫',
      content: replyContent,
      isInstructor: true
    };

    console.log('Attempting to reply to question:', questionId);
    console.log('Reply data:', replyData);

    try {
      const response = await fetch(`http://localhost:4000/api/discussions/${questionId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyData)
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const updatedDiscussion = await response.json();
        console.log('Updated discussion:', updatedDiscussion);
        setStudentQuestions(studentQuestions.map(q => (q._id === questionId || q.id === questionId) ? updatedDiscussion : q));
        setReplyContent('');
        setReplyingTo(null);
      } else {
        const errorText = await response.text();
        console.error('Reply failed:', errorText);
      }
    } catch (error) {
      console.error('Error replying to question:', error);
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const filteredQuestions = studentQuestions.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a1a] min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'instructor') {
    return null;
  }

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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {currentUser?.name?.charAt(0) || currentUser?.avatar || 'I'}
            </div>
            <div>
              <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                Instructor Dashboard
              </h1>
              <p className="text-gray-400 text-sm">Welcome back, {currentUser?.name || 'Instructor'}! Here's your teaching overview.</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium text-white hover:bg-white/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/3 border border-white/10 rounded-2xl hover:bg-white/5 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('instructor-create-course')}
              className="p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl text-left hover:border-purple-500/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white mb-1">Create New Course</div>
                  <div className="text-sm text-gray-400">Start building your next course</div>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('instructor-courses')}
              className="p-6 bg-white/3 border border-white/10 rounded-2xl text-left hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white mb-1">Manage Courses</div>
                  <div className="text-sm text-gray-400">View and edit your existing courses</div>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('instructor-student-progress')}
              className="p-6 bg-white/3 border border-white/10 rounded-2xl text-left hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white mb-1">Student Progress</div>
                  <div className="text-sm text-gray-400">Track student learning journey</div>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="p-6 bg-white/3 border border-white/10 rounded-2xl">
            {recentActivity.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                  >
                    <div>
                      <div className="text-sm text-white">{activity.action}</div>
                      <div className="text-xs text-gray-500">{activity.course}</div>
                      {activity.student && (
                        <div className="text-xs text-gray-600">by {activity.student}</div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Student Questions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              Student Questions
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 w-64"
              />
            </div>
          </div>
          <div className="p-6 bg-white/3 border border-white/10 rounded-2xl">
            {filteredQuestions.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p>No questions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <motion.div
                    key={question._id || question.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                        {question.authorAvatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{question.title}</h3>
                          {question.isPinned && <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">Pinned</span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                          <span>{question.author}</span>
                          <span>•</span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">{question.courseTitle}</span>
                          <span>•</span>
                          <span>{timeAgo(question.updatedAt)}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{question.content}</p>
                      </div>
                    </div>

                    {/* Replies */}
                    {question.replies && question.replies.length > 0 && (
                      <div className="space-y-2 mb-3 pl-13">
                        {question.replies.map((reply: any) => (
                          <div key={reply.id || reply._id} className="p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-white">{reply.author}</span>
                              {reply.isInstructor && (
                                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Instructor</span>
                              )}
                              <span className="text-xs text-gray-500">{timeAgo(reply.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-300">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    {replyingTo === (question._id || question.id) ? (
                      <div className="flex gap-2">
                        <input
                          value={replyContent}
                          onChange={e => setReplyContent(e.target.value)}
                          placeholder="Write your reply..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                        <button
                          onClick={() => handleReply(question._id || question.id)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Reply
                        </button>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-4 py-2 bg-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/20 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingTo(question._id || question.id)}
                        className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Reply className="w-4 h-4" />
                        Reply
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
