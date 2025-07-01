import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  BookOpen, 
  Download, 
  CheckCircle,
  Clock,
  Trophy,
  ArrowLeft,
  ArrowRight,
  Lock,
  UserPlus,
  Brain,
  Code,
  Microscope,
  Calculator
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { InteractiveLessonContent } from './InteractiveLessonContent';

interface LessonPageProps {
  subjectId: string;
  topicId?: string;
  onNavigate: (view: string) => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function LessonPage({ subjectId, topicId, onNavigate, isGuest = false, onUpdateProgress }: LessonPageProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  // Enhanced lesson data with topic-specific lessons
  const lessons = {
    'computer-studies': {
      'programming-basics': {
        id: 1,
        title: 'Programming Fundamentals',
        subject: 'Computer Studies/ICT',
        duration: '45 minutes',
        difficulty: 'Beginner',
        points: 100,
        sections: [
          {
            id: 0,
            title: 'What is Programming?',
            type: 'interactive',
            duration: '12 minutes',
            content: 'Learn programming fundamentals through interactive examples and hands-on practice.',
            lessonId: 'programming-basics',
            completed: false,
            guestAllowed: true
          },
          {
            id: 1,
            title: 'Programming Concepts Video',
            type: 'video',
            duration: '8 minutes',
            content: 'Watch an introduction to programming concepts and real-world applications.',
            videoUrl: 'https://example.com/video1.mp4',
            completed: false,
            guestAllowed: true
          },
          {
            id: 2,
            title: 'Variables and Data Types',
            type: 'interactive',
            duration: '15 minutes',
            content: 'Interactive lesson on variables, data types, and basic programming concepts.',
            lessonId: 'variables-datatypes',
            completed: false,
            guestAllowed: false
          },
          {
            id: 3,
            title: 'Programming Quiz',
            type: 'quiz',
            duration: '10 minutes',
            content: 'Test your understanding with interactive programming questions.',
            completed: false,
            guestAllowed: false
          }
        ]
      },
      'web-development': {
        id: 2,
        title: 'Web Development Basics',
        subject: 'Computer Studies/ICT',
        duration: '60 minutes',
        difficulty: 'Intermediate',
        points: 150,
        sections: [
          {
            id: 0,
            title: 'Introduction to HTML',
            type: 'interactive',
            duration: '20 minutes',
            content: 'Learn HTML structure and basic tags for web development.',
            lessonId: 'html-basics',
            completed: false,
            guestAllowed: true
          },
          {
            id: 1,
            title: 'CSS Styling',
            type: 'interactive',
            duration: '20 minutes',
            content: 'Style your web pages with CSS properties and selectors.',
            lessonId: 'css-basics',
            completed: false,
            guestAllowed: true
          },
          {
            id: 2,
            title: 'JavaScript Fundamentals',
            type: 'interactive',
            duration: '20 minutes',
            content: 'Add interactivity to your websites with JavaScript.',
            lessonId: 'javascript-basics',
            completed: false,
            guestAllowed: false
          }
        ]
      },
      'database-management': {
        id: 3,
        title: 'Database Management Fundamentals',
        subject: 'Computer Studies/ICT',
        duration: '50 minutes',
        difficulty: 'Advanced',
        points: 200,
        sections: [
          {
            id: 0,
            title: 'Introduction to Databases',
            type: 'interactive',
            duration: '15 minutes',
            content: 'Learn what databases are and why they are important.',
            lessonId: 'database-intro',
            completed: false,
            guestAllowed: false
          },
          {
            id: 1,
            title: 'SQL Basics',
            type: 'interactive',
            duration: '25 minutes',
            content: 'Learn to query databases using SQL commands.',
            lessonId: 'sql-basics',
            completed: false,
            guestAllowed: false
          },
          {
            id: 2,
            title: 'Database Design',
            type: 'interactive',
            duration: '10 minutes',
            content: 'Design efficient database structures.',
            lessonId: 'database-design',
            completed: false,
            guestAllowed: false
          }
        ]
      }
    },
    'mathematics': {
      'basic-arithmetic': {
        id: 4,
        title: 'Basic Arithmetic Operations',
        subject: 'Mathematics',
        duration: '50 minutes',
        difficulty: 'Beginner',
        points: 100,
        sections: [
          {
            id: 0,
            title: 'Welcome to Arithmetic!',
            type: 'interactive',
            duration: '15 minutes',
            content: 'Learn addition, subtraction, multiplication, and division through interactive examples.',
            lessonId: 'basic-arithmetic',
            completed: false,
            guestAllowed: true
          },
          {
            id: 1,
            title: 'Arithmetic in Daily Life',
            type: 'video',
            duration: '10 minutes',
            content: 'See how arithmetic is used in everyday Zambian contexts.',
            videoUrl: 'https://example.com/math-video.mp4',
            completed: false,
            guestAllowed: true
          },
          {
            id: 2,
            title: 'Practice Problems',
            type: 'interactive',
            duration: '20 minutes',
            content: 'Solve real-world arithmetic problems with step-by-step guidance.',
            lessonId: 'arithmetic-practice',
            completed: false,
            guestAllowed: false
          },
          {
            id: 3,
            title: 'Arithmetic Assessment',
            type: 'quiz',
            duration: '15 minutes',
            content: 'Test your arithmetic skills with varied problem types.',
            completed: false,
            guestAllowed: false
          }
        ]
      },
      'algebra': {
        id: 5,
        title: 'Introduction to Algebra',
        subject: 'Mathematics',
        duration: '55 minutes',
        difficulty: 'Intermediate',
        points: 120,
        sections: [
          {
            id: 0,
            title: 'What is Algebra?',
            type: 'interactive',
            duration: '15 minutes',
            content: 'Discover the world of variables and algebraic expressions.',
            lessonId: 'algebra-intro',
            completed: false,
            guestAllowed: true
          },
          {
            id: 1,
            title: 'Solving Linear Equations',
            type: 'interactive',
            duration: '25 minutes',
            content: 'Master the art of solving equations with one variable.',
            lessonId: 'linear-equations',
            completed: false,
            guestAllowed: true
          },
          {
            id: 2,
            title: 'Graphing Linear Functions',
            type: 'interactive',
            duration: '15 minutes',
            content: 'Visualize algebraic relationships through graphs.',
            lessonId: 'linear-graphs',
            completed: false,
            guestAllowed: false
          }
        ]
      }
    },
    'sciences': {
      'scientific-method': {
        id: 6,
        title: 'The Scientific Method',
        subject: 'Sciences',
        duration: '40 minutes',
        difficulty: 'Beginner',
        points: 100,
        sections: [
          {
            id: 0,
            title: 'Introduction to Scientific Method',
            type: 'interactive',
            duration: '15 minutes',
            content: 'Learn the steps of scientific inquiry through interactive examples.',
            lessonId: 'scientific-method',
            completed: false,
            guestAllowed: true
          },
          {
            id: 1,
            title: 'Famous Scientific Discoveries',
            type: 'video',
            duration: '8 minutes',
            content: 'Watch how great scientists used the scientific method.',
            videoUrl: 'https://example.com/science-video.mp4',
            completed: false,
            guestAllowed: true
          },
          {
            id: 2,
            title: 'Virtual Laboratory',
            type: 'interactive',
            duration: '12 minutes',
            content: 'Conduct virtual experiments using the scientific method.',
            lessonId: 'virtual-lab',
            completed: false,
            guestAllowed: false
          },
          {
            id: 3,
            title: 'Scientific Method Quiz',
            type: 'quiz',
            duration: '10 minutes',
            content: 'Test your understanding of scientific inquiry.',
            completed: false,
            guestAllowed: false
          }
        ]
      }
    },
    'religious-education': {
      'world-religions': {
        id: 7,
        title: 'Understanding World Religions',
        subject: 'Religious Education',
        duration: '35 minutes',
        difficulty: 'Beginner',
        points: 100,
        sections: [
          {
            id: 0,
            title: 'What is Religion?',
            type: 'interactive',
            duration: '12 minutes',
            content: 'Explore the role of religion in human society and culture.',
            lessonId: 'world-religions',
            completed: false,
            guestAllowed: true
          },
          {
            id: 1,
            title: 'Religious Traditions Video',
            type: 'video',
            duration: '10 minutes',
            content: 'Visual journey through major world religions.',
            videoUrl: 'https://example.com/religion-video.mp4',
            completed: false,
            guestAllowed: true
          },
          {
            id: 2,
            title: 'Comparative Religion Study',
            type: 'interactive',
            duration: '15 minutes',
            content: 'Compare beliefs, practices, and values across religions.',
            lessonId: 'comparative-religion',
            completed: false,
            guestAllowed: false
          },
          {
            id: 3,
            title: 'Religion and Ethics Quiz',
            type: 'quiz',
            duration: '8 minutes',
            content: 'Assess your understanding of religious concepts.',
            completed: false,
            guestAllowed: false
          }
        ]
      }
    }
  };

  // Get the appropriate lesson based on topicId or default to first lesson in subject
  const getLesson = () => {
    const subjectLessons = lessons[subjectId as keyof typeof lessons];
    if (!subjectLessons) return lessons['computer-studies']['programming-basics'];
    
    if (topicId && subjectLessons[topicId as keyof typeof subjectLessons]) {
      return subjectLessons[topicId as keyof typeof subjectLessons];
    }
    
    // Return first lesson in subject if no specific topic
    const firstTopicKey = Object.keys(subjectLessons)[0];
    return subjectLessons[firstTopicKey as keyof typeof subjectLessons];
  };

  const lesson = getLesson();
  const currentSectionData = lesson.sections[currentSection];
  const isCurrentSectionLocked = isGuest && !currentSectionData.guestAllowed;

  const markSectionComplete = (sectionId: number) => {
    if (!completedSections.includes(sectionId) && !isGuest) {
      setCompletedSections([...completedSections, sectionId]);
    }
    if (isGuest && onUpdateProgress) {
      onUpdateProgress({
        lessonsViewed: [lesson.id.toString()],
        timeSpent: 5
      });
    }
  };

  const nextSection = () => {
    if (currentSection < lesson.sections.length - 1) {
      if (!isGuest) markSectionComplete(currentSection);
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'interactive': return Brain;
      case 'coding': return Code;
      case 'quiz': return CheckCircle;
      default: return BookOpen;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-600 bg-red-100';
      case 'interactive': return 'text-blue-600 bg-blue-100';
      case 'coding': return 'text-green-600 bg-green-100';
      case 'quiz': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleUpgrade = () => {
    onNavigate('register');
  };

  const renderSectionContent = () => {
    if (isCurrentSectionLocked) {
      return (
        <div className="text-center py-12">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Account to Continue</h3>
            <p className="text-gray-600 mb-4">
              Unlock all lesson content, save your progress, and earn points.
            </p>
            <Button onClick={handleUpgrade}>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Free Account
            </Button>
          </div>
        </div>
      );
    }

    switch (currentSectionData.type) {
      case 'interactive':
        return (
          <InteractiveLessonContent
            subject={subjectId}
            lessonId={currentSectionData.lessonId || topicId || 'default'}
            sectionData={currentSectionData}
            onComplete={() => markSectionComplete(currentSection)}
            isGuest={isGuest}
          />
        );

      case 'video':
        return (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg">Video Player</p>
                <p className="text-sm opacity-80">
                  {isGuest ? 'Sample lesson content' : 'Click to play lesson video'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-8"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button variant="outline" size="sm">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            {isGuest && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  This is a sample lesson. Create an account to access the full video content and track your progress.
                </p>
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Knowledge Check</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Sample Question: What is the main purpose of this lesson?</h4>
                  <div className="space-y-2">
                    {['To introduce basic concepts', 'To provide practice exercises', 'To test understanding', 'All of the above'].map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="question1" className="text-purple-600" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <Button className="mt-6" onClick={() => markSectionComplete(currentSection)}>
                Submit Answer
              </Button>
            </div>
          </div>
        );

      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{lesson.subject}</span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {lesson.duration}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                {isGuest ? '0' : lesson.points} points
              </span>
              {isGuest && (
                <>
                  <span>•</span>
                  <span className="text-orange-600 font-medium">Guest Mode</span>
                </>
              )}
              {topicId && (
                <>
                  <span>•</span>
                  <span className="text-blue-600 font-medium">Topic: {topicId.replace('-', ' ')}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Progress</div>
            <div className="text-2xl font-bold text-green-600">
              {isGuest 
                ? '0%' 
                : Math.round((completedSections.length / lesson.sections.length) * 100) + '%'
              }
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Lesson Content */}
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {React.createElement(getSectionIcon(currentSectionData.type), { 
                    className: "h-5 w-5 text-blue-600" 
                  })}
                  <h3 className="text-lg font-semibold">{currentSectionData.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSectionColor(currentSectionData.type)}`}>
                    {currentSectionData.type}
                  </span>
                  {isCurrentSectionLocked && (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <span className="text-sm text-gray-600">{currentSectionData.duration}</span>
              </div>
            </CardHeader>
            <CardContent>
              {renderSectionContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <span className="text-sm text-gray-600">
              {currentSection + 1} of {lesson.sections.length}
            </span>
            
            <Button
              onClick={nextSection}
              disabled={currentSection === lesson.sections.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lesson Outline */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Lesson Outline</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lesson.sections.map((section, index) => {
                  const SectionIcon = getSectionIcon(section.type);
                  const isCompleted = completedSections.includes(index);
                  const isCurrent = index === currentSection;
                  const isLocked = isGuest && !section.guestAllowed;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => !isLocked && setCurrentSection(index)}
                      disabled={isLocked}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors relative ${
                        isCurrent 
                          ? 'bg-blue-50 border border-blue-200' 
                          : isLocked
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-1 rounded ${
                        isCompleted 
                          ? 'bg-green-100 text-green-600' 
                          : isCurrent 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <SectionIcon className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          isCurrent ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {section.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-600">{section.duration}</p>
                          <span className={`px-1.5 py-0.5 rounded text-xs ${getSectionColor(section.type)}`}>
                            {section.type}
                          </span>
                        </div>
                      </div>
                      {isLocked && (
                        <Lock className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Resources</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Lesson Summary', type: 'PDF', size: '1.2 MB', guestAllowed: true },
                  { name: 'Practice Exercises', type: 'PDF', size: '2.1 MB', guestAllowed: false },
                  { name: 'Additional Reading', type: 'PDF', size: '3.4 MB', guestAllowed: false }
                ].map((resource, index) => {
                  const isLocked = isGuest && !resource.guestAllowed;
                  return (
                    <div key={index} className={`flex items-center justify-between p-3 border border-gray-200 rounded-lg relative ${
                      isLocked ? 'opacity-50' : ''
                    }`}>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{resource.name}</p>
                        <p className="text-xs text-gray-600">{resource.type} • {resource.size}</p>
                      </div>
                      <Button size="sm" variant="outline" disabled={isLocked}>
                        {isLocked ? <Lock className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      </Button>
                    </div>
                  );
                })}
              </div>
              
              {isGuest && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Create an account to download all lesson resources and materials.
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