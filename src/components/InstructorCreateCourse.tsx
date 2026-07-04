import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Plus, Trash2, DollarSign, Save, X, Sparkles } from 'lucide-react';

interface LessonInput {
  id: string;
  title: string;
  duration: number;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  videoUrl: string;
  content?: string;
  resources?: Array<{ title: string; url: string; type: string }>;
  attachments?: Array<{ name: string; url: string }>;
  exercise?: {
    question: string;
    expectedOutput: string;
    hints: string[];
  };
  quiz?: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  };
}

interface ModuleInput {
  id: string;
  title: string;
  lessons: LessonInput[];
}

export default function InstructorCreateCourse() {
  const { navigate, currentUser } = useStore();
  
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(true);
  const [thumbnail, setThumbnail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [skillsLearned, setSkillsLearned] = useState<string[]>(['']);
  const [prerequisites, setPrerequisites] = useState<string[]>(['']);
  const [courseDuration, setCourseDuration] = useState(0);
  const [certificateAvailable, setCertificateAvailable] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isAnalyzingCourse, setIsAnalyzingCourse] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [finalQuiz, setFinalQuiz] = useState<Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>>([]);
  const [showFinalQuizSection, setShowFinalQuizSection] = useState(false);
  const [modules, setModules] = useState<ModuleInput[]>([
    { id: 'm1', title: 'Module 1', lessons: [] }
  ]);

  const addModule = () => {
    const newModule: ModuleInput = {
      id: `m${modules.length + 1}`,
      title: `Module ${modules.length + 1}`,
      lessons: []
    };
    setModules([...modules, newModule]);
  };

  const removeModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  // Final Quiz Management
  const addFinalQuizQuestion = () => {
    setFinalQuiz([...finalQuiz, {
      id: `fq_${finalQuiz.length}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }]);
  };

  const removeFinalQuizQuestion = (index: number) => {
    setFinalQuiz(finalQuiz.filter((_, i) => i !== index));
  };

  const updateFinalQuizQuestion = (index: number, field: string, value: any) => {
    const updatedQuiz = [...finalQuiz];
    updatedQuiz[index] = { ...updatedQuiz[index], [field]: value };
    setFinalQuiz(updatedQuiz);
  };

  const updateFinalQuizOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuiz = [...finalQuiz];
    updatedQuiz[questionIndex].options[optionIndex] = value;
    setFinalQuiz(updatedQuiz);
  };

  const addLesson = (moduleId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const newLesson: LessonInput = {
      id: `l${Date.now()}`,
      title: '',
      duration: 10,
      type: 'video',
      videoUrl: '',
      quiz: {
        questions: []
      }
    };

    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.push(newLesson);
    setModules(updatedModules);
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter(l => l.id !== lessonId);
    setModules(updatedModules);
  };

  const updateLesson = (moduleId: string, lessonId: string, field: keyof LessonInput, value: any) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return;

    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      [field]: value
    };
    setModules(updatedModules);
  };

  const addQuizQuestion = (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return;

    const updatedModules = [...modules];
    if (!updatedModules[moduleIndex].lessons[lessonIndex].quiz) {
      updatedModules[moduleIndex].lessons[lessonIndex].quiz = { questions: [] };
    }
    updatedModules[moduleIndex].lessons[lessonIndex].quiz!.questions.push({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
    setModules(updatedModules);
  };

  const updateQuizQuestion = (moduleId: string, lessonId: string, questionIndex: number, field: string, value: any) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return;

    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex].quiz!.questions[questionIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex].quiz!.questions[questionIndex],
      [field]: value
    };
    setModules(updatedModules);
  };

  const removeQuizQuestion = (moduleId: string, lessonId: string, questionIndex: number) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return;

    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex].quiz!.questions.splice(questionIndex, 1);
    setModules(updatedModules);
  };

  const generateQuizWithAI = async (moduleId: string, lessonId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return;

    const lesson = modules[moduleIndex].lessons[lessonIndex];
    
    if (!lesson.title || !lesson.content) {
      alert('Please add lesson title and content before generating quiz');
      return;
    }

    setIsGeneratingQuiz(true);

    try {
      // Mock AI-generated quiz - in production, this would call an AI API
      await new Promise(resolve => setTimeout(resolve, 2000));

      const generatedQuestions = [
        {
          question: `What is the main concept covered in "${lesson.title}"?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          explanation: 'This is the correct answer based on the lesson content.'
        },
        {
          question: `Which of the following is true about the topic?`,
          options: ['True statement', 'False statement', 'Another false statement', 'Another true statement'],
          correctAnswer: 3,
          explanation: 'This explains why the answer is correct.'
        },
        {
          question: `What would be the expected output of the code example?`,
          options: ['Output 1', 'Output 2', 'Output 3', 'Output 4'],
          correctAnswer: 1,
          explanation: 'The code produces this specific output.'
        },
        {
          question: `Which best practice should be followed?`,
          options: ['Bad practice', 'Good practice', 'Another bad practice', 'Another good practice'],
          correctAnswer: 1,
          explanation: 'Following this practice ensures better code quality.'
        },
        {
          question: `What is the key takeaway from this lesson?`,
          options: ['Takeaway 1', 'Takeaway 2', 'Takeaway 3', 'Takeaway 4'],
          correctAnswer: 0,
          explanation: 'This is the most important concept to remember.'
        }
      ];

      const updatedModules = [...modules];
      if (!updatedModules[moduleIndex].lessons[lessonIndex].quiz) {
        updatedModules[moduleIndex].lessons[lessonIndex].quiz = { questions: [] };
      }
      updatedModules[moduleIndex].lessons[lessonIndex].quiz!.questions = generatedQuestions;
      setModules(updatedModules);

      alert('Quiz generated successfully! Please review and adjust the questions.');
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const analyzeCourseWithAI = async () => {
    if (!courseTitle || !courseDescription) {
      alert('Please add course title and description before analyzing');
      return;
    }

    setIsAnalyzingCourse(true);

    try {
      // Mock AI analysis - in production, this would call an AI API
      await new Promise(resolve => setTimeout(resolve, 3000));

      const suggestions = [
        `Consider adding a module on "Advanced ${category} Concepts" to deepen student understanding.`,
        `Add more practical exercises to the "${modules[0]?.title || 'Module 1'}" module for hands-on learning.`,
        `Include a quiz after every 2-3 lessons to reinforce learning.`,
        `Add a final project or capstone module to assess overall understanding.`,
        `Consider adding video demonstrations for complex topics.`,
        `Include downloadable resources and code examples for each lesson.`,
        `Add a module on "Best Practices" and "Common Pitfalls" in ${category}.`,
        `Consider adding a module on "Real-world Applications" of ${courseTitle}.`
      ];

      setAiSuggestions(suggestions);
      setShowAiSuggestions(true);
    } catch (error) {
      console.error('Error analyzing course:', error);
      alert('Failed to analyze course. Please try again.');
    } finally {
      setIsAnalyzingCourse(false);
    }
  };

  const handleSave = async () => {
    if (!courseTitle || !courseDescription || !category) {
      alert('Please fill in all required fields');
      return;
    }

    if (modules.length === 0 || modules.every(m => m.lessons.length === 0)) {
      alert('Please add at least one lesson to your course');
      return;
    }

    setIsSaving(true);

    try {
      const courseId = `course_${Date.now()}`;
      
      const courseData = {
        id: courseId,
        title: courseTitle,
        description: courseDescription,
        category,
        level,
        price: isFree ? 0 : price,
        isFree,
        thumbnail: thumbnail || 'https://via.placeholder.com/400x300',
        instructor: currentUser?.name || 'Instructor',
        instructorId: currentUser?.clerkId,
        instructorName: currentUser?.name,
        instructorAvatar: currentUser?.avatar,
        rating: 0,
        totalRatings: 0,
        totalStudents: 0,
        duration: courseDuration || modules.reduce((acc, m) => acc + m.lessons.reduce((lAcc, l) => lAcc + l.duration, 0), 0),
        tags: [category, level],
        skillsLearned: skillsLearned.filter(s => s.trim() !== ''),
        prerequisites: prerequisites.filter(p => p.trim() !== ''),
        certificateAvailable,
        published: false,
        totalXPGenerated: 0,
        certificatesIssued: 0,
        quizAttempts: 0,
        color: '#8B5CF6',
        icon: '📚',
        xpReward: modules.reduce((acc, m) => acc + m.lessons.reduce((lAcc, l) => lAcc + (l.duration * 10), 0), 0),
        modules: modules.map(m => ({
          id: m.id,
          title: m.title,
          lessons: m.lessons.map(l => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            type: l.type,
            difficulty: level,
            xp: l.duration * 10,
            videoUrl: l.videoUrl,
            content: l.content || '',
            resources: l.resources || [],
            attachments: l.attachments || [],
            exercise: l.exercise,
            xpReward: l.duration * 10,
            quiz: l.quiz && l.quiz.questions.length > 0 ? l.quiz : undefined
          }))
        })),
        reviews: [],
        createdAt: new Date().toISOString()
      };

      console.log('Saving course:', courseData);

      const response = await fetch('http://localhost:4000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      const text = await response.text();
      console.log('Response:', text);

      if (!response.ok) {
        throw new Error(text || 'Failed to save course');
      }

      const savedCourse = JSON.parse(text);
      console.log('Course saved successfully:', savedCourse);

      // Create final quiz for the course if certificate is available
      if (certificateAvailable) {
        try {
          // Use manual final quiz if provided, otherwise auto-generate from lesson quizzes
          let quizQuestions = finalQuiz.length > 0 
            ? finalQuiz 
            : modules.flatMap(m => 
                m.lessons
                  .filter(l => l.quiz && l.quiz.questions.length > 0)
                  .flatMap(l => (l.quiz?.questions || []).map((q, idx) => ({
                    id: `q_${l.id}_${idx}`,
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation
                  })))
              );

          const quizData = {
            id: `quiz_${courseId}`,
            courseId: courseId,
            title: `${courseTitle} - Final Quiz`,
            passingScore: 70,
            timeLimit: 30,
            questions: quizQuestions
          };

          // If no quiz questions exist, create a default quiz
          if (quizData.questions.length === 0) {
            quizData.questions = [
              {
                id: 'q_default_1',
                question: `What is the main topic of ${courseTitle}?`,
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 0,
                explanation: 'This is the correct answer based on the course content.'
              },
              {
                id: 'q_default_2',
                question: 'Which concept was covered in the first module?',
                options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
                correctAnswer: 0,
                explanation: 'This concept was introduced in the first module.'
              },
              {
                id: 'q_default_3',
                question: 'What skill will you learn from this course?',
                options: ['Skill A', 'Skill B', 'Skill C', 'Skill D'],
                correctAnswer: 0,
                explanation: 'This is the primary skill taught in the course.'
              }
            ];
          }

          const quizResponse = await fetch('http://localhost:4000/api/quizzes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizData),
          });

          if (quizResponse.ok) {
            console.log('Final quiz created successfully');
          } else {
            console.log('Failed to create final quiz, but course was saved');
          }
        } catch (quizError) {
          console.error('Error creating final quiz:', quizError);
        }
      }

      alert('Course saved successfully!');
      navigate('instructor-courses');
    } catch (error: any) {
      console.error('Error saving course:', error);
      alert(error.message || 'Failed to save course. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('instructor-dashboard')}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
                Create New Course
              </h1>
              <p className="text-gray-400 text-sm">Fill in the details to create your course</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={analyzeCourseWithAI}
              disabled={isAnalyzingCourse}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-xl text-sm font-medium text-purple-300 hover:bg-purple-600/30 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isAnalyzingCourse ? 'Analyzing...' : 'Improve with AI'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Course'}
            </button>
          </div>
        </div>

        {/* AI Suggestions */}
        {showAiSuggestions && (
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">AI Course Suggestions</h3>
              </div>
              <button
                onClick={() => setShowAiSuggestions(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-2">
              {aiSuggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Basic Info */}
        <div className="mb-8 p-6 bg-white/3 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Title</label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Describe what students will learn"
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Select category</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as any)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pricing</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={isFree}
                      onChange={() => setIsFree(true)}
                      className="w-4 h-4 text-purple-500"
                    />
                    <span className="text-sm text-white">Free</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!isFree}
                      onChange={() => setIsFree(false)}
                      className="w-4 h-4 text-purple-500"
                    />
                    <span className="text-sm text-white">Paid</span>
                  </label>
                </div>
              </div>

              {!isFree && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail URL</label>
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills Students Will Learn</label>
              {skillsLearned.map((skill, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...skillsLearned];
                      newSkills[idx] = e.target.value;
                      setSkillsLearned(newSkills);
                    }}
                    placeholder="e.g., React, JavaScript"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  {skillsLearned.length > 1 && (
                    <button
                      onClick={() => {
                        const newSkills = skillsLearned.filter((_, i) => i !== idx);
                        setSkillsLearned(newSkills);
                      }}
                      className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setSkillsLearned([...skillsLearned, ''])}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                + Add Skill
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prerequisites</label>
              {prerequisites.map((prereq, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={prereq}
                    onChange={(e) => {
                      const newPrereqs = [...prerequisites];
                      newPrereqs[idx] = e.target.value;
                      setPrerequisites(newPrereqs);
                    }}
                    placeholder="e.g., Basic JavaScript knowledge"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  {prerequisites.length > 1 && (
                    <button
                      onClick={() => {
                        const newPrereqs = prerequisites.filter((_, i) => i !== idx);
                        setPrerequisites(newPrereqs);
                      }}
                      className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setPrerequisites([...prerequisites, ''])}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                + Add Prerequisite
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Duration (hours)</label>
                <input
                  type="number"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(Number(e.target.value))}
                  placeholder="Auto-calculated from lessons"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={certificateAvailable}
                    onChange={(e) => setCertificateAvailable(e.target.checked)}
                    className="w-4 h-4 text-purple-500"
                  />
                  <span className="text-sm text-white">Certificate Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Final Quiz Section */}
        {certificateAvailable && (
          <div className="mb-8 p-6 bg-white/3 border border-white/10 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Final Quiz</h2>
              <button
                onClick={() => setShowFinalQuizSection(!showFinalQuizSection)}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {showFinalQuizSection ? 'Hide' : 'Show'} Quiz Editor
              </button>
            </div>
            
            {!showFinalQuizSection && (
              <div className="text-sm text-gray-400">
                <p>Final quiz will be auto-generated from lesson quizzes.</p>
                <p className="mt-1">Click "Show Quiz Editor" to create custom questions.</p>
              </div>
            )}

            {showFinalQuizSection && (
              <div className="space-y-4">
                {finalQuiz.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No quiz questions added yet.</p>
                    <button
                      onClick={addFinalQuizQuestion}
                      className="mt-2 text-purple-400 hover:text-purple-300"
                    >
                      + Add First Question
                    </button>
                  </div>
                )}

                {finalQuiz.map((question, qIdx) => (
                  <div key={question.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-white">Question {qIdx + 1}</span>
                      <button
                        onClick={() => removeFinalQuizQuestion(qIdx)}
                        className="p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateFinalQuizQuestion(qIdx, 'question', e.target.value)}
                        placeholder="Enter question"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      />

                      <div className="space-y-2">
                        <label className="text-xs text-gray-400">Options (select correct answer)</label>
                        {question.options.map((option, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctAnswer === oIdx}
                              onChange={() => updateFinalQuizQuestion(qIdx, 'correctAnswer', oIdx)}
                              className="w-4 h-4 text-purple-500"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateFinalQuizOption(qIdx, oIdx, e.target.value)}
                              placeholder={`Option ${oIdx + 1}`}
                              className={`flex-1 px-4 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 ${
                                question.correctAnswer === oIdx ? 'border-green-500/50' : 'border-white/10'
                              }`}
                            />
                          </div>
                        ))}
                      </div>

                      <textarea
                        value={question.explanation}
                        onChange={(e) => updateFinalQuizQuestion(qIdx, 'explanation', e.target.value)}
                        placeholder="Explanation for the correct answer"
                        rows={2}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addFinalQuizQuestion}
                  className="w-full py-3 border-2 border-dashed border-purple-500/30 rounded-xl text-purple-400 hover:border-purple-500/50 hover:text-purple-300 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Question
                </button>

                <div className="text-xs text-gray-500 text-center">
                  {finalQuiz.length} question(s) added
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modules */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Course Content</h2>
            <button
              onClick={addModule}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-xl text-sm font-medium text-white hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Module
            </button>
          </div>

          <div className="space-y-4">
            {modules.map((module, mIdx) => (
              <div key={module.id} className="p-6 bg-white/3 border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => {
                      const updated = [...modules];
                      updated[mIdx].title = e.target.value;
                      setModules(updated);
                    }}
                    className="text-lg font-bold text-white bg-transparent border-none focus:outline-none"
                  />
                  <button
                    onClick={() => removeModule(module.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {module.lessons.map((lesson, lIdx) => (
                    <div key={lesson.id} className="p-4 bg-white/5 border border-white/5 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-400">Lesson {lIdx + 1}</span>
                        <button
                          onClick={() => removeLesson(module.id, lesson.id)}
                          className="p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                          placeholder="Lesson title"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />

                        <div className="grid grid-cols-2 gap-3">
                          <select
                            value={lesson.type}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'type', e.target.value)}
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                          >
                            <option value="video">Video</option>
                            <option value="reading">Reading</option>
                            <option value="exercise">Exercise</option>
                            <option value="quiz">Quiz</option>
                          </select>

                          <input
                            type="number"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'duration', Number(e.target.value))}
                            placeholder="Duration (min)"
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>

                        {lesson.type === 'video' && (
                          <input
                            type="text"
                            value={lesson.videoUrl}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'videoUrl', e.target.value)}
                            placeholder="Video URL (YouTube embed or direct link)"
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        )}

                        {lesson.type === 'reading' && (
                          <textarea
                            value={lesson.content || ''}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'content', e.target.value)}
                            placeholder="Reading content..."
                            rows={4}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                          />
                        )}

                        {lesson.type === 'exercise' && (
                          <div className="space-y-3">
                            <textarea
                              value={lesson.exercise?.question || ''}
                              onChange={(e) => updateLesson(module.id, lesson.id, 'exercise', { ...lesson.exercise, question: e.target.value })}
                              placeholder="Exercise question..."
                              rows={2}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                            />
                            <input
                              type="text"
                              value={lesson.exercise?.expectedOutput || ''}
                              onChange={(e) => updateLesson(module.id, lesson.id, 'exercise', { ...lesson.exercise, expectedOutput: e.target.value })}
                              placeholder="Expected output"
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>
                        )}

                        {/* Quiz Section */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-white">Quiz Questions</span>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => generateQuizWithAI(module.id, lesson.id)}
                                disabled={isGeneratingQuiz}
                                className="text-xs px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white hover:opacity-90 transition-colors flex items-center gap-1 disabled:opacity-50"
                              >
                                <Sparkles className="w-3 h-3" />
                                {isGeneratingQuiz ? 'Generating...' : 'Generate with AI'}
                              </button>
                              <button
                                type="button"
                                onClick={() => addQuizQuestion(module.id, lesson.id)}
                                className="text-xs px-3 py-1 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
                              >
                                + Add Question
                              </button>
                            </div>
                          </div>

                          {lesson.quiz?.questions.map((q, qIdx) => (
                            <div key={qIdx} className="mb-3 p-3 bg-white/5 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-400">Question {qIdx + 1}</span>
                                <button
                                  type="button"
                                  onClick={() => removeQuizQuestion(module.id, lesson.id, qIdx)}
                                  className="text-xs text-red-400 hover:text-red-300"
                                >
                                  Remove
                                </button>
                              </div>

                              <input
                                type="text"
                                value={q.question}
                                onChange={(e) => updateQuizQuestion(module.id, lesson.id, qIdx, 'question', e.target.value)}
                                placeholder="Question text"
                                className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-2"
                              />

                              <div className="space-y-1 mb-2">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={`correct-${module.id}-${lesson.id}-${qIdx}`}
                                      checked={q.correctAnswer === oIdx}
                                      onChange={() => updateQuizQuestion(module.id, lesson.id, qIdx, 'correctAnswer', oIdx)}
                                      className="w-3 h-3 text-purple-500"
                                    />
                                    <input
                                      type="text"
                                      value={opt}
                                      onChange={(e) => {
                                        const newOptions = [...q.options];
                                        newOptions[oIdx] = e.target.value;
                                        updateQuizQuestion(module.id, lesson.id, qIdx, 'options', newOptions);
                                      }}
                                      placeholder={`Option ${oIdx + 1}`}
                                      className="flex-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                  </div>
                                ))}
                              </div>

                              <textarea
                                value={q.explanation}
                                onChange={(e) => updateQuizQuestion(module.id, lesson.id, qIdx, 'explanation', e.target.value)}
                                placeholder="Explanation (shown after answering)"
                                rows={2}
                                className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addLesson(module.id)}
                    className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-sm text-gray-400 hover:border-purple-500/50 hover:text-purple-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
