import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Users, 
  MessageSquare, 
  User, 
  Menu, 
  X,
  Target,
  Award,
  UserPlus,
  Lock,
  Gamepad2,
  GraduationCap,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/Button';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: any;
  isGuest?: boolean;
  onLogout?: () => void;
}

export function Navigation({ currentView, onNavigate, user, isGuest = false, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: Home, guestAllowed: true },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, guestAllowed: true },
    { id: 'arcade', label: 'Game Arcade', icon: Gamepad2, guestAllowed: true },
    { id: 'challenges', label: 'Challenges', icon: Target, guestAllowed: true },
    { id: 'leaderboards', label: 'Leaderboards', icon: Trophy, guestAllowed: false },
    { id: 'forum', label: 'Forum', icon: MessageSquare, guestAllowed: false },
    { id: 'profile', label: 'Profile', icon: User, guestAllowed: false }
  ];

  const handleUpgrade = () => {
    onNavigate('register');
  };

  const handleLogoClick = () => {
    onNavigate('landing');
  };

  const NavItem = ({ item, isMobile = false }: { item: any; isMobile?: boolean }) => {
    const Icon = item.icon;
    const isActive = currentView === item.id || (currentView === 'guest-dashboard' && item.id === 'dashboard');
    const isLocked = isGuest && !item.guestAllowed;
    
    return (
      <button
        onClick={() => {
          if (isLocked) {
            handleUpgrade();
          } else {
            onNavigate(item.id);
          }
          if (isMobile) setIsMobileMenuOpen(false);
        }}
        className={`
          flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 relative
          ${isActive 
            ? 'bg-green-600 text-white shadow-md' 
            : isLocked
              ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }
          ${isMobile ? 'w-full justify-start' : ''}
        `}
      >
        <Icon className="h-5 w-5" />
        <span className={`font-medium ${isMobile ? 'block' : 'hidden lg:block'}`}>
          {item.label}
        </span>
        {isLocked && (
          <Lock className="h-3 w-3 ml-auto" />
        )}
      </button>
    );
  };

  return (
    <>
      {/* Enhanced Desktop Navigation with Zambian Theming */}
      <nav className="hidden md:flex header-zambian shadow-lg border-b border-green-700/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Clickable Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                SomaSmart EduHub
              </h1>
              {isGuest && (
                <span className="px-3 py-1 bg-orange-500/90 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                  Guest Mode
                </span>
              )}
            </button>

            {/* Navigation Items */}
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>

            {/* User Info / Actions */}
            <div className="flex items-center space-x-3">
              {isGuest ? (
                <Button
                  onClick={handleUpgrade}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              ) : (
                <>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-600">Grade {user?.grade}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  {onLogout && (
                    <Button
                      onClick={onLogout}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Clickable Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                  SomaSmart
                </h1>
                {isGuest && (
                  <span className="text-xs text-orange-600 font-medium">Guest Mode</span>
                )}
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="pb-4 border-t border-gray-200">
              <div className="pt-4 space-y-2">
                {navigationItems.map((item) => (
                  <NavItem key={item.id} item={item} isMobile />
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  {isGuest ? (
                    <button
                      onClick={handleUpgrade}
                      className="w-full flex items-center space-x-3 px-3 py-2 bg-green-600 text-white rounded-lg font-medium"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Create Account</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-3 py-2">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-600">Grade {user?.grade}</p>
                        </div>
                      </div>
                      {onLogout && (
                        <button
                          onClick={() => {
                            onLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Sign Out</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}