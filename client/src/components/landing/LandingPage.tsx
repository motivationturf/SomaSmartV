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
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      color: 'from-amber-500 via-orange-500 to-yellow-500'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: '🔬',
      description: 'Physics, chemistry, biology, and experiments',
      color: 'from-emerald-600 via-green-500 to-teal-500'
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: '📚',
      description: 'World religions, ethics, and moral philosophy',
      color: 'from-orange-500 via-amber-500 to-yellow-500'
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="header-zambian w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold hero-title">SomaSmart EduHub</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => onNavigate('features')} 
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => onNavigate('subjects')} 
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Subjects
              </button>
              <button 
                onClick={() => setShowTestimonials(true)} 
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Reviews
              </button>
              <button 
                onClick={() => onNavigate('pricing')} 
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Pricing
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={onLogin}
                variant="ghost"
                className="text-gray-600 hover:text-green-600"
              >
                Sign in
              </Button>
              <Button
                onClick={handleExploreArcadeClick}
                variant="zambian-primary"
                className="px-6 py-2"
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                Explore the Arcade
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Main Headline */}
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isLoaded ? 'animate-slide-from-bottom' : 'opacity-0'}`}>
            Experience Learning Like Never Before
          </h1>

          {/* Subtitle */}
          <p className={`text-xl text-gray-600 mb-12 max-w-2xl mx-auto ${isLoaded ? 'animate-slide-from-bottom' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Discover the exciting features that make SomaSmart EduHub the perfect learning 
            companion for Zambian students.
          </p>

          {/* Featured Carousel */}
          <div className={`mb-12 ${isLoaded ? 'animate-slide-from-bottom' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <Carousel onExploreArcade={onExploreArcade} />
          </div>

          {/* Call to Action */}
          <div className={`${isLoaded ? 'animate-slide-from-bottom' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Adventure?</h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Join thousands of Zambian students who are already experiencing the future of 
              learning with our interactive game arcade.
            </p>

            <Button
              onClick={handleExploreArcadeClick}
              size="lg"
              variant="zambian-primary"
              className="px-8 py-4 text-lg font-bold mb-6"
            >
              <Gamepad2 className="h-5 w-5 mr-2" />
              Explore the Arcade
            </Button>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                Free to Start
              </div>
              <div className="flex items-center">
                <X className="h-4 w-4 text-green-600 mr-1" />
                No Downloads
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-green-600 mr-1" />
                Works on All Devices
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Use arrow keys to navigate slides; spacebar to pause/play
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Students Love SomaSmart EduHub
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engaging, social, and effective learning designed specifically for Zambian high school students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
                color: 'text-emerald-600',
                bg: 'bg-emerald-100'
              },
              {
                icon: Target,
                title: 'Curriculum Aligned',
                description: 'Content designed specifically for Zambian high school students',
                color: 'text-orange-600',
                bg: 'bg-orange-100'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-3d hover-lift text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Master All Your Subjects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive learning materials and games for all high school subjects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <Card 
                key={subject.id} 
                className="card-3d hover-lift cursor-pointer"
                onClick={() => onExploreSubject(subject.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl`}>
                    {subject.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{subject.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Explore
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 header-zambian">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning Experience?
          </h3>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of Zambian students who are already excelling with SomaSmart EduHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 font-bold"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
            <Button
              onClick={handleExploreArcadeClick}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 font-bold"
            >
              <Gamepad2 className="h-5 w-5 mr-2" />
              Try the Arcade
            </Button>
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
                className="w-full py-3"
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