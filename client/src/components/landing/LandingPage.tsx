import React, { useState } from 'react';
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
  Gamepad2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
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

  const subjects = [
    {
      id: 'computer-studies',
      name: 'Computer Studies/ICT',
      icon: '💻',
      description: 'Programming, web development, and digital literacy',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: '📊',
      description: 'Algebra, geometry, calculus, and problem-solving',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: '🔬',
      description: 'Physics, chemistry, biology, and experiments',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'religious-education',
      name: 'Religious Education',
      icon: '📚',
      description: 'World religions, ethics, and moral philosophy',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    {
      icon: Gamepad2,
      title: 'Interactive Games',
      description: 'Learn through engaging educational games and challenges',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: Trophy,
      title: 'Achievements & Badges',
      description: 'Earn rewards and track your progress with gamification',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    {
      icon: Users,
      title: 'Social Learning',
      description: 'Compete with friends and learn together in challenges',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: Target,
      title: 'Curriculum Aligned',
      description: 'Content designed specifically for Zambian high school students',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
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
        // Call the onExploreArcade function which should set up guest mode and navigate to arcade
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                SomaSmart EduHub
              </h1>
            </div>

            {/* Main Headline */}
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Learn. Play. 
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Excel.
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The first gamified learning platform designed specifically for Zambian high school students. 
              Master your curriculum through interactive games, challenges, and social learning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="px-8 py-4 text-lg"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Start Learning Free
              </Button>
              
              <Button
                onClick={handleExploreArcadeClick}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <Gamepad2 className="h-5 w-5 mr-2" />
                Explore Game Arcade
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>100% Free to Start</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Curriculum Aligned</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Made for Zambian Students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Students Love SomaSmart EduHub
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've reimagined learning to be engaging, social, and effective for the modern Zambian student.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Carousel Section */}
      <section className="py-20 bg-white">
        <Carousel onExploreArcade={handleExploreArcadeClick} />
      </section>

      {/* Subjects Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Master Your Curriculum
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage of all major subjects with interactive lessons, games, and assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <Card 
                key={subject.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => onExploreSubject(subject.id)}
              >
                <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{subject.name}</h4>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{subject.description}</p>
                  <Button variant="outline" className="w-full">
                    Explore Subject
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Trusted by Students Across Zambia
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            From Lusaka to Livingstone, students are achieving better results with our gamified learning approach.
          </p>
          
          <Button
            onClick={() => setShowTestimonials(true)}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-green-600"
          >
            <Star className="h-5 w-5 mr-2" />
            Read Student Stories
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Learning?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of Zambian students who are already excelling with SomaSmart EduHub.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="px-8 py-4 text-lg"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Create Free Account
            </Button>
            
            <Button
              onClick={onLogin}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg"
            >
              Sign In
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
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowArcadeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Access Game Arcade</h3>
              <p className="text-gray-600">Choose how you'd like to access our educational games</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => handleArcadeAccess('signup')}
                className="w-full py-3"
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