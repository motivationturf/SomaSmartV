import React from 'react';
import { GraduationCap, BookOpen, Users, Trophy } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Engage with curriculum-aligned content through games and activities'
    },
    {
      icon: Users,
      title: 'Social Learning',
      description: 'Challenge friends and collaborate with classmates'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Earn badges and track your progress across subjects'
    }
  ];

  const handleLogoClick = () => {
    window.location.href = '#landing';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-green-600 to-blue-600 p-8 flex flex-col justify-center text-white">
          <div className="max-w-md mx-auto lg:mx-0">
            <button 
              onClick={handleLogoClick}
              className="flex items-center mb-8 hover:opacity-80 transition-opacity duration-200 group"
            >
              <GraduationCap className="h-12 w-12 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <h1 className="text-3xl font-bold">SomaSmart EduHub</h1>
            </button>
            
            <h2 className="text-2xl font-semibold mb-4">
              Gamified Learning for Zambian Students
            </h2>
            
            <p className="text-green-100 mb-8 text-lg">
              Master your curriculum through interactive games, challenges, and social learning designed specifically for Zambian high school students.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <feature.icon className="h-6 w-6 mr-3 mt-0.5 text-green-200" />
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-green-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              {subtitle && (
                <p className="text-gray-600 mt-2">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}