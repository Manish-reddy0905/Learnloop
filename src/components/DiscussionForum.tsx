import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { MessageSquare, Send, ThumbsUp, Reply, Search, Filter, User as UserIcon, Clock, Pin } from 'lucide-react';

interface Discussion {
  id: string;
  courseId: string;
  courseTitle: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  title: string;
  content: string;
  replies: Reply[];
  likes: number;
  likedBy: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Reply {
  id: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  content: string;
  isInstructor: boolean;
  createdAt: string;
}

export default function DiscussionForum() {
  const { currentUser, courses, theme, navigate, addToast } = useStore();
  const [selectedCourseId, setSelectedCourseId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewPost, setShowNewPost] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);

  const [newPost, setNewPost] = useState({
    courseId: '',
    title: '',
    content: ''
  });

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchDiscussions = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/discussions');
        if (response.ok) {
          const data = await response.json();
          setDiscussions(data);
        }
      } catch (error) {
        console.error('Error fetching discussions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  const filteredDiscussions = discussions
    .filter(d => {
      const matchesCourse = selectedCourseId === 'all' || d.courseId === selectedCourseId;
      const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           d.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortBy === 'popular') return b.likes - a.likes;
      if (sortBy === 'pinned') return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
      return 0;
    });

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.courseId) {
      addToast({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    const course = courses.find(c => c.id === newPost.courseId);
    const discussionData = {
      courseId: newPost.courseId,
      courseTitle: course?.title || 'Unknown Course',
      author: currentUser?.name || 'Anonymous',
      authorId: currentUser?.clerkId || '',
      authorAvatar: currentUser?.avatar || '👤',
      title: newPost.title,
      content: newPost.content,
      replies: [],
      likes: 0,
      likedBy: [],
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:4000/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discussionData)
      });

      if (response.ok) {
        const savedDiscussion = await response.json();
        setDiscussions([savedDiscussion, ...discussions]);
        setNewPost({ courseId: '', title: '', content: '' });
        setShowNewPost(false);
        addToast({ type: 'success', message: 'Discussion posted successfully!' });
      } else {
        addToast({ type: 'error', message: 'Failed to post discussion' });
      }
    } catch (error) {
      console.error('Error creating discussion:', error);
      addToast({ type: 'error', message: 'Failed to post discussion' });
    }
  };

  const handleLike = async (discussionId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/discussions/${discussionId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.clerkId || '' })
      });

      if (response.ok) {
        const updatedDiscussion = await response.json();
        setDiscussions(discussions.map(d => d.id === discussionId ? updatedDiscussion : d));
      }
    } catch (error) {
      console.error('Error liking discussion:', error);
    }
  };

  const handleReply = async (discussionId: string) => {
    if (!replyContent.trim()) return;

    const replyData = {
      author: currentUser?.name || 'Anonymous',
      authorId: currentUser?.clerkId || '',
      authorAvatar: currentUser?.avatar || '👤',
      content: replyContent,
      isInstructor: currentUser?.role === 'instructor'
    };

    try {
      const response = await fetch(`http://localhost:4000/api/discussions/${discussionId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyData)
      });

      if (response.ok) {
        const updatedDiscussion = await response.json();
        setDiscussions(discussions.map(d => d.id === discussionId ? updatedDiscussion : d));
        setReplyContent('');
        setReplyingTo(null);
        addToast({ type: 'success', message: 'Reply posted successfully!' });
      } else {
        addToast({ type: 'error', message: 'Failed to post reply' });
      }
    } catch (error) {
      console.error('Error replying to discussion:', error);
      addToast({ type: 'error', message: 'Failed to post reply' });
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

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a1a]">
        <div className="text-white">Loading discussions...</div>
      </div>
    );
  }

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Space Grotesk' }}>
            Discussion Forums 💬
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Ask questions, share knowledge, and connect with the community
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            <select
              value={selectedCourseId}
              onChange={e => setSelectedCourseId(e.target.value)}
              className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
            >
              <option value="all">All Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id} className={theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'}>{c.title}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Liked</option>
              <option value="pinned">Pinned</option>
            </select>
          </div>
        </div>

        {/* New Post Button */}
        <button
          onClick={() => setShowNewPost(true)}
          className="mb-6 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Start a New Discussion
        </button>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-lg rounded-2xl p-6 ${theme === 'dark' ? 'bg-[#0d1117] border border-white/10' : 'bg-white border border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Start a Discussion</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Course</label>
                  <select
                    value={newPost.courseId}
                    onChange={e => setNewPost({ ...newPost, courseId: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                  >
                    <option value="">Select a course</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id} className={theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Title</label>
                  <input
                    value={newPost.title}
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="What's your question?"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Provide more details about your question..."
                    rows={4}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 resize-none ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 py-3 border rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                >
                  Post Discussion
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Discussions List */}
        <div className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <div className={`p-8 rounded-2xl text-center ${theme === 'dark' ? 'bg-white/3 border border-white/10' : 'bg-white border border-gray-200'}`}>
              <div className="text-4xl mb-3">💬</div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No discussions yet</h3>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Be the first to start a conversation!</p>
            </div>
          ) : (
            filteredDiscussions.map(discussion => (
              <div
                key={discussion.id}
                className={`p-5 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/3 border-white/10 hover:border-purple-500/20' : 'bg-white border-gray-200 hover:border-purple-300'}`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    {discussion.authorAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {discussion.isPinned && <Pin className="w-4 h-4 text-purple-400" />}
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{discussion.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{discussion.author}</span>
                      <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>•</span>
                      <span className={`px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>{discussion.courseTitle}</span>
                      <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>•</span>
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        <Clock className="w-3 h-3" />
                        {timeAgo(discussion.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{discussion.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => handleLike(discussion.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      discussion.likedBy.includes(currentUser?.clerkId || '')
                        ? 'text-purple-400'
                        : theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {discussion.likes}
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === discussion.id ? null : discussion.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}
                  >
                    <Reply className="w-4 h-4" />
                    {discussion.replies.length} replies
                  </button>
                </div>

                {/* Replies */}
                {discussion.replies.length > 0 && (
                  <div className={`space-y-3 mb-4 ${replyingTo === discussion.id ? 'block' : 'hidden'}`}>
                    {discussion.replies.map(reply => (
                      <div key={reply.id} className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {reply.authorAvatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reply.author}</span>
                              {reply.isInstructor && (
                                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Instructor</span>
                              )}
                              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{timeAgo(reply.createdAt)}</span>
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                {replyingTo === discussion.id && (
                  <div className="flex gap-2">
                    <input
                      value={replyContent}
                      onChange={e => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className={`flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                    />
                    <button
                      onClick={() => handleReply(discussion.id)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
