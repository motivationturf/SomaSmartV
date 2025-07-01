import React, { useState, useEffect } from 'react';
import { Computer, Calculator, Microscope, BookOpen, ChevronRight, Clock, Trophy, Lock, UserPlus, Play, ArrowRight, Star, Target } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface SubjectCatalogProps {
  onNavigate: (view: string, subjectId?: string, topicId?: string) => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
  initialSubjectId?: string;
}

export function SubjectCatalog({ onNavigate, isGuest = false, onUpdateProgress, initialSubjectId }: SubjectCatalogProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(initialSubjectId || null);
  useEffect(() => {
    if (initialSubjectId) setSelectedSubject(initialSubjectId);
  }, [initialSubjectId]);

  const subjects = [
    {
      id: 'computer-studies',
      name: 'Computer Studies/ICT',
      icon: Computer,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      description: 'Master programming, digital literacy, and technology skills essential for the modern world.',
      progress: isGuest ? 0 : 65,
      totalLessons: 24,
      completedLessons: isGuest ? 0 : 16,
      estimatedTime: '8 weeks',
      difficulty: 'Intermediate',
      topics: [
        { 
          id: 'programming-basics', 
          name: 'Programming Basics', 
          lessons: 6, 
          guestAllowed: true,
          description: 'Learn fundamental programming concepts and Python basics',
          icon: '💻',
          difficulty: 'Beginner'
        },
        { 
          id: 'web-development', 
          name: 'Web Development', 
          lessons: 8, 
          guestAllowed: true,
          description: 'Build websites with HTML, CSS, and JavaScript',
          icon: '🌐',
          difficulty: 'Intermediate'
        },
        { 
          id: 'database-management', 
          name: 'Database Management', 
          lessons: 5, 
          guestAllowed: true,
          description: 'Design and manage databases with SQL',
          icon: '🗄️',
          difficulty: 'Advanced'
        },
        { 
          id: 'digital-citizenship', 
          name: 'Digital Citizenship', 
          lessons: 5, 
          guestAllowed: true,
          description: 'Online safety, ethics, and responsible technology use',
          icon: '🛡️',
          difficulty: 'Beginner'
        }
      ],
      nextLesson: 'Introduction to Python Programming',
      guestAvailable: true,
      guestLessons: 4,
      eagleAdvice: "🦅 Technology is the future! Start with Programming Basics - it's like learning a new language that computers understand!"
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: Calculator,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      description: 'Develop problem-solving skills through algebra, geometry, calculus, and statistical analysis.',
      progress: isGuest ? 0 : 78,
      totalLessons: 32,
      completedLessons: isGuest ? 0 : 25,
      estimatedTime: '12 weeks',
      difficulty: 'Advanced',
      topics: [
        { 
          id: 'basic-arithmetic', 
          name: 'Basic Arithmetic', 
          lessons: 6, 
          guestAllowed: true,
          description: 'Master addition, subtraction, multiplication, and division',
          icon: '🔢',
          difficulty: 'Beginner'
        },
        { 
          id: 'algebra', 
          name: 'Algebra', 
          lessons: 8, 
          guestAllowed: true,
          description: 'Solve equations and work with variables',
          icon: '📐',
          difficulty: 'Intermediate'
        },
        { 
          id: 'geometry', 
          name: 'Geometry', 
          lessons: 7, 
          guestAllowed: true,
          description: 'Explore shapes, angles, and spatial relationships',
          icon: '📏',
          difficulty: 'Intermediate'
        },
        { 
          id: 'trigonometry', 
          name: 'Trigonometry', 
          lessons: 6, 
          guestAllowed: true,
          description: 'Study triangles and circular functions',
          icon: '📊',
          difficulty: 'Advanced'
        },
        { 
          id: 'statistics', 
          name: 'Statistics', 
          lessons: 5, 
          guestAllowed: false,
          description: 'Analyze data and understand probability',
          icon: '📈',
          difficulty: 'Advanced'
        }
      ],
      nextLesson: 'Quadratic Equations and Functions',
      guestAvailable: true,
      guestLessons: 4,
      eagleAdvice: "🦅 Math is everywhere! Like an eagle calculating wind speed for flight, you'll learn to solve real-world problems!"
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: Microscope,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      description: 'Explore the natural world through physics, chemistry, biology, and hands-on experiments.',
      progress: isGuest ? 0 : 52,
      totalLessons: 36,
      completedLessons: isGuest ? 0 : 19,
      estimatedTime: '14 weeks',
      difficulty: 'Intermediate',
      topics: [
        { 
          id: 'scientific-method', 
          name: 'Scientific Method', 
          lessons: 4, 
          guestAllowed: true,
          description: 'Learn how scientists investigate the natural world',
          icon: '🔬',
          difficulty: 'Beginner'
        },
        { 
          id: 'physics', 
          name: 'Physics', 
          lessons: 12, 
          guestAllowed: true,
          description: 'Study matter, energy, and the fundamental forces',
          icon: '⚛️',
          difficulty: 'Advanced'
        },
        { 
          id: 'chemistry', 
          name: 'Chemistry', 
          lessons: 10, 
          guestAllowed: true,
          description: 'Explore atoms, molecules, and chemical reactions',
          icon: '🧪',
          difficulty: 'Intermediate'
        },
        { 
          id: 'biology', 
          name: 'Biology', 
          lessons: 8, 
          guestAllowed: true,
          description: 'Discover life processes and living organisms',
          icon: '🧬',
          difficulty: 'Intermediate'
        },
        { 
          id: 'environmental-science', 
          name: 'Environmental Science', 
          lessons: 2, 
          guestAllowed: false,
          description: 'Understand ecosystems and environmental challenges',
          icon: '🌍',
          difficulty: 'Beginner'
        }
      ],
      nextLesson: 'Chemical Reactions and Equations',
      guestAvailable: true,
      guestLessons: 4,
      eagleAdvice: "🦅 Science helps us understand nature! As an eagle, I appreciate how science explains flight, weather, and ecosystems!"
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: BookOpen,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      description: 'Study world religions, ethics, moral philosophy, and develop critical thinking skills.',
      progress: isGuest ? 0 : 43,
      totalLessons: 20,
      completedLessons: isGuest ? 0 : 9,
      estimatedTime: '6 weeks',
      difficulty: 'Beginner',
      topics: [
        { 
          id: 'world-religions', 
          name: 'World Religions', 
          lessons: 6, 
          guestAllowed: true,
          description: 'Explore major world religious traditions',
          icon: '🕊️',
          difficulty: 'Beginner'
        },
        { 
          id: 'ethics', 
          name: 'Ethics', 
          lessons: 5, 
          guestAllowed: true,
          description: 'Study moral principles and decision-making',
          icon: '⚖️',
          difficulty: 'Intermediate'
        },
        { 
          id: 'philosophy', 
          name: 'Philosophy', 
          lessons: 4, 
          guestAllowed: true,
          description: 'Examine fundamental questions about existence',
          icon: '🤔',
          difficulty: 'Advanced'
        },
        { 
          id: 'cultural-studies', 
          name: 'Cultural Studies', 
          lessons: 3, 
          guestAllowed: true,
          description: 'Understand diverse cultural practices and beliefs',
          icon: '🌍',
          difficulty: 'Intermediate'
        },
        { 
          id: 'critical-thinking', 
          name: 'Critical Thinking', 
          lessons: 2, 
          guestAllowed: false,
          description: 'Develop analytical and reasoning skills',
          icon: '🧠',
          difficulty: 'Advanced'
        }
      ],
      nextLesson: 'Comparative World Religions',
      guestAvailable: true,
      guestLessons: 4,
      eagleAdvice: "🦅 Wisdom comes from understanding different perspectives! Like eagles who see the world from great heights, explore diverse viewpoints!"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 border-green-200';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Advanced': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleUpgrade = () => {
    onNavigate('guest-to-account');
  };

  const handleSubjectSelect = (subjectId: string, available: boolean) => {
    if (!available) return;
    
    // Track subject exploration for guests
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        subjectsExplored: [subjectId],
        timeSpent: 2
      });
    }
    
    setSelectedSubject(subjectId);
  };

  const handleTopicClick = (subjectId: string, topicId: string, available: boolean) => {
    if (!available) {
      handleUpgrade();
      return;
    }
    
    // Track topic exploration for guests
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        subjectsExplored: [subjectId],
        timeSpent: 3
      });
    }
    
    // Navigate directly to the specific topic lesson
    onNavigate('lesson', subjectId, topicId);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  // If a subject is selected, show its topics
  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    const Icon = subject.icon;
    const isLocked = isGuest && !subject.guestAvailable;

    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBackToSubjects}
          className="mb-6"
        >
          <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
          Back to All Subjects
        </Button>

        {/* Subject Header */}
        <div className={`bg-gradient-to-r ${subject.gradient} rounded-2xl p-8 text-white mb-8`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
                <p className="text-white/90 text-lg">{subject.description}</p>
              </div>
            </div>
            
            {!isGuest && (
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">{subject.progress}%</div>
                <div className="text-white/80">Complete</div>
              </div>
            )}
          </div>

          {/* Progress Bar for logged-in users */}
          {!isGuest && (
            <div className="mt-6">
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Eagle's Advice */}
        <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="text-5xl">🦅</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-amber-900 mb-3">Chisomo's Learning Guidance</h3>
                <p className="text-amber-800 text-lg leading-relaxed">{subject.eagleAdvice}</p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-amber-700">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Estimated: {subject.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4" />
                    <span>{subject.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{subject.difficulty} level</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topics Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choose Your Learning Path
            {isGuest && <span className="text-lg text-orange-600 ml-3">(4 Topics Available)</span>}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.topics.map((topic, index) => {
              const isTopicLocked = isGuest && !topic.guestAllowed;
              
              return (
                <Card
                  key={topic.id}
                  className={`transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden ${
                    isTopicLocked 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:shadow-xl hover:-translate-y-2 cursor-pointer'
                  }`}
                  onClick={() => !isTopicLocked && handleTopicClick(subject.id, topic.id, !isTopicLocked)}
                >
                  {isTopicLocked && (
                    <div className="absolute inset-0 bg-gray-50/90 z-10 flex items-center justify-center">
                      <div className="text-center bg-white p-4 rounded-lg shadow-lg border">
                        <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Create Account</p>
                        <p className="text-xs text-gray-600">to unlock</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Topic Header */}
                  <div className={`bg-gradient-to-r ${subject.gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{topic.icon}</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{index + 1}</div>
                        <div className="text-xs opacity-80">Topic</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                    <p className="text-white/90 text-sm">{topic.description}</p>
                  </div>

                  <CardContent className="p-6">
                    {/* Topic Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{topic.lessons}</div>
                        <div className="text-xs text-gray-600">Lessons</div>
                      </div>
                      <div className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Guest Access Indicator */}
                    {isGuest && topic.guestAllowed && (
                      <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg text-center">
                        <span className="text-green-700 text-sm font-medium">✨ Try Free Sample</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button 
                      className="w-full"
                      disabled={isTopicLocked}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isTopicLocked) handleTopicClick(subject.id, topic.id, true);
                      }}
                    >
                      {isTopicLocked ? (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          {isGuest ? 'Try Sample' : 'Start Learning'}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Guest Upgrade Prompt */}
        {isGuest && (
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">🦅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Soar Higher?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Chisomo the Eagle believes you're ready for the full learning experience! 
                Create an account to unlock all topics, save your progress, and earn achievements.
              </p>
              <Button onClick={handleUpgrade} size="lg" className="px-8">
                <UserPlus className="h-5 w-5 mr-2" />
                Create Free Account
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Main subjects view
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Eagle Welcome */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦅</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Learning Journey!</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm Chisomo, your learning companion! Choose a subject below to explore topics designed specifically for Zambian students.
          </p>
        </div>
        
        {isGuest && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🦅</div>
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">Chisomo's Guest Mode Tips</h3>
                  <p className="text-amber-800">
                    As a guest, you can explore 4 sample topics per subject. Create an account to unlock the full curriculum and track your progress like a soaring eagle!
                  </p>
                </div>
              </div>
              <Button
                onClick={handleUpgrade}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Join the Flight
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Subjects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const isLocked = isGuest && !subject.guestAvailable;
          
          return (
            <Card 
              key={subject.id} 
              className={`overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 relative ${
                isLocked ? 'opacity-75' : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
              }`}
              onClick={() => handleSubjectSelect(subject.id, !isLocked)}
            >
              {isLocked && (
                <div className="absolute inset-0 bg-gray-50/90 z-10 flex items-center justify-center">
                  <div className="text-center bg-white p-6 rounded-lg shadow-lg border">
                    <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Create Account to Unlock</h3>
                    <p className="text-sm text-gray-600 mb-4">Join Chisomo on this learning adventure!</p>
                    <Button onClick={handleUpgrade} size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up Free
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Subject Header with gradient */}
              <div className={`bg-gradient-to-r ${subject.gradient} p-8 text-white relative overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <Icon className="h-12 w-12 text-white" />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)} text-gray-700 bg-white/90`}>
                      {subject.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{subject.name}</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">{subject.description}</p>
                  
                  {/* Progress for logged-in users */}
                  {!isGuest && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Your Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all duration-300"
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <CardContent className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="h-5 w-5 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Lessons</p>
                    <p className="text-xl font-bold text-gray-900">
                      {isGuest 
                        ? `${subject.guestLessons}/${subject.totalLessons}` 
                        : `${subject.completedLessons}/${subject.totalLessons}`
                      }
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="text-xl font-bold text-gray-900">{subject.estimatedTime}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="h-5 w-5 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Topics</p>
                    <p className="text-xl font-bold text-gray-900">{subject.topics.length}</p>
                  </div>
                </div>

                {/* Next Lesson Preview */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        {isGuest && subject.guestAvailable ? 'Try Sample Lesson' : 'Continue With'}
                      </p>
                      <p className="text-sm text-blue-700">{subject.nextLesson}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full"
                  disabled={isLocked}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLocked) handleSubjectSelect(subject.id, true);
                  }}
                >
                  {isGuest && subject.guestAvailable 
                    ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Explore Topics
                      </>
                    ) : isGuest 
                      ? (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </>
                      ) : (
                        <>
                          <ChevronRight className="h-4 w-4 mr-2" />
                          View Topics
                        </>
                      )
                  }
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Eagle's Motivational Message */}
      <Card className="mt-12 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white overflow-hidden">
        <CardContent className="p-8 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">🦅</div>
            <h3 className="text-2xl font-bold mb-4">Chisomo's Learning Philosophy</h3>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              "Like an eagle that soars high above the mountains, learning takes you to new heights! 
              Each subject is a different wind current that will help you fly further. 
              Choose your path, spread your wings, and let's explore the world of knowledge together!"
            </p>
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>Curriculum-Aligned</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>Gamified Learning</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>Zambian Context</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}