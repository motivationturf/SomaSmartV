import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  Trophy,
  Target,
  Lightbulb,
  RotateCcw
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';

interface BrainBusterProps {
  config: {
    subject: string;
    topic: string;
    questionCount: number;
    timeLimit: number;
  };
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function BrainBuster({ config, onBack, isGuest = false, onUpdateProgress }: BrainBusterProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  // Subject-specific questions
  const questionSets = {
    mathematics: [
      {
        question: "What is the value of x in the equation 2x + 5 = 13?",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correct: 1,
        explanation: "To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
        eagleTip: "🦅 Always isolate the variable by doing the same operation to both sides!"
      },
      {
        question: "What is the area of a circle with radius 5 units?",
        options: ["25π", "10π", "15π", "20π"],
        correct: 0,
        explanation: "Area of circle = πr². With r = 5, Area = π × 5² = 25π",
        eagleTip: "🦅 Remember the formula A = πr² - the radius is squared, not doubled!"
      },
      {
        question: "If a triangle has angles of 60° and 70°, what is the third angle?",
        options: ["40°", "50°", "60°", "70°"],
        correct: 1,
        explanation: "Sum of angles in a triangle = 180°. Third angle = 180° - 60° - 70° = 50°",
        eagleTip: "🦅 The three angles of any triangle always add up to 180 degrees!"
      },
      {
        question: "What is the slope of the line passing through points (2, 3) and (4, 7)?",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation: "Slope = (y₂ - y₁) / (x₂ - x₁) = (7 - 3) / (4 - 2) = 4 / 2 = 2",
        eagleTip: "🦅 Rise over run - how much the line goes up for each step to the right!"
      },
      {
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correct: 1,
        explanation: "15% of 200 = 0.15 × 200 = 30",
        eagleTip: "🦅 To find a percentage, multiply the number by the percentage as a decimal!"
      }
    ],
    'computer-studies': [
      {
        question: "Which programming language is known for its simplicity and readability?",
        options: ["C++", "Python", "Assembly", "Machine Code"],
        correct: 1,
        explanation: "Python is designed to be simple and readable, making it perfect for beginners",
        eagleTip: "🦅 Python's syntax is so clean, it's almost like writing in English!"
      },
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correct: 0,
        explanation: "HTML stands for HyperText Markup Language, the standard markup language for web pages",
        eagleTip: "🦅 HTML is the skeleton of every webpage - it gives structure to content!"
      },
      {
        question: "In binary, what is 1010 in decimal?",
        options: ["8", "10", "12", "14"],
        correct: 1,
        explanation: "1010₂ = 1×8 + 0×4 + 1×2 + 0×1 = 8 + 0 + 2 + 0 = 10",
        eagleTip: "🦅 Binary uses powers of 2: 8, 4, 2, 1 from left to right!"
      },
      {
        question: "What is a variable in programming?",
        options: ["A fixed value", "A container for data", "A type of loop", "A function"],
        correct: 1,
        explanation: "A variable is a container that stores data values that can be changed during program execution",
        eagleTip: "🦅 Think of variables as labeled boxes where you can store different things!"
      },
      {
        question: "Which symbol is used for comments in Python?",
        options: ["//", "/*", "#", "<!--"],
        correct: 2,
        explanation: "In Python, the # symbol is used to create single-line comments",
        eagleTip: "🦅 Comments help explain your code to other programmers (and future you)!"
      }
    ],
    sciences: [
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
        explanation: "Gold's chemical symbol is Au, from the Latin word 'aurum' meaning gold",
        eagleTip: "🦅 Many chemical symbols come from Latin names - that's why gold is Au!"
      },
      {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correct: 2,
        explanation: "Mercury is the closest planet to the Sun in our solar system",
        eagleTip: "🦅 Mercury is so close to the Sun, a year there is only 88 Earth days!"
      },
      {
        question: "What is the formula for water?",
        options: ["H₂O", "HO₂", "H₃O", "H₂O₂"],
        correct: 0,
        explanation: "Water consists of 2 hydrogen atoms and 1 oxygen atom, so its formula is H₂O",
        eagleTip: "🦅 Water is essential for all life - even eagles need it to survive!"
      },
      {
        question: "What force keeps us on the ground?",
        options: ["Magnetism", "Gravity", "Friction", "Pressure"],
        correct: 1,
        explanation: "Gravity is the force that attracts objects toward the center of the Earth",
        eagleTip: "🦅 Gravity is what I have to overcome every time I take flight!"
      },
      {
        question: "What gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1,
        explanation: "Plants absorb carbon dioxide (CO₂) and release oxygen during photosynthesis",
        eagleTip: "🦅 Plants are nature's air purifiers - they clean the air I fly through!"
      }
    ],
    'religious-education': [
      {
        question: "Which religion was founded by Siddhartha Gautama?",
        options: ["Hinduism", "Buddhism", "Jainism", "Sikhism"],
        correct: 1,
        explanation: "Buddhism was founded by Siddhartha Gautama, who became known as the Buddha",
        eagleTip: "🦅 Buddha means 'the awakened one' - wisdom comes from understanding!"
      },
      {
        question: "What is the holy book of Islam?",
        options: ["Bible", "Torah", "Quran", "Vedas"],
        correct: 2,
        explanation: "The Quran is the central religious text of Islam, believed to be revealed to Prophet Muhammad",
        eagleTip: "🦅 Different faiths have different sacred texts that guide their believers!"
      },
      {
        question: "In Christianity, what does 'Trinity' refer to?",
        options: ["Three prophets", "Three books", "Father, Son, Holy Spirit", "Three churches"],
        correct: 2,
        explanation: "The Trinity in Christianity refers to the Father, Son (Jesus), and Holy Spirit as one God",
        eagleTip: "🦅 Many religions have complex concepts that require thoughtful study!"
      },
      {
        question: "What is the Golden Rule found in many religions?",
        options: ["Pray daily", "Give to charity", "Treat others as you want to be treated", "Fast regularly"],
        correct: 2,
        explanation: "The Golden Rule teaches us to treat others as we would like to be treated ourselves",
        eagleTip: "🦅 This wise principle appears in many different religions around the world!"
      },
      {
        question: "Which city is considered holy by Judaism, Christianity, and Islam?",
        options: ["Mecca", "Rome", "Jerusalem", "Varanasi"],
        correct: 2,
        explanation: "Jerusalem is considered a holy city by all three Abrahamic religions",
        eagleTip: "🦅 Some places are sacred to multiple faiths, showing our shared human heritage!"
      }
    ]
  };

  const currentQuestions = questionSets[config.subject as keyof typeof questionSets] || questionSets.mathematics;
  const currentQuestionData = currentQuestions[currentQuestion % currentQuestions.length];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleGameComplete();
    }
  }, [timeLeft, gameState]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
      setAnswers(newAnswers);
      setShowFeedback(true);
      
      // Update score
      if (selectedAnswer === currentQuestionData.correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentQuestion + 1 >= config.questionCount) {
      handleGameComplete();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleGameComplete = () => {
    setGameState('completed');
    
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        timeSpent: Math.floor((config.timeLimit - timeLeft) / 60),
        pointsEarned: score * 10
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateFinalScore = () => {
    const correctAnswers = Object.values(answers).filter((answer, index) => 
      answer === currentQuestions[index % currentQuestions.length].correct
    ).length;
    return Math.round((correctAnswers / config.questionCount) * 100);
  };

  if (gameState === 'completed') {
    const finalScore = calculateFinalScore();
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="text-6xl mb-4">🦅</div>
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Brain Buster Complete!</h2>
              <p className="text-gray-600">Chisomo the Eagle is proud of your effort!</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-green-600">{finalScore}%</h3>
                <p className="text-green-700">Final Score</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-blue-600">{score}/{config.questionCount}</h3>
                <p className="text-blue-700">Correct Answers</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-purple-600">{isGuest ? '0' : score * 10}</h3>
                <p className="text-purple-700">Points Earned</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="text-3xl">🦅</div>
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Wisdom</h4>
                  <p className="text-amber-800">
                    {finalScore >= 80 
                      ? "Excellent work! You're soaring high like an eagle. Keep up this momentum!"
                      : finalScore >= 60
                      ? "Good effort! With more practice, you'll reach new heights. Eagles don't give up!"
                      : "Every expert was once a beginner. Keep practicing and you'll spread your wings soon!"
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Arcade
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Arcade
        </Button>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brain Buster</h1>
              <p className="text-gray-600">{config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                <Clock className="h-4 w-4 inline mr-1" />
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-600">Time Left</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {currentQuestion + 1}/{config.questionCount}
              </div>
              <p className="text-xs text-gray-600">Questions</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{score}</div>
              <p className="text-xs text-gray-600">Correct</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / config.questionCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Target className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Question {currentQuestion + 1}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg text-gray-900 mb-6">{currentQuestionData.question}</p>

            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="text-purple-600"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Feedback */}
              <div className={`p-4 rounded-lg border ${
                selectedAnswer === currentQuestionData.correct
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {selectedAnswer === currentQuestionData.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${
                    selectedAnswer === currentQuestionData.correct ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {selectedAnswer === currentQuestionData.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className={`text-sm ${
                  selectedAnswer === currentQuestionData.correct ? 'text-green-800' : 'text-red-800'
                }`}>
                  {currentQuestionData.explanation}
                </p>
              </div>

              {/* Eagle Tip */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900 mb-1">Eagle Wisdom</h4>
                    <p className="text-amber-800 text-sm">{currentQuestionData.eagleTip}</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleNextQuestion} className="w-full">
                {currentQuestion + 1 >= config.questionCount ? 'Finish Game' : 'Next Question'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}