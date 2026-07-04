import { useState, useEffect, useMemo, useCallback } from 'react';
import React from 'react';
import { useStore } from '../store/useStore';
import { Search, Filter, Star, Users, Clock, Award, BookOpen, ChevronRight, Heart, ArrowUpDown } from 'lucide-react';

const CourseCatalog = React.memo(function CourseCatalog() {
  const { currentUser, userProgress, navigate, enrollCourse, courses, theme, toggleWishlist } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const categories = ['All', 'Programming', 'Computer Science', 'Database', 'Web Development', 'Data Science', 'Backend', 'Frontend', 'AI', 'Cloud', 'Security', 'Design', 'DevOps'];
  const levels = ['All', 'beginner', 'intermediate', 'advanced'];
  const ratingOptions = [0, 3, 4, 4.5];
  const durationOptions = ['All', 'Short (< 5h)', 'Medium (5-15h)', 'Long (15h+)'];
  const priceOptions = ['All', 'Free', 'Paid'];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'duration', label: 'Shortest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  useEffect(() => {
    let filtered = [...courses];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course =>
        course.tags.includes(selectedCategory) ||
        course.category === selectedCategory
      );
    }

    // Apply level filter
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Apply rating filter
    if (minRating > 0) {
      filtered = filtered.filter(course => course.rating >= minRating);
    }

    // Apply duration filter
    if (selectedDuration !== 'All') {
      filtered = filtered.filter(course => {
        if (selectedDuration === 'Short (< 5h)') return course.duration < 5;
        if (selectedDuration === 'Medium (5-15h)') return course.duration >= 5 && course.duration <= 15;
        if (selectedDuration === 'Long (15h+)') return course.duration > 15;
        return true;
      });
    }

    // Apply price filter
    if (selectedPrice !== 'All') {
      filtered = filtered.filter(course => {
        if (selectedPrice === 'Free') return course.isFree;
        if (selectedPrice === 'Paid') return !course.isFree;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.totalStudents - a.totalStudents;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
          const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
          return dateB - dateA;
        case 'duration':
          return a.duration - b.duration;
        case 'price-low':
          return (a.isFree ? 0 : (a.price || 0)) - (b.isFree ? 0 : (b.price || 0));
        case 'price-high':
          return (b.isFree ? 0 : (b.price || 0)) - (a.isFree ? 0 : (a.price || 0));
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [search, selectedCategory, selectedLevel, minRating, selectedDuration, selectedPrice, sortBy, courses]);

  const levelColor = (level: string) => {
    if (level === 'beginner') return 'text-green-400 bg-green-400/10';
    if (level === 'intermediate') return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  return (
    <div className={`flex-1 overflow-y-auto min-h-screen ${theme === 'dark' ? 'bg-[#0a0a1a]' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Space Grotesk' }}>
            Course Catalog 📚
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Explore {courses.length} expert-crafted courses. Start free, learn at your pace.</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses, topics, instructors..."
              className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm transition-all ${showFilters ? 'bg-purple-600 border-purple-600 text-white' : theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-purple-500'}`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {(selectedLevel !== 'All' || minRating > 0 || selectedDuration !== 'All' || selectedPrice !== 'All') && (
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <ArrowUpDown className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value} className={theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className={`mb-6 p-4 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Advanced Filters</h3>
              <button
                onClick={() => {
                  setSelectedLevel('All');
                  setMinRating(0);
                  setSelectedDuration('All');
                  setSelectedPrice('All');
                }}
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className={`text-xs font-medium mb-2 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Level</label>
                <select
                  value={selectedLevel}
                  onChange={e => setSelectedLevel(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                >
                  {levels.map(l => <option key={l} value={l} className={theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'}>{l === 'All' ? 'All Levels' : l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-medium mb-2 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Rating</label>
                <select
                  value={minRating}
                  onChange={e => setMinRating(parseFloat(e.target.value))}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                >
                  {ratingOptions.map(r => (
                    <option key={r} value={r} className={theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'}>
                      {r === 0 ? 'All Ratings' : `${r}+ Stars`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`text-xs font-medium mb-2 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Duration</label>
                <select
                  value={selectedDuration}
                  onChange={e => setSelectedDuration(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                >
                  {durationOptions.map(d => (
                    <option key={d} value={d} className={theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`text-xs font-medium mb-2 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Price</label>
                <select
                  value={selectedPrice}
                  onChange={e => setSelectedPrice(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500 cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                >
                  {priceOptions.map(p => (
                    <option key={p} value={p} className={theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : theme === 'dark'
                    ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{filteredCourses.length} courses found</p>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course: any) => {
            if (!course || !course.id) return null; // Skip invalid courses
            const progress = userProgress[course.id];
            const isEnrolled = currentUser?.enrolledCourses.includes(course.id);
            const isCompleted = progress?.percentage >= 99 || currentUser?.completedCourses.includes(course.id);
            const isWishlisted = currentUser?.wishlist?.includes(course.id) || false;
            const pct = progress?.percentage || 0;

            console.log('CourseCatalog - course:', course.id, 'isWishlisted:', isWishlisted, 'wishlist:', currentUser?.wishlist);

            return (
              <div
                key={course.id}
                className={`group rounded-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/5 transition-all cursor-pointer ${theme === 'dark' ? 'bg-white/3 border border-white/10' : 'bg-white border border-gray-200'}`}
                onClick={() => navigate('course-detail', course.id)}
              >
                {/* Thumbnail */}
                <div className={`h-44 bg-gradient-to-br ${course.color || 'from-purple-500 to-indigo-600'} flex items-center justify-center text-6xl relative group-hover:opacity-90 transition-opacity`}>
                  <span className="drop-shadow-lg">{course.icon || '📚'}</span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      console.log('Heart button clicked for course:', course.id);
                      console.log('Current user:', currentUser);
                      console.log('Current wishlist:', currentUser?.wishlist);
                      
                      if (!currentUser) {
                        alert('Please login to add courses to favorites');
                        return;
                      }
                      
                      try {
                        toggleWishlist(course.id);
                      } catch (error) {
                        console.error('Error toggling wishlist:', error);
                        alert('Failed to add to favorites. Please try again.');
                      }
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10 cursor-pointer"
                    style={{ backgroundColor: isWishlisted ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'text-white fill-red-500' : 'text-white'}`} />
                  </button>
                  {isCompleted && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" /> Completed
                    </div>
                  )}
                  {isEnrolled && !isCompleted && (
                    <div className="absolute bottom-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-lg font-medium">
                      In Progress
                    </div>
                  )}
                  {course.isFree && !isEnrolled && (
                    <div className="absolute bottom-3 right-3 bg-green-500/90 text-white text-xs px-2 py-1 rounded-lg font-medium">
                      Free
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-bold text-sm leading-tight line-clamp-2 flex-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{course.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-lg font-medium flex-shrink-0 ${levelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{course.instructor}</span>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{course.description}</p>

                  <div className={`flex items-center gap-4 text-xs mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
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
                    {course.certificateAvailable && (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Award className="w-3 h-3" />
                        Cert
                      </span>
                    )}
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

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded-md">{tag}</span>
                    ))}
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
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
      </div>
    </div>
  );
});

export default CourseCatalog;
