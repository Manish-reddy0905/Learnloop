import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { api } from '../lib/api';
import { Clock, CheckCircle, XCircle, ArrowRight, Trophy, AlertCircle } from 'lucide-react';

export default function QuizPage() {
  const { selectedCourseId, navigate, setQuizScore, earnCertificate, courses, userProgress } = useStore();
  const course = courses.find(c => c.id === selectedCourseId);
  const courseProgress = userProgress[selectedCourseId || '']?.percentage || 0;

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!selectedCourseId) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching quiz for course:', selectedCourseId);
        const quizData = await api.getQuizByCourse(selectedCourseId);
        console.log('Quiz data received:', quizData);
        setQuiz(quizData);
        setAnswers(new Array(quizData.questions.length).fill(null));
        setTimeLeft((quizData.timeLimit || 30) * 60);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [selectedCourseId]);

  useEffect(() => {
    if (quizComplete) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          handleFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizComplete]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a1a]">
        <div className="text-white">Loading quiz...</div>
      </div>
    );
  }

  if (!quiz || !course) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a1a]">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-white">No quiz available for this course yet.</p>
          <button onClick={() => navigate('course-detail', selectedCourseId || '')} className="mt-4 px-6 py-2 bg-purple-600 rounded-xl text-sm">Go Back</button>
        </div>
      </div>
    );
  }

  if (courseProgress < 75) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a1a]">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">Quiz Locked</h1>
          <p className="text-gray-400 mb-4">You need to complete at least 75% of the course before taking the quiz.</p>
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Your Progress</span>
              <span>{courseProgress}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Required: 75%</p>
          </div>
          <button onClick={() => navigate('course-detail', selectedCourseId || '')} className="px-6 py-2 bg-purple-600 rounded-xl text-sm text-white">Continue Learning</button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQ];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const correct = answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length;
    const finalScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizComplete(true);
    setQuizScore(course.id, finalScore);
    
    // Award certificate if quiz is passed and course is complete
    if (finalScore >= quiz.passingScore && courseProgress >= 100) {
      earnCertificate(course.id);
    }
  };

  if (quizComplete) {
    const passed = score >= quiz.passingScore;
    const correct = answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length;

    return (
      <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          <div className={`p-8 rounded-3xl border text-center ${passed ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <div className="text-6xl mb-4">{passed ? '🏆' : '📚'}</div>
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h1>
            <p className="text-gray-400 mb-6">{passed ? 'You passed the quiz!' : `You need ${quiz.passingScore}% to pass. You scored ${score}%.`}</p>
            
            <div className="flex justify-center mb-6">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke={passed ? '#22c55e' : '#ef4444'}
                    strokeWidth="10"
                    strokeDasharray={`${score * 2.64} 264`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-3xl font-black text-white">{score}%</div>
                  <div className="text-xs text-gray-400">Score</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-xl font-black text-green-400">{correct}</div>
                <div className="text-xs text-gray-500">Correct</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-xl font-black text-red-400">{quiz.questions.length - correct}</div>
                <div className="text-xs text-gray-500">Wrong</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-xl font-black text-white">{quiz.questions.length}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>

            {/* Answer Review */}
            <div className="text-left mb-6 max-h-48 overflow-y-auto space-y-2">
              {quiz.questions.map((q, i) => {
                const isCorrect = answers[i] === q.correctAnswer;
                return (
                  <div key={q.id} className={`p-3 rounded-xl text-xs ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <div className="flex items-start gap-2">
                      {isCorrect ? <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" /> : <XCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />}
                      <div>
                        <div className={`font-medium ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>{q.question}</div>
                        {!isCorrect && <div className="text-gray-400 mt-1">✓ {q.options[q.correctAnswer]}</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              {passed && (
                <button
                  onClick={() => navigate('certificate', course.id)}
                  className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-yellow-500/20"
                >
                  🎓 View Certificate
                </button>
              )}
              <button
                onClick={() => navigate('courses')}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Next Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold text-white">{quiz.title}</h1>
            <p className="text-xs text-gray-500">{course.title}</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${timeLeft < 60 ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/5 border-white/10 text-gray-300'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Question {currentQ + 1} of {quiz.questions.length}</span>
            <span>Passing: {quiz.passingScore}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6 bg-white/3 border border-white/10 rounded-2xl mb-4">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">
              {currentQ + 1}
            </div>
            <p className="text-white font-medium leading-relaxed">{question.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let style = 'bg-white/3 border-white/10 text-gray-300 hover:border-purple-500/50 hover:bg-white/8';
              if (selected !== null) {
                if (idx === question.correctAnswer) style = 'bg-green-500/15 border-green-500/40 text-green-300';
                else if (idx === selected && idx !== question.correctAnswer) style = 'bg-red-500/15 border-red-500/40 text-red-300';
                else style = 'bg-white/3 border-white/5 text-gray-600';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`w-full p-4 border rounded-xl text-left text-sm transition-all flex items-center gap-3 ${style}`}
                >
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs flex-shrink-0 font-bold ${
                    selected !== null && idx === question.correctAnswer ? 'border-green-400 text-green-400' :
                    selected !== null && idx === selected ? 'border-red-400 text-red-400' :
                    'border-gray-600 text-gray-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{option}</span>
                  {selected !== null && idx === question.correctAnswer && <CheckCircle className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />}
                  {selected !== null && idx === selected && idx !== question.correctAnswer && <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-blue-400 mb-1">Explanation</div>
                  <p className="text-xs text-gray-300 leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        {selected !== null && (
          <button
            onClick={handleNext}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
          >
            {currentQ < quiz.questions.length - 1 ? (
              <>Next Question <ArrowRight className="w-4 h-4" /></>
            ) : (
              <><Trophy className="w-4 h-4" /> Submit Quiz</>
            )}
          </button>
        )}

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentQ ? 'bg-purple-500 w-4' :
                answers[i] !== null ? (answers[i] === quiz.questions[i].correctAnswer ? 'bg-green-500' : 'bg-red-500') :
                'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
