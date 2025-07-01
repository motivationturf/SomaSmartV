import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ArrowLeft, 
  Crown, 
  Trophy, 
  Target,
  Clock,
  Zap,
  Star,
  Medal,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';

interface ClassChallengeProps {
  config: {
    subject: string;
    topic: string;
    questionCount: number;
  };
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function ClassChallenge({ config, onBack, isGuest = false, onUpdateProgress }: ClassChallengeProps) {
  const [gamePhase, setGamePhase] = useState<'lobby' | 'playing' | 'results'>('lobby');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [playerScore, setPlayerScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  // Mock multiplayer data
  const [players] = useState([
    { id: 1, name: 'You', score: 0, avatar: '🦅', isPlayer: true },
    { id: 2, name: 'Sarah M.', score: 0, avatar: '🌟', isPlayer: false },
    { id: 3, name: 'John B.', score: 0, avatar: '⚡', isPlayer: false },
    { id: 4, name: 'Grace P.', score: 0, avatar: '🎯', isPlayer: false },
    { id: 5, name: 'David T.', score: 0, avatar: '🚀', isPlayer: false }
  ]);

  const [leaderboard, setLeaderboard] = useState(players);

  // Subject-specific multiplayer questions
  const questionSets = {
    mathematics: [
      {
        question: "What is 15 × 12?",
        options: ["170", "180", "190", "200"],
        correct: 1,
        explanation: "15 × 12 = 180",
        eagleTip: "🦅 Break it down: 15 × 10 = 150, then 15 × 2 = 30, so 150 + 30 = 180!"
      },
      {
        question: "What is the area of a rectangle with length 8 and width 5?",
        options: ["35", "40", "45", "50"],
        correct: 1,
        explanation: "Area = length × width = 8 × 5 = 40",
        eagleTip: "🦅 Rectangle area is simple - just multiply length times width!"
      },
      {
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        correct: 1,
        explanation: "25% of 80 = 0.25 × 80 = 20",
        eagleTip: "🦅 25% is the same as 1/4, so divide 80 by 4!"
      },
      {
        question: "What is the perimeter of a square with side length 6?",
        options: ["20", "22", "24", "26"],
        correct: 2,
        explanation: "Perimeter = 4 × side length = 4 × 6 = 24",
        eagleTip: "🦅 A square has 4 equal sides, so multiply the side length by 4!"
      },
      {
        question: "What is √36?",
        options: ["4", "5", "6", "7"],
        correct: 2,
        explanation: "√36 = 6 because 6 × 6 = 36",
        eagleTip: "🦅 Think: what number times itself equals 36?"
      }
    ],
    'computer-studies': [
      {
        question: "What does CPU stand for?",
        options: ["Computer Processing Unit", "Central Processing Unit", "Central Program Unit", "Computer Program Unit"],
        correct: 1,
        explanation: "CPU stands for Central Processing Unit - the brain of the computer",
        eagleTip: "🦅 The CPU is like my brain - it processes all the information!"
      },
      {
        question: "Which of these is a programming language?",
        options: ["HTML", "CSS", "Python", "HTTP"],
        correct: 2,
        explanation: "Python is a programming language, while HTML and CSS are markup languages",
        eagleTip: "🦅 Python is named after the comedy group Monty Python!"
      },
      {
        question: "What does WWW stand for?",
        options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"],
        correct: 0,
        explanation: "WWW stands for World Wide Web",
        eagleTip: "🦅 The web connects the whole world - like how eagles can fly anywhere!"
      },
      {
        question: "How many bits are in a byte?",
        options: ["4", "6", "8", "10"],
        correct: 2,
        explanation: "A byte contains 8 bits",
        eagleTip: "🦅 Remember: 8 bits make a byte - like 8 feathers make a wing!"
      },
      {
        question: "What is the main function of RAM?",
        options: ["Store data permanently", "Store data temporarily", "Process data", "Display data"],
        correct: 1,
        explanation: "RAM (Random Access Memory) stores data temporarily while the computer is running",
        eagleTip: "🦅 RAM is like short-term memory - it forgets when the power goes off!"
      }
    ],
    sciences: [
      {
        question: "What is the chemical formula for water?",
        options: ["H₂O", "HO₂", "H₃O", "H₂O₂"],
        correct: 0,
        explanation: "Water is H₂O - two hydrogen atoms and one oxygen atom",
        eagleTip: "🦅 Water is essential for all life - even eagles need it to survive!"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        explanation: "Mars is called the Red Planet due to iron oxide on its surface",
        eagleTip: "🦅 Mars looks red from space - like the color of desert sand!"
      },
      {
        question: "What gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1,
        explanation: "Plants absorb carbon dioxide and release oxygen during photosynthesis",
        eagleTip: "🦅 Plants clean the air I breathe - they take in CO₂ and give out O₂!"
      },
      {
        question: "What is the hardest natural substance?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        correct: 2,
        explanation: "Diamond is the hardest natural substance known",
        eagleTip: "🦅 Diamonds are so hard they can cut through almost anything!"
      },
      {
        question: "How many chambers does a human heart have?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "The human heart has 4 chambers: 2 atria and 2 ventricles",
        eagleTip: "🦅 Like eagles, humans have 4-chambered hearts for efficient circulation!"
      }
    ],
    'religious-education': [
      {
        question: "What is the Golden Rule?",
        options: ["Pray daily", "Give to charity", "Treat others as you want to be treated", "Fast regularly"],
        correct: 2,
        explanation: "The Golden Rule teaches us to treat others as we would like to be treated",
        eagleTip: "🦅 This wise principle creates harmony - like how eagles respect each other!"
      },
      {
        question: "Which religion was founded by Buddha?",
        options: ["Hinduism", "Buddhism", "Jainism", "Sikhism"],
        correct: 1,
        explanation: "Buddhism was founded by Siddhartha Gautama, known as the Buddha",
        eagleTip: "🦅 Buddha means 'the awakened one' - wisdom comes from understanding!"
      },
      {
        question: "What is the holy book of Islam?",
        options: ["Bible", "Torah", "Quran", "Vedas"],
        correct: 2,
        explanation: "The Quran is the central religious text of Islam",
        eagleTip: "🦅 Different faiths have different sacred texts that guide believers!"
      },
      {
        question: "Which city is holy to Judaism, Christianity, and Islam?",
        options: ["Mecca", "Rome", "Jerusalem", "Varanasi"],
        correct: 2,
        explanation: "Jerusalem is considered holy by all three Abrahamic religions",
        eagleTip: "🦅 Some places are sacred to multiple faiths - showing our shared heritage!"
      },
      {
        question: "What does 'compassion' mean?",
        options: ["Being angry", "Feeling concern for others", "Being wealthy", "Being powerful"],
        correct: 1,
        explanation: "Compassion means feeling concern for others' suffering and wanting to help",
        eagleTip: "🦅 Compassion is like how eagles care for their young - with love and protection!"
      }
    ]
  };

  const questions = questionSets[config.subject as keyof typeof questionSets] || questionSets.mathematics;
  const currentQuestionData = questions[currentQuestion];

  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeUp();
    }
  }, [timeLeft, gamePhase, showFeedback]);

  // Simulate other participants' progress
  useEffect(() => {
    if (gamePhase === 'playing') {
      const interval = setInterval(() => {
        setLeaderboard(prev => prev.map(p => {
          if (p.isPlayer) return p;
          
          // Simulate other players answering questions
          const shouldAnswer = Math.random() > 0.7; // 30% chance per second
          if (shouldAnswer && p.score < questions.length * 100) {
            const isCorrect = Math.random() > 0.3; // 70% accuracy
            const points = isCorrect ? Math.floor(Math.random() * 50) + 25 : 0;
            return {
              ...p,
              score: p.score + points
            };
          }
          return p;
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [gamePhase, questions.length]);

  const startGame = () => {
    setGamePhase('playing');
    setCurrentQuestion(0);
    setTimeLeft(15);
    setPlayerScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const isCorrect = answerIndex === currentQuestionData.correct;
    if (isCorrect) {
      const points = Math.max(100 - (15 - timeLeft) * 5, 10); // Faster = more points
      setPlayerScore(playerScore + points);
    }

    // Simulate other players answering
    setTimeout(() => {
      updateLeaderboard(isCorrect);
    }, 1000);
  };

  const handleTimeUp = () => {
    setShowFeedback(true);
    updateLeaderboard(false);
  };

  const updateLeaderboard = (playerCorrect: boolean) => {
    const updatedLeaderboard = leaderboard.map(player => {
      if (player.isPlayer) {
        return { ...player, score: playerScore + (playerCorrect ? Math.max(100 - (15 - timeLeft) * 5, 10) : 0) };
      } else {
        // Simulate other players' performance
        const correct = Math.random() > 0.3; // 70% chance of correct answer
        const responseTime = Math.random() * 10 + 2; // 2-12 seconds
        const points = correct ? Math.max(100 - responseTime * 5, 10) : 0;
        return { ...player, score: player.score + points };
      }
    });

    // Sort by score
    updatedLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(updatedLeaderboard);

    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      setGamePhase('results');
      if (isGuest && onUpdateProgress) {
        onUpdateProgress({
          timeSpent: 10,
          pointsEarned: playerScore
        });
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(15);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  if (gamePhase === 'results') {
    const playerRank = leaderboard.findIndex(p => p.isPlayer) + 1;
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="text-6xl mb-4">🦅</div>
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Challenge Complete!</h2>
              <p className="text-gray-600">Chisomo the Eagle celebrates your teamwork!</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-blue-600">#{playerRank}</h3>
                <p className="text-blue-700">Your Rank</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-green-600">{playerScore}</h3>
                <p className="text-green-700">Your Score</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-2xl font-bold text-purple-600">{questions.length}</h3>
                <p className="text-purple-700">Questions</p>
              </div>
            </div>

            {/* Final Leaderboard */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-lg font-semibold">Final Leaderboard</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        player.isPlayer ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8">
                          {getRankIcon(index + 1)}
                        </div>
                        <div className="text-2xl">{player.avatar}</div>
                        <div>
                          <p className={`font-medium ${player.isPlayer ? 'text-green-900' : 'text-gray-900'}`}>
                            {player.name}
                            {player.isPlayer && <span className="ml-2 text-green-600">(You)</span>}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{player.score}</p>
                        <p className="text-xs text-gray-600">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="text-3xl">🦅</div>
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Team Wisdom</h4>
                  <p className="text-amber-800">
                    {playerRank === 1 
                      ? "Outstanding! You soared above the competition like a true eagle!"
                      : playerRank <= 3
                      ? "Excellent work! You're among the top performers - keep flying high!"
                      : "Great effort! Every challenge makes you stronger. Eagles learn from every flight!"
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
              <Button variant="outline" onClick={() => setGamePhase('lobby')}>
                <Users className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gamePhase === 'lobby') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Arcade
        </Button>

        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-8">
              <Users className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Class Challenge</h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Compete with classmates in real-time! Answer questions quickly and accurately to climb the leaderboard.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">🦅</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Challenge Tips</h4>
                    <ul className="text-amber-800 text-sm space-y-1">
                      <li>• Speed matters - faster correct answers earn more points!</li>
                      <li>• Stay focused - you have 15 seconds per question</li>
                      <li>• Learn from others - see how classmates perform</li>
                      <li>• Have fun - competition makes learning exciting!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Players Waiting */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-lg font-semibold">Players Ready ({players.length}/5)</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {players.map((player) => (
                    <div key={player.id} className="text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 ${
                        player.isPlayer ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'
                      }`}>
                        {player.avatar}
                      </div>
                      <p className={`text-sm font-medium ${
                        player.isPlayer ? 'text-green-900' : 'text-gray-700'
                      }`}>
                        {player.name}
                      </p>
                      {player.isPlayer && (
                        <p className="text-xs text-green-600">You</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-semibold text-indigo-900">Multiplayer</h3>
                <p className="text-indigo-700 text-sm">Compete with 5 players</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <Clock className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-red-900">Timed Questions</h3>
                <p className="text-red-700 text-sm">15 seconds per question</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-yellow-900">Live Leaderboard</h3>
                <p className="text-yellow-700 text-sm">Real-time rankings</p>
              </div>
            </div>

            <Button size="lg" onClick={startGame} className="px-12 py-4 text-lg">
              <Zap className="h-5 w-5 mr-2" />
              Start Challenge
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Game Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Class Challenge</h1>
              <p className="text-gray-600">{config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
                {timeLeft}
              </div>
              <p className="text-xs text-gray-600">Seconds</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentQuestion + 1}/{questions.length}
              </div>
              <p className="text-xs text-gray-600">Questions</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Question */}
        <div className="lg:col-span-2">
          <Card className={`mb-6 transition-all duration-300 ${
            showFeedback && selectedAnswer === currentQuestionData.correct ? 'border-green-500 bg-green-50' :
            showFeedback && selectedAnswer !== currentQuestionData.correct ? 'border-red-500 bg-red-50' :
            'border-gray-200'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold">Question {currentQuestion + 1}</h3>
                </div>
                {showFeedback && (
                  <div className="flex items-center space-x-2">
                    {selectedAnswer === currentQuestionData.correct ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestionData.question}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {currentQuestionData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showFeedback}
                      className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                        selectedAnswer === index
                          ? showFeedback && index === currentQuestionData.correct
                            ? 'border-green-500 bg-green-100'
                            : showFeedback
                              ? 'border-red-500 bg-red-100'
                              : 'border-indigo-500 bg-indigo-50'
                          : showFeedback && index === currentQuestionData.correct
                            ? 'border-green-500 bg-green-100'
                            : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">{currentQuestionData.explanation}</p>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🦅</div>
                      <div>
                        <h4 className="font-medium text-amber-900 mb-1">Eagle Wisdom</h4>
                        <p className="text-amber-800 text-sm">{currentQuestionData.eagleTip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Leaderboard */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Live Leaderboard</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      player.isPlayer ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6">
                        {getRankIcon(index + 1)}
                      </div>
                      <div className="text-xl">{player.avatar}</div>
                      <div>
                        <p className={`font-medium text-sm ${
                          player.isPlayer ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {player.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{player.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}