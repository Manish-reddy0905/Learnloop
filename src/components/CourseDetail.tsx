import { useStore } from '../store/useStore';
import { api } from '../lib/api';
import { ArrowLeft, Star, Users, Clock, Award, BookOpen, CheckCircle, Lock, Play, FileText, Dumbbell, HelpCircle, ChevronDown, ChevronUp, Zap, Heart, StickyNote, X, Save, ThumbsUp, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CourseDetail() {
  const { selectedCourseId, currentUser, userProgress, navigate, enrollCourse, courses, setSelectedLessonId, theme, toggleWishlist } = useStore();
  const [expandedModule, setExpandedModule] = useState<string | null>('m1');
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showNotepad, setShowNotepad] = useState(false);
  const [notepadLesson, setNotepadLesson] = useState<any>(null);
  const [noteContent, setNoteContent] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [reviewSortBy, setReviewSortBy] = useState('recent');
  const [reviewFilterRating, setReviewFilterRating] = useState(0);

  const course = courses.find(c => c.id === selectedCourseId);
  if (!course) return null;

  const progress = userProgress[course.id];
  const isEnrolled = currentUser?.enrolledCourses.includes(course.id);
  const isCompleted = progress?.percentage >= 99 || currentUser?.completedCourses.includes(course.id);
  const pct = progress?.percentage || 0;
  const completedLessons = progress?.completedLessons || [];
  const isWishlisted = currentUser?.wishlist?.includes(course.id) || false;

  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
  const completedCount = completedLessons.length;

  const typeIcon = (type: string) => {
    if (type === 'video') return <Play className="w-3 h-3 text-blue-400" />;
    if (type === 'reading') return <FileText className="w-3 h-3 text-green-400" />;
    if (type === 'exercise') return <Dumbbell className="w-3 h-3 text-orange-400" />;
    if (type === 'quiz') return <HelpCircle className="w-3 h-3 text-purple-400" />;
    return null;
  };

  const diffColor = (d: string) => {
    if (d === 'beginner') return 'text-green-400 bg-green-400/10';
    if (d === 'intermediate') return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  const handleStartLesson = (lesson: any) => {
    setSelectedLessonId(lesson.id);
    navigate('learn', course.id);
  };

  const handleOpenNotepad = (lesson: any) => {
    setNotepadLesson(lesson);
    // Load existing note for this lesson
    const existingNote = currentUser?.notes?.find(
      (note: any) => note.courseId === course.id && note.lessonId === lesson.id
    );
    setNoteContent(existingNote?.content || '');
    setShowNotepad(true);
  };

  const handleSaveNote = async () => {
    if (!currentUser?.clerkId || !notepadLesson) return;

    setSavingNote(true);
    try {
      const existingNotes = currentUser.notes || [];
      const noteIndex = existingNotes.findIndex(
        (note: any) => note.courseId === course.id && note.lessonId === notepadLesson.id
      );

      let updatedNotes;
      if (noteIndex >= 0) {
        // Update existing note
        updatedNotes = [...existingNotes];
        updatedNotes[noteIndex] = {
          courseId: course.id,
          lessonId: notepadLesson.id,
          content: noteContent,
          updatedAt: new Date().toISOString()
        };
      } else {
        // Add new note
        updatedNotes = [
          ...existingNotes,
          {
            courseId: course.id,
            lessonId: notepadLesson.id,
            content: noteContent,
            updatedAt: new Date().toISOString()
          }
        ];
      }

      await api.updateUser(currentUser.clerkId, { notes: updatedNotes });
      
      // Update local state
      const { setUser } = useStore.getState();
      setUser({
        ...currentUser,
        notes: updatedNotes
      } as any);

      alert('Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setSavingNote(false);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!course) return;
      try {
        const data = await api.getReviews(course.id);
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [course]);

  const handleSubmitReview = async () => {
    if (!currentUser || !course) return;

    setSubmittingReview(true);
    try {
      await api.addReview(course.id, currentUser.clerkId, currentUser.name || 'User', reviewRating, reviewComment);
      const updatedReviews = await api.getReviews(course.id);
      setReviews(updatedReviews);
      setShowReviewForm(false);
      setReviewComment('');
      setReviewRating(5);
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const hasReviewed = reviews.some(r => r.clerkId === currentUser?.clerkId);

  const handleHelpfulVote = async (reviewId: string) => {
    if (!currentUser) return;
    // In production, this would call an API to mark review as helpful
    setReviews(reviews.map(r => {
      if (r.id === reviewId) {
        const hasVoted = r.helpfulBy?.includes(currentUser.clerkId);
        return {
          ...r,
          helpful: hasVoted ? r.helpful - 1 : r.helpful + 1,
          helpfulBy: hasVoted 
            ? r.helpfulBy.filter((id: string) => id !== currentUser.clerkId)
            : [...(r.helpfulBy || []), currentUser.clerkId]
        };
      }
      return r;
    }));
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = [...reviews];
    
    // Filter by rating
    if (reviewFilterRating > 0) {
      filtered = filtered.filter(r => r.rating >= reviewFilterRating);
    }
    
    // Sort
    filtered.sort((a, b) => {
      if (reviewSortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (reviewSortBy === 'rating') return b.rating - a.rating;
      if (reviewSortBy === 'helpful') return (b.helpful || 0) - (a.helpful || 0);
      return 0;
    });
    
    return filtered;
  };

  const displayReviews = getFilteredAndSortedReviews();

  // Calculate review statistics
  const reviewStats = {
    average: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : course.rating,
    total: reviews.length,
    distribution: [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(r => r.rating === rating).length,
      percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
    }))
  };

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-50'}`}>
      {/* Hero Banner */}
      <div className={`bg-gradient-to-r ${course.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-6xl mx-auto px-6 py-10">
          <button
            onClick={() => navigate('courses')}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="text-7xl drop-shadow-2xl">{course.icon}</div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {course.tags.map(tag => (
                  <span key={tag} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-lg">{tag}</span>
                ))}
              </div>
              <h1 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                {course.title}
              </h1>
              <p className="text-white/80 text-sm mb-4 max-w-xl leading-relaxed">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  {course.rating} ({course.totalRatings.toLocaleString()} ratings)
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {course.totalStudents.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {course.duration} hours total
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> {totalLessons} lessons
                </span>
                {course.certificateAvailable && (
                  <span className="flex items-center gap-1 text-yellow-300">
                    <Award className="w-4 h-4" /> Certificate
                  </span>
                )}
              </div>
              <div className="mt-2 text-sm text-white/60">
                Instructor: <span className="text-white font-medium">{course.instructorAvatar} {course.instructor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course Content */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            {isEnrolled && (
              <div className={`mb-6 p-4 rounded-2xl ${theme === 'dark' ? 'bg-white/3 border border-white/10' : 'bg-white border border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Progress</span>
                  <span className="text-sm font-bold text-purple-400">{pct}% Complete</span>
                </div>
                <div className={`h-2.5 rounded-full overflow-hidden mb-2 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isCompleted ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className={`flex justify-between text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                  <span>{completedCount} / {totalLessons} lessons completed</span>
                  {progress?.timeSpent && <span>⏱ {Math.round(progress.timeSpent / 60)}h {progress.timeSpent % 60}m spent</span>}
                </div>
              </div>
            )}

            {/* Curriculum */}
            <h2 className={`font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <BookOpen className="w-4 h-4 text-purple-400" />
              Course Curriculum
            </h2>
            <div className="space-y-3">
              {course.modules.map((module, idx) => {
                const moduleCompleted = module.lessons.every(l => completedLessons.includes(l.id));
                const moduleProgress = Math.round(module.lessons.filter(l => completedLessons.includes(l.id)).length / module.lessons.length * 100);
                const isExpanded = expandedModule === module.id;

                return (
                  <div key={module.id} className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-white/3 border border-white/10' : 'bg-white border border-gray-200'}`}>
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                      className={`w-full p-4 flex items-center gap-3 transition-colors text-left ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        moduleCompleted ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-400'
                      }`}>
                        {moduleCompleted ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{module.title}</div>
                        <div className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                          {module.lessons.length} lessons · {moduleProgress}% complete
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`hidden md:block w-24 h-1 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-200'}`}>
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${moduleProgress}%` }} />
                        </div>
                        {isExpanded ? <ChevronUp className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`} /> : <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`} />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className={`border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                        {module.lessons.map((lesson, lIdx) => {
                          const isDone = completedLessons.includes(lesson.id);

                          return (
                            <div key={lesson.id} className={`flex items-center gap-3 p-4 transition-colors ${lIdx < module.lessons.length - 1 ? (theme === 'dark' ? 'border-b border-white/5' : 'border-b border-gray-100') : ''} ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isDone ? 'bg-green-500' : theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
                              }`}>
                                {isDone ? <CheckCircle className="w-4 h-4 text-white" /> : <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{lIdx + 1}</span>}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {typeIcon(lesson.type)}
                              </div>
                              <div className="flex-1">
                                <div className={`text-sm ${isDone ? (theme === 'dark' ? 'text-gray-400' : 'text-gray-500') : (theme === 'dark' ? 'text-white' : 'text-gray-900')}`}>{lesson.title}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>{lesson.duration} min</span>
                                  <span className={`text-xs px-1.5 py-0.5 rounded ${diffColor(lesson.difficulty)}`}>{lesson.difficulty}</span>
                                  <span className="text-xs text-purple-400">+{lesson.xp} XP</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {isEnrolled && (
                                  <button
                                    onClick={() => handleOpenNotepad(lesson)}
                                    className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'}`}
                                    title="Take notes"
                                  >
                                    <StickyNote className="w-4 h-4" />
                                  </button>
                                )}
                                {isDone ? (
                                  <button
                                    onClick={() => handleStartLesson(lesson)}
                                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white text-xs rounded-lg hover:opacity-90 transition-all flex items-center gap-1"
                                  >
                                    <Play className="w-3 h-3" />
                                    Rewatch
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleStartLesson(lesson)}
                                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 text-white text-xs rounded-lg hover:opacity-90 transition-all flex items-center gap-1"
                                  >
                                    <Play className="w-3 h-3" />
                                    Start
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Student Reviews ({reviewStats.total})</h2>
                {isCompleted && !hasReviewed && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {/* Review Statistics */}
              <div className={`grid md:grid-cols-2 gap-6 mb-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="text-center">
                  <div className={`text-4xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reviewStats.average}</div>
                  <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.round(parseFloat(String(reviewStats.average))) ? 'fill-yellow-400' : ''}`} />
                    ))}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{reviewStats.total} reviews</div>
                </div>
                <div className="space-y-2">
                  {reviewStats.distribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className={`text-xs w-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{rating}</span>
                      <Star className="w-3 h-3 text-yellow-400" />
                      <div className={`flex-1 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`}>
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className={`text-xs w-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort & Filter */}
              <div className="flex items-center gap-3 mb-4">
                <Filter className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <select
                  value={reviewSortBy}
                  onChange={e => setReviewSortBy(e.target.value)}
                  className={`text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                >
                  <option value="recent">Most Recent</option>
                  <option value="rating">Highest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
                <select
                  value={reviewFilterRating}
                  onChange={e => setReviewFilterRating(parseInt(e.target.value))}
                  className={`text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                >
                  <option value="0">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              {/* Show prompt to complete course if not yet completed */}
              {isEnrolled && !isCompleted && !hasReviewed && (
                <div className={`mb-4 p-4 rounded-xl ${theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    📝 Complete this course to leave a review
                  </p>
                </div>
              )}

              {showReviewForm && (
                <div className={`mb-6 p-5 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                  <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Share Your Experience</h3>
                  <div className="mb-4">
                    <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className={`text-2xl transition-colors ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-600'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Your Review</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="What did you like about this course?"
                      className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500 resize-none ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitReview}
                      disabled={submittingReview || reviewComment.trim() === ''}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {displayReviews.length === 0 ? (
                <div className={`text-center py-10 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                  <Star className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>No reviews found matching your filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayReviews.map((review: any) => (
                    <div key={review.clerkId} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{review.userName}</div>
                            <div className="flex items-center gap-1 text-yellow-400 text-xs">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <p className={`text-sm leading-relaxed mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{review.comment}</p>
                      <button
                        onClick={() => handleHelpfulVote(review.id)}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${
                          review.helpfulBy?.includes(currentUser?.clerkId)
                            ? 'text-purple-400'
                            : theme === 'dark' ? 'text-gray-500 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Helpful ({review.helpful || 0})
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Enroll Card */}
            <div className={`p-5 rounded-2xl sticky top-6 ${theme === 'dark' ? 'bg-white/3 border border-white/10' : 'bg-white border border-gray-200'}`}>
              <div className="text-center mb-4">
                <div className={`text-3xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {course.isFree ? '🆓 Free' : `$${course.price}`}
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Full lifetime access</div>
              </div>

              {/* Wishlist Button */}
              {currentUser && (
                <button
                  onClick={() => toggleWishlist(course.id)}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all mb-3 flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : theme === 'dark'
                        ? 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-400' : ''}`} />
                  {isWishlisted ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              )}

              {isEnrolled ? (
                <button
                  onClick={() => navigate('quiz', course.id)}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-green-500/20 mb-3"
                >
                  🏆 Take Final Quiz
                </button>
              ) : (
                <button
                  onClick={() => { enrollCourse(course.id); navigate('course-detail', course.id); }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 mb-3"
                >
                  Enroll Now — Free!
                </button>
              )}

              {progress?.quizScore !== undefined && (
                <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                  <div className="text-xs text-blue-400 mb-1">Quiz Score</div>
                  <div className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{progress.quizScore}%</div>
                  {progress.certificateEarned && (
                    <button onClick={() => navigate('certificate', course.id)} className="text-xs text-yellow-400 mt-1 hover:underline">
                      🎓 View Certificate
                    </button>
                  )}
                </div>
              )}

              {/* Next Session Button - Show when course is completed */}
              {isCompleted && course.learningPath && course.learningPath.length > 0 && (
                <div className="mb-3">
                  {(() => {
                    const currentIndex = course.learningPath.indexOf(course.id);
                    const nextCourseId = course.learningPath[currentIndex + 1];
                    const nextCourse = nextCourseId ? courses.find(c => c.id === nextCourseId) : null;
                    
                    if (nextCourse) {
                      return (
                        <button
                          onClick={() => navigate('course-detail', nextCourse.id)}
                          className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                          <span>Next Session:</span>
                          <span>{nextCourse.icon} {nextCourse.title}</span>
                          <span>→</span>
                        </button>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

              <div className={`space-y-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {[
                  { label: '📚 Modules', value: `${course.modules.length} modules` },
                  { label: '📝 Lessons', value: `${totalLessons} lessons` },
                  { label: '⏱ Duration', value: `${course.duration} hours` },
                  { label: '🏅 Level', value: course.level },
                  { label: '⚡ XP Reward', value: `+${course.xpReward} XP` },
                  { label: '🎓 Certificate', value: course.certificateAvailable ? 'Yes' : 'No' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Prerequisites */}
              {course.prerequisites.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                  <div className="text-xs font-medium text-yellow-400 mb-2">Prerequisites</div>
                  {course.prerequisites.map(preId => {
                    const preCourse = courses.find(c => c.id === preId);
                    const isDone = currentUser?.completedCourses.includes(preId);
                    return preCourse ? (
                      <div key={preId} className={`text-xs flex items-center gap-2 mb-1 ${isDone ? 'text-green-400' : 'text-gray-400'}`}>
                        {isDone ? <CheckCircle className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {preCourse.icon} {preCourse.title}
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {/* XP Reward */}
              <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-xs text-purple-400 font-medium">Earn {course.xpReward} XP</div>
                  <div className="text-xs text-gray-500">Complete all lessons</div>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            {course.relatedCourses.length > 0 && (
              <div className="p-4 bg-white/3 border border-white/10 rounded-2xl">
                <h3 className="font-semibold text-white text-sm mb-3">📌 What to Learn Next</h3>
                {course.relatedCourses.map(relId => {
                  const rel = courses.find(c => c.id === relId);
                  return rel ? (
                    <button
                      key={relId}
                      onClick={() => navigate('course-detail', rel.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left mb-1"
                    >
                      <div className={`w-9 h-9 bg-gradient-to-br ${rel.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-lg">{rel.icon}</span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white line-clamp-1">{rel.title}</div>
                        <div className="text-xs text-gray-500">{rel.level}</div>
                      </div>
                    </button>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notepad Modal */}
      {showNotepad && notepadLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-2xl ${theme === 'dark' ? 'bg-[#1a1a2e] border border-white/10' : 'bg-white border border-gray-200'} shadow-2xl`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <StickyNote className="w-5 h-5 text-yellow-400" />
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Notes: {notepadLesson.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowNotepad(false)}
                  className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your notes for this lesson here..."
                className={`w-full h-64 border rounded-xl p-4 text-sm focus:outline-none focus:border-purple-500 resize-none ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
              />
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowNotepad(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  disabled={savingNote}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {savingNote ? 'Saving...' : 'Save Note'}
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
