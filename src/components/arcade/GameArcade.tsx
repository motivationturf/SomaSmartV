import React, { useState } from 'react';
import { 
  Gamepad2, 
  Clock, 
  Zap, 
  Users, 
  Shuffle, 
  Brain,
  Trophy,
  Star,
  Play,
  Settings,
  ArrowLeft,
  Target,
  Timer,
  Award,
  BookOpen,
  Calculator,
  Microscope,
  Computer
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { BrainBuster } from './games/BrainBuster';
import { Flashcards } from './games/Flashcards';
import { TimeChallenge } from './games/TimeChallenge';
import { JumbleMaster } from './games/JumbleMaster';
import { ClassChallenge } from './games/ClassChallenge';

interface GameArcadeProps {
  onNavigate: (view: string) => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

interface SubjectSelectionModalProps {
  gameId: string;
  onSubjectSelect: (subject: string) => void;
  onClose: () => void;
}

function SubjectSelectionModal({ gameId, onSubjectSelect, onClose }: SubjectSelectionModalProps) {
  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: Calculator,
      color: 'from-green-500 to-emerald-500',
      description: 'Algebra, geometry, calculus, and problem-solving'
    },
    {
      id: 'computer-studies',
      name: 'Computer Studies/ICT',
      icon: Computer,
      color: 'from-blue-500 to-cyan-500',
      description: 'Programming, databases, and technology'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: Microscope,
      color: 'from-purple-500 to-pink-500',
      description: 'Physics, chemistry, biology, and experiments'
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      description: 'World religions, ethics, and philosophy'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Subject</h3>
          <p className="text-gray-600">Select the subject you want to practice with this game</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Card
                key={subject.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                onClick={() => onSubjectSelect(subject.id)}
              >
                <div className={`bg-gradient-to-r ${subject.color} p-4 text-white rounded-t-xl`}>
                  <div className="flex items-center space-x-3">
                    <Icon className="h-8 w-8" />
                    <div>
                      <h4 className="font-bold text-lg">{subject.name}</h4>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 text-sm">{subject.description}</p>
                  <Button className="w-full mt-3" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Play with {subject.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export function GameArcade({ onNavigate, isGuest = false, onUpdateProgress }: GameArcadeProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [pendingGameId, setPendingGameId] = useState<string>('');

  const games = [
    {
      id: 'brain-buster',
      title: 'Brain Buster',
      description: 'Solo timed quiz to test your knowledge across all subjects',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Medium',
      duration: '5-15 min',
      players: 'Solo',
      features: ['Timed Questions', 'Multiple Choice', 'Instant Feedback', 'Eagle Tips'],
      guestAllowed: true
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Flip cards to reinforce key concepts and definitions',
      icon: Shuffle,
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Easy',
      duration: '10-20 min',
      players: 'Solo',
      features: ['Interactive Cards', 'Spaced Repetition', 'Progress Tracking', 'Eagle Wisdom'],
      guestAllowed: true
    },
    {
      id: 'time-challenge',
      title: 'Time Challenge',
      description: 'Rapid-fire quiz with 60 seconds to answer as many as possible',
      icon: Timer,
      color: 'from-red-500 to-orange-500',
      difficulty: 'Hard',
      duration: '1-2 min',
      players: 'Solo',
      features: ['60 Second Timer', 'Quick Fire', 'Score Multiplier', 'Eagle Boost'],
      guestAllowed: true
    },
    {
      id: 'jumble-master',
      title: 'Jumble Master',
      description: 'Unscramble words, formulas, and definitions',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Medium',
      duration: '5-10 min',
      players: 'Solo',
      features: ['Word Puzzles', 'Formula Scrambles', 'Hint System', 'Eagle Clues'],
      guestAllowed: false
    },
    {
      id: 'class-challenge',
      title: 'Class Challenge',
      description: 'Multiplayer game for teacher-created challenges',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      difficulty: 'Variable',
      duration: '10-30 min',
      players: 'Multiplayer',
      features: ['Real-time Competition', 'Custom Questions', 'Live Leaderboard', 'Eagle Mascot'],
      guestAllowed: false
    }
  ];

  const handleGameSelect = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const isLocked = isGuest && !game.guestAllowed;
    if (isLocked) return;

    // Show subject selection modal
    setPendingGameId(gameId);
    setShowSubjectModal(true);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedGame(pendingGameId);
    setShowSubjectModal(false);
    setPendingGameId('');
  };

  const handleBackToArcade = () => {
    setSelectedGame(null);
    setSelectedSubject('');
  };

  const renderGameComponent = () => {
    const gameConfig = {
      subject: selectedSubject,
      topic: 'general',
      questionCount: 10,
      timeLimit: 300
    };

    const commonProps = {
      config: gameConfig,
      onBack: handleBackToArcade,
      isGuest,
      onUpdateProgress
    };

    switch (selectedGame) {
      case 'brain-buster':
        return <BrainBuster {...commonProps} />;
      case 'flashcards':
        return <Flashcards {...commonProps} />;
      case 'time-challenge':
        return <TimeChallenge {...commonProps} />;
      case 'jumble-master':
        return <JumbleMaster {...commonProps} />;
      case 'class-challenge':
        return <ClassChallenge {...commonProps} />;
      default:
        return null;
    }
  };

  if (selectedGame) {
    return renderGameComponent();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Arcade</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn through play! Choose from our collection of educational games designed to make studying fun and engaging.
          </p>
          
          {isGuest && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <Target className="h-5 w-5" />
                <span className="font-medium">Guest Mode: Try 3 sample games</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Create an account to unlock all games and save your high scores!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Eagle Mascot Introduction */}
      <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">🦅</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-900 mb-2">Meet Chisomo the Eagle!</h3>
              <p className="text-amber-800">
                Your learning companion will guide you through each game with helpful tips, concept nuggets, and encouragement. 
                The eagle represents wisdom and soaring to new heights - just like your academic journey!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {games.map((game) => {
          const Icon = game.icon;
          const isLocked = isGuest && !game.guestAllowed;
          
          return (
            <Card 
              key={game.id} 
              className={`transition-all duration-300 relative overflow-hidden ${
                isLocked 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:shadow-xl hover:-translate-y-2 cursor-pointer'
              }`}
              onClick={() => !isLocked && handleGameSelect(game.id)}
            >
              {isLocked && (
                <div className="absolute inset-0 bg-gray-50/90 z-10 flex items-center justify-center">
                  <div className="text-center bg-white p-4 rounded-lg shadow-lg border">
                    <div className="text-3xl mb-2">🔒</div>
                    <p className="text-sm font-medium text-gray-900">Create Account</p>
                    <p className="text-xs text-gray-600">to unlock this game</p>
                  </div>
                </div>
              )}
              
              {/* Game Header */}
              <div className={`bg-gradient-to-r ${game.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8" />
                  <div className="text-right">
                    <div className="text-xs opacity-80">{game.players}</div>
                    <div className="text-sm font-medium">{game.duration}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-white/90 text-sm">{game.description}</p>
              </div>

              <CardContent className="p-6">
                {/* Difficulty Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    game.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {game.difficulty}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {game.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Play Button */}
                <Button 
                  className="w-full" 
                  disabled={isLocked}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLocked) handleGameSelect(game.id);
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isLocked ? 'Locked' : 'Play Game'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">Game Modes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{isGuest ? '0' : '1,247'}</div>
            <div className="text-sm text-gray-600">Games Played</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{isGuest ? '0' : '89%'}</div>
            <div className="text-sm text-gray-600">Best Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{isGuest ? '0' : '15'}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {!isGuest && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Game Activity</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { game: 'Brain Buster', subject: 'Mathematics', score: '85%', time: '2 hours ago' },
                { game: 'Time Challenge', subject: 'Sciences', score: '92%', time: '1 day ago' },
                { game: 'Flashcards', subject: 'Computer Studies', score: '78%', time: '2 days ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.game}</p>
                      <p className="text-sm text-gray-600">{activity.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{activity.score}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subject Selection Modal */}
      {showSubjectModal && (
        <SubjectSelectionModal
          gameId={pendingGameId}
          onSubjectSelect={handleSubjectSelect}
          onClose={() => {
            setShowSubjectModal(false);
            setPendingGameId('');
          }}
        />
      )}
    </div>
  );
}