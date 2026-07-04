import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Clock, Trophy, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { CompetitionQuiz } from '../data/competitionQuizzes';
import { api } from '../lib/api';

interface CompetitionQuizPageProps {
  quiz: CompetitionQuiz;
  onComplete: (score: number, totalQuestions: number) => void;
  onCancel: () => void;
}

export default function CompetitionQuizPage({ quiz, onComplete, onCancel }: CompetitionQuizPageProps) {
  const { currentUser, theme } = useStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // Convert to seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isDark = theme === 'dark';

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;

    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = correctCount;
    setScore(finalScore);
    setIsSubmitted(true);

    // Save to backend
    try {
      if (currentUser) {
        const historyEntry = {
          competitionId: quiz.competitionId || quiz.id,
          competitionTitle: quiz.title,
          score: finalScore,
          totalQuestions: quiz.questions.length,
          completedAt: new Date().toISOString(),
          type: quiz.type
        };

        const updatedHistory = [...(currentUser.competitionHistory || []), historyEntry];
        await api.updateUser(currentUser.clerkId, { competitionHistory: updatedHistory });
      }

      onComplete(finalScore, quiz.questions.length);
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  const getProgress = () => {
    const answered = Object.keys(selectedAnswers).length;
    return ((answered / quiz.questions.length) * 100).toFixed(0);
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen p-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Quiz Completed!
              </h1>
              <div className="text-6xl font-black text-green-500 mb-4">
                {score}/{quiz.questions.length}
              </div>
              <p className="text-gray-400 mb-8">
                You scored {((score / quiz.questions.length) * 100).toFixed(1)}%
              </p>
              <button
                onClick={onCancel}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all"
              >
                Back to Competitions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                {quiz.title}
              </h1>
              <p className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeRemaining < 300 ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
              <Clock className="w-5 h-5" />
              <span className="text-xl font-bold font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`rounded-2xl p-8 mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {currentQuestion.difficulty.toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                {currentQuestion.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white ring-2 ring-purple-400'
                      : isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-white bg-white/20' : isDark ? 'border-gray-500' : 'border-gray-400'
                    }`}>
                      {isSelected && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentQuestionIndex === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all"
              >
                <Trophy className="w-5 h-5" />
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
