import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  ArrowLeft, 
  ArrowRight,
  Flag,
  RotateCcw,
  Lock,
  UserPlus
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface QuizPageProps {
  onNavigate: (view: string) => void;
  isGuest?: boolean;
}

export function QuizPage({ onNavigate, isGuest = false }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  const quiz = {
    id: 1,
    title: 'Python Fundamentals Quiz',
    subject: 'Computer Studies/ICT',
    totalQuestions: 10,
    timeLimit: 900,
    points: 100,
    questions: [
      {
        id: 0,
        question: 'What is Python?',
        type: 'multiple-choice',
        options: [
          'A type of snake',
          'A high-level programming language',
          'A web browser',
          'A database system'
        ],
        correctAnswer: 1,
        explanation: 'Python is a high-level, interpreted programming language known for its simplicity and readability.',
        guestAllowed: true
      },
      {
        id: 1,
        question: 'Which of the following is the correct way to print "Hello World" in Python?',
        type: 'multiple-choice',
        options: [
          'echo "Hello World"',
          'print("Hello World")',
          'console.log("Hello World")',
          'System.out.println("Hello World")'
        ],
        correctAnswer: 1,
        explanation: 'In Python, the print() function is used to display output to the console.',
        guestAllowed: true
      },
      {
        id: 2,
        question: 'Python is case-sensitive.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'Python is case-sensitive, meaning "Variable" and "variable" are treated as different identifiers.',
        guestAllowed: false
      }
    ]
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100)
    };
  };

  const handleUpgrade = () => {
    onNavigate('register');
  };

  // Filter questions based on guest access
  const availableQuestions = isGuest 
    ? quiz.questions.filter(q => q.guestAllowed)
    : quiz.questions;

  const currentQuestionData = availableQuestions[currentQuestion];
  const isCurrentQuestionLocked = isGuest && !currentQuestionData?.guestAllowed;

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-gray-600">
                {isGuest ? 'Great job trying our sample quiz!' : `Great job completing the ${quiz.title}`}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-green-600">{score.percentage}%</h3>
                <p className="text-green-700">Final Score</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-blue-600">{score.correct}/{score.total}</h3>
                <p className="text-blue-700">Correct Answers</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-purple-600">{isGuest ? '0' : quiz.points}</h3>
                <p className="text-purple-700">Points Earned</p>
              </div>
            </div>

            {isGuest && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">Want to Save Your Progress?</h3>
                <p className="text-blue-800 mb-4">
                  Create an account to save your quiz results, earn points, and track your learning progress.
                </p>
                <Button onClick={handleUpgrade} className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Free Account
                </Button>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Review Your Answers</h3>
              {availableQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="text-left border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <p className={`text-sm mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Your answer: {question.options[userAnswer] || 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-700 mb-2">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => onNavigate('subjects')}>
                Back to Subjects
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestionData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Available</h2>
            <p className="text-gray-600 mb-6">
              This quiz is not available in guest mode. Create an account to access all quizzes.
            </p>
            <Button onClick={handleUpgrade}>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Free Account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / availableQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('subjects')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Subjects
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600">
              {quiz.subject} {isGuest && '(Sample Quiz)'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isGuest && (
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {formatTime(timeLeft)}
                </div>
                <p className="text-xs text-gray-600">Time Left</p>
              </div>
            )}
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {currentQuestion + 1}/{availableQuestions.length}
              </div>
              <p className="text-xs text-gray-600">Questions</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Question */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">
                Question {currentQuestion + 1}
                {isGuest && <span className="text-sm text-orange-600 ml-2">(Sample)</span>}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-lg text-gray-900 mb-6">
                  {currentQuestionData.question}
                </p>

                <div className="space-y-3">
                  {currentQuestionData.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={index}
                        checked={selectedAnswers[currentQuestion] === index}
                        onChange={() => handleAnswerSelect(currentQuestion, index)}
                        className="text-blue-600"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex space-x-2">
                  {!isGuest && (
                    <Button variant="outline">
                      <Flag className="h-4 w-4 mr-2" />
                      Flag for Review
                    </Button>
                  )}
                  
                  {currentQuestion === availableQuestions.length - 1 ? (
                    <Button onClick={submitQuiz}>
                      Submit Quiz
                    </Button>
                  )  : (
                    <Button onClick={nextQuestion}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Navigator */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Question Navigator</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {availableQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      index === currentQuestion
                        ? 'bg-blue-600 text-white'
                        : selectedAnswers[index] !== undefined
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span>Not answered</span>
                </div>
              </div>

              {isGuest && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-xs">
                    This is a sample quiz with limited questions. Create an account for full access.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}