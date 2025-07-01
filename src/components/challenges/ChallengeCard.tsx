import React from 'react';
import { 
  Target, 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  Star,
  Zap,
  Award,
  Lock,
  UserPlus,
  CheckCircle,
  Play
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface Challenge {
  id: number;
  title: string;
  subject: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  timeLeft?: string;
  startsIn?: string;
  completedOn?: string;
  points: number;
  progress?: number;
  rank?: number;
  type: 'weekly' | 'quiz' | 'project' | 'debate' | 'coding' | 'tournament';
  guestAllowed: boolean;
  status: 'active' | 'upcoming' | 'completed';
  requirements?: string[];
  rewards?: string[];
}

interface ChallengeCardProps {
  challenge: Challenge;
  isGuest?: boolean;
  onJoin?: (challengeId: number) => void;
  onContinue?: (challengeId: number) => void;
  onViewResults?: (challengeId: number) => void;
  onUpgrade?: () => void;
}

export function ChallengeCard({ 
  challenge, 
  isGuest = false, 
  onJoin, 
  onContinue, 
  onViewResults,
  onUpgrade 
}: ChallengeCardProps) {
  const isLocked = isGuest && !challenge.guestAllowed;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weekly': return Target;
      case 'quiz': return Trophy;
      case 'project': return Zap;
      case 'debate': return Users;
      case 'coding': return Award;
      case 'tournament': return Star;
      default: return Target;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weekly': return 'bg-blue-100 text-blue-600';
      case 'quiz': return 'bg-purple-100 text-purple-600';
      case 'project': return 'bg-green-100 text-green-600';
      case 'debate': return 'bg-orange-100 text-orange-600';
      case 'coding': return 'bg-indigo-100 text-indigo-600';
      case 'tournament': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const TypeIcon = getTypeIcon(challenge.type);

  return (
    <Card className={`transition-all duration-300 relative overflow-hidden ${
      isLocked ? 'opacity-75' : 'hover:shadow-lg hover:-translate-y-1'
    }`}>
      {isLocked && (
        <div className="absolute inset-0 bg-gray-50/90 z-10 flex items-center justify-center rounded-lg">
          <div className="text-center bg-white p-6 rounded-lg shadow-lg border max-w-xs">
            <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Create Account</h3>
            <p className="text-sm text-gray-600 mb-4">Join challenges and compete with classmates</p>
            <Button onClick={onUpgrade} size="sm" className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up Free
            </Button>
          </div>
        </div>
      )}
      
      <CardContent className="p-0">
        {/* Header with gradient based on type */}
        <div className={`p-4 ${getTypeColor(challenge.type)} bg-gradient-to-r`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <TypeIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                <p className="text-sm opacity-80">{challenge.subject}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
              <span className="text-xs font-medium capitalize bg-white/20 px-2 py-1 rounded-full">
                {challenge.type}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{challenge.description}</p>

          {/* Challenge Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{challenge.participants} participants</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Trophy className="h-4 w-4" />
              <span>{challenge.points} points</span>
            </div>
          </div>

          {/* Progress Bar for Active Challenges */}
          {challenge.status === 'active' && challenge.progress !== undefined && !isGuest && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Your Progress</span>
                <span className="text-gray-600">{challenge.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Requirements for Upcoming Challenges */}
          {challenge.status === 'upcoming' && challenge.requirements && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Requirements:</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                {challenge.requirements.map((req, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rewards */}
          {challenge.rewards && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">Rewards:</h4>
              <div className="flex flex-wrap gap-1">
                {challenge.rewards.map((reward, index) => (
                  <span key={index} className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                    {reward}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {challenge.status === 'active' && (
              <>
                <div className="flex items-center text-sm text-orange-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="font-medium">{challenge.timeLeft} left</span>
                </div>
                <Button 
                  size="sm" 
                  disabled={isLocked}
                  onClick={() => onContinue?.(challenge.id)}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  {isGuest && challenge.guestAllowed ? (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Try Sample
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </>
            )}
            
            {challenge.status === 'upcoming' && (
              <>
                <div className="flex items-center text-sm text-blue-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="font-medium">Starts in {challenge.startsIn}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={isLocked}
                  onClick={() => onJoin?.(challenge.id)}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  {isLocked ? 'Locked' : 'Join Challenge'}
                </Button>
              </>
            )}
            
            {challenge.status === 'completed' && (
              <>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {!isGuest && challenge.rank && (
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">Rank #{challenge.rank}</span>
                    </div>
                  )}
                  <span>{challenge.completedOn}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={isLocked}
                  onClick={() => onViewResults?.(challenge.id)}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  View Results
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}