import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  Zap, 
  Star,
  ChevronRight,
  Play,
  UserPlus,
  X,
  CheckCircle,
  Clock,
  Award,
  Gamepad2,
  Sparkles,
  Rocket,
  Brain,
  Globe,
  Heart
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { ChisomoEagle } from '../mascot/ChisomoEagle';
import { Carousel } from './Carousel';
import TestimonialCarousel from './TestimonialCarousel';

interface LandingPageProps {
  onGetStarted: () => void;
  onGuestMode: () => void;
  onLogin: () => void;
  onExploreSubject: (subjectId: string) => void;
  onNavigate: (view: string) => void;
  onExploreArcade: () => void;
}

export function LandingPage({ 
  onGetStarted, 
  onGuestMode, 
  onLogin, 
  onExploreSubject, 
  onNavigate,
  onExploreArcade 
}: LandingPageProps) {
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showArcadeModal, setShowArcadeModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const subjects = [
    {
      id: 'computer-studies',
      name: 'Computer Studies/ICT',
      icon: '💻',
      description: 'Programming, web development, and digital literacy',
      color: 'from-green-600 via-emerald-500 to-amber-500'
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: '📊',
      description: 'Algebra, geometry, calculus, and problem-solving',
      color: 'from-amber-500 via-orange-500 to-red-500'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: '🔬',
      description: 'Physics, chemistry, biology, and experiments',
      color: 'from-red-600 via-orange-500 to-yellow-500'
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: '📚',
      description: 'World religions, ethics, and moral philosophy',
      color: 'from-emerald-600 via-green-500 to-teal-500'
    }
  ];

  const features = [
    {
      icon: Gamepad2,
      title: 'Interactive Games',
      description: 'Learn through engaging educational games and challenges',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: Trophy,
      title: 'Achievements & Badges',
      description: 'Earn rewards and track your progress with gamification',
      color: 'text-amber-600',
      bg: 'bg-amber-100'
    },
    {
      icon: Users,
      title: 'Social Learning',
      description: 'Compete with friends and learn together in challenges',
      color: 'text-red-600',
      bg: 'bg-red-100'
    },
    {
      icon: Target,
      title: 'Curriculum Aligned',
      description: 'Content designed specifically for Zambian high school students',
      color: 'text-emerald-600',
      bg: 'bg-emerald-100'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '500+', label: 'Interactive Lessons' },
    { number: '50+', label: 'Learning Games' },
    { number: '95%', label: 'Student Satisfaction' }
  ];

  const handleArcadeAccess = (accessType: 'guest' | 'signup' | 'login') => {
    setShowArcadeModal(false);
    
    switch (accessType) {
      case 'guest':
        onExploreArcade();
        break;
      case 'signup':
        onGetStarted();
        break;
      case 'login':
        onLogin();
        break;
    }
  };

  const handleExploreArcadeClick = () => {
    setShowArcadeModal(true);
  };

  return (
    <div className="min-h-screen parallax-bg relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-icon absolute top-20 left-10 text-6xl opacity-20" style={{ color: 'var(--zambian-green)' }}>📚</div>
        <div className="floating-icon absolute top-40 right-20 text-5xl opacity-20" style={{ color: 'var(--sunset-orange)' }}>🎯</div>
        <div className="floating-icon absolute bottom-40 left-1/4 text-4xl opacity-20" style={{ color: 'var(--zambian-red)' }}>🏆</div>
        <div className="floating-icon absolute bottom-20 right-1/3 text-7xl opacity-20" style={{ color: 'var(--emerald-light)' }}>⚡</div>
        <div className="floating-icon absolute top-1/2 left-10 text-5xl opacity-20" style={{ color: 'var(--copper-light)' }}>🌟</div>
      </div>

      {/* Compact Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Compact Left Column - Text Content */}
            <div className={`space-y-6 ${isLoaded ? 'animate-slide-from-left' : 'opacity-0'}`}>
              {/* Compact Logo */}
              <div className="flex items-center mb-4">
                <div className="header-zambian w-16 h-16 rounded-xl flex items-center justify-center mr-3 shadow-xl animate-glow-pulse">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold hero-title">
                    SomaSmart EduHub
                  </h1>
                  <p className="text-amber-700 text-sm font-medium">Zambia's Premier Learning Platform</p>
                </div>
              </div>

              {/* Compact Headline */}
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                  <span className="block hero-title">Learn. Play. Soar.</span>
                </h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                The first gamified learning platform designed specifically for Zambian high school students. 
                Master your curriculum through interactive games and challenges with 
                <span className="font-bold text-green-600"> Chisomo the Eagle</span> as your guide.
              </p>

              {/* Compact CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onGetStarted}
                  variant="zambian-primary"
                  size="lg"
                  className="btn-magnetic px-8 py-3 text-base font-bold rounded-xl shadow-xl"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Start Your Journey
                </Button>
                
                <Button
                  onClick={handleExploreArcadeClick}
                  variant="zambian-secondary"
                  size="lg"
                  className="btn-magnetic px-8 py-3 text-base font-bold rounded-xl shadow-xl"
                >
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Game Arcade
                </Button>
              </div>

              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: CheckCircle, text: "100% Free", color: "text-green-600" },
                  { icon: Heart, text: "Made for Zambians", color: "text-red-500" },
                  { icon: Globe, text: "Curriculum Aligned", color: "text-blue-600" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1 shadow-md hover-lift">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-sm font-medium text-gray-800">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Inline Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.slice(0,3).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl md:text-2xl font-bold hero-title">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content-Rich Right Column */}
            <div className={`space-y-6 ${isLoaded ? 'animate-slide-from-right' : 'opacity-0'}`}>
              {/* Interactive Subject Grid */}
              <div className="grid grid-cols-2 gap-3">
                {subjects.map((subject, index) => (
                  <Card 
                    key={subject.id}
                    className="card-3d hover-lift cursor-pointer p-4"
                    onClick={() => onExploreSubject(subject.id)}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl shadow-md`}>
                        {subject.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 text-sm">{subject.name}</h3>
                      <p className="text-xs text-gray-600 leading-tight">{subject.description}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Eagle Mascot with Quick Actions */}
              <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <div className="flex items-center space-x-3">
                  <ChisomoEagle size="md" mood="happy" className="flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Meet Chisomo!</h4>
                    <p className="text-sm text-gray-600 mb-2">Your AI learning companion</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onNavigate('subjects')} className="text-xs">
                        Start Learning
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleExploreArcadeClick} className="text-xs">
                        Play Games
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Features Preview */}
              <div className="grid grid-cols-2 gap-3">
                {features.slice(0,4).map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 hover-lift">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 ${feature.bg} rounded-lg flex items-center justify-center`}>
                          <Icon className={`h-4 w-4 ${feature.color}`} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 text-xs">{feature.title}</h5>
                          <p className="text-xs text-gray-600">{feature.description.slice(0, 30)}...</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Compact Features & Stats Combined Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Inline Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="hover-lift">
                <div className="text-2xl md:text-3xl font-bold hero-title">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Compact Features Grid */}
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold hero-title mb-2">
              Why Students Love SomaSmart EduHub
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engaging, social, and effective learning for modern Zambian students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-3d hover-lift">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">{feature.title}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compact Multi-Section Layout */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Two Column Layout: Carousel + Subjects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Carousel Column */}
            <div className="bg-gradient-to-br from-green-50/50 to-blue-50/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold hero-title mb-4 text-center">
                Interactive Learning Journey
              </h3>
              <Carousel onExploreArcade={onExploreArcade} />
            </div>

            {/* Subjects Quick Access */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold hero-title mb-4 text-center">
                Master All Your Subjects
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {subjects.map((subject, index) => (
                  <Card 
                    key={subject.id} 
                    className="card-3d hover-lift cursor-pointer"
                    onClick={() => onExploreSubject(subject.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-xl flex items-center justify-center mx-auto mb-2 text-xl shadow-md`}>
                        {subject.icon}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">{subject.name}</h4>
                      <p className="text-gray-600 text-xs mb-2 leading-tight">{subject.description}</p>
                      <Button variant="outline" size="sm" className="w-full text-xs py-1">
                        Explore
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Achievement Showcase */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold hero-title mb-2">Student Success Stories</h3>
              <p className="text-gray-600">See what students are achieving with SomaSmart</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Trophy, label: "Top Performers", count: "2,500+" },
                { icon: Target, label: "Goals Achieved", count: "15,000+" },
                { icon: Award, label: "Badges Earned", count: "50,000+" },
                { icon: Users, label: "Study Groups", count: "1,200+" }
              ].map((item, index) => (
                <div key={index} className="bg-white/70 rounded-xl p-4 text-center hover-lift">
                  <item.icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="font-bold text-lg hero-title">{item.count}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compact CTA Section with Additional Content */}
      <section className="py-12 header-zambian">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Main CTA */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                Ready to Transform Your Learning Experience?
              </h3>
              <p className="text-white/90 mb-6 drop-shadow">
                Join thousands of Zambian students who are already excelling with SomaSmart EduHub.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="btn-magnetic bg-white text-green-600 hover:bg-gray-100 px-6 py-3 font-bold"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Get Started Free
                </Button>
                <Button
                  onClick={() => setShowTestimonials(true)}
                  variant="outline"
                  size="lg"
                  className="btn-magnetic border-white text-white hover:bg-white hover:text-green-600 px-6 py-3 font-bold"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Student Stories
                </Button>
              </div>
            </div>

            {/* Quick Access Menu */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4 text-center">Quick Access</h4>
              <div className="space-y-3">
                <Button 
                  onClick={() => onNavigate('subjects')} 
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/20 justify-start"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Subjects
                </Button>
                <Button 
                  onClick={handleExploreArcadeClick} 
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/20 justify-start"
                >
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Play Games
                </Button>
                <Button 
                  onClick={() => onNavigate('challenges')} 
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/20 justify-start"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Join Challenges
                </Button>
                <Button 
                  onClick={onLogin} 
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/20 justify-start"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Modal */}
      {showTestimonials && (
        <TestimonialCarousel onClose={() => setShowTestimonials(false)} />
      )}

      {/* Arcade Access Modal */}
      {showArcadeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowArcadeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="header-zambian w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Access Game Arcade
              </h3>
              <p className="text-gray-600">
                Choose how you'd like to access our learning games
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => handleArcadeAccess('signup')}
                className="w-full py-3 btn-magnetic"
                variant="zambian-primary"
              >
                <Star className="h-4 w-4 mr-2" />
                Sign Up & Play (Recommended)
              </Button>
              
              <Button
                onClick={() => handleArcadeAccess('login')}
                variant="outline"
                className="w-full py-3"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign In to Continue
              </Button>
              
              <Button
                onClick={() => handleArcadeAccess('guest')}
                variant="ghost"
                className="w-full py-3 text-gray-600"
              >
                <Users className="h-4 w-4 mr-2" />
                Try as Guest (Limited Access)
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Guest mode includes 3 sample games. Create an account for full access!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}